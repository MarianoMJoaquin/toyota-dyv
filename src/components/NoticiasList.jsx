import { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DOMPurify from 'dompurify'; // Import DOMPurify

// Genera una lista de meses con su nombre y valor numérico
const meses = [
  { id: 1, name: 'Enero' },
  { id: 2, name: 'Febrero' },
  { id: 3, name: 'Marzo' },
  { id: 4, name: 'Abril' },
  { id: 5, name: 'Mayo' },
  { id: 6, name: 'Junio' },
  { id: 7, name: 'Julio' },
  { id: 8, name: 'Agosto' },
  { id: 9, name: 'Septiembre' },
  { id: 10, name: 'Octubre' },
  { id: 11, name: 'Noviembre' },
  { id: 12, name: 'Diciembre' },
];

export default function NoticiaList({ noticias, categorias }) {
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategorias, setFiltroCategorias] = useState([]);
  const [filtroMeses, setFiltroMeses] = useState([]);  // Estado para el filtro de meses
  const [noticiasFiltradas, setNoticiasFiltradas] = useState(noticias);
  const [noticiasPaginadas, setNoticiasPaginadas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);

  const [modoVista, setModoVista] = useState('grilla');
  const noticiasPorPagina = 6;

  useEffect(() => {
    setTimeout(() => {
      filtrarNoticias();
      setCargando(false);
    }, 150);
  }, [busqueda, filtroCategorias, filtroMeses, paginaActual]);  // Añadimos filtroMeses a las dependencias

  const filtrarNoticias = () => {
    const palabrasClave = busqueda.toLowerCase().split(' ').filter(Boolean);

    const filtradas = noticias.filter(noticia => {
      const titulo = noticia.titulo.toLowerCase();
      const fechaNoticia = new Date(noticia.created_at);
      const mesNoticia = fechaNoticia.getMonth() + 1; // Mes de la noticia (1 = Enero)

      // Filtrar por búsqueda, categorías y meses
      const coincideBusqueda = palabrasClave.every(palabra => titulo.includes(palabra));
      const coincideCategorias = filtroCategorias.length
        ? noticia.categories.some(category => filtroCategorias.includes(category.name))
        : true;
      const coincideMeses = filtroMeses.length
        ? filtroMeses.includes(mesNoticia)
        : true;

      return coincideBusqueda && coincideCategorias && coincideMeses;
    });

    setNoticiasFiltradas(filtradas);

    const indiceInicial = (paginaActual - 1) * noticiasPorPagina;
    const indiceFinal = indiceInicial + noticiasPorPagina;
    setNoticiasPaginadas(filtradas.slice(indiceInicial, indiceFinal));
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);  
    if (articuloSeleccionado) {
      setArticuloSeleccionado(null);
    }
  };

  // Función para manejar el checklist de categorías
  const handleCategoriaCheck = (categoria) => {
    setPaginaActual(1);
    setFiltroCategorias(prev => {
      if (prev.includes(categoria)) {
        return prev.filter(cat => cat !== categoria);
      } else {
        return [...prev, categoria];
      }
    });
    if (articuloSeleccionado) {
      setArticuloSeleccionado(null);
    }
  };

  // Función para manejar el checklist de meses
  const handleMesCheck = (mes) => {
    setPaginaActual(1);
    setFiltroMeses(prev => {
      if (prev.includes(mes)) {
        return prev.filter(m => m !== mes);
      } else {
        return [...prev, mes];
      }
    });
    if (articuloSeleccionado) {
      setArticuloSeleccionado(null);
    }
  };

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const seleccionarArticulo = (articulo) => {
    setArticuloSeleccionado(articulo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navegarArticulo = (direccion) => {
    const indiceActual = noticias.findIndex(noticia => noticia.id === articuloSeleccionado.id);
    const nuevoIndice = indiceActual + direccion;
    if (nuevoIndice >= 0 && nuevoIndice < noticias.length) {
      setArticuloSeleccionado(noticias[nuevoIndice]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const volverALista = () => {
    setArticuloSeleccionado(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPaginas = Math.ceil(noticiasFiltradas.length / noticiasPorPagina);



  return (
    <section className="container mx-auto section">
      <h1 className="vehicles__title heading-1 max-w-max mx-auto border-b-2 border-red-600">Noticias</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4 mx-5 lg:mx-0">
          <div className="mb-4 xl:mx-5 relative">
            <input
              type="text"
              className="caret-red-600 block py-2.5 px-3 pl-12 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 focus:transition ease-in-out peer"
              placeholder="Buscar noticias..."
              value={busqueda}
              onChange={handleBusqueda}  
            />
            <i className="ri-search-line absolute top-1/2 left-3 -translate-y-1/2 text-gray-600 dark:text-gray-300 transition-all ease-in-out peer-focus:text-red-600 peer-focus:transition"></i>
          </div>

          {/* Filtro de Categorías */}
          <div className="mb-4 xl:mx-5 max-lg:hidden rounded-lg bg-gray-100 p-4">
            <h3 className="text-lg font-semibold mb-2 max-w-max border-b-red-600 border-b-2">Filtrar por Categorías</h3>
            <div className="space-y-2">
              {categorias.map(categoria => (
                <div key={categoria.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`categoria-${categoria.id}`}
                    value={categoria.name}
                    checked={filtroCategorias.includes(categoria.name)}
                    onChange={() => handleCategoriaCheck(categoria.name)}
                    className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                  />
                  <label htmlFor={`categoria-${categoria.id}`} className="ml-2 text-xl text-gray-900">
                    {categoria.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Filtro por Mes */}
          <div className="mb-4 xl:mx-5 max-lg:hidden rounded-lg bg-gray-100 p-4">
            <h3 className="text-lg font-semibold mb-2 max-w-max border-b-red-600 border-b-2">Filtrar por Mes</h3>
            <div className="space-y-2">
              {meses.map(mes => (
                <div key={mes.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`mes-${mes.id}`}
                    value={mes.name}
                    checked={filtroMeses.includes(mes.id)}
                    onChange={() => handleMesCheck(mes.id)}
                    className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                  />
                  <label htmlFor={`mes-${mes.id}`} className="ml-2 text-xl text-gray-900">
                    {mes.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Últimas Noticias */}
          <div className="bg-gray-100 p-4 xl:mx-5 rounded-lg max-lg:hidden">
            <h3 className="text-2xl font-semibold mb-3 max-w-max border-b-red-500 border-b-2">Últimas Noticias</h3>
            <ul className="space-y-2">
              {noticias.slice(0, 5).map(noticia => (
                <li key={noticia.id} className="border-b last:border-0 pb-2">
                  <a href="#" onClick={() => seleccionarArticulo(noticia)} className="text-gray-600 transition-all ease-in-out text-xl hover:text-red-600">
                    {noticia.titulo}
                  </a>
                  <p className="text-gray-600 text-sm">
                    {noticia.contenido.substring(0, 60)}...
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="flex justify-end mb-4">
            {/* Botón para volver a la lista de noticias */}
            {articuloSeleccionado ? (
              <button
                onClick={volverALista}
                className="text-red-600 text-base ml-5 mr-auto transition-all ease-in-out"
              >
                <i class="ri-arrow-left-s-line"></i>
                Volver a todas las noticias
              </button>
            ) : null}
            {/* Botones para cambiar de vista */}
            <button
              className="mr-2"            
              onClick={() => setModoVista('grilla')}
            >
              <i className={`ri-grid-fill ${modoVista === 'grilla' ? 'text-red-600' : 'text-gray-700'}`}></i>
            </button>

            <button
              
              onClick={() => setModoVista('lista')}
            >
              <i className={`ri-list-unordered ${modoVista === 'lista' ? 'text-red-600' : 'text-gray-700'}`}></i>
            </button>

            {/* Botón para abrir el Drawer */}
            <div class="text-center">
              <button class="ml-2 mr-5 text-white lg:hidden bg-red-600 ring-1 ring-red-600 hover:text-red-600 hover:bg-white rounded-full text-base px-2 py-1 text-center me-2 mb-2 transition-all ease-in-out" type="button" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" data-drawer-body-scrolling="true" aria-controls="drawer-right-example">
              <i className="ri-filter-3-line"></i>
              Filtros
              </button>
            </div>

           {/* Botón para limpiar filtros */}
            <button
              onClick={() => {
                setBusqueda(''); // Limpiamos la búsqueda
                setFiltroCategorias([]); // Limpiamos el filtro de categorías
                setFiltroMeses([]);  // Limpiamos el filtro de meses
                setPaginaActual(1); // Volvemos a la primera página
              }}
              className="ml-5 xl:mr-5 3xl:mr-5 max-lg:hidden text-white bg-red-600 ring-1 ring-red-600 hover:text-red-600 hover:bg-white rounded-full text-base px-2 py-1 text-center me-2 mb-2 transition-all ease-in-out"
            >
              Limpiar Filtros
            </button>

            {/* Drawer */}
            <div id="drawer-right-example" class="fixed top-14 right-0 z-40 h-screen px-4 py-12 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-right-label">
              {/* Botón para cerrar el Drawer */}
              <button type="button" data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span class="sr-only">Close menu</span>
              </button>
              {/* Contenido */}

                {/* Filtro de Categorías */}
                <div className="mb-4 rounded-lg bg-gray-100 p-4">
                  <h3 className="text-lg font-semibold mb-2 max-w-max border-b-red-600 border-b-2">Filtrar por Categorías</h3>
                  <div className="space-y-2">
                    {categorias.map(categoria => (
                      <div key={categoria.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`categoria-${categoria.id}`}
                          value={categoria.name}
                          checked={filtroCategorias.includes(categoria.name)}
                          onChange={() => handleCategoriaCheck(categoria.name)}
                          className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                        />
                        <label htmlFor={`categoria-${categoria.id}`} className="ml-2 text-xl text-gray-900">
                          {categoria.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Filtro por Mes */}
                <div className="rounded-lg bg-gray-100 p-4">
                  <h3 className="text-lg font-semibold mb-2 max-w-max border-b-red-600 border-b-2">Filtrar por Mes</h3>
                  <div className="space-y-2">
                    {meses.map(mes => (
                      <div key={mes.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`mes-${mes.id}`}
                          value={mes.name}
                          checked={filtroMeses.includes(mes.id)}
                          onChange={() => handleMesCheck(mes.id)}
                          className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                        />
                        <label htmlFor={`mes-${mes.id}`} className="ml-2 text-xl text-gray-900">
                          {mes.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>    

                {/* Botón para limpiar filtros */}
                <button
                    data-drawer-hide="drawer-right-example"
                    onClick={() => {
                      setBusqueda('');
                      setFiltroCategorias([]);
                      setFiltroMeses([]);  // Limpiamos el filtro de meses
                      setPaginaActual(1);
                    }}
                    className="ml-2 lg:hidden text-white bg-red-600 ring-1 ring-red-600 hover:text-red-600 hover:bg-white rounded-full text-sm px-2 py-1 text-center me-2 mb-2 transition-all ease-in-out"
                  >
                    Limpiar Filtros
                </button>






            </div>









              

          </div>

          {cargando ? (
            <div role="status" className='flex justify-center items-center'>
                <svg aria-hidden="true" class="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Cargando noticias...</span>
            </div>
          ) : (
            <>
              {articuloSeleccionado ? (
                <div className="space-y-6">
                {/* Artículo completo */}
                  <TransitionGroup>
                    <CSSTransition timeout={300} classNames="fade">
                      <div className="space-y-4 mx-5">
                        <img src={articuloSeleccionado.imageUrl} alt={articuloSeleccionado.titulo} style={{ height: "50rem" }} className="w-full object-cover rounded-lg" />
                        <h1 className="text-3xl font-bold">{articuloSeleccionado.titulo}</h1>
                        <p className="text-gray-600 border-b border-red-600 pb-2">Fecha de publicación: {new Date(articuloSeleccionado.created_at).toLocaleDateString()}</p>
                        
                        {/* Contenido formateado del artículo, ahora sanitizado con DOMPurify */}
                        <div
                          className="text-xl leading-9 py-4 text-gray-700 space-y-4"
                        >
                          {
                            articuloSeleccionado.contenido.split('\n').map((parrafo, index) => (
                              <p key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parrafo) }} />
                            ))
                          }
                        </div>    
                        {/* Botones de navegación entre artículos */}
                        <div className="flex justify-between mt-8">
                          <button
                            onClick={() => navegarArticulo(-1)}
                            className="text-red-600 text-base xl:text-xl transition-all ease-in-out"
                            disabled={noticias.findIndex(noticia => noticia.id === articuloSeleccionado.id) === 0}
                          >
                            <i class="ri-arrow-left-s-line"></i>
                            Artículo Anterior
                          </button>
                          <button
                            onClick={() => navegarArticulo(1)}
                            className="text-red-600 text-base xl:text-xl transition-all ease-in-out"
                            disabled={noticias.findIndex(noticia => noticia.id === articuloSeleccionado.id) === noticias.length - 1}
                          >
                            Artículo Siguiente
                            <i class="ri-arrow-right-s-line"></i>
                          </button>
                        </div>
      
                        {/* Botón para volver a la lista de noticias */}
                        <div className="mt-8 flex justify-center">
                          <button
                            onClick={volverALista}
                            className="hover:text-red-600 text-lg 2xl:text-2xl px-3 py-1.5 text-center me-2 mb-2 transition-all ease-in-out"
                          >
                            Volver a todas las noticias
                          </button>
                        </div>
                      </div>
                    </CSSTransition>
                  </TransitionGroup>
                </div>
              ) : (
                <div>
                   {/* Mostrar mensaje si no se encontraron noticias */}
                   {noticiasPaginadas.length === 0 ? (
                    <TransitionGroup>
                      <CSSTransition key="no-news" timeout={300} classNames="fade">
                        <div className="text-center text-gray-500 w-full max-w-full h-screen">
                          <h2 className="text-xl font-semibold mb-4">No se encontraron noticias</h2>
                          <p>Intenta realizar una nueva búsqueda o aplicar otros filtros.</p>
                        </div>
                      </CSSTransition>
                  </TransitionGroup>
                  ): null}
                  {/* Vista según modo seleccionado: grilla o lista */}
                  {modoVista === 'grilla' ? (
                    <TransitionGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6">
                      {noticiasPaginadas.map(noticia => (
                        <CSSTransition key={noticia.id} timeout={300} classNames="fade">
                          <div className="mx-5 flex flex-col justify-between xl:mx-5 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
                            <img src={noticia.imageUrl} alt={noticia.titulo} className="w-full h-72 object-cover" />
                            <div className="p-4">
                              <h2 className="text-base lg:text-lg 2xl:text-xl xl:text-xl font-semibold mb-2">{noticia.titulo}</h2>
                              <div className="mb-4 flex items-center">
                                <p className="text-gray-500 text-sm">
                                  {new Date(noticia.created_at).toLocaleDateString()}
                                </p>
                                <span className='w-2 h-2 rounded-full bg-red-600 mx-2'></span>
                                {noticia.categories.map(category => (
                                  <span className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold rounded px-2 py-1 mr-2" key={category.id}>
                                    {category.name}
                                  </span>
                                ))}
                              </div>
                              <p className="text-gray-700 text-sm xl:text-lg my-4 line-clamp-3">
                                {noticia.contenido.substring(0, 120)}...
                              </p>
                              <button
                                className="text-white bg-red-600 ring-1 ring-red-600 hover:text-red-600 hover:bg-white rounded-full text-base px-2 py-1 text-center me-2 mb-2 transition-all ease-in-out"
                                onClick={() => seleccionarArticulo(noticia)}
                              >
                                Leer más
                                <i class="ri-arrow-right-s-line"></i>
                              </button>
                            </div>
                          </div>
                        </CSSTransition>
                      ))}
                    </TransitionGroup>
                  ) : (
                    <TransitionGroup>
                      {noticiasPaginadas.map(noticia => (
                        <CSSTransition key={noticia.id} timeout={300} classNames="fade">
                          <div className="mx-5 flex xl:mx-5 flex-row items-center lg:items-start border-b py-6 lg:space-x-6">
                            <img
                              src={noticia.imageUrl}
                              alt={noticia.titulo}
                              className="w-full max-sm:h-52 max-sm:w-1/3 lg:w-1/3 h-72 object-cover rounded-lg"
                            />
                            <div className="mt-4lg:mt-0 max-sm:ml-3 max-sm:py-2 lg:flex-grow">
                              <h2 className="lg:text-2xl text-base font-semibold mb-2">{noticia.titulo}</h2>
                              <div className="mb-4 flex items-center">
                                <p className="text-gray-500 text-sm">
                                  {new Date(noticia.created_at).toLocaleDateString()}
                                </p>
                                <span className='w-2 h-2 rounded-full bg-red-600 mx-2'></span>
                                {noticia.categories.map(category => (
                                  <span className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold rounded px-2 py-1 mr-2" key={category.id}>
                                    {category.name}
                                  </span>
                                ))}
                              </div>
                              <p className="text-gray-700 text-sm xl:text-lg my-4 line-clamp-3">
                                {noticia.contenido.substring(0, 200)}...
                              </p>
                              <button
                                className="text-white bg-red-600 ring-1 ring-red-600 hover:text-red-600 hover:bg-white rounded-full text-base px-2 py-1 text-center me-2 mb-2 transition-all ease-in-out"
                                onClick={() => seleccionarArticulo(noticia)}
                              >
                                Leer más
                                <i class="ri-arrow-right-s-line"></i>
                              </button>
                            </div>
                          </div>
                        </CSSTransition>
                      ))}
                    </TransitionGroup>
                  )}

                  {/* Paginación */}
                  <div className="mt-8 flex justify-center space-x-2">
                    {Array.from({ length: totalPaginas }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => cambiarPagina(i + 1)}
                        className={`${
                          i + 1 === paginaActual
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-300 text-gray-700 transition-all ease-in-out hover:bg-red-600 hover:text-white'
                        } rounded-full text-lg w-10 h-10 flex items-center justify-center`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
