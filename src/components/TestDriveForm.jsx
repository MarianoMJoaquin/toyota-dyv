import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestDriveForm = () => {
  const [formData, setFormData] = useState({
    cliente: '',
    telefono: '',
    email: '',
    sucursal: '',
    fecha_estimada: '',
    modelo: '',
    from: 'web-site'
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Opciones estáticas para el select
  const sucursales = ['Sáenz Peña', 'Resistencia', 'Charata'];
  const modelos = ['Etios', 'Yaris', 'Corolla', 'Hilux'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.cliente) formErrors.cliente = 'El nombre es obligatorio';
    if (!formData.telefono) formErrors.telefono = 'El teléfono es obligatorio';
    if (!formData.email) formErrors.email = 'El correo electrónico es obligatorio';
    if (!formData.sucursal) formErrors.sucursal = 'La sucursal es obligatoria';
    if (!formData.fecha_estimada) formErrors.fecha_estimada = 'La fecha es obligatoria';
    if (!formData.modelo) formErrors.modelo = 'El modelo es obligatorio';
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('https://panelweb.derkayvargas.com/api/solicitar-test-drive/', formData);

      if (response.status === 200) {
        setSubmitted(true);
        setFormData({
          cliente: '',
          telefono: '',
          email: '',
          sucursal: '',
          fecha_estimada: '',
          modelo: '',
          from: 'web-site'
        });
        setErrors({});
      
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrors(error.response.data.error);
      } else {
        alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
      }
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    let progressInterval;
    if (isSubmitting) {
      setProgress(0);
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return 90;
          return prev + Math.random() * 19;
        });
      }, 200);
    } else if (submitted) {
      setProgress(100);
      setTimeout(() => setProgress(0), 1000);
    }
    return () => clearInterval(progressInterval);
  }, [isSubmitting, submitted]);

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">

      {/* Mensaje de Error - Mismo estilo que Form */}
      {Object.keys(errors).length > 0 && (
        <div className="flex items-center gap-3 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm transition-all duration-300 transform translate-y-0 opacity-100 scale-100 motion-safe:transition-all motion-safe:duration-300">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-red-700 font-medium">
              Por favor, corrija los errores en el formulario
            </p>
          </div>
        </div>
      )}

      {/* Mensaje de Éxito - Mismo estilo que Form */}
      {submitted && (
        <div className="flex items-center gap-3 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm transition-all duration-300 transform translate-y-0 opacity-100 scale-100 motion-safe:transition-all motion-safe:duration-300">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-green-700 font-medium">
              ¡Solicitud de Test Drive con éxito! Nos contactaremos pronto.
            </p>
          </div>
          <button 
            onClick={() => setSubmitted(false)}
            className="flex-shrink-0 text-green-700 hover:text-green-900 transition-colors duration-200"
            type="button"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campos del formulario con el mismo estilo que Form */}
        <div className="relative">
          <input
            type="text"
            name="cliente"
            value={formData.cliente}
            onChange={handleChange}
            className="peer w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
            placeholder="Nombre y Apellido"
            required
          />
          <label
            htmlFor="cliente"
            className="absolute left-4 -top-2.5 bg-white px-1 text-base text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-500"
          >
            Nombre y Apellido
          </label>
          {errors.cliente && <div className="text-red-500 text-sm mt-1">{errors.cliente}</div>}
        </div>

        <div className="relative">
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="peer w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
            placeholder="Teléfono"
            required
          />
          <label
            htmlFor="telefono"
            className="absolute left-4 -top-2.5 bg-white px-1 text-base text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-500"
          >
            Teléfono
          </label>
          {errors.telefono && <div className="text-red-500 text-sm mt-1">{errors.telefono}</div>}
        </div>

        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="peer w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
            placeholder="Correo Electrónico"
            required
          />
          <label
            htmlFor="email"
            className="absolute left-4 -top-2.5 bg-white px-1 text-base text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-500"
          >
            Correo Electrónico
          </label>
          {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
        </div>

        <div className="relative">
          <select
            name="sucursal"
            value={formData.sucursal}
            onChange={handleChange}
            className="peer w-full px-4 py-3 text-base rounded-lg border border-gray-300 placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
            required
          >
            <option value="">Selecciona una sucursal</option>
            {sucursales.map((sucursal, index) => (
              <option key={index} value={sucursal}>{sucursal}</option>
            ))}
          </select>
          <label
            htmlFor="sucursal"
            className="absolute left-4 -top-2.5 bg-white px-1 text-base text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-500"
          >
            Sucursal
          </label>
          {errors.sucursal && <div className="text-red-500 text-sm mt-1">{errors.sucursal}</div>}
        </div>

        <div className="relative">
          <select
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            className="peer w-full px-4 py-3 text-base rounded-lg border border-gray-300 placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
            required
          >
            <option value="">Selecciona un modelo</option>
            {modelos.map((modelo, index) => (
              <option key={index} value={modelo}>{modelo}</option>
            ))}
          </select>
          <label
            htmlFor="modelo"
            className="absolute left-4 -top-2.5 bg-white px-1 text-base text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-500"
          >
            Modelo
          </label>
          {errors.modelo && <div className="text-red-500 text-sm mt-1">{errors.modelo}</div>}
        </div>

        <div className="relative">
          <input
            type="date"
            name="fecha_estimada"
            value={formData.fecha_estimada}
            onChange={handleChange}
            className="peer w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
            required
          />
          <label
            htmlFor="fecha_estimada"
            className="absolute left-4 -top-2.5 bg-white px-1 text-base text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-500"
          >
            Fecha Estimada
          </label>
          {errors.fecha_estimada && <div className="text-red-500 text-sm mt-1">{errors.fecha_estimada}</div>}
        </div>

        <div className="relative">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#eb001b] p-3 text-white rounded-lg relative overflow-hidden hover:bg-red-700 transition-colors duration-200 text-lg font-medium"
          >
            <span className={`relative z-10 transition-all duration-200 ${
              isSubmitting ? 'text-white/90' : ''
            }`}>
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </span>
            
            {isSubmitting && (
              <div 
                className="absolute left-0 top-0 h-full bg-red-800 transition-all duration-200 ease-out"
                style={{
                  width: `${progress}%`,
                }}
              />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestDriveForm;
