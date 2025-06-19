import React from 'react';
import {useForm} from 'react-hook-form';  
import axios from 'axios';
import {useState} from 'react';

function TicketForm({ onTicketCreated }) { 
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset
  } = useForm();



  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const API_URL = 'http://localhost:4000/api/tickets';

  const onSubmit = async (data) => {
    try {
      setSubmitError(null);
      setSubmitSuccess(false);
      
      const response = await axios.post(API_URL, data);
      
      // Llamar a la función proporcionada por el padre para actualizar la lista
      onTicketCreated(response.data);
      
      reset();
      setSubmitSuccess(true);
      
      // Ocultar el mensaje de éxito después de 3 segundos
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error al crear el ticket:', error);
      setSubmitError('Error al crear el ticket. Por favor, intente nuevamente.');
    }
  };





  return (
    <div>
      {submitSuccess && (
        <div className="alert alert-success mb-3">
          ¡Ticket creado exitosamente!
        </div>
      )}
      
      {submitError && (
        <div className="alert alert-danger mb-3">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label htmlFor="nombreTarea" className="form-label">Nombre de la Tarea *</label>
          <input
            type="text"
            className={`form-control ${errors.nombreTarea ? 'is-invalid' : ''}`}
            id="nombreTarea"
            {...register('nombreTarea', {
              required: 'El nombre de la tarea es requerido',
              minLength: {
                value: 3,
                message: 'Mínimo 3 caracteres'
              },
              maxLength: {
                value: 100,
                message: 'Máximo 100 caracteres'
              }
            })}
          />
          {errors.nombreTarea && (
            <div className="invalid-feedback">{errors.nombreTarea.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">Fecha *</label>
          <input
            type="date"
            className={`form-control ${errors.fecha ? 'is-invalid' : ''}`}
            {...register('fecha', {
              required: 'La fecha es requerida',
            })}
          />
          {errors.fecha && (
            <div className="invalid-feedback">{errors.fecha.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="prioridad" className="form-label">Prioridad *</label>
          <input
            type="number"
            className={`form-control ${errors.prioridad ? 'is-invalid' : ''}`}
            {...register('prioridad', {
              required: 'La prioridad es requerida',
              min: {
                value: 1,
                message: 'Mínimo 1'
              },
              max: {
                value: 10,
                message: 'Máximo 10'
              },
              valueAsNumber: true
            })}
          />
          {errors.prioridad && (
            <div className="invalid-feedback">{errors.prioridad.message}</div>
          )}
          <small className="text-muted">Donde 1 es la prioridad más baja y 10 la más alta</small>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Guardando...
            </>
          ) : 'Guardar Tarea'}
        </button>
      </form>
    </div>
  );
}

export default TicketForm;