import { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function NoticiaList({ noticias, categorias }) {
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [noticiasFiltradas, setNoticiasFiltradas] = useState(noticias);
  const [noticiasPaginadas, setNoticiasPaginadas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [articuloSeleccionado, setArticuloSeleccionado] = useState(null); // Almacena el artículo seleccionado

  const noticiasPorPagina = 6;  // Número de noticias por página
  const ultimasNoticias = noticias.slice(0, 5);  // Mostramos las 5 últimas noticias en la sección de últimas noticias

  useEffect(() => {
    filtrarNoticias();
  }, [busqueda, filtroCategoria, paginaActual]);

  // Filtrar noticias según búsqueda y categoría
  const filtrarNoticias = () => {
    const palabrasClave = busqueda.toLowerCase().split(' ').filter(Boolean);

    const filtradas = noticias.filter(noticia => {
      const titulo = noticia.titulo.toLowerCase();
      const coincideBusqueda = palabrasClave.every(palabra => titulo.includes(palabra));
      const coincideCategoria = filtroCategoria
        ? noticia.categories.some(category => category.name === filtroCategoria)
        : true;
      return coincideBusqueda && coincideCategoria;
    });

    // Actualizar noticias filtradas
    setNoticiasFiltradas(filtradas);

    // Calcular las noticias paginadas (de acuerdo a la página actual)
    const indiceInicial = (paginaActual - 1) * noticiasPorPagina;
    const indiceFinal = indiceInicial + noticiasPorPagina;
    setNoticiasPaginadas(filtradas.slice(indiceInicial, indiceFinal));
  };

  // Manejar el cambio de página y hacer scroll hacia arriba
  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    window.scrollTo({
      top: 0,        // Desplazar al tope de la página
      behavior: 'smooth'  // Desplazamiento suave
    });
  };

  // Manejar la selección de un artículo para verlo completo
  const seleccionarArticulo = (articulo) => {
    setArticuloSeleccionado(articulo);
    window.scrollTo({ top: 0, behavior: 'smooth' });  // Desplazar al tope
  };

  // Manejar la navegación entre artículos (Anterior/Siguiente)
  const navegarArticulo = (direccion) => {
    const indiceActual = noticias.findIndex(noticia => noticia.id === articuloSeleccionado.id);
    const nuevoIndice = indiceActual + direccion;
    if (nuevoIndice >= 0 && nuevoIndice < noticias.length) {
      setArticuloSeleccionado(noticias[nuevoIndice]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Volver a la lista de noticias
  const volverALista = () => {
    setArticuloSeleccionado(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPaginas = Math.ceil(noticiasFiltradas.length / noticiasPorPagina);

  return (
    <section className="container mx-auto section">
      <h1 class="vehicles__title heading-1 border-b">Noticias</h1>
      {/* Diseño de dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Columna izquierda - Buscador, Filtros y Últimas Noticias */}
        <div className="lg:col-span-1 space-y-4 mx-5 lg:mx-0">
          {/* Buscador */}
          <div className="mb-4">
            <input
              type="text"
              className="border border-gray-300 rounded-full p-3 w-full"
              placeholder="Buscar noticias..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {/* Filtros de Categorías */}
          <div className="mb-4">
            <select
              className="border border-gray-300 rounded-full p-3 w-full"
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
            >
              <option value="">Todas las Categorías</option>
              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.name}>{categoria.name}</option>
              ))}
            </select>
          </div>

          {/* Sección de Últimas Noticias */}
          <div className="bg-gray-100 p-4 rounded-lg max-lg:hidden">
            <h3 className="text-lg font-semibold mb-3">Últimas Noticias</h3>
            <ul className="space-y-2">
              {ultimasNoticias.map(noticia => (
                <li key={noticia.id} className="border-b pb-2">
                  <a href="#" onClick={() => seleccionarArticulo(noticia)} className="text-gray-600 hover:text-red-600">
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
        
        {/* Columna derecha - Artículo o Lista de Noticias */}
        <div className="lg:col-span-3">
          {articuloSeleccionado ? (
            <div className="space-y-6">
              {/* Artículo completo */}
              <CSSTransition timeout={300} classNames="fade">
                <div className="space-y-4">
                  <img src={articuloSeleccionado.imageUrl} alt={articuloSeleccionado.titulo} style={{ height: "50rem" }} className="w-full object-cover rounded-lg" />
                  <h1 className="text-3xl font-bold">{articuloSeleccionado.titulo}</h1>
                  <p className="text-gray-600">Fecha de publicación: {new Date(articuloSeleccionado.created_at).toLocaleDateString()}</p>
                  
                  {/* Contenido formateado del artículo */}
                  <div
                    className="text-lg text-gray-700 space-y-4"
                    dangerouslySetInnerHTML={{ __html: articuloSeleccionado.contenido }}
                  />

                  {/* Botones de navegación entre artículos */}
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => navegarArticulo(-1)}
                      className="hover:text-gray-700 text-gray-600"
                      disabled={noticias.findIndex(noticia => noticia.id === articuloSeleccionado.id) === 0}
                    >
                      <i class="ri-arrow-left-s-line"></i>
                      Artículo Anterior
                    </button>
                    <button
                      onClick={() => navegarArticulo(1)}
                      className="hover:text-gray-700 text-gray-600"
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
                      className=" text-red-600 hover:text-red-700"
                    >
                      Volver a todas las noticias
                    </button>
                  </div>
                </div>
              </CSSTransition>
            </div>
          ) : (
            // Lista de Noticias
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
              ) : (
                // Grid de Noticias con animación
                <TransitionGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {noticiasPaginadas.map(noticia => (
                    <CSSTransition key={noticia.id} timeout={300} classNames="fade">
                      <div className="mx-5 lg:mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
                        <img src={noticia.imageUrl} alt={noticia.titulo} className="w-full h-72 object-cover" />
                        <div className="p-4">
                          <h2 className="text-2xl font-semibold mb-2">{noticia.titulo}</h2>
                          <p className="text-lg text-gray-600 mb-4">{noticia.contenido.substring(0, 100)}...</p>
                          <div className="mb-4">
                            {noticia.categories.map(category => (
                              <span className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold rounded px-2 py-1 mr-2" key={category.id}>
                                {category.name}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={() => seleccionarArticulo(noticia)}
                            className="text-gray-600 hover:text-red-600 font-medium"
                          >
                            Leer más
                          </button>
                        </div>
                      </div>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              )}

              {/* Paginación */}
              <div className="mt-8 flex justify-center gap-4">
                {/* Botón de página anterior */}
                {paginaActual > 1 && (
                  <button
                    onClick={() => cambiarPagina(paginaActual - 1)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <i class="ri-arrow-left-s-line"></i>
                    Anterior
                  </button>
                )}

                {/* Números de página */}
                {Array.from({ length: totalPaginas }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => cambiarPagina(i + 1)}
                    className={`p-2 rounded ${paginaActual === i + 1 ? 'text-red-500' : ' hover:text-red-500 text-gray-800'}`}
                  >
                    {i + 1}
                  </button>
                ))}

                {/* Botón de página siguiente */}
                {paginaActual < totalPaginas && (
                  <button
                    onClick={() => cambiarPagina(paginaActual + 1)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    Siguiente
                    <i class="ri-arrow-right-s-line"></i>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
