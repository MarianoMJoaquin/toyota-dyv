import { useEffect, useState } from "react";
import AutoDetalles from "./autoDetalle";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Range } from "react-range";

export default function UsadosList() {
  const [autos, setAutos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroMarcas, setFiltroMarcas] = useState([]);
  const [filtroModelos, setFiltroModelos] = useState([]);
  const [filtroColores, setFiltroColores] = useState([]);
  const [filtroCombustibles, setFiltroCombustibles] = useState([]);
  const [filtroTransmisiones, setFiltroTransmisiones] = useState([]);
  const [filtroUct, setFiltroUct] = useState([]);
  const [filtroEstados, setFiltroEstados] = useState([]);
  const [filtroAnioDesde, setFiltroAnioDesde] = useState("");
  const [filtroAnioHasta, setFiltroAnioHasta] = useState("");

  // Rango de precios
  const [rangoPrecios, setRangoPrecios] = useState([0, 60000000]);
  const minPrecio = 0;
  const maxPrecio = 100000000;

  // Rango de kilómetros
  const [rangoKilometros, setRangoKilometros] = useState([0, 300000]);
  const minKilometros = 0;
  const maxKilometros = 500000;

  const [autosFiltrados, setAutosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [autoSeleccionado, setAutoSeleccionado] = useState(null);
  const [slugAutoSeleccionado, setSlugAutoSeleccionado] = useState(null);
  const [detallesAuto, setDetallesAuto] = useState(null);

  const autosPorPagina = 12;

  // Cargar autos desde la API
  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const respuesta = await fetch(
          "https://panelweb.derkayvargas.com/api/usados/"
        );
        const data = await respuesta.json();
        setAutos(data.data);
        setAutosFiltrados(data.data);
        setCargando(false);
      } catch (error) {
        console.error("Error al cargar los autos:", error);
      }
    };

    fetchAutos();
  }, []);

  // Cuando se selecciona un auto, busca más detalles usando el slug
  useEffect(() => {
    if (slugAutoSeleccionado) {
      const fetchDetallesAuto = async () => {
        try {
          const respuesta = await fetch(`https://panelweb.derkayvargas.com/api/usados/${slugAutoSeleccionado}`);
          const data = await respuesta.json();
          setDetallesAuto(data.data);  // Se guarda la información detallada del auto
        } catch (error) {
          console.error("Error al cargar los detalles del auto:", error);
        }
      };

      fetchDetallesAuto();
    }
  }, [slugAutoSeleccionado]);

  // Filtrar autos en base a los filtros seleccionados
  useEffect(() => {
    const autosFiltrados = autos.filter((auto) => {
      const coincideBusqueda = `${auto.marca} ${auto.modelo}`
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      const coincideMarca =
        filtroMarcas.length > 0 ? filtroMarcas.includes(auto.marca) : true;
      const coincideModelo =
        filtroModelos.length > 0
          ? filtroModelos.some((modelo) => auto.modelo.includes(modelo))
          : true;
      const coincideColor =
        filtroColores.length > 0 ? filtroColores.includes(auto.color) : true;
      const coincideCombustible =
        filtroCombustibles.length > 0
          ? filtroCombustibles.includes(auto.combustible)
          : true;
      const coincideTransmision =
        filtroTransmisiones.length > 0
          ? filtroTransmisiones.includes(auto.transmision)
          : true;
      const coincideUct =
        filtroUct.length > 0 ? filtroUct.includes(auto.uct.toString()) : true;
      const coincideEstado =
        filtroEstados.length > 0 ? filtroEstados.includes(auto.estado) : true;

      // Filtro por año
      const coincideAnioDesde = filtroAnioDesde
        ? auto.anio >= filtroAnioDesde
        : true;
      const coincideAnioHasta = filtroAnioHasta
        ? auto.anio <= filtroAnioHasta
        : true;

      // Filtro por precio
      const coincidePrecio =
        auto.precio >= rangoPrecios[0] && auto.precio <= rangoPrecios[1];

      // Filtro por kilómetros
      const coincideKilometraje =
        auto.km >= rangoKilometros[0] && auto.km <= rangoKilometros[1];

      return (
        coincideBusqueda &&
        coincideMarca &&
        coincideModelo &&
        coincideColor &&
        coincideCombustible &&
        coincideTransmision &&
        coincideUct &&
        coincideEstado &&
        coincideAnioDesde &&
        coincideAnioHasta &&
        coincidePrecio &&
        coincideKilometraje
      );
    });

    setAutosFiltrados(autosFiltrados);
    setPaginaActual(1); // Reiniciar a la primera página al aplicar los filtros
  }, [
    busqueda,
    filtroMarcas,
    filtroModelos,
    filtroColores,
    filtroCombustibles,
    filtroTransmisiones,
    filtroUct,
    filtroEstados,
    filtroAnioDesde,
    filtroAnioHasta,
    rangoPrecios,
    rangoKilometros,
    autos,
  ]);

  // Paginar autos
  const indiceInicial = (paginaActual - 1) * autosPorPagina;
  const indiceFinal = indiceInicial + autosPorPagina;
  const autosPaginados = autosFiltrados.slice(indiceInicial, indiceFinal);

  const totalPaginas = Math.ceil(autosFiltrados.length / autosPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const seleccionarAuto = (auto) => {
    setAutoSeleccionado(auto);
    setSlugAutoSeleccionado(auto.slug); // Guarda el slug para hacer la búsqueda de detalles
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const volverALista = () => {
    setAutoSeleccionado(null);
    setDetallesAuto(null);  // Limpia los detalles cuando se vuelve a la lista
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
    setFiltroMarcas([]);
    setFiltroModelos([]);
    setFiltroColores([]);
    setFiltroCombustibles([]);
    setFiltroTransmisiones([]);
    setFiltroUct([]);
    setFiltroEstados([]);
    setFiltroAnioDesde("");
    setFiltroAnioHasta("");
    setRangoPrecios([minPrecio, maxPrecio]);
    setRangoKilometros([minKilometros, maxKilometros]);
  };

  // Función para capitalizar la primera letra de un texto
  const capitalizar = (texto) =>
    texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();

  return (
    <section className="container mx-auto section my-8">
      <h1 className="vehicles__title heading-1 max-w-max mx-auto border-b-2 border-red-600">
        Usados
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 mx-5 xl:mx-5">
          {/* Columna para filtros y búsqueda */}

          <div className="mb-4 xl:mx-5 relative">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPaginaActual(1);
                autoSeleccionado && setAutoSeleccionado(null);
              }}
              placeholder="Buscar por marca o modelo..."
              className="caret-red-600 block py-2.5 px-3 pl-12 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 focus:transition ease-in-out peer"
            />
            <i className="ri-search-line absolute top-1/2 left-3 -translate-y-1/2 text-gray-600 dark:text-gray-300 transition-all ease-in-out peer-focus:text-red-600 peer-focus:transition"></i>
          </div>

          {/* Sección de Filtros Activos */}
          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
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
                    className="ml-2 text-red-600"
                  >
                    <i class="ri-close-circle-line"></i>
                  </button>
                </div>
              )}
              {filtroMarcas.map((marca) => (
                <div
                  key={marca}
                  className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full"
                >
                  <span className="text-lg">Marca: {capitalizar(marca)}</span>
                  <button
                    onClick={() =>
                      eliminarFiltro(filtroMarcas, setFiltroMarcas, marca)
                    }
                    className="ml-2 text-red-600"
                  >
                    <i class="ri-close-circle-line"></i>
                  </button>
                </div>
              ))}
              {filtroModelos.map((modelo) => (
                <div
                  key={modelo}
                  className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full"
                >
                  <span className="text-lg">Modelo: {capitalizar(modelo)}</span>
                  <button
                    onClick={() =>
                      eliminarFiltro(filtroModelos, setFiltroModelos, modelo)
                    }
                    className="ml-2 text-red-600"
                  >
                    <i class="ri-close-circle-line"></i>
                  </button>
                </div>
              ))}
              {filtroColores.map((color) => (
                <div
                  key={color}
                  className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full"
                >
                  <span className="text-lg">Color: {capitalizar(color)}</span>
                  <button
                    onClick={() =>
                      eliminarFiltro(filtroColores, setFiltroColores, color)
                    }
                    className="ml-2 text-red-600"
                  >
                    <i class="ri-close-circle-line"></i>
                  </button>
                </div>
              ))}
              {filtroCombustibles.map((combustible) => (
                <div
                  key={combustible}
                  className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full"
                >
                  <span className="text-lg">
                    Combustible: {capitalizar(combustible)}
                  </span>
                  <button
                    onClick={() =>
                      eliminarFiltro(
                        filtroCombustibles,
                        setFiltroCombustibles,
                        combustible
                      )
                    }
                    className="ml-2 text-red-600"
                  >
                    <i class="ri-close-circle-line"></i>
                  </button>
                </div>
              ))}
              {filtroTransmisiones.map((transmision) => (
                <div
                  key={transmision}
                  className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full"
                >
                  <span className="text-lg">
                    Transmisión: {capitalizar(transmision)}
                  </span>
                  <button
                    onClick={() =>
                      eliminarFiltro(
                        filtroTransmisiones,
                        setFiltroTransmisiones,
                        transmision
                      )
                    }
                    className="ml-2 text-red-600"
                  >
                    <i class="ri-close-circle-line"></i>
                  </button>
                </div>
              ))}
              {filtroEstados.map((estado) => (
                <div
                  key={estado}
                  className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full"
                >
                  <span className="text-lg">Estado: {capitalizar(estado)}</span>
                  <button
                    onClick={() =>
                      eliminarFiltro(filtroEstados, setFiltroEstados, estado)
                    }
                    className="ml-2 text-red-600"
                  >
                    <i class="ri-close-circle-line"></i>
                  </button>
                </div>
              ))}
              {filtroAnioDesde && (
                <div className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full">
                  <span className="text-lg">Año desde: {filtroAnioDesde}</span>
                  <button
                    onClick={() => setFiltroAnioDesde("")}
                    className="ml-2 text-red-600"
                  >
                    <i class="ri-close-circle-line"></i>
                  </button>
                </div>
              )}
              {filtroAnioHasta && (
                <div className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full">
                  <span className="text-lg">Año hasta: {filtroAnioHasta}</span>
                  <button
                    onClick={() => setFiltroAnioHasta("")}
                    className="ml-2 text-red-600"
                  >
                    <i class="ri-close-circle-line"></i>
                  </button>
                </div>
              )}
              {(rangoPrecios[0] !== minPrecio ||
                rangoPrecios[1] !== maxPrecio) && (
                <div className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full">
                  <span className="text-lg">
                    Precio: ${Number(rangoPrecios[0]).toLocaleString()} - $
                    {Number(rangoPrecios[1]).toLocaleString()}
                  </span>
                  <button
                    onClick={() => setRangoPrecios([minPrecio, maxPrecio])}
                    className="ml-2 text-red-600"
                  >
                    <i class="ri-close-circle-line"></i>
                  </button>
                </div>
              )}
              {(rangoKilometros[0] !== minKilometros ||
                rangoKilometros[1] !== maxKilometros) && (
                <div className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full">
                  <span className="text-lg">
                    Kilómetros: {Number(rangoKilometros[0]).toLocaleString()} -{" "}
                    {Number(rangoKilometros[1]).toLocaleString()}
                  </span>
                  <button
                    onClick={() =>
                      setRangoKilometros([minKilometros, maxKilometros])
                    }
                    className="ml-2 text-red-600"
                  >
                    <i class="ri-close-circle-line"></i>
                  </button>
                </div>
              )}
              {filtroUct.map((uct) => (
                <div
                  key={uct}
                  className="max-w-max flex justify-center items-center px-2 bg-gray-200 rounded-full"
                >
                  <span className="text-lg">
                    {uct === "1" ? "Certificado Toyota" : "No Certificado"}
                  </span>
                  <button
                    onClick={() => eliminarFiltro(filtroUct, setFiltroUct, uct)}
                    className="ml-2 text-red-600"
                  >
                    <i class="ri-close-circle-line"></i>
                  </button>
                </div>
              ))}
              {/* Botón para limpiar todos los filtros */}
              {busqueda ||
              filtroMarcas.length > 0 ||
              filtroModelos.length > 0 ||
              filtroColores.length > 0 ||
              filtroCombustibles.length > 0 ||
              filtroTransmisiones.length > 0 ||
              filtroUct.length > 0 ||
              filtroEstados.length > 0 ||
              filtroAnioDesde ||
              filtroAnioHasta ||
              rangoPrecios[0] !== minPrecio ||
              rangoPrecios[1] !== maxPrecio ||
              rangoKilometros[0] !== minKilometros ||
              rangoKilometros[1] !== maxKilometros ? (
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

          {/* Filtros con checkboxes */}
          <div className="space-y-4">
            {/* Filtro por Marca */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
                Marca
              </h3>
              {Array.from(new Set(autos.map((auto) => auto.marca))).map(
                (marca, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={`marca-${marca}`}
                      onChange={() =>
                        {handleCheckbox(filtroMarcas, setFiltroMarcas, marca); 
                          setPaginaActual(1); 
                          volverALista();}
                      }
                      checked={filtroMarcas.includes(marca)}
                      className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                    />
                    <label htmlFor={`marca-${marca}`} className="ml-2 text-xl">
                      {capitalizar(marca)}
                    </label>
                  </div>
                )
              )}
            </div>
            {/* Filtro por Modelo */}
            {/*<div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">Modelo</h3>
              {Array.from(new Set(autos.map((auto) => auto.modelo))).map((modelo, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={`modelo-${modelo}`}
                    onChange={() => handleCheckbox(filtroModelos, setFiltroModelos, modelo)}
                    checked={filtroModelos.includes(modelo)}
                  />
                  <label htmlFor={`modelo-${modelo}`} className="ml-2">{capitalizar(modelo)}</label>
                </div>
              ))}
            </div*/}
            {/* Filtro por Color */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
                Color
              </h3>
              {Array.from(new Set(autos.map((auto) => auto.color))).map(
                (color, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={`color-${color}`}
                      onChange={() =>
                        {handleCheckbox(filtroColores, setFiltroColores, color); 
                          setPaginaActual(1); 
                          volverALista();
                        }
                      }
                      checked={filtroColores.includes(color)}
                      className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                    />
                    <label htmlFor={`color-${color}`} className="ml-2 text-xl">
                      {color}
                    </label>
                  </div>
                )
              )}
            </div>
            {/* Filtro por Combustible */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
                Combustible
              </h3>
              {Array.from(new Set(autos.map((auto) => auto.combustible))).map(
                (combustible, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={`combustible-${combustible}`}
                      onChange={() =>
                        {handleCheckbox(
                          filtroCombustibles,
                          setFiltroCombustibles,
                          combustible
                        ); 
                        setPaginaActual(1);
                        volverALista();
                        }
                      }
                      checked={filtroCombustibles.includes(combustible)}
                      className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                    />
                    <label
                      htmlFor={`combustible-${combustible}`}
                      className="ml-2 text-xl"
                    >
                      {capitalizar(combustible)}
                    </label>
                  </div>
                )
              )}
            </div>
            {/* Filtro por Transmisión */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
                Transmisión
              </h3>
              {Array.from(new Set(autos.map((auto) => auto.transmision))).map(
                (transmision, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={`transmision-${transmision}`}
                      onChange={() =>
                        {handleCheckbox(
                          filtroTransmisiones,
                          setFiltroTransmisiones,
                          transmision
                        );
                        setPaginaActual(1);
                        volverALista();
                      }
                      }
                      checked={filtroTransmisiones.includes(transmision)}
                      className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                    />
                    <label
                      htmlFor={`transmision-${transmision}`}
                      className="ml-2 text-xl"
                    >
                      {capitalizar(transmision)}
                    </label>
                  </div>
                )
              )}
            </div>
            {/* Filtro por Usado Certificado Toyota (UCT) */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
                Usado Certificado Toyota
              </h3>
              <div>
                <input
                  type="checkbox"
                  id="uct-1"
                  onChange={() => {
                    handleCheckbox(filtroUct, setFiltroUct, "1");
                    setPaginaActual(1);
                    volverALista();
                  }}
                  checked={filtroUct.includes("1")}
                  className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                />
                <label htmlFor="uct-1" className="ml-2 text-xl">
                  Certificado Toyota
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="uct-0"
                  onChange={() => {handleCheckbox(filtroUct, setFiltroUct, "0");
                    setPaginaActual(1);
                    volverALista();
                  }}
                  checked={filtroUct.includes("0")}
                  className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                />
                <label htmlFor="uct-0" className="ml-2 text-xl">
                  No Certificado
                </label>
              </div>
            </div>
            {/* Filtro por Estado */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
                Estado
              </h3>
              {Array.from(new Set(autos.map((auto) => auto.estado))).map(
                (estado, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={`estado-${estado}`}
                      onChange={() => {
                        handleCheckbox(filtroEstados, setFiltroEstados, estado);
                        setPaginaActual(1);
                        volverALista();
                      }}
                      checked={filtroEstados.includes(estado)}
                      className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                    />
                    <label
                      htmlFor={`estado-${estado}`}
                      className="ml-2 text-xl"
                    >
                      {capitalizar(estado)}
                    </label>
                  </div>
                )
              )}
            </div>
            {/* Filtro por Año */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
                Año
              </h3>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={filtroAnioDesde}
                  onChange={(e) => {
                    setFiltroAnioDesde(e.target.value);
                    setPaginaActual(1);
                    autoSeleccionado && setAutoSeleccionado(null);
                  }}
                  placeholder="Desde"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                />
                <input
                  type="number"
                  value={filtroAnioHasta}
                  onChange={(e) => {
                    setFiltroAnioHasta(e.target.value);
                    setPaginaActual(1);
                    autoSeleccionado && setAutoSeleccionado(null);
                  }}
                  placeholder="Hasta"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                />
              </div>
            </div>
            {/* Filtro por Precio con Rango */}{" "}
            {/* Filtro por Kilómetros con Rango */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
                  Precio
                </h3>
                <Range
                  step={1000000}
                  min={minPrecio}
                  max={maxPrecio}
                  values={rangoPrecios}
                  onChange={(values) => {
                    setRangoPrecios(values);
                    setPaginaActual(1);
                    autoSeleccionado && setAutoSeleccionado(null);
                  }}
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
                  <span className="text-xl">${Number(rangoPrecios[0]).toLocaleString()}</span>
                  <span className="text-xl">${Number(rangoPrecios[1]).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 max-w-max border-b-red-600 border-b-2">
                  Kilometraje
                </h3>
                <Range
                  step={1000}
                  min={minKilometros}
                  max={maxKilometros}
                  values={rangoKilometros}
                  onChange={(values) => {
                    setRangoKilometros(values);
                    setPaginaActual(1);
                    autoSeleccionado && setAutoSeleccionado(null);
                  }}
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
                  <span className="text-xl">{Number(rangoKilometros[0]).toLocaleString()} km</span>
                  <span className="text-xl">{Number(rangoKilometros[1]).toLocaleString()} km</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna para la lista de autos */}
        <div className="lg:col-span-3 mx-5 xl:mx-5">
          {cargando ? (
            <div role="status" className="flex justify-center items-center">
              <svg
                aria-hidden="true"
                className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
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
              <span className="sr-only">Cargando noticias...</span>
            </div>
          ) : autoSeleccionado ? (
            
            // Si hay un auto seleccionado, mostrar el componente AutoDetalles con el slug
            <div className="space-y-6 flex flex-col gap-8">
              <AutoDetalles slug={slugAutoSeleccionado} /> {/* Componente de detalles del auto */}
              <button onClick={volverALista} className="text-white bg-red-600 py-2 px-4 rounded-lg">
                Volver a la lista
              </button>
            </div>
            
            
          ) : autosPaginados.length === 0 ? (
            <TransitionGroup>
              <CSSTransition key="no-news" timeout={300} classNames="fade">
                <div className="text-center text-gray-500 w-full max-w-full h-screen">
                  <h2 className="text-xl font-semibold mb-4">
                    No se encontraron autos con los filtros aplicados
                  </h2>
                  <p>
                    Intenta realizar una nueva búsqueda o aplicar otros filtros.
                  </p>
                </div>
              </CSSTransition>
            </TransitionGroup>
          ) : (
            <TransitionGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {autosPaginados.map((auto) => (
                <CSSTransition key={auto.id} timeout={300} classNames="fade">
                  <div
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
                    onClick={() => seleccionarAuto(auto)}
                  >
                    <img
                      src={`https://panelweb.derkayvargas.com/${auto.foto.replace("public", "storage")}`}
                      alt={`${auto.marca} ${auto.modelo}`}
                      className="w-full h-72 object-cover"
                    />
                    <div className="p-4 flex flex-col justify-center gap-2">
                      <h2 className="text-lg font-semibold">
                        {auto.marca} {auto.modelo}
                      </h2>
                      <div className="flex justify-start items-center text-lg mt-2">
                        <p className="mr-2">{auto.anio}</p>
                        <p className="mr-2">|</p>
                        <p className="mr-2">{Number(auto.km).toLocaleString()} km</p>
                        <p className="mr-2">|</p>
                        {auto.estado === "DISPONIBLE" ? (
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full uppercase">Disponible</span>
                        ) : (
                          <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full uppercase">Reservado</span>
                        )}
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <button
                          onClick={() => seleccionarAuto(auto)}
                          className="text-white text-base py-1 px-2 ring-red-600 ring-1 rounded-full border bg-red-600 border-red-600 hover:bg-transparent hover:text-red-600 transition-all ease-in-out"
                        >
                          Ver más
                        </button>
                        <p className="font-semibold text-black">
                          ARS$ {Number(auto.precio).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}

          {/* Paginación */}
          {autosFiltrados.length > autosPorPagina && (
            <div className={`${autoSeleccionado
              ? "hidden"
              : "flex"
             } mt-8 justify-center space-x-2`}>
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
