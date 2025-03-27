import React, { useEffect } from "react";
import { EventFieldsFormProps } from "./types";
import { Input } from "@/components/Atoms";
import { Form, Spinner } from "react-bootstrap";
import useCategory from "@/hooks/useCategory";
import classNames from "classnames";
import styles from "./EventFieldsForm.module.scss";

const EventFields: React.FC<EventFieldsFormProps> = ({
  register,
  errors,
  watch,
  formOption = "Vecino",
}) => {
  const {
    categories,
    findAll: findAllCategories,
    loading: loadingCategories,
  } = useCategory();

  useEffect(() => {
    findAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const estimado = watch("estimado");
  useEffect(() => {
    console.log(estimado);
  }, [estimado]);

  return (
    <div className={classNames(styles.EventFields)}>
      <div className={classNames(styles.FormGroup)}>
        <Input
          label="Nombre del evento"
          {...register("nombre", { required: "Este campo es obligatorio" })}
        />
        {errors.nombre && (
          <span className={classNames(styles.Error)}>
            {errors.nombre.message}
          </span>
        )}
      </div>

      <div className={classNames(styles.FormGroup)}>
        <Input
          label="Descripción"
          {...register("descripcion", {
            required: "Este campo es obligatorio",
          })}
        />
        {errors.descripcion && (
          <span className={classNames(styles.Error)}>
            {errors.descripcion.message}
          </span>
        )}
      </div>

      <div className={classNames(styles.FormSelectGroup)}>
        <label htmlFor="tipo">Tipo</label>
        <Form.Select
          id="tipo"
          {...register("tipo", {
            required: "Este campo es obligatorio",
          })}
        >
          <option value="">Seleccione un tipo de evento</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoria}
            </option>
          ))}
        </Form.Select>
        {loadingCategories && (
          <Spinner animation="border" role="status" size="sm" />
        )}
        {errors.tipo && (
          <span className={classNames(styles.Error)}>
            {errors.tipo.message}
          </span>
        )}
      </div>

      <div className={classNames(styles.FormGroup)}>
        <Input
          label="Propietario"
          {...register("propietario", {
            required: "Este campo es obligatorio",
          })}
        />
        {errors.propietario && (
          <span className={classNames(styles.Error)}>
            {errors.propietario.message}
          </span>
        )}
      </div>

      {formOption === "PMT" && (
        <div className={classNames(styles.FormGroup)}>
          <Input
            label="Chapa"
            type="number"
            {...register("chapa", { required: "Este campo es obligatorio" })}
          />
          {errors.chapa && (
            <span className={classNames(styles.Error)}>
              {errors.chapa.message}
            </span>
          )}
        </div>
      )}

      <div className={classNames(styles.FormGroup)}>
        <Input
          label="Estimado de visitantes"
          type="number"
          {...register("estimado", { required: "Este campo es obligatorio" })}
        />
        {errors.estimado && (
          <span className={classNames(styles.Error)}>
            {errors.estimado.message}
          </span>
        )}
      </div>

      <div className={classNames(styles.FormGroup)}>
        <Input
          label="Oficio"
          {...register("oficio", {
            required:
              estimado >= 500
                ? "El oficio es obligatorio si el estimado es mayor o igual a 500"
                : formOption === "PMT"
                ? "Este campo es obligatorio"
                : false,
          })}
        />
        {(estimado >= 500 || formOption === "PMT") && errors.oficio && (
          <span className={classNames(styles.Error)}>
            {errors.oficio.message}
          </span>
        )}
      </div>

      <div className={classNames(styles.FormGroup)}>
        <Input
          label="Fecha y hora de inicio"
          type="datetime-local"
          {...register("fecha_inicial", {
            required: "Este campo es obligatorio",
          })}
        />
        {errors.fecha_inicial && (
          <span className={classNames(styles.Error)}>
            {errors.fecha_inicial.message}
          </span>
        )}
      </div>

      <div className={classNames(styles.FormGroup)}>
        <Input
          label="Fecha y hora de finalización"
          type="datetime-local"
          {...register("fecha_final", {
            required: "Este campo es obligatorio",
          })}
        />
        {errors.fecha_final && (
          <span className={classNames(styles.Error)}>
            {errors.fecha_final.message}
          </span>
        )}
      </div>

      <div className={classNames(styles.FormGroup)}>
        <Input
          label="Lugar o Dirección"
          {...register("lugar", { required: "Este campo es obligatorio" })}
        />
        {errors.lugar && (
          <span className={classNames(styles.Error)}>
            {errors.lugar.message}
          </span>
        )}
      </div>
    </div>
  );
};

export { EventFields };
