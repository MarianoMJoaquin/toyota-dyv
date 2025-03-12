import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Range } from "react-range";

export default function AccesoriosList() {
  const [accesorios, setAccesorios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroModelos, setFiltroModelos] = useState([]);
  const [accesoriosFiltrados, setAccesoriosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [orden, setOrden] = useState("");
  const [modoVista, setModoVista] = useState("grilla");
  const [modelos, setModelos] = useState([]);

  const accesoriosPorPagina = 6;

  // Agregamos estados para los filtros
  const [filtros, setFiltros] = useState({
    modelos: [], 
  });

  // Función para obtener los modelos únicos
  const obtenerModelos = () => {
    const modelos = [...new Set(accesorios.map(acc => acc.modelo_id))];
    return modelos;
  };

  // Función para manejar los cambios en los filtros
  const handleFiltroChange = (tipo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [tipo]: prev[tipo].includes(valor) 
        ? prev[tipo].filter(v => v !== valor)
        : [...prev[tipo], valor]
    }));
    setPaginaActual(1);
  };

  // Cargar accesorios desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accesoriosRes, modelosRes] = await Promise.all([
          fetch("https://panelweb.derkayvargas.com/api/accesorios"),
          fetch("https://panelweb.derkayvargas.com/api/modelos")
        ]);

        const accesoriosData = await accesoriosRes.json();
        const modelosData = await modelosRes.json();
        
        if (accesoriosData.data && accesoriosData.data.length > 0) {
          setAccesorios(accesoriosData.data);
          setAccesoriosFiltrados(accesoriosData.data);
        }

        if (modelosData) {
          setModelos(modelosData);
        }

        setCargando(false);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  // Función que aplica filtros y ordenación
  const aplicarFiltrosYOrden = () => {
    let filtrados = [...accesorios];

    // Filtros de búsqueda
    if (busqueda) {
      filtrados = filtrados.filter((accesorio) =>
        accesorio.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtros por modelos
    if (filtros.modelos.length > 0) {
      filtrados = filtrados.filter(accesorio => 
        filtros.modelos.includes(accesorio.modelo_id)
      );
    }

    // Ordenar accesorios
    switch (orden) {
      case "mas-recientes":
        filtrados.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;
      case "nombre-asc":
        filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case "nombre-desc":
        filtrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      default:
        break;
    }

    setAccesoriosFiltrados(filtrados);
  };

  // Aplicar filtros cuando cambien los criterios
  useEffect(() => {
    aplicarFiltrosYOrden();
  }, [busqueda, filtros, orden, accesorios]);

  // Paginación
  const indiceInicial = (paginaActual - 1) * accesoriosPorPagina;
  const indiceFinal = indiceInicial + accesoriosPorPagina;
  const accesoriosPaginados = accesoriosFiltrados.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(accesoriosFiltrados.length / accesoriosPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Función modificada para obtener los modelos disponibles con sus nombres
  const obtenerModelosDisponibles = () => {
    const modelosIdDisponibles = [...new Set(accesorios.map(acc => acc.modelo_id))];
    return modelos
      .filter(modelo => modelosIdDisponibles.includes(modelo.id))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  };

  // Función para obtener el nombre del modelo por ID
  const obtenerNombreModelo = (modeloId) => {
    const modelo = modelos.find(m => m.id === modeloId);
    return modelo ? modelo.nombre : `Modelo ${modeloId}`;
  };

  // Función para abrir WhatsApp con mensaje personalizado
  const abrirWhatsApp = (accesorio) => {
    const numeroWhatsApp = "5493624013577";
    
    // Obtener el nombre del modelo para este accesorio
    const nombreModelo = obtenerNombreModelo(accesorio.modelo_id);
    
    const mensaje = encodeURIComponent(
      `Hola, estoy interesado en el accesorio "${accesorio.nombre}" para mi Toyota ${nombreModelo}. ¿Me podrían brindar más información sobre disponibilidad y precio?`
    );
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
  };

  return (
    <section className="container mx-auto section">
      {/* Breadcrumb */}
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
              <span className="text-gray-700">Accesorios</span>
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="vehicles__title heading-1 max-w-max mx-auto border-b-2 border-red-600">
        Accesorios
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Columna de filtros */}
        <div className="lg:col-span-1 mx-5 xl:mx-5">
          <div className="mb-4 relative">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPaginaActual(1);
              }}
              placeholder="Buscar accesorios..."
              className="caret-red-600 block py-2.5 px-3 pl-12 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 focus:transition ease-in-out peer"
            />
            <i className="ri-search-line absolute top-1/2 left-3 -translate-y-1/2 text-gray-600 transition-all ease-in-out peer-focus:text-red-600 peer-focus:transition"></i>
          </div>

          {/* Agregamos la sección de filtros */}
          <div className="space-y-4">
            {/* Filtros activos */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
                Filtros activos
              </h3>
              <div className="space-y-2">
                {filtros.modelos.map(modeloId => (
                  <div key={modeloId} 
                    className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 mr-2 mb-2">
                    <span className="text-lg">Modelo: {obtenerNombreModelo(modeloId)}</span>
                    <button
                      onClick={() => handleFiltroChange('modelos', modeloId)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      <i className="ri-close-circle-line"></i>
                    </button>
                  </div>
                ))}
                {filtros.modelos.length === 0 && (
                  <p className="text-gray-500 text-lg">No hay filtros activos</p>
                )}
              </div>
            </div>
            {/* Filtro por Modelo */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
                Modelos
              </h3>
              {obtenerModelosDisponibles().map((modelo) => (
                <div key={modelo.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`modelo-${modelo.id}`}
                    checked={filtros.modelos.includes(modelo.id)}
                    onChange={() => handleFiltroChange('modelos', modelo.id)}
                    className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                  />
                  <label htmlFor={`modelo-${modelo.id}`} className="ml-2 text-lg">
                    {modelo.nombre}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna de lista de accesorios */}
        <div className="lg:col-span-3 mx-5 xl:mx-5">
          {/* Controles de vista y ordenamiento */}
          <div className="grid grid-cols-2 mb-4">
            <div className="flex justify-start items-center">
              <p className="text-sm lg:text-lg">
                Mostrando {indiceInicial + 1} -{" "}
                {indiceFinal > accesoriosFiltrados.length
                  ? accesoriosFiltrados.length
                  : indiceFinal}{" "}
                de {accesoriosFiltrados.length} accesorios
              </p>
            </div>
            <div className="flex justify-end items-center">
              <div className="flex items-center mr-4">
                <label htmlFor="orden" className="mr-2 text-sm lg:text-lg">
                  Ordenar por:
                </label>
                <select
                  id="orden"
                  value={orden}
                  onChange={(e) => setOrden(e.target.value)}
                  className="p-2 text-sm lg:text-lg border focus:ring-red-500 focus:border-red-500 border-gray-300 rounded-full"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="mas-recientes">Más recientes</option>
                  <option value="nombre-asc">Nombre A-Z</option>
                  <option value="nombre-desc">Nombre Z-A</option>
                </select>
              </div>

              {/*<div>
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
              </div>*/}
            </div>
          </div>

          {/* Lista de accesorios */}
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
              <span className="sr-only">Cargando accesorios...</span>
            </div>
          ) : accesoriosPaginados.length === 0 ? (
            <div className="text-center text-gray-500">
              <h2 className="text-xl font-semibold mb-4">
                No se encontraron accesorios
              </h2>
              <p>Intenta realizar una nueva búsqueda o aplicar otros filtros.</p>
            </div>
          ) : (
            <TransitionGroup 
              className={
                modoVista === "grilla" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
              }
            >
              {accesoriosPaginados.map((accesorio) => (
                <CSSTransition key={accesorio.id} timeout={300} classNames="fade">
                  <div className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105 ${
                    modoVista === "lista" ? "flex max-sm:h-44 h-72" : ""
                  }`}>
                    <div className={modoVista === "lista" ? "max-sm:w-72 w-96" : ""}>
                      <img
                        src={`https://panelweb.derkayvargas.com/${accesorio.fotos[0].path.replace("public", "storage")}`}
                        alt={accesorio.nombre}
                        className={`w-full object-cover ${
                          modoVista === "lista" ? "max-sm:h-44 h-72" : "h-72"
                        }`}
                      />
                    </div>
                    <div className={`p-4 ${modoVista === "lista" ? "w-full flex flex-col justify-between" : ""}`}>
                      <h2 className="text-lg font-semibold border-b-2 border-red-600 max-w-max mb-2">
                        {accesorio.nombre}
                      </h2>
                      <div className="mt-4">
                        <button 
                          className="text-white text-base py-1 px-2 ring-red-600 ring-1 rounded-full border bg-red-600 border-red-600 hover:bg-transparent hover:text-red-600 transition-all ease-in-out"
                          onClick={() => abrirWhatsApp(accesorio)}
                        >
                          Consultar
                        </button>
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}

          {/* Paginación */}
          {accesoriosFiltrados.length > accesoriosPorPagina && (
            <div className="mt-8 flex justify-center space-x-2">
              {Array.from({ length: totalPaginas }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => cambiarPagina(i + 1)}
                  className={`${
                    i + 1 === paginaActual
                      ? "bg-red-600 text-white"
                      : "bg-gray-300 text-gray-700 hover:bg-red-600 hover:text-white"
                  } rounded-full text-lg w-10 h-10 flex items-center justify-center transition-all ease-in-out`}
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
