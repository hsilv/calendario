import React from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import classNames from "classnames";
import { format } from "date-fns";
import styles from "./AddEventForm.module.scss";
import { Button, Input } from "@components/Atoms";
import { MapInput } from "@/components/Atoms/Map/input";
import useEvent from "@/hooks/useEvent";

type Parqueo = {
  direccion: string;
  location: string;
  capacidad_total: number;
  capacidad_usada: number;
  latitud: string;
  longitud: string;
};

type FormValues = {
  nombre: string;
  descripcion: string;
  propietario: string;
  lugar: string;
  fecha_inicial: string;
  fecha_final: string;
  location: string;
  oficio: string;
  latitud: string;
  longitud: string;
  estimado: number;
  parqueos: Parqueo[];
};

const AddEventForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "parqueos",
  });

  const { createEvent } = useEvent();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const [latitud, longitud] = data.location.split(",");
    const formData = {
      ...data,
      latitud,
      longitud,
      fecha_inicial: format(new Date(data.fecha_inicial), "dd/MM/yyyy hh:mm a"),
      fecha_final: format(new Date(data.fecha_final), "dd/MM/yyyy hh:mm a"),
      parqueos: data.parqueos.map((parqueo) => {
        const [lat, lng] = parqueo.location.split(",");
        return {
          ...parqueo,
          latitud: lat,
          longitud: lng,
        };
      }),
    };
    console.log(formData);
    createEvent(formData);
  };

  const handleLocationChange = (index: number, value: string) => {
    setValue(`parqueos.${index}.location`, value);
  };

  return (
    <div className={classNames(styles.FormContainer)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classNames(styles.FormGroup)}>
          <Input
            label="Nombre del evento"
            {...register("nombre", {
              required: "Este campo es obligatorio",
            })}
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
            label="Lugar"
            {...register("lugar", { required: "Este campo es obligatorio" })}
          />
          {errors.lugar && (
            <span className={classNames(styles.Error)}>
              {errors.lugar.message}
            </span>
          )}
        </div>
        <div className={classNames(styles.FormGroup)}>
          <MapInput
            {...register("location", {
              required: "Este campo es obligatorio",
            })}
            className={styles.Map}
          />
          {errors.location && (
            <span className={classNames(styles.Error)}>
              {errors.location.message}
            </span>
          )}
        </div>
        <div className={classNames(styles.FormGroup)}>
          <Input
            label="Oficio"
            {...register("oficio", { required: "Este campo es obligatorio" })}
          />
          {errors.oficio && (
            <span className={classNames(styles.Error)}>
              {errors.oficio.message}
            </span>
          )}
        </div>
        <div className={classNames(styles.FormGroup)}>
          <Input
            label="Estimado de visitantes"
            {...register("estimado", { required: "Este campo es obligatorio" })}
            type="number"
          />
          {errors.estimado && (
            <span className={classNames(styles.Error)}>
              {errors.estimado.message}
            </span>
          )}
        </div>

        <div className={classNames(styles.Parking)}>
          <label>Parqueos del evento</label>

          {fields.map((field, index) => (
            <div key={field.id} className={classNames(styles.ParqueoGroup)}>
              <h4>Parqueo {index + 1}</h4>
              <Input
                label="Dirección"
                {...register(`parqueos.${index}.direccion`, {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.parqueos?.[index]?.direccion && (
                <span className={classNames(styles.Error)}>
                  {errors.parqueos[index].direccion?.message}
                </span>
              )}
              <MapInput
                {...register(`parqueos.${index}.location`, {
                  onChange: (e) => handleLocationChange(index, e.target.value),
                })}
                className={styles.Map}
              />
              {errors.parqueos?.[index]?.location && (
                <span className={classNames(styles.Error)}>
                  {errors.parqueos[index].location?.message}
                </span>
              )}
              <Input
                label="Capacidad Total"
                type="number"
                {...register(`parqueos.${index}.capacidad_total`, {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.parqueos?.[index]?.capacidad_total && (
                <span className={classNames(styles.Error)}>
                  {errors.parqueos[index].capacidad_total?.message}
                </span>
              )}
              <Input
                label="Capacidad Usada"
                type="number"
                {...register(`parqueos.${index}.capacidad_usada`, {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.parqueos?.[index]?.capacidad_usada && (
                <span className={classNames(styles.Error)}>
                  {errors.parqueos[index].capacidad_usada?.message}
                </span>
              )}
              <Button
                variant="danger"
                type="button"
                onClick={() => remove(index)}
              >
                Eliminar
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="success"
            onClick={() =>
              append({
                direccion: "",
                location: "",
                capacidad_total: 0,
                capacidad_usada: 0,
                latitud: "",
                longitud: "",
              })
            }
          >
            + Agregar Parqueo
          </Button>
        </div>

        <Button type="submit">Agregar</Button>
      </form>
      <div className={classNames(styles.ErrorsContainer)}>
        {Object.keys(errors).length > 0 && (
          <div>
            <h4>Errores del formulario:</h4>
            <ul>
              {Object.entries(errors).map(([key, value]) => (
                <li key={key}>
                  {key}: {value.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export { AddEventForm };
