import React from 'react';

function TicketList({ tickets, isLoading, error }) {

    if (isLoading) {
    return <div className="alert alert-info">Cargando tickets...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (tickets.length === 0) {
    return <div className="alert alert-warning">No se encontraron tickets</div>;
  }

    return (
    <div className="table-responsive">
        <table className="table table-striped table-hover">
            <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Prioridad</th>
                </tr>
            </thead>
            <tbody>
                {tickets.map((ticket) => (
                    <tr key={ticket.idTicket}>
                        <td>{ticket.nombreTarea}</td>
                        <td>{ticket.fecha}</td>
                        <td>{ticket.prioridad}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};


export default TicketList;