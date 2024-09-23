import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function UsadosList() {
  const [autos, setAutos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [autoSeleccionado, setAutoSeleccionado] = useState(null);
  const [slugAutoSeleccionado, setSlugAutoSeleccionado] = useState(null);
  const [detallesAuto, setDetallesAuto] = useState(null);
  
  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const respuesta = await fetch("https://panelweb.derkayvargas.com/api/usados/");
        const data = await respuesta.json();
        setAutos(data.data);
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

  return (
    <section className="container mx-auto section my-8">
      <h1 className="vehicles__title heading-1 max-w-max mx-auto border-b-2 border-red-600"> Autos Usados </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-4">
          {cargando ? (
            <div role="status" className="flex justify-center items-center">
              <svg aria-hidden="true" className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Cargando autos...</span>
            </div>
          ) : autoSeleccionado && detallesAuto ? (
            <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8">
               
              {/* Galería de imágenes */}
              <div className="space-y-4 mx-5 flex justify-center items-center">
                <div className="grid gap-2">
                  {detallesAuto.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={`https://panelweb.derkayvargas.com${photo.public_path}`}
                      alt={`Imagen ${index + 1}`}
                      className="w-32 object-cover rounded-lg cursor-pointer"
                    />
                  ))}
                </div>
                <img
                  src={`https://panelweb.derkayvargas.com/${detallesAuto.foto}`}
                  alt={`${detallesAuto.marca} ${detallesAuto.modelo}`}
                  className="w-auto ml-5 object-cover rounded-lg"
                  style={{ height: "50rem" }}
                  
                />
              </div>

              {/* Información del auto */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">{detallesAuto.marca} {detallesAuto.modelo}</h2>
                <div className="flex">
                  <p className="text-xl text-gray-700">{detallesAuto.anio}</p>
                  <p className="text-xl text-gray-700 mx-2">|</p>
                  <p className="text-xl text-gray-700">{Number(detallesAuto.km).toLocaleString()} km</p>
                </div>
                <p className="text-xl text-gray-700">Color: {detallesAuto.color}</p>
                <p className="text-xl font-semibold text-red-600">Precio: ${Number(detallesAuto.precio).toLocaleString()}</p>
                <p className="text-xl text-gray-700">Estado: {detallesAuto.estado}</p>
                <p className="text-xl text-gray-700">Transmisión: {detallesAuto.transmision}</p>
                <p className="text-xl text-gray-700">Combustible: {detallesAuto.combustible}</p>
                {detallesAuto.uct === 1 ? (
                  <p className="text-xl text-green-600 font-semibold">Certificado Toyota</p>
                ) : (
                  <p className="text-xl text-gray-600">No certificado</p>
                )}
                <button onClick={volverALista} className="text-white bg-red-600 py-2 px-4 rounded-lg">
                  Volver a la lista
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {autos.map((auto) => (
                <div key={auto.id} className="bg-white rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105" onClick={() => seleccionarAuto(auto)}>
                  <img
                    src={`https://panelweb.derkayvargas.com/${auto.foto}`}
                    alt={`${auto.marca} ${auto.modelo}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{auto.marca} {auto.modelo}</h2>
                    <p>Año: {auto.anio}</p>
                    <p>Kilometraje: {auto.km} km</p>
                    <p className="font-semibold text-red-600">${Number(auto.precio).toLocaleString()}</p>
                    <p>Estado: {auto.estado}</p>
                    <button className="text-red-600 hover:underline mt-2">Ver más</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
