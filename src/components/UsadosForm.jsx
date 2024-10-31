import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsadosForm = () => {
  const [message, setMessage] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    sucursal: '', // Campo para la sucursal
    from: 'usados' // Campo oculto
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false); // Estado para animación de envío
  const [sucursales, setSucursales] = useState([]); // Estado para las sucursales

  // Cargar las sucursales desde la API
  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const response = await axios.get('https://panelweb.derkayvargas.com/api/sucursales-usados/');
        setSucursales(response.data.data); // Accedemos a "data" dentro de la respuesta
      } catch (error) {
        console.error('Error cargando sucursales:', error);
      }
    };
    fetchSucursales();
  }, []);

  const handleChange = (e) => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let errors = {};
    if (!message.name.trim()) errors.name = 'El nombre es obligatorio';
    if (!message.phone.trim()) errors.phone = 'El teléfono es obligatorio';
    if (!message.email.trim()) errors.email = 'El email es obligatorio';
    if (!message.message.trim()) errors.message = 'El mensaje es obligatorio';
    if (!message.sucursal.trim()) errors.sucursal = 'La sucursal es obligatoria';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSending(true); // Comienza la animación de "enviando"

    try {
      const response = await axios.post('https://panelweb.derkayvargas.com/api/message/', message, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setSubmitted(true);
        setIsSending(false); // Termina la animación de "enviando"
        setMessage({
          name: '',
          phone: '',
          email: '',
          message: '',
          sucursal: '',
          from: 'usados' // Reseteamos también el campo "from"
        });
        setErrors({});
      }
    } catch (error) {
      setIsSending(false); // Termina la animación en caso de error
      console.error('Error enviando el formulario:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrors(error.response.data.error); // Manejo de errores desde el backend
      } else {
        alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Contáctanos</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Apellido y Nombre</label>
          <input
            type="text"
            name="name"
            value={message.name}
            onChange={handleChange}
            placeholder="Apellido y Nombre"
            className={`mt-1 p-3 block w-full shadow-sm sm:text-sm border rounded-md focus:ring-red-500 focus:border-red-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={message.phone}
            onChange={handleChange}
            placeholder="Teléfono"
            className={`mt-1 p-3 block w-full shadow-sm sm:text-sm border rounded-md focus:ring-red-500 focus:border-red-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={message.email}
            onChange={handleChange}
            placeholder="Email"
            className={`mt-1 p-3 block w-full shadow-sm sm:text-sm border rounded-md focus:ring-red-500 focus:border-red-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
          <textarea
            name="message"
            value={message.message}
            onChange={handleChange}
            placeholder="Escribe tu mensaje"
            className={`mt-1 p-3 block w-full shadow-sm sm:text-sm border rounded-md focus:ring-red-500 focus:border-red-500 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
            rows="4"
          />
          {errors.message && <div className="text-red-500 text-sm mt-1">{errors.message}</div>}
        </div>

        <div>
          <label htmlFor="sucursal" className="block text-sm font-medium text-gray-700">Sucursal</label>
          <select
            name="sucursal"
            value={message.sucursal}
            onChange={handleChange}
            className={`mt-1 p-3 block w-full shadow-sm sm:text-sm border rounded-md focus:ring-red-500 focus:border-red-500 ${errors.sucursal ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Selecciona una sucursal</option>
            {sucursales.map((sucursal, index) => (
              <option key={index} value={sucursal.sucursal}>
                {sucursal.sucursal}
              </option>
            ))}
          </select>
          {errors.sucursal && <div className="text-red-500 text-sm mt-1">{errors.sucursal}</div>}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSending}
            className={`w-full bg-red-600 text-white p-3 rounded-md font-semibold transition-all duration-300 ease-in-out ${isSending ? 'opacity-70' : 'hover:bg-red-700'}`}
          >
            {isSending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Enviando...
              </span>
            ) : (
              'Enviar'
            )}
          </button>
        </div>
      </form>

      {submitted && (
        <div className="mt-6 text-center">
          <p className="text-green-600 font-semibold text-lg">¡Mensaje enviado con éxito!</p>
        </div>
      )}
    </div>
  );
};

export default UsadosForm;
