import React from 'react';
import moment from 'moment';

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
                    <th>Nombre Tarea</th>
                    <th>Fecha</th>
                    <th>Prioridad</th>
                </tr>
            </thead>
            <tbody>
                {tickets.map((ticket) => (
                    <tr key={ticket.idTicket}>
                        <td>{ticket.nombreTarea}</td>
                        <td>{moment(ticket.fecha).format("DD/MM/YYYY")}</td>
                        <td>{ticket.prioridad}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};


export default TicketList;