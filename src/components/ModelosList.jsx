import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Range } from "react-range";

export default function ModelosList() {
  const [modelos, setModelos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategories, setFiltroCategories] = useState([]);
  const [filtroTags, setFiltroTags] = useState([]);
  const [modelosFiltrados, setModelosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);
  const [slugModeloSeleccionado, setSlugModeloSeleccionado] = useState(null);
  const [detallesModelo, setDetallesModelo] = useState(null);
  const [modoVista, setModoVista] = useState("grilla");
  const [orden, setOrden] = useState("");
  const [precioRango, setPrecioRango] = useState([0, 0]); // Modificar el estado inicial de precioRango para usar valores por defecto
  const [filtroYear, setFiltroYear] = useState([]); // Add year filter
  const [filtroTransmision, setFiltroTransmision] = useState([]); // Add transmission filter
  const [filtroMotor, setFiltroMotor] = useState([]); // Add engine filter

  const modelosPorPagina = 6;

  // Cargar modelos desde la API
  useEffect(() => {
    const fetchModelos = async () => {
      try {
        const respuesta = await fetch(
          "/api/vehicles"
        );
        const data = await respuesta.json();
        
        if (data && data.length > 0) {
          // Calcular precios min/max solo si hay datos
          const precios = data.map(modelo => modelo.defaultPrice?.amount || 0);
          const precioMinimo = Math.min(...precios);
          const precioMaximo = Math.max(...precios);
          
          setModelos(data);
          setModelosFiltrados(data);
          setPrecioRango([precioMinimo, precioMaximo]);
        }
        setCargando(false);
      } catch (error) {
        console.error("Error al cargar los modelos:", error);
        setCargando(false);
      }
    };

    fetchModelos();
  }, []);

  // Función que aplica filtros y ordenación
  const aplicarFiltrosYOrden = () => {
    if (!modelos || modelos.length === 0) return;

    let modelosFiltrados = [...modelos];

    // Filtros de búsqueda
    if (busqueda) {
      modelosFiltrados = modelosFiltrados.filter((modelo) =>
        modelo.name.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtros por categorías
    if (filtroCategories.length > 0) {
      modelosFiltrados = modelosFiltrados.filter((modelo) =>
        modelo.categories.some((cat) => 
          filtroCategories.includes(cat.name)
        )
      );
    }

    // Filtros por tags
    if (filtroTags.length > 0) {
      modelosFiltrados = modelosFiltrados.filter((modelo) =>
        modelo.tags.some((tag) => filtroTags.includes(tag))
      );
    }

    // Price range filter
    modelosFiltrados = modelosFiltrados.filter(
      (modelo) =>
        modelo.defaultPrice.amount >= precioRango[0] &&
        modelo.defaultPrice.amount <= precioRango[1]
    );

    // Year filter - Updated to handle variants
    if (filtroYear.length > 0) {
      modelosFiltrados = modelosFiltrados.filter((modelo) => {
        // Check main model year first
        if (modelo.details?.creationYear) {
          return filtroYear.includes(modelo.details.creationYear);
        }
        // If not in main model, check variants
        if (modelo.variants?.length > 0) {
          return modelo.variants.some(variant => 
            variant.details?.creationYear && 
            filtroYear.includes(variant.details.creationYear)
          );
        }
        return false;
      });
    }

    // Transmission filter - Updated to handle variants
    if (filtroTransmision.length > 0) {
      modelosFiltrados = modelosFiltrados.filter((modelo) => {
        // Check main model transmission first
        if (modelo.details?.transmission?.type) {
          return filtroTransmision.includes(modelo.details.transmission.type);
        }
        // If not in main model, check variants
        if (modelo.variants?.length > 0) {
          return modelo.variants.some(variant => 
            variant.details?.transmission?.type && 
            filtroTransmision.includes(variant.details.transmission.type)
          );
        }
        return false;
      });
    }

    // Engine filter with safe checks
    if (filtroMotor.length > 0) {
      modelosFiltrados = modelosFiltrados.filter((modelo) => {
        if (modelo.details && modelo.details.motor) {
          return filtroMotor.some(motor => 
            modelo.details.motor.toLowerCase().includes(motor.toLowerCase())
          );
        }
        return false;
      });
    }

    // Ordenar modelos
    switch (orden) {
      case "a-z":
        modelosFiltrados.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        modelosFiltrados.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "mayor-precio":
        modelosFiltrados.sort((a, b) => b.defaultPrice.amount - a.defaultPrice.amount);
        break;
      case "menor-precio":
        modelosFiltrados.sort((a, b) => a.defaultPrice.amount - b.defaultPrice.amount);
        break;
      default:
        break;
    }

    setModelosFiltrados(modelosFiltrados);
  };

  // Asegurarse de que los filtros y la ordenación se apliquen siempre
  useEffect(() => {
    aplicarFiltrosYOrden();
  }, [
    busqueda,
    filtroCategories,
    filtroTags,
    orden,
    modelos,
    precioRango,
    filtroYear,
    filtroTransmision,
    filtroMotor
  ]);

  // Paginar modelos
  const indiceInicial = (paginaActual - 1) * modelosPorPagina;
  const indiceFinal = indiceInicial + modelosPorPagina;
  const modelosPaginados = modelosFiltrados.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(modelosFiltrados.length / modelosPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Función para eliminar un filtro específico
  const eliminarFiltro = (filtro, setFiltro, valor) => {
    setFiltro(filtro.filter((item) => item !== valor));
  };

  // Manejar checkboxes para filtros
  const handleCheckbox = (filtro, setFiltro, valor) => {
    if (filtro.includes(valor)) {
      setFiltro(filtro.filter((item) => item !== valor));
    } else {
      setFiltro([...filtro, valor]);
    }
  };

  // Función para limpiar todos los filtros
  const limpiarFiltros = () => {
    setBusqueda("");
    setFiltroCategories([]);
    setFiltroTags([]);
    setFiltroYear([]);
    setFiltroTransmision([]);
    setFiltroMotor([]);
    
    // Obtener los precios mínimos y máximos actuales
    const precios = modelos.map(modelo => modelo.defaultPrice.amount);
    const precioMinimo = Math.min(...precios);
    const precioMaximo = Math.max(...precios);
    setPrecioRango([precioMinimo, precioMaximo]);
  };

  // Helper functions
  const getUniqueValues = (arr, key) => {
    const values = arr.flatMap(item => {
      const values = [];
      
      // Get value from main model
      const mainValue = key.split('.').reduce((obj, k) => obj?.[k], item);
      if (mainValue) values.push(mainValue);
      
      // Get values from variants
      if (item.variants?.length > 0) {
        const variantValues = item.variants.map(variant => 
          key.split('.').reduce((obj, k) => obj?.[k], variant)
        ).filter(Boolean);
        values.push(...variantValues);
      }
      
      return values;
    });
    
    return [...new Set(values)].filter(Boolean).sort();
  };

  // Capitalize helper
  const capitalizar = (texto) =>
    texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();

  // Get derived values
  const categories = Array.from(
    new Set(modelos.flatMap(modelo => 
      modelo.categories.map(cat => cat.name)
    ))
  );

  const transmissionTypes = getUniqueValues(modelos, 'details.transmission.type');
  const years = getUniqueValues(modelos, 'details.creationYear');
  
  const priceRange = modelos.reduce((acc, modelo) => {
    const price = modelo.defaultPrice.amount;
    return {
      min: Math.min(acc.min, price),
      max: Math.max(acc.max, price)
    };
  }, { min: Infinity, max: 0 });

  // Add these new helper components
  const FilterButton = ({ children, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`${
        isActive 
          ? "bg-red-600 text-white" 
          : "bg-white text-gray-700 hover:bg-gray-50"
      } px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm`}
    >
      {children}
    </button>
  );

  const FilterSection = ({ title, children }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      {children}
    </div>
  );

  // Función para renderizar tarjeta en modo grilla (similar a UsadosList)
  const renderGridCard = (modelo) => {
    if (!modelo) return null;
    
    return (
      <CSSTransition key={modelo.id} timeout={300} classNames="fade">
        <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105">
          <a href={`/modelos/${modelo.slug}`} className="cursor-pointer">
            <img
              src={modelo.defaultImage.url}
              alt={modelo.name}
              className="w-full h-72 object-cover"
            />
          </a>
          <div className="p-4 flex flex-col justify-center gap-2">
            <h2 className="text-lg font-semibold border-b-2 border-red-600 max-w-max mb-2">
              {modelo.name}
            </h2>
            <div className="flex justify-start items-center text-base mt-2">
              <p className="mr-1">{modelo.variants[0]?.details?.creationYear || 'N/A'}</p>
              <p className="mr-1">|</p>
              <p className="mr-1">{modelo.categories[0]?.name || 'N/A'}</p>
              {modelo.tags?.includes('hybrid') && (
                <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full uppercase ml-2">
                  Híbrido
                </span>
              )}
              {modelo.tags?.includes('gazoo_racing') && (
                <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full uppercase ml-2">
                  Deportivo
                </span>
              )}
            </div>
            <div className="flex justify-start items-center gap-2">
              <p className="text-base text-gray-500">
                {window.innerWidth <= 640
                  ? (modelo.variants[0]?.details?.summary.replaceAll(';', ',') || 'Hola').substring(0, 30)
                  : (modelo.variants[0]?.details?.summary.replaceAll(';', ',') || '').substring(0, 100)}
                {(modelo.variants[0]?.details?.summary.replaceAll(';', ',') || '').length > (window.innerWidth <= 640 ? 30 : 100) ? '...' : ''}
              </p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <a
                href={`/modelos/${modelo.slug}`}
                className="text-white text-base py-1 px-2 ring-red-600 ring-1 rounded-full border bg-red-600 border-red-600 hover:bg-transparent hover:text-red-600 transition-all ease-in-out"
              >
                Ver más
              </a>
              {modelo.defaultStock === 1 ? (
                <p className="font-bold text-black text-lg">
                  ARS$ {modelo.defaultPrice.amount.toLocaleString()}
                </p>
              ) : (
                <p className="font-bold text-lg text-red-600">Consultar disponibilidad</p>
              )}
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  };

  // Función para renderizar tarjeta en modo lista (similar a UsadosList)
  const renderListCard = (modelo) => (
    <CSSTransition key={modelo.id} timeout={300} classNames="fade">
      <div className="flex items-center max-sm:h-44 h-72 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105">
        <a href={`/modelos/${modelo.slug}`} className="cursor-pointer">
          <img
              src={modelo.defaultImage.url}
              alt={modelo.name}
              className="w-full h-full object-cover"
              style={{minHeight: "200px", maxHeight: "300px"}}
          />
        </a>
        <div className="w-full p-4 flex flex-col max-sm:gap-0 gap-6">
          <h2 className="text-sm lg:text-2xl xl:text-3xl font-semibold border-b-2 border-red-600 max-w-max mb-2">
            {modelo.name.substring(0, 50)}
          </h2>
          <div className="flex justify-start items-center text-base mt-2">
            <p className="mr-1">{modelo.variants[0]?.details?.creationYear || 'N/A'}</p>
            <p className="mr-1">|</p>
            <p className="mr-1">{modelo.variants[0]?.details?.transmission?.type || 'N/A'}</p>
            {modelo.tags?.includes('hybrid') && (
              <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full uppercase ml-2">
                Híbrido
              </span>
            )}
            {modelo.tags?.includes('gazoo_racing') && (
              <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full uppercase ml-2">
                Gazoo Racing
              </span>
            )}
          </div>
          <div className="flex justify-start items-center gap-2">
            <p className="text-base text-gray-500">
              {window.innerWidth <= 640 
                ? (modelo.variants[0]?.details?.summary.replaceAll(';', ',') || 'Hola').substring(0, 30)
                : (modelo.variants[0]?.details?.summary.replaceAll(';', ',') || '').substring(0, 100)}
              {(modelo.variants[0]?.details?.summary.replaceAll(';', ',') || '').length > (window.innerWidth <= 640 ? 30 : 100) ? '...' : ''}
            </p>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <a
              href={`/modelos/${modelo.slug}`}
              className="text-white text-base max-sm:py-0 py-1 px-2 ring-red-600 ring-1 rounded-full border bg-red-600 border-red-600 hover:bg-transparent hover:text-red-600 transition-all ease-in-out"
            >
              Ver más
            </a>
            <p className="font-bold text-black text-lg">
              ARS$ {modelo.defaultPrice.amount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </CSSTransition>
  );

  return (
    <section className="container mx-auto section">
      <div className="col-span-2 mb-4 mx-5 xl:mx-10">
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 text-base max-sm:text-sm md:space-x-3">
            <li>
              <a href="/" className="text-gray-700 hover:text-red-600">
                Inicio
              </a>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <span className="text-gray-700">Modelos</span>
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="vehicles__title heading-1 max-w-max mx-auto border-b-2 border-red-600">
        Modelos
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 mx-5 xl:mx-5">
          {/* Columna para filtros y búsqueda */}

          <div className="mb-4 relative">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPaginaActual(1);
                modeloSeleccionado && setModeloSeleccionado(null);
              }}
              placeholder="Buscar por modelo..."
              className="caret-red-600 block py-2.5 px-3 pl-12 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 focus:transition ease-in-out peer"
            />
            <i className="ri-search-line absolute top-1/2 left-3 -translate-y-1/2 text-gray-600 transition-all ease-in-out peer-focus:text-red-600 peer-focus:transition"></i>
          </div>

          {/* Sección de Filtros Activos */}
          <div className="mb-6 p-4 max-lg:hidden bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
              Filtros Activos
            </h3>
            <div className="space-y-2">
              {/* Mostrar filtros activos */}
              {busqueda && (
                <div className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full">
                  <span className="text-lg">Búsqueda: {busqueda}</span>
                  <button
                    onClick={() => setBusqueda("")}
                    className="ml-2 text-red-600 transition-all ease-in-out hover:text-red-500"
                  >
                    <i className="ri-close-circle-line"></i>
                  </button>
                </div>
              )}
              {filtroCategories.map((category) => (
                <div
                  key={category}
                  className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full"
                >
                  <span className="text-lg">Categoría: {capitalizar(category)}</span>
                  <button
                    onClick={() =>
                      eliminarFiltro(filtroCategories, setFiltroCategories, category)
                    }
                    className="ml-2 text-red-600 transition-all ease-in-out hover:text-red-500"
                  >
                    <i className="ri-close-circle-line"></i>
                  </button>
                </div>
              ))}
              {filtroTags.map((tag) => (
                <div
                  key={tag}
                  className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full"
                >
                  <span className="text-lg">Tag: {capitalizar(tag)}</span>
                  <button
                    onClick={() =>
                      eliminarFiltro(filtroTags, setFiltroTags, tag)
                    }
                    className="ml-2 text-red-600 transition-all ease-in-out hover:text-red-500"
                  >
                    <i className="ri-close-circle-line"></i>
                  </button>
                </div>
              ))}
              {(precioRango[0] !== Math.min(...modelos.map(m => m.defaultPrice?.amount || 0)) ||
                precioRango[1] !== Math.max(...modelos.map(m => m.defaultPrice?.amount || 100000000))) && (
                <div className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full">
                  <span className="text-lg">
                    Precio: ${Number(precioRango[0]).toLocaleString()} - $
                    {Number(precioRango[1]).toLocaleString()}
                  </span>
                  <button
                    onClick={() => setPrecioRango([Math.min(...modelos.map(m => m.defaultPrice?.amount || 0)), Math.max(...modelos.map(m => m.defaultPrice?.amount || 100000000))])}
                    className="ml-2 text-red-600 transition-all ease-in-out hover:text-red-500"
                  >
                    <i className="ri-close-circle-line"></i>
                  </button>
                </div>
              )}
              {filtroYear.map((year) => (
                <div
                  key={year}
                  className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full"
                >
                  <span className="text-lg">Año: {year}</span>
                  <button
                    onClick={() =>
                      eliminarFiltro(filtroYear, setFiltroYear, year)
                    }
                    className="ml-2 text-red-600 transition-all ease-in-out hover:text-red-500"
                  >
                    <i className="ri-close-circle-line"></i>
                  </button>
                </div>
              ))}
              {filtroTransmision.map((trans) => (
                <div
                  key={trans}
                  className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full"
                >
                  <span className="text-lg">Transmisión: {capitalizar(trans)}</span>
                  <button
                    onClick={() =>
                      eliminarFiltro(filtroTransmision, setFiltroTransmision, trans)
                    }
                    className="ml-2 text-red-600 transition-all ease-in-out hover:text-red-500"
                  >
                    <i className="ri-close-circle-line"></i>
                  </button>
                </div>
              ))}
              {filtroMotor.map((motor) => (
                <div
                  key={motor}
                  className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full"
                >
                  <span className="text-lg">Motor: {capitalizar(motor)}</span>
                  <button
                    onClick={() =>
                      eliminarFiltro(filtroMotor, setFiltroMotor, motor)
                    }
                    className="ml-2 text-red-600 transition-all ease-in-out hover:text-red-500"
                  >
                    <i className="ri-close-circle-line"></i>
                  </button>
                </div>
              ))}
              {busqueda ||
              filtroCategories.length > 0 ||
              filtroTags.length > 0 ||
              filtroYear.length > 0 ||
              filtroTransmision.length > 0 ||
              filtroMotor.length > 0 ||
              (modelos.length > 0 && (
                precioRango[0] !== Math.min(...modelos.map(m => m.defaultPrice?.amount || 0)) ||
                precioRango[1] !== Math.max(...modelos.map(m => m.defaultPrice?.amount || 100000000))
              )) ? (
                <button
                  onClick={limpiarFiltros}
                  className="text-red-600 text-sm py-1 px-2 rounded-full"
                >
                  Limpiar filtros
                </button>
              ) : (
                <div className="max-w-max flex justify-center items-center">
                  <span className="text-lg">No hay filtros activos</span>
                </div>
              )}
            </div>
          </div>

          {/* Sección de Filtros */}
          <div className="max-lg:hidden space-y-4">
            {/* Filtro de Categorías */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
                Categorías
              </h3>
              {categories.map((category) => (
                <div key={category} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`cat-${category}`}
                    onChange={() =>
                      handleCheckbox(filtroCategories, setFiltroCategories, category)
                    }
                    checked={filtroCategories.includes(category)}
                    className="cursor-pointer mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`cat-${category}`} className="text-lg cursor-pointer">
                    {capitalizar(category)}
                  </label>
                </div>
              ))}
            </div>

            {/* Filtro de Tags */}
                  <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
                    Otros filtros
                    </h3>
                    {Array.from(new Set(modelos.flatMap((modelo) => modelo.tags))).map(
                      (tag) => (
                        <div key={tag} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`tag-${tag}`}
                          onChange={() => handleCheckbox(filtroTags, setFiltroTags, tag)}
                          checked={filtroTags.includes(tag)}
                          className="cursor-pointer mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`tag-${tag}`} className="text-lg">
                          {tag === "gazoo_racing" 
                          ? "Deportivos" 
                          : tag === "hybrid" 
                            ? "Híbridos"
                            : capitalizar(tag)}
                        </label>
                        </div>
                      )
                    )}
                  </div>

                  {/* Filtro de Rango de Precio */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
                Rango de Precio
              </h3>
              <Range
                step={100000}
                min={Math.min(...(modelos.length > 0 ? modelos.map(m => m.defaultPrice?.amount || 0) : [0]))}
                max={Math.max(...(modelos.length > 0 ? modelos.map(m => m.defaultPrice?.amount || 100000000) : [100000000]))}
                values={precioRango}
                onChange={(values) => setPrecioRango(values)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "5px",
                      background: "#d1d5db",
                      borderRadius: "5px",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props, index }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "12px",
                      width: "12px",
                      backgroundColor: "#eb0a1e",
                      borderRadius: "50%",
                      boxShadow: "0px 2px 6px #AAA",
                    }}
                  />
                )}
              />
              <div className="flex justify-between mt-2">
                <span className="text-lg">
                  ${Number(precioRango[0]).toLocaleString()}
                </span>
                <span className="text-lg">
                  ${Number(precioRango[1]).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Filtro de Año */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
                Año
              </h3>
              {years.map((year) => (
                <div key={year} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`year-${year}`}
                    onChange={() => handleCheckbox(filtroYear, setFiltroYear, year)}
                    checked={filtroYear.includes(year)}
                    className="cursor-pointer mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`year-${year}`} className="text-lg">
                    {year}
                  </label>
                </div>
              ))}
            </div>

            {/* Filtro de Transmisión */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
                Transmisión
              </h3>
              {transmissionTypes.map((trans) => (
                <div key={trans} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`trans-${trans}`}
                    onChange={() =>
                      handleCheckbox(filtroTransmision, setFiltroTransmision, trans)
                    }
                    checked={filtroTransmision.includes(trans)}
                    className="cursor-pointer mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`trans-${trans}`} className="text-lg">
                    {capitalizar(trans)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 mx-5 xl:mx-5">
          <div className="grid grid-cols-2 grid-rows-1 mb-4 max-lg:hidden">
            <div className="flex justify-start items-center">
              <p className="text-sm lg:text-lg">
                Mostrando {indiceInicial + 1} - {indiceFinal > modelosFiltrados.length ? modelosFiltrados.length : indiceFinal} de {modelosFiltrados.length} modelos
              </p>
            </div>
            <div className="flex justify-end items-center">
              <div className="flex items-center mr-4">
                <label htmlFor="orden" className="mr-2 max-sm:mr-1 text-sm lg:text-lg">
                  Ordenar por:
                </label>
                <select
                  id="orden"
                  value={orden}
                  onChange={(e) => setOrden(e.target.value)}
                  className="p-2 text-sm lg:text-lg border focus:ring-red-500 focus:border-red-500 border-gray-300 rounded-full"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                  <option value="mayor-precio">Mayor precio</option>
                  <option value="menor-precio">Menor precio</option>
                </select>
              </div>
              <button
                onClick={() => setModoVista("lista")}
                className={`mr-2 ${modoVista === "lista" ? "text-red-600" : "text-gray-700"}`}
              >
                <i className="ri-list-unordered"></i>
              </button>
              <button
                onClick={() => setModoVista("grilla")}
                className={`${modoVista === "grilla" ? "text-red-600" : "text-gray-700"}`}
              >
                <i className="ri-grid-fill"></i>
              </button>
            </div>
          </div>

          {/* Estado de carga */}
          {cargando ? (
            <div role="status" style={{height: "40vh"}} className="flex justify-center items-center">
              <svg
                aria-hidden="true"
                className="inline w-16 h-16 text-gray-200 animate-spin fill-red-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Cargando modelos...</span>
            </div>
          ) : modelosPaginados.length === 0 ? (
            <div className="text-center text-gray-500 w-full max-w-full h-screen">
              <h2 className="text-xl font-semibold mb-4">
                No se encontraron modelos con los filtros aplicados
              </h2>
              <p>
                Intenta realizar una nueva búsqueda o aplicar otros filtros.
              </p>
            </div>
          ) : (
            // Grid de modelos con estilos similares a UsadosList
            <TransitionGroup 
              className={
                modoVista === "grilla" 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {modelosPaginados.map(modoVista === "grilla" ? renderGridCard : renderListCard)}
            </TransitionGroup>
          )}

          {/* Paginación con estilos de UsadosList */}
          {modelosFiltrados.length > modelosPorPagina && (
            <div className="flex mt-8 justify-center space-x-2">
              {Array.from({ length: totalPaginas }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => cambiarPagina(i + 1)}
                  className={`${
                    i + 1 === paginaActual
                      ? "bg-red-600 text-white"
                      : "bg-gray-300 text-gray-700 transition-all ease-in-out hover:bg-red-600 hover:text-white"
                  } rounded-full text-lg w-10 h-10 flex items-center justify-center`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}