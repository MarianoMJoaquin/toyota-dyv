import { useState, useEffect } from 'react';
import axios from 'axios';

const Form = ({ type = 'contacto' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    sucursal: '',
    from: type,
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  const [progress, setProgress] = useState(0);

  const sucursales = [
    'Sáenz Peña',
    'Resistencia',
    'Charata',
    'Villa Ángela'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (formData.name.length < 3) return 'El nombre debe tener al menos 3 caracteres';
    if (!formData.phone) return 'El teléfono es requerido';
    if (!formData.email) return 'El email es requerido';
    if (!formData.message) return 'El mensaje es requerido';
    if (!formData.sucursal) return 'Debe seleccionar una sucursal';
    return null;
  };

  // Agregar el mapeo de sucursales a bocas de venta
  const getBocaVenta = (sucursal) => {
    const mapping = {
      'Resistencia': 'RESI',
      'Villa Ángela': 'VANG',
      'Sáenz Peña': 'RSPÑ',
      'Charata': 'CHAR2'
    };
    return mapping[sucursal] || 'RESI'; // RESI como fallback
  };

  // Agregar función para determinar el interest según el type
  const getInterest = (type) => {
    const interestMap = {
      'tpa': 'PLAN',
      'usados': 'USADO',
      'contacto': 'CONVENCIONAL',
      'financiacion': 'CONVENCIONAL',
      'la_voz_del_cliente': 'CONVENCIONAL'
    };
    return interestMap[type] || 'CONVENCIONAL';
  };

  useEffect(() => {
    let progressInterval;
    if (status.loading) {
      setProgress(0);
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return 90; // Se mantiene en 90% hasta que termine el envío
          return prev + Math.random() * 15; // Incrementos aleatorios más naturales
        });
      }, 200);
    } else if (status.success) {
      setProgress(100); // Completa el progreso al finalizar
      setTimeout(() => setProgress(0), 1000); // Reset después de 1s
    }
    return () => clearInterval(progressInterval);
  }, [status.loading, status.success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      setStatus({ ...status, error });
      return;
    }

    setStatus({ loading: true, error: null, success: false });

    // Formatear fecha como en el ejemplo (dd/mm/yyyy HH:mm)
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Preparar el nombre
    const arrNames = formData.name.split(" ");
    const firstName = arrNames[0];
    const lastName = arrNames.length > 1 ? arrNames[1] : arrNames[0];
    
    // Datos para la primera API (original)
    const dataToSend = {
      "prospect": {
        "requestdate": formattedDate,
        "customer": {
          "comments": `${formData.message}. Sucursal: ${formData.sucursal}`,
          "interest": getInterest(formData.from),
          "contacts": [{
            "emails": [
              {
                "value": formData.email
              }
            ],
            "names": [
              {
                "part": "first",
                "value": firstName
              },
              {
                "part": "last",
                "value": lastName
              }
            ],
            "phones": [
              {
                "type": "phone",
                "value": formData.phone
              },
              {
                "type": "mobile",
                "value": formData.phone
              }
            ],
            "addresses": [
              {
                "city": "Chaco",
                "country": "Argentina"
              }
            ]
          }]
        },
        "vehicles": [
          {
            "make": "",
            "model": "",
            "code": ""
          }
        ],
        "provider": {
          "name": {
            "value": "Página Web",
            "origin": "Pagina web"
          }
        },
        "boca de venta": getBocaVenta(formData.sucursal)
      }
    };

    // Datos para la segunda API
    const secondApiData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      from: formData.from
    };

    try {
      // Ejecutar ambas llamadas API en paralelo
      const [firstApiResponse, secondApiResponse] = await Promise.all([
        axios.post('/api/leads', dataToSend),
        axios.post('https://panelweb.derkayvargas.com/api/message', secondApiData)
      ]);

      setStatus({ loading: false, error: null, success: true });
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
        sucursal: '',
        from: type
      });
    } catch (error) {
      setProgress(0);
      setStatus({
        loading: false,
        error: error.response?.data?.message || 'Ocurrió un error',
        success: false
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 space-y-6">
      {/* Mensaje de Error */}
      {status.error && (
        <div className="flex items-center gap-3 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm transition-all duration-300 transform translate-y-0 opacity-100 scale-100 motion-safe:transition-all motion-safe:duration-300">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-red-700 font-medium">
              {status.error}
            </p>
          </div>
          <button 
            onClick={() => setStatus(prev => ({ ...prev, error: null }))}
            className="flex-shrink-0 text-red-700 hover:text-red-900 transition-colors duration-200"
            type="button"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Mensaje de Éxito */}
      {status.success && (
        <div className="flex items-center gap-3 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm transition-all duration-300 transform translate-y-0 opacity-100 scale-100 motion-safe:transition-all motion-safe:duration-300">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-green-700 font-medium">
              ¡Mensaje enviado con éxito! Nos contactaremos pronto.
            </p>
          </div>
          <button 
            onClick={() => setStatus(prev => ({ ...prev, success: false }))}
            className="flex-shrink-0 text-green-700 hover:text-green-900 transition-colors duration-200"
            type="button"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="space-y-6">
        <div className="relative">
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="peer w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
            placeholder="Nombre"
            required
          />
          <label
            htmlFor="name"
            className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-500"
          >
            Nombre completo
          </label>
        </div>

        <div className="relative">
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="peer w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
            placeholder="Teléfono"
            required
          />
          <label
            htmlFor="phone"
            className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-500"
          >
            Teléfono
          </label>
        </div>

        <div className="relative">
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="peer w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
            placeholder="Email"
            required
          />
          <label
            htmlFor="email"
            className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-500"
          >
            Email
          </label>
        </div>

        <div className="relative">
          <select
            name="sucursal"
            id="sucursal"
            value={formData.sucursal}
            onChange={handleChange}
            className="peer w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200 appearance-none"
            required
          >
            <option value="" disabled>Seleccione una opción</option>
            {sucursales.map(sucursal => (
              <option key={sucursal} value={sucursal}>
                {sucursal}
              </option>
            ))}
          </select>
          <label
            htmlFor="sucursal"
            className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-focus:text-red-500"
          >
            Sucursal
          </label>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="peer w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200 resize-none"
            placeholder="Mensaje"
            required
          />
          <label
            htmlFor="message"
            className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-500"
          >
            Mensaje
          </label>
        </div>

        <div className="relative">
          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-[#eb001b] p-3 text-white rounded-lg relative overflow-hidden hover:bg-red-700 transition-colors duration-200 text-lg font-medium"
          >
            <span className={`relative z-10 transition-all duration-200 ${
              status.loading ? 'text-white/90' : ''
            }`}>
              {status.loading ? 'Enviando...' : 'Enviar mensaje'}
            </span>
            
            {status.loading && (
              <div 
                className="absolute left-0 top-0 h-full bg-red-800 transition-all duration-200 ease-out"
                style={{
                  width: `${progress}%`,
                }}
              />
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
