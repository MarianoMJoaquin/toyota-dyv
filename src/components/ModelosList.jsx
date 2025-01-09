import React, { useEffect, useState } from "react";
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
  const [precioRango, setPrecioRango] = useState([0, 100000000]); // Add price range
  const [filtroYear, setFiltroYear] = useState([]); // Add year filter
  const [filtroTransmision, setFiltroTransmision] = useState([]); // Add transmission filter
  const [filtroMotor, setFiltroMotor] = useState([]); // Add engine filter

  const modelosPorPagina = 12;

  // Cargar modelos desde la API
  useEffect(() => {
    const fetchModelos = async () => {
      try {
        const respuesta = await fetch(
          "/api/vehicles"
        );
        const data = await respuesta.json();
        setModelos(data);
        setModelosFiltrados(data);
        setCargando(false);
      } catch (error) {
        console.error("Error al cargar los modelos:", error);
      }
    };

    fetchModelos();
  }, []);

  // Función que aplica filtros y ordenación
  const aplicarFiltrosYOrden = () => {
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

  // Update the card render function
  const renderCard = (modelo) => (
    <div key={modelo.id} className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={modelo.defaultImage.url}
          alt={modelo.name}
          className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        {modelo.tags?.includes('hybrid') && (
          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
            Híbrido
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{modelo.name}</h3>
        <div className="space-y-1 mb-4 text-sm text-gray-600">
          {modelo.details?.transmission?.type && (
            <p className="flex items-center">
              <span className="mr-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
                </svg>
              </span>
              {modelo.details.transmission.type}
            </p>
          )}
          {modelo.details?.creationYear && (
            <p className="flex items-center">
              <span className="mr-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                </svg>
              </span>
              {modelo.details.creationYear}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-red-600">
            ${modelo.defaultPrice.amount.toLocaleString()}
          </p>
          <a
            href={`/modelos/${modelo.slug}`}
            className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Ver más
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );

  // In the main return, update the layout
  return (
    <section className="container mx-auto section">
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
              {(precioRango[0] !== 0 ||
                precioRango[1] !== 100000000) && (
                <div className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full">
                  <span className="text-lg">
                    Precio: ${Number(precioRango[0]).toLocaleString()} - $
                    {Number(precioRango[1]).toLocaleString()}
                  </span>
                  <button
                    onClick={() => setPrecioRango([0, 100000000])}
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
            </div>
          </div>

          {/* Sección de Filtros */}
          <div className="mb-6 p-4 max-lg:hidden bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
              Filtros
            </h3>
            <div className="space-y-4">
              {/* Filtro de Categorías */}
              <div>
                <h4 className="text-md font-semibold mb-2">Categorías</h4>
                {categories.map((category) => (
                  <div key={category} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`cat-${category}`}
                      onChange={() =>
                        handleCheckbox(filtroCategories, setFiltroCategories, category)
                      }
                      checked={filtroCategories.includes(category)}
                      className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`cat-${category}`} className="text-gray-700">
                      {capitalizar(category)}
                    </label>
                  </div>
                ))}
              </div>

              {/* Filtro de Tags */}
              <div>
                <h4 className="text-md font-semibold mb-2">Tags</h4>
                {Array.from(new Set(modelos.flatMap((modelo) => modelo.tags))).map(
                  (tag) => (
                    <div key={tag} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`tag-${tag}`}
                        onChange={() => handleCheckbox(filtroTags, setFiltroTags, tag)}
                        checked={filtroTags.includes(tag)}
                        className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`tag-${tag}`} className="text-gray-700">
                        {capitalizar(tag)}
                      </label>
                    </div>
                  )
                )}
              </div>

              {/* Filtro de Rango de Precio */}
              <div>
                <h4 className="text-md font-semibold mb-2">Rango de Precio</h4>
                <Range
                  step={100000}
                  min={0}
                  max={100000000}
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
              <div>
                <h4 className="text-md font-semibold mb-2">Año</h4>
                {years.map((year) => (
                  <div key={year} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`year-${year}`}
                      onChange={() => handleCheckbox(filtroYear, setFiltroYear, year)}
                      checked={filtroYear.includes(year)}
                      className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`year-${year}`} className="text-gray-700">
                      {year}
                    </label>
                  </div>
                ))}
              </div>

              {/* Filtro de Transmisión */}
              <div>
                <h4 className="text-md font-semibold mb-2">Transmisión</h4>
                {transmissionTypes.map((trans) => (
                  <div key={trans} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`trans-${trans}`}
                      onChange={() =>
                        handleCheckbox(filtroTransmision, setFiltroTransmision, trans)
                      }
                      checked={filtroTransmision.includes(trans)}
                      className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`trans-${trans}`} className="text-gray-700">
                      {capitalizar(trans)}
                    </label>
                  </div>
                ))}
              </div>

              {/* Filtro de Motor */}
              <div>
                <h4 className="text-md font-semibold mb-2">Motor</h4>
                {["Híbrido", "Nafta"].map((motor) => (
                  <div key={motor} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`motor-${motor}`}
                      onChange={() => handleCheckbox(filtroMotor, setFiltroMotor, motor)}
                      checked={filtroMotor.includes(motor)}
                      className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`motor-${motor}`} className="text-gray-700">
                      {motor}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {/* Columna para resultados */}
          {cargando ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  {modelosFiltrados.length} modelos encontrados
                </h2>
                <select
                  value={orden}
                  onChange={(e) => setOrden(e.target.value)}
                  className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option value="">Ordenar por...</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                  <option value="mayor-precio">Mayor precio</option>
                  <option value="menor-precio">Menor precio</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modelosPaginados.map(renderCard)}
              </div>

              {/* Enhanced pagination */}
              {totalPaginas > 1 && (
                <div className="flex justify-center mt-12 space-x-2">
                  {paginaActual > 1 && (
                    <button
                      onClick={() => cambiarPagina(paginaActual - 1)}
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      Anterior
                    </button>
                  )}
                  {Array.from({ length: totalPaginas }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => cambiarPagina(i + 1)}
                      className={`px-4 py-2 rounded ${
                        paginaActual === i + 1
                          ? "bg-red-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  {paginaActual < totalPaginas && (
                    <button
                      onClick={() => cambiarPagina(paginaActual + 1)}
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      Siguiente
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}