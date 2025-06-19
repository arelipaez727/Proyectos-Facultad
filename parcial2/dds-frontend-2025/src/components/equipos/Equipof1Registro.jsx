import { useForm } from "react-hook-form";

export default function Equipof1Registro({ AccionABMC, Item, Grabar, Volver }) {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ values: Item });

    const onSubmit = (data) => {
        Grabar(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">
                <fieldset disabled={AccionABMC === "C"}>

                {/* NombreEquipo */}
                <div className="row">
                    <div className="col-sm-4 col-md-3 offset-md-1">
                        <label className="col-form-label" htmlFor="NombreEquipo">
                            Nombre del Equipo<span className="text-danger">*</span>:
                        </label>
                    </div>
                    <div className="col-sm-8 col-md-6">
                        <input
                            type="text"
                            {...register("NombreEquipo", {
                                required: {
                                    value: true,
                                    message: "Nombre del equipo es requerido",
                                },
                            })}
                            autoFocus
                            className={
                                "form-control " +
                                (errors?.NombreEquipo ? "is-invalid" : "")
                            }
                        />
                        {errors?.NombreEquipo && touchedFields.NombreEquipo && (
                            <div className="invalid-feedback">
                                {errors?.NombreEquipo?.message}
                            </div>
                        )}
                    </div>
                </div>

                {/* NombreCorredor */}
                <div className="row">
                    <div className="col-sm-4 col-md-3 offset-md-1">
                        <label className="col-form-label" htmlFor="NombreCorredor">
                            Nombre del Corredor<span className="text-danger">*</span>:
                        </label>
                    </div>
                    <div className="col-sm-8 col-md-6">
                        <input
                            type="text"
                            {...register("NombreCorredor", {
                                required: {
                                    value: true,
                                    message: "Nombre del corredor es requerido",
                                },
                                minLength: {
                                    value: 7,
                                    message: "Debe tener al menos 7 caracteres",
                                },
                                maxLength: {
                                    value: 50,
                                    message: "Debe tener como máximo 50 caracteres",
                                },
                            })}
                            className={
                                "form-control " +
                                (errors?.NombreCorredor ? "is-invalid" : "")
                            }
                        />
                        {errors?.NombreCorredor && touchedFields.NombreCorredor && (
                            <div className="invalid-feedback">
                                {errors?.NombreCorredor?.message}
                            </div>
                        )}
                    </div>
                </div>

                {/* Presupuesto */}
                <div className="row">
                    <div className="col-sm-4 col-md-3 offset-md-1">
                        <label className="col-form-label" htmlFor="Presupuesto">
                            Presupuesto<span className="text-danger">*</span>:
                        </label>
                    </div>
                    <div className="col-sm-8 col-md-6">
                        <input
                            type="number"
                            step="0.01"
                            {...register("Presupuesto", {
                                required: {
                                    value: true,
                                    message: "Presupuesto es requerido",
                                },
                                min: {
                                    value: 0.01,
                                    message: "Debe ser mayor que 0",
                                },
                            })}
                            className={
                                "form-control " +
                                (errors?.Presupuesto ? "is-invalid" : "")
                            }
                        />
                        <div className="invalid-feedback">
                            {errors?.Presupuesto?.message}
                        </div>
                    </div>
                </div>

                {/* FechaDeInicio */}
                <div className="row">
                    <div className="col-sm-4 col-md-3 offset-md-1">
                        <label className="col-form-label" htmlFor="FechaDeInicio">
                            Fecha de Inicio<span className="text-danger">*</span>:
                        </label>
                    </div>
                    <div className="col-sm-8 col-md-6">
                        <input
                            type="date"
                            {...register("FechaDeInicio", {
                                required: {
                                    value: true,
                                    message: "Fecha de inicio es requerida",
                                },
                            })}
                            className={
                                "form-control " +
                                (errors?.FechaDeInicio ? "is-invalid" : "")
                            }
                        />
                        <div className="invalid-feedback">
                            {errors?.FechaDeInicio?.message}
                        </div>
                    </div>
                </div>

                {/* CampeonatosGanados */}
                <div className="row">
                    <div className="col-sm-4 col-md-3 offset-md-1">
                        <label className="col-form-label" htmlFor="CampeonatosGanados">
                            Campeonatos Ganados<span className="text-danger">*</span>:
                        </label>
                    </div>
                    <div className="col-sm-8 col-md-6">
                        <input
                            type="number"
                            min="0"
                            {...register("CampeonatosGanados", {
                                required: {
                                    value: true,
                                    message: "Campeonatos ganados es requerido",
                                },
                                min: {
                                    value: 0,
                                    message: "No puede ser negativo",
                                },
                            })}
                            className={
                                "form-control " +
                                (errors?.CampeonatosGanados ? "is-invalid" : "")
                            }
                        />
                        <div className="invalid-feedback">
                            {errors?.CampeonatosGanados?.message}
                        </div>
                    </div>
                </div>

                </fieldset>

                {/* Botones */}
                <hr />
                <div className="row justify-content-center">
                    <div className="col text-center botones">
                        {AccionABMC !== "C" && (
                            <button type="submit" className="btn btn-primary">
                                <i className="fa fa-check"></i> Grabar
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => Volver()}
                        >
                            <i className="fa fa-undo"></i>
                            {AccionABMC === "C" ? " Volver" : " Cancelar"}
                        </button>
                    </div>
                </div>

                {!isValid && isSubmitted && (
                    <div className="row alert alert-danger mensajesAlert">
                        <i className="fa fa-exclamation-sign"></i>
                        Revisar los datos ingresados...
                    </div>
                )}
            </div>
        </form>
    );
}