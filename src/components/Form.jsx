import { useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';

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

  const sendEmails = async (formData, sucursalCode) => {
    try {
      // Email al cliente
      await emailjs.send(
        'service_cxe31lg', // Reemplazar con tu service ID de EmailJS
        'template_bx44n36', // Reemplazar con tu template ID para clientes
        {
          to_email: formData.email,
          to_name: formData.name,
          sucursal: formData.sucursal,
          message: formData.message
        },
        'LUANX8cxp5oT811f4' // Reemplazar con tu public key de EmailJS
      );

      // Email a la sucursal
      const sucursalEmails = {
        'RESI': 'fabianaaranda@derkayvargas.com.ar',
        'VANG': 'fabianaaranda@derkayvargas.com.ar',
        'RSPÑ': 'fabianaaranda@derkayvargas.com.ar',
        'CHAR2': 'fabianaaranda@derkayvargas.com.ar'
      };

      await emailjs.send(
        'service_cxe31lg',
        'template_bx44n36', // Reemplazar con tu template ID para sucursales
        {
          to_email: sucursalEmails[sucursalCode],
          client_name: formData.name,
          client_email: formData.email,
          client_phone: formData.phone,
          message: formData.message
        },
        'LUANX8cxp5oT811f4'
      );

      return true;
    } catch (error) {
      console.error('Error sending emails:', error);
      return false;
    }
  };

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
    
    // Construir el JSON exactamente como en el ejemplo
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

    console.log('Sending data:', JSON.stringify(dataToSend, null, 2)); // Debug

    try {
      // Primero enviamos al CRM
      const response = await axios.post('/api/leads', dataToSend);
      
      // Luego enviamos los correos
      const sucursalCode = getBocaVenta(formData.sucursal);
      const emailsSent = await sendEmails(formData, sucursalCode);

      setStatus({ 
        loading: false, 
        error: null, 
        success: true,
        emailsSent 
      });

      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
        sucursal: '',
        from: type
      });
    } catch (error) {
      setStatus({
        loading: false,
        error: error.response?.data?.message || 'Ocurrió un error',
        success: false
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      {status.error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 shadow-sm transition-all duration-300">
          <p className="font-medium">Error</p>
          <p className="text-sm">{status.error}</p>
        </div>
      )}

      {status.success && (
        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded mb-6 shadow-sm">
          <p className="font-medium">¡Solicitud enviada con éxito!</p>
          <p className="text-sm mt-2">
            {status.emailsSent ? 
              "Hemos enviado un correo de confirmación a tu email y notificado a la sucursal correspondiente." :
              "Tu información ha sido registrada, pero hubo un problema al enviar los correos de confirmación."}
          </p>
        </div>
      )}

      <div className="space-y-6">
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre completo"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 ease-in-out pl-10"
            required
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        <div className="relative">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Teléfono"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 ease-in-out pl-10"
            required
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>

        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 ease-in-out pl-10"
            required
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <div className="relative">
          <select
            name="sucursal"
            value={formData.sucursal}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 ease-in-out pl-10 appearance-none bg-white"
            required
          >
            <option value="">Seleccione una sucursal</option>
            {sucursales.map(sucursal => (
              <option key={sucursal} value={sucursal}>
                {sucursal}
              </option>
            ))}
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>

        <div className="relative">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Mensaje"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 ease-in-out pl-10"
            rows="4"
            required
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>

        <button
          type="submit"
          disabled={status.loading}
          className={`w-full p-3 text-white rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
            status.loading 
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 active:bg-red-800'
          }`}
        >
          {status.loading ? 
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </span>
            : 'Enviar mensaje'
          }
        </button>
      </div>
    </form>
  );
};

export default Form;
