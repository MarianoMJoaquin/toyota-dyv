import { useEffect, useState } from "react";

export default function UsadosList() {
  const [autos, setAutos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroMarcas, setFiltroMarcas] = useState([]); // Para múltiples marcas
  const [filtroModelos, setFiltroModelos] = useState([]);
  const [filtroColores, setFiltroColores] = useState([]);
  const [filtroCombustibles, setFiltroCombustibles] = useState([]);
  const [filtroTransmisiones, setFiltroTransmisiones] = useState([]);
  const [filtroUct, setFiltroUct] = useState([]); // Para UCT 0 o 1
  const [filtroEstados, setFiltroEstados] = useState([]);
  const [autosFiltrados, setAutosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [autoSeleccionado, setAutoSeleccionado] = useState(null);

  const autosPorPagina = 6;

  // Cargar autos desde la API al montar el componente
  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const respuesta = await fetch("https://panelweb.derkayvargas.com/api/usados/");
        const data = await respuesta.json();
        setAutos(data.data);
        setAutosFiltrados(data.data); // Mostrar todos los autos al principio
        setCargando(false);
      } catch (error) {
        console.error("Error al cargar los autos:", error);
      }
    };

    fetchAutos();
  }, []);

  // Manejar los filtros y la búsqueda
  useEffect(() => {
    const autosFiltrados = autos.filter((auto) => {
      const coincideBusqueda = `${auto.marca} ${auto.modelo}`
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      const coincideMarca = filtroMarcas.length > 0 ? filtroMarcas.includes(auto.marca) : true;
      const coincideModelo = filtroModelos.length > 0 ? filtroModelos.some((modelo) => auto.modelo.includes(modelo)) : true;
      const coincideColor = filtroColores.length > 0 ? filtroColores.includes(auto.color) : true;
      const coincideCombustible = filtroCombustibles.length > 0 ? filtroCombustibles.includes(auto.combustible) : true;
      const coincideTransmision = filtroTransmisiones.length > 0 ? filtroTransmisiones.includes(auto.transmision) : true;
      const coincideUct = filtroUct.length > 0 ? filtroUct.includes(auto.uct.toString()) : true; // Convertimos a string para facilitar
      const coincideEstado = filtroEstados.length > 0 ? filtroEstados.includes(auto.estado) : true;

      return (
        coincideBusqueda &&
        coincideMarca &&
        coincideModelo &&
        coincideColor &&
        coincideCombustible &&
        coincideTransmision &&
        coincideUct &&
        coincideEstado
      );
    });

    setAutosFiltrados(autosFiltrados);
    setPaginaActual(1); // Reiniciar a la primera página al aplicar los filtros
  }, [busqueda, filtroMarcas, filtroModelos, filtroColores, filtroCombustibles, filtroTransmisiones, filtroUct, filtroEstados, autos]);

  // Paginación
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const volverALista = () => {
    setAutoSeleccionado(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Manejar checkboxes para filtros
  const handleCheckbox = (filtro, setFiltro, valor) => {
    if (filtro.includes(valor)) {
      setFiltro(filtro.filter((item) => item !== valor));
    } else {
      setFiltro([...filtro, valor]);
    }
  };

  // Función para capitalizar la primera letra de un texto
  const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  
  return (
    <section className="container mx-auto my-8">
      <h1 className="text-3xl font-bold text-center mb-8">Autos Usados Disponibles</h1>

      {/* Cuadro de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por marca o modelo..."
          className="w-full py-2 px-4 border-2 border-gray-300 rounded-lg"
        />
      </div>

      {/* Filtros con checkboxes */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Filtro por Marca */}
        <div>
          <h3 className="font-bold">Marca</h3>
          {Array.from(new Set(autos.map((auto) => auto.marca))).map((marca, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`marca-${marca}`}
                onChange={() => handleCheckbox(filtroMarcas, setFiltroMarcas, marca)}
                checked={filtroMarcas.includes(marca)}
              />
              <label htmlFor={`marca-${marca}`} className="ml-2">{capitalizar(marca)}</label>
            </div>
          ))}
        </div>

        {/* Filtro por Modelo */}
        <div>
          <h3 className="font-bold">Modelo</h3>
          {Array.from(new Set(autos.map((auto) => auto.modelo))).map((modelo, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`modelo-${modelo}`}
                onChange={() => handleCheckbox(filtroModelos, setFiltroModelos, modelo)}
                checked={filtroModelos.includes(modelo)}
              />
              <label htmlFor={`modelo-${modelo}`} className="ml-2">{modelo}</label>
            </div>
          ))}
        </div>

        {/* Filtro por Color */}
        <div>
          <h3 className="font-bold">Color</h3>
          {Array.from(new Set(autos.map((auto) => auto.color))).map((color, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`color-${color}`}
                onChange={() => handleCheckbox(filtroColores, setFiltroColores, color)}
                checked={filtroColores.includes(color)}
              />
              <label htmlFor={`color-${color}`} className="ml-2">{color}</label>
            </div>
          ))}
        </div>

        {/* Filtro por Combustible */}
        <div>
          <h3 className="font-bold">Combustible</h3>
          {Array.from(new Set(autos.map((auto) => auto.combustible))).map((combustible, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`combustible-${combustible}`}
                onChange={() => handleCheckbox(filtroCombustibles, setFiltroCombustibles, combustible)}
                checked={filtroCombustibles.includes(combustible)}
              />
              <label htmlFor={`combustible-${combustible}`} className="ml-2">{capitalizar(combustible)}</label>
            </div>
          ))}
        </div>

        {/* Filtro por Transmisión */}
        <div>
          <h3 className="font-bold">Transmisión</h3>
          {Array.from(new Set(autos.map((auto) => auto.transmision))).map((transmision, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`transmision-${transmision}`}
                onChange={() => handleCheckbox(filtroTransmisiones, setFiltroTransmisiones, transmision)}
                checked={filtroTransmisiones.includes(transmision)}
              />
              <label htmlFor={`transmision-${transmision}`} className="ml-2">{capitalizar(transmision)}</label>
            </div>
          ))}
        </div>

        {/* Filtro por Usado Certificado Toyota (UCT) */}
        <div>
          <h3 className="font-bold">Usado Certificado Toyota</h3>
          <div>
            <input
              type="checkbox"
              id="uct-1"
              onChange={() => handleCheckbox(filtroUct, setFiltroUct, "1")}
              checked={filtroUct.includes("1")}
            />
            <label htmlFor="uct-1" className="ml-2">Certificado Toyota</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="uct-0"
              onChange={() => handleCheckbox(filtroUct, setFiltroUct, "0")}
              checked={filtroUct.includes("0")}
            />
            <label htmlFor="uct-0" className="ml-2">No Certificado</label>
          </div>
        </div>

        {/* Filtro por Estado */}
        <div>
          <h3 className="font-bold">Estado</h3>
          {Array.from(new Set(autos.map((auto) => auto.estado))).map((estado, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`estado-${estado}`}
                onChange={() => handleCheckbox(filtroEstados, setFiltroEstados, estado)}
                checked={filtroEstados.includes(estado)}
              />
              <label htmlFor={`estado-${estado}`} className="ml-2">{capitalizar(estado)}</label>
            </div>
          ))}
        </div>
      </div>

      {cargando ? (
        <div className="text-center">Cargando autos...</div>
      ) : autoSeleccionado ? (
        // Mostrar el auto seleccionado en detalle
        <div className="space-y-6">
          <img
            src={`https://panelweb.derkayvargas.com/${autoSeleccionado.foto.replace("public/", "storage/")}`}
            alt={`${autoSeleccionado.marca} ${autoSeleccionado.modelo}`}
            className="w-full h-96 object-cover rounded-lg"
          />
          <h2 className="text-2xl font-bold">{autoSeleccionado.marca} {autoSeleccionado.modelo}</h2>
          <p>Año: {autoSeleccionado.anio}</p>
          <p>Kilometraje: {autoSeleccionado.km} km</p>
          <p>Color: {autoSeleccionado.color}</p>
          <p>Precio: ${Number(autoSeleccionado.precio).toLocaleString()}</p>
          <p>Estado: {autoSeleccionado.estado}</p>
          <button
            onClick={volverALista}
            className="text-white bg-red-600 py-2 px-4 rounded-lg"
          >
            Volver a la lista
          </button>
        </div>
      ) : (
        // Mostrar la lista de autos paginada
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {autosPaginados.map((auto) => (
            <div
              key={auto.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => seleccionarAuto(auto)}
            >
              <img
                src={`https://panelweb.derkayvargas.com/${auto.foto.replace("public/", "storage/")}`}
                alt={`${auto.marca} ${auto.modelo}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{auto.marca} {auto.modelo}</h2>
                <p>Año: {auto.anio}</p>
                <p>Kilometraje: {auto.km} km</p>
                <p className="font-semibold text-red-600">${Number(auto.precio).toLocaleString()}</p>
                <p>Estado: {auto.estado}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      {autosFiltrados.length > autosPorPagina && (
        <div className="mt-8 flex justify-center space-x-2">
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button
              key={i}
              onClick={() => cambiarPagina(i + 1)}
              className={`${
                i + 1 === paginaActual
                  ? "bg-red-600 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-red-600 hover:text-white"
              } rounded-full w-10 h-10 flex items-center justify-center`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
