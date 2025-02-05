import { useState, useEffect } from 'react';

const ServicioList = () => {
  const [servicios, setServicios] = useState([]);
  const [modeloSeleccionado, setModeloSeleccionado] = useState('');
  const [serviciosActivos, setServiciosActivos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await fetch('https://panelweb.derkayvargas.com/api/posventa/lista-de-precios');
        const data = await response.json();
        setServicios(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los servicios:', error);
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  useEffect(() => {
    if (modeloSeleccionado) {
      const modeloActivo = servicios.find(m => m.id.toString() === modeloSeleccionado);
      setServiciosActivos(modeloActivo ? modeloActivo.servicios : []);
    } else if (servicios.length > 0) {
      setServiciosActivos(servicios[0].servicios);
      setModeloSeleccionado(servicios[0].id.toString());
    }
  }, [modeloSeleccionado, servicios]);

  if (loading) {
    return (
      <div role="status" style={{ height: "65vh" }} className="flex items-center justify-center">
        <svg
          aria-hidden="true"
          className="w-16 h-16 text-gray-200 animate-spin fill-red-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl lg:max-w-6xl mx-auto">
        {/* Selector de modelo */}
        <div className="mb-8">
          <select
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB0A1E] text-lg"
            value={modeloSeleccionado}
            onChange={(e) => setModeloSeleccionado(e.target.value)}
          >
            {servicios.map((modelo) => (
              <option key={modelo.id} value={modelo.id}>
                {modelo.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Tabla de servicios */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#EB0A1E] text-white p-4">
            <h3 className="text-2xl font-bold text-center">Lista de Servicios</h3>
          </div>
          <div className="p-4">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-3 px-4 text-left">Kilometraje</th>
                  <th className="py-3 px-4 text-right">Precio</th>
                </tr>
              </thead>
              <tbody>
                {serviciosActivos.map((servicio) => (
                  <tr 
                    key={servicio.id} 
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="py-3 px-4 text-gray-800">{servicio.nombre}</td>
                    <td className="py-3 px-4 text-right text-[#EB0A1E] font-bold">
                      ${servicio.precio.toLocaleString('es-AR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {serviciosActivos.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No hay servicios disponibles para este modelo.
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicioList;
