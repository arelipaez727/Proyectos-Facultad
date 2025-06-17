import { useForm } from "react-hook-form";

export default function ContratoRegistro({ AccionABMC, Item, Grabar, Volver }) {
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
            {/* NombreContrato */}
            <div className="row">
                <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="NombreContrato">
                    Nombre Contrato<span className="text-danger">*</span>:
                </label>
                </div>
                <div className="col-sm-8 col-md-6">
                <input
                    type="text"
                    {...register("NombreContrato", {
                    required: {
                        value: true,
                        message: "Nombre es requerido",
                    },
                    minLength: {
                        value: 5,
                        message: "Debe tener al menos 5 caracteres",
                    },
                    maxLength: {
                        value: 70,
                        message: "Debe tener como máximo 70 caracteres",
                    },
                    })}
                    autoFocus
                    className={
                    "form-control " +
                    (errors?.NombreContrato ? "is-invalid" : "")
                    }
                />
                {errors?.NombreContrato && touchedFields.NombreContrato && (
                    <div className="invalid-feedback">
                    {errors?.NombreContrato?.message}
                    </div>
                )}
                </div>
            </div>

            {/* ImporteMensual */}
            <div className="row">
                <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="ImporteMensual">
                    Importe Mensual<span className="text-danger">*</span>:
                </label>
                </div>
                <div className="col-sm-8 col-md-6">
                <input
                    type="number"
                    step=".01"
                    {...register("ImporteMensual", {
                    required: {
                        value: true,
                        message: "Importe mensual es requerido",
                    },
                    min: {
                        value: 0.01,
                        message: "Debe ser mayor que 0",
                    },
                    })}
                    className={
                    "form-control " +
                    (errors?.ImporteMensual ? "is-invalid" : "")
                    }
                />
                <div className="invalid-feedback">
                    {errors?.ImporteMensual?.message}
                </div>
                </div>
            </div>

            {/* TelefonoContacto */}
            <div className="row">
                <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="TelefonoContacto">
                    Teléfono Contacto<span className="text-danger">*</span>:
                </label>
                </div>
                <div className="col-sm-8 col-md-6">
                <input
                    type="tel"
                    {...register("TelefonoContacto", {
                    required: {
                        value: true,
                        message: "Teléfono es requerido",
                    },
                    pattern: {
                        value: /^[0-9\-\+\s()]{6,20}$/,
                        message: "Formato de teléfono inválido",
                    },
                    })}
                    className={
                    "form-control " +
                    (errors?.TelefonoContacto ? "is-invalid" : "")
                    }
                />
                <div className="invalid-feedback">
                    {errors?.TelefonoContacto?.message}
                </div>
                </div>
            </div>

            {/* FechaInicio */}
            <div className="row">
                <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="FechaInicio">
                    Fecha Inicio<span className="text-danger">*</span>:
                </label>
                </div>
                <div className="col-sm-8 col-md-6">
                <input
                    type="date"
                    {...register("FechaInicio", {
                    required: {
                        value: true,
                        message: "Fecha de inicio es requerida",
                    },
                    })}
                    className={
                    "form-control " +
                    (errors?.FechaInicio ? "is-invalid" : "")
                    }
                />
                <div className="invalid-feedback">
                    {errors?.FechaInicio?.message}
                </div>
                </div>
            </div>

            {/* FechaFin */}
            <div className="row">
                <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="FechaFin">
                    Fecha Fin<span className="text-danger">*</span>:
                </label>
                </div>
                <div className="col-sm-8 col-md-6">
                <input
                    type="date"
                    {...register("FechaFin", {
                    required: {
                        value: true,
                        message: "Fecha de fin es requerida",
                    },
                    })}
                    className={
                    "form-control " +
                    (errors?.FechaFin ? "is-invalid" : "")
                    }
                />
                <div className="invalid-feedback">
                    {errors?.FechaFin?.message}
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
