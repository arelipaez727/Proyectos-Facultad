import { useForm } from "react-hook-form";
import moment from "moment";

export default function ContactosRegistro({
  AccionABMC,
  Categorias,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ 
    defaultValues: {
      ...Item,
      FechaNacimiento: Item?.FechaNacimiento 
        ? moment(Item.FechaNacimiento).format("DD/MM/YYYY")
        : ""
    }
  });


  const onSubmit = (data) => {
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <fieldset disabled={AccionABMC === "C"}>

          {/* Campo Nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Nombre", {
                  required: { value: true, message: "Nombre es requerido" },
                  minLength: {
                    value: 5,
                    message: "Mínimo 5 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "Máximo 50 caracteres",
                  },
                })}
                autoFocus
                className={"form-control " + (errors?.Nombre ? "is-invalid" : "")}
              />
              {errors?.Nombre && (
                <div className="invalid-feedback">
                  {errors?.Nombre?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo FechaNacimiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaNacimiento">
                Fecha Nacimiento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaNacimiento", {
                  required: { value: true, message: "Fecha Nacimiento es requerido" }
                })}
                className={
                  "form-control " + (errors?.FechaNacimiento ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.FechaNacimiento?.message}
              </div>
            </div>
          </div>

          {/* Campo Telefono */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Telefono">
                Teléfono<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Telefono", {
                  required: { value: true, message: "Teléfono requerido" },
                })}
                className={"form-control " + (errors?.Telefono ? "is-invalid" : "")}
              />
              {errors?.Telefono && (
                <div className="invalid-feedback">
                  {errors?.Telefono?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo IdCategoria */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="IdCategoria">
                Categoria<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("IdCategoria", {
                  required: { value: true, message: "Categoria es requerido" },
                })}
                className={
                  "form-control " +
                  (errors?.IdCategoria ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {Categorias?.map((x) => (
                  <option value={x.IdCategoria} key={x.IdCategoria}>
                    {x.Nombre}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors?.IdCategoria?.message}
              </div>
            </div>
          </div>

          {/* Campo ImporteContribucion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="ImporteContribucion">
                Importe<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                step="0.01"
                {...register("ImporteContribucion", {
                  required: { value: true, message: "Importe requerido" },
                  min: {
                    value: 0,
                    message: "Debe ser positivo",
                  },
                })}
                className={"form-control " + (errors?.ImporteContribucion ? "is-invalid" : "")}
              />
              {errors?.ImporteContribucion && (
                <div className="invalid-feedback">
                  {errors?.ImporteContribucion?.message}
                </div>
              )}
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
          <div className="row alert alert-danger mensajesAlert mt-3">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}
      </div>
    </form>
  );
}