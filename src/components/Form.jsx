import { useState } from 'react';
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

    //+console.log('Sending data:', JSON.stringify(dataToSend, null, 2)); // Debug

    try {
      const response = await axios.post('/api/leads', dataToSend);
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
      setStatus({
        loading: false,
        error: error.response?.data?.message || 'Ocurrió un error',
        success: false
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      {status.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {status.error}
        </div>
      )}

      {status.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          ¡Mensaje enviado con éxito! Nos contactaremos pronto.
        </div>
      )}

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre completo"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Teléfono"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="sucursal"
          value={formData.sucursal}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Seleccione una sucursal</option>
          {sucursales.map(sucursal => (
            <option key={sucursal} value={sucursal}>
              {sucursal}
            </option>
          ))}
        </select>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Mensaje"
          className="w-full p-2 border rounded"
          rows="4"
          required
        />

        <button
          type="submit"
          disabled={status.loading}
          className={`w-full p-2 text-white rounded ${
            status.loading 
              ? 'bg-gray-400' 
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {status.loading ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </div>
    </form>
  );
};

export default Form;
