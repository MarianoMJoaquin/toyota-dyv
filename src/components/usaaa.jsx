import { useEffect, useState } from "react"; 
import { CSSTransition, TransitionGroup } from "react-transition-group"; 
import { Range } from "react-range"; 

export default function UsadosList() { 
    const [autos, setAutos] = useState([]); 
    const [cargando, setCargando] = useState(true); 
    const [busqueda, setBusqueda] = useState(""); 
    const [modoVista, setModoVista] = useState("grilla"); 
    const [orden, setOrden] = useState(""); 
    const [filtroMarcas, setFiltroMarcas] = useState([]); 
    const [filtroModelos, setFiltroModelos] = useState([]); 
    const [filtroColores, setFiltroColores] = useState([]); 
    const [filtroCombustibles, setFiltroCombustibles] = useState([]); 
    const [filtroTransmisiones, setFiltroTransmisiones] = useState([]); 
    const [filtroUct, setFiltroUct] = useState([]); 
    const [filtroEstados, setFiltroEstados] = useState([]); 
    const [filtroAnioDesde, setFiltroAnioDesde] = useState(""); 
    const [filtroAnioHasta, setFiltroAnioHasta] = useState(""); 
    const [rangoPrecios, setRangoPrecios] = useState([0, 60000000]); 
    const [rangoKilometros, setRangoKilometros] = useState([0, 300000]); 
    const minPrecio = 0; 
    const maxPrecio = 100000000; 
    const minKilometros = 0; 
    const maxKilometros = 500000; 
    const [autosFiltrados, setAutosFiltrados] = useState([]); 
    const [paginaActual, setPaginaActual] = useState(1); 
    const [autoSeleccionado, setAutoSeleccionado] = useState(null); 
    const autosPorPagina = 12; 

    // Fetch autos
    useEffect(() => { 
        const fetchAutos = async () => { 
            try { 
                const respuesta = await fetch("https://panelweb.derkayvargas.com/api/usados"); 
                const data = await respuesta.json(); 
                setAutos(data.data); 
                setAutosFiltrados(data.data); // Iniciar con todos los autos visibles
                setCargando(false); 
            } catch (error) { 
                console.error("Error al cargar los autos:", error); 
            } 
        }; 
        fetchAutos(); 
    }, []); 

    // Lógica de orden y filtrado
    useEffect(() => {
        let autosOrdenados = [...autos];

        // Filtros de autos
        if (busqueda) {
            autosOrdenados = autosOrdenados.filter((auto) => 
                `${auto.marca} ${auto.modelo}`.toLowerCase().includes(busqueda.toLowerCase())
            );
        }

        // Lógica para otros filtros aquí...

        // Ordenar autos
        switch (orden) {
            case "mas-recientes":
                autosOrdenados.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            case "mayor-precio":
                autosOrdenados.sort((a, b) => b.precio - a.precio);
                break;
            case "menor-precio":
                autosOrdenados.sort((a, b) => a.precio - b.precio);
                break;
            case "mas-vistos":
                // Cambiar por el campo adecuado si tienes más vistos
                autosOrdenados.sort((a, b) => b.orden - a.orden);
                break;
            default:
                break;
        }

        setAutosFiltrados(autosOrdenados);
    }, [busqueda, orden, autos]);

    const cambiarPagina = (nuevaPagina) => { 
        setPaginaActual(nuevaPagina); 
        window.scrollTo({ top: 0, behavior: "smooth" }); 
    };

    return ( 
        <section className="container mx-auto section my-8"> 
            <h1 className="vehicles__title heading-1 max-w-max mx-auto border-b-2 border-red-600"> Usados </h1> 

            <div className="flex justify-between mb-4">
                {/* Botones de vista */}
                <div>
                    <button onClick={() => setModoVista("lista")} className={`mr-2 ${modoVista === "lista" ? "text-red-600" : "text-gray-700"}`}>
                        <i className="ri-list-unordered"></i> 
                    </button>
                    <button onClick={() => setModoVista("grilla")} className={`${modoVista === "grilla" ? "text-red-600" : "text-gray-700"}`}>
                        <i className="ri-grid-fill"></i>
                    </button>
                </div>

                {/* Filtro de orden */}
                <div className="flex items-center">
                    <label htmlFor="orden" className="mr-2 text-lg">Ordenar por:</label>
                    <select 
                        id="orden" 
                        value={orden} 
                        onChange={(e) => setOrden(e.target.value)} 
                        className="p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="mas-recientes">Más recientes</option>
                        <option value="mayor-precio">Mayor precio</option>
                        <option value="menor-precio">Menor precio</option>
                        <option value="mas-vistos">Más vistos</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6"> 
                {/* Columna de filtros */}
                <div className="lg:col-span-1"> 
                    {/* Aquí irían los filtros */}
                </div> 

                {/* Columna de autos */}
                <div className="lg:col-span-3">
                    {cargando ? (
                        <div role="status" className="flex justify-center items-center"> 
                            {/* Spinner */}
                        </div> 
                    ) : autosFiltrados.length === 0 ? ( 
                        <TransitionGroup> 
                            <CSSTransition key="no-autos" timeout={300} classNames="fade"> 
                                <div className="text-center text-gray-500 w-full max-w-full h-screen"> 
                                    <h2 className="text-xl font-semibold mb-4"> No se encontraron autos </h2> 
                                    <p> Intenta realizar una nueva búsqueda o aplicar otros filtros. </p> 
                                </div> 
                            </CSSTransition> 
                        </TransitionGroup> 
                    ) : ( 
                        <TransitionGroup className={modoVista === "grilla" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}> 
                            {autosFiltrados.map((auto) => (
                                <CSSTransition key={auto.id} timeout={300} classNames="fade"> 
                                    <div className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105 ${modoVista === "lista" ? "flex" : ""}`}> 
                                        <img src={`https://panelweb.derkayvargas.com${auto.foto}`} alt={`${auto.marca} ${auto.modelo}`} className="w-full h-72 object-cover" /> 
                                        <div className="p-4 flex flex-col justify-center gap-2"> 
                                            <h2 className="text-lg font-semibold"> {auto.marca} {auto.modelo} </h2> 
                                            <div className="flex justify-start items-center text-lg mt-2"> 
                                                <p className="mr-2">{auto.anio}</p> 
                                                <p className="mr-2">|</p> 
                                                <p className="mr-2">{Number(auto.km).toLocaleString()} km</p> 
                                            </div> 
                                            <p className="font-semibold text-black"> ARS$ {Number(auto.precio).toLocaleString()} </p>
                                        </div> 
                                    </div> 
                                </CSSTransition> 
                            ))} 
                        </TransitionGroup>
                    )}
                </div>
            </div>
        </section> 
    ); 
}
