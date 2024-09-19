import { useEffect, useState } from "react";

export default function UsadosList() {
  const [autos, setAutos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroMarca, setFiltroMarca] = useState("");
  const [filtroModelo, setFiltroModelo] = useState("");
  const [filtroColor, setFiltroColor] = useState("");
  const [filtroCombustible, setFiltroCombustible] = useState("");
  const [filtroTransmision, setFiltroTransmision] = useState("");
  const [filtroUct, setFiltroUct] = useState(""); // UCT: Usado Certificado Toyota (0 o 1)
  const [filtroEstado, setFiltroEstado] = useState("");
  const [autosFiltrados, setAutosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [autoSeleccionado, setAutoSeleccionado] = useState(null);

  const autosPorPagina = 6;

  // Cargamos los autos desde la API al montar el componente
  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const respuesta = await fetch("https://panelweb.derkayvargas.com/api/usados/");
        const data = await respuesta.json();
        setAutos(data.data);
        setAutosFiltrados(data.data); // Inicialmente mostramos todos los autos
        setCargando(false);
      } catch (error) {
        console.error("Error al cargar los autos:", error);
      }
    };

    fetchAutos();
  }, []);

  // Filtrar autos en base a los filtros seleccionados
  useEffect(() => {
    const autosFiltrados = autos.filter((auto) => {
      const coincideMarca = filtroMarca ? auto.marca.toLowerCase() === filtroMarca.toLowerCase() : true;
      const coincideModelo = filtroModelo ? auto.modelo.toLowerCase().includes(filtroModelo.toLowerCase()) : true;
      const coincideColor = filtroColor ? auto.color.toLowerCase() === filtroColor.toLowerCase() : true;
      const coincideCombustible = filtroCombustible ? auto.combustible.toLowerCase() === filtroCombustible.toLowerCase() : true;
      const coincideTransmision = filtroTransmision ? auto.transmision.toLowerCase() === filtroTransmision.toLowerCase() : true;
      const coincideUct = filtroUct !== "" ? auto.uct === parseInt(filtroUct) : true;
      const coincideEstado = filtroEstado ? auto.estado.toLowerCase() === filtroEstado.toLowerCase() : true;
      const coincideBusqueda = `${auto.marca} ${auto.modelo}`
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      return coincideMarca && coincideModelo && coincideColor && coincideCombustible && coincideTransmision && coincideUct && coincideEstado && coincideBusqueda;
    });

    setAutosFiltrados(autosFiltrados);
    setPaginaActual(1); // Volver a la primera página cuando se aplican filtros
  }, [filtroMarca, filtroModelo, filtroColor, filtroCombustible, filtroTransmision, filtroUct, filtroEstado, busqueda, autos]);

  // Paginación: Calculamos los autos que se mostrarán en la página actual
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

  const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();

  return (
    <section className="container mx-auto my-8">
      <h1 className="text-3xl font-bold text-center mb-8">Autos Usados Disponibles</h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Filtro por Marca */}
        <select value={filtroMarca} onChange={(e) => setFiltroMarca(e.target.value)} className="border py-2 px-4">
          <option value="">Todas las Marcas</option>
          {Array.from(new Set(autos.map((auto) => auto.marca))).map((marca, index) => (
            <option key={index} value={marca}>{capitalizar(marca)}</option>
          ))}
        </select>

        {/* Filtro por Modelo */}
        <input
          type="text"
          placeholder="Modelo"
          value={filtroModelo}
          onChange={(e) => setFiltroModelo(e.target.value)}
          className="border py-2 px-4"
        />

        {/* Filtro por Color */}
        <select value={filtroColor} onChange={(e) => setFiltroColor(e.target.value)} className="border py-2 px-4">
          <option value="">Todos los Colores</option>
          {Array.from(new Set(autos.map((auto) => auto.color))).map((color, index) => (
            <option key={index} value={color}>{color}</option>
          ))}
        </select>

        {/* Filtro por Combustible */}
        <select value={filtroCombustible} onChange={(e) => setFiltroCombustible(e.target.value)} className="border py-2 px-4">
          <option value="">Todos los Combustibles</option>
          {Array.from(new Set(autos.map((auto) => auto.combustible))).map((combustible, index) => (
            <option key={index} value={combustible}>{capitalizar(combustible)}</option>
          ))}
        </select>

        {/* Filtro por Transmisión */}
        <select value={filtroTransmision} onChange={(e) => setFiltroTransmision(e.target.value)} className="border py-2 px-4">
          <option value="">Todas las Transmisiones</option>
          {Array.from(new Set(autos.map((auto) => auto.transmision))).map((transmision, index) => (
            <option key={index} value={transmision}>{transmision.charAt(0) + transmision.slice(1).toLowerCase()}</option>
          ))}
        </select>

        {/* Filtro por Usado Certificado Toyota (UCT) */}
        <select value={filtroUct} onChange={(e) => setFiltroUct(e.target.value)} className="border py-2 px-4">
          <option value="">Todos</option>
          <option value="1">Certificado Toyota</option>
          <option value="0">No Certificado</option>
        </select>

        {/* Filtro por Estado */}
        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="border py-2 px-4">
          <option value="">Todos los Estados</option>
          {Array.from(new Set(autos.map((auto) => auto.estado))).map((estado, index) => (
            <option key={index} value={estado}>{capitalizar(estado)}</option>
          ))}
        </select>
      </div>

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
        // Mostrar el auto seleccionado en detalle
        <div className="space-y-6">
          <img
            src={`https://panelweb.derkayvargas.com/${autoSeleccionado.foto.replace("public/", "storage/")}`}
            alt={`${autoSeleccionado.marca} ${autoSeleccionado.modelo}`}
            className="w-full h-96 object-cover rounded-lg"
          />
          <h2 className="text-2xl font-bold">{autoSeleccionado.marca} {autoSeleccionado.modelo}</h2>
          <p>Año: {autoSeleccionado.anio}</p>
          <p>Kilometraje: {Number(autoSeleccionado.km).toLocaleString()} km</p>
          <p>Color: {autoSeleccionado.color}</p>
          <p>Precio: ARS$ {Number(autoSeleccionado.precio).toLocaleString()}</p>
          <p>Estado: {capitalizar(autoSeleccionado.estado)}</p>
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
                <p>Kilometraje: {Number(auto.km).toLocaleString()} km</p>
                <p className="font-semibold text-red-600">ARS$ {Number(auto.precio).toLocaleString()}</p>
                <p>Estado: {capitalizar(auto.estado)}</p>
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
