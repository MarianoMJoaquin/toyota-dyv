import React, { useState } from 'react';
import axios from 'axios';

const TestDriveForm = () => {
  const [formData, setFormData] = useState({
    cliente: '',
    telefono: '',
    email: '',
    sucursal: '',
    fecha_estimada: '',
    modelo: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const response = await axios.post('https://panelweb.derkayvargas.com/api/solicitar-test-drive/', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setSubmitted(true);
        setFormData({
          cliente: '',
          telefono: '',
          email: '',
          sucursal: '',
          fecha_estimada: '',
          modelo: ''
        });
        setErrors({});
        alert('Formulario enviado con éxito');
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

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Solicitar Test Drive</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="cliente" className="block text-sm font-medium text-gray-700">Apellido y Nombre</label>
          <input
            type="text"
            name="cliente"
            value={formData.cliente}
            onChange={handleChange}
            placeholder="Apellido y Nombre"
            className={`mt-1 p-3 block w-full shadow-sm sm:text-sm border rounded-md ${errors.cliente ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.cliente && <div className="text-red-500 text-sm mt-1">{errors.cliente}</div>}
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            className={`mt-1 p-3 block w-full shadow-sm sm:text-sm border rounded-md ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.telefono && <div className="text-red-500 text-sm mt-1">{errors.telefono}</div>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo Electrónico"
            className={`mt-1 p-3 block w-full shadow-sm sm:text-sm border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
        </div>

        <div>
          <label htmlFor="sucursal" className="block text-sm font-medium text-gray-700">Sucursal</label>
          <select
            name="sucursal"
            value={formData.sucursal}
            onChange={handleChange}
            className={`mt-1 p-3 block w-full shadow-sm sm:text-sm border rounded-md ${errors.sucursal ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Selecciona una sucursal</option>
            {sucursales.map((sucursal, index) => (
              <option key={index} value={sucursal}>{sucursal}</option>
            ))}
          </select>
          {errors.sucursal && <div className="text-red-500 text-sm mt-1">{errors.sucursal}</div>}
        </div>

        <div>
          <label htmlFor="modelo" className="block text-sm font-medium text-gray-700">Modelo</label>
          <select
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            className={`mt-1 p-3 block w-full shadow-sm sm:text-sm border rounded-md ${errors.modelo ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Selecciona un modelo</option>
            {modelos.map((modelo, index) => (
              <option key={index} value={modelo}>{modelo}</option>
            ))}
          </select>
          {errors.modelo && <div className="text-red-500 text-sm mt-1">{errors.modelo}</div>}
        </div>

        <div>
          <label htmlFor="fecha_estimada" className="block text-sm font-medium text-gray-700">Fecha Estimada</label>
          <input
            type="date"
            name="fecha_estimada"
            value={formData.fecha_estimada}
            onChange={handleChange}
            className={`mt-1 p-3 block w-full shadow-sm sm:text-sm border rounded-md ${errors.fecha_estimada ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.fecha_estimada && <div className="text-red-500 text-sm mt-1">{errors.fecha_estimada}</div>}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-indigo-600 text-white p-3 rounded-md font-semibold transition-all duration-300 ease-in-out ${isSubmitting ? 'opacity-70' : 'hover:bg-indigo-700'}`}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>

      {submitted && (
        <div className="mt-6 text-center">
          <p className="text-green-600 font-semibold text-lg">¡Formulario enviado con éxito!</p>
        </div>
      )}
    </div>
  );
};

export default TestDriveForm;
