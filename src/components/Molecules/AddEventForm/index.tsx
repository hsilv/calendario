import React, { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import classNames from "classnames";
import { format } from "date-fns";
import styles from "./AddEventForm.module.scss";
import { Button, Input } from "@components/Atoms";
import { MapInput } from "@/components/Atoms/Map/input";
import useEvent from "@/hooks/useEvent";
import useCategory from "@/hooks/useCategory";
import { Spinner } from "react-bootstrap";

type Parqueo = {
  descripcion: string;
  direccion: string;
  location: string;
  capacidad: number;
  requeridos: number;
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
  tipo: number;
};

const AddEventForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const { loading, findAll, categories } = useCategory();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "parqueos",
  });

  const { createEvent } = useEvent();

  useEffect(() => {
    findAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    let latitud;
    let longitud;
    if (data.location) {
      [latitud, longitud] = data.location.split(",");
    }
    const formData = {
      ...data,
      latitud,
      longitud,
      fecha_inicial: format(new Date(data.fecha_inicial), "dd/MM/yyyy hh:mm a"),
      fecha_final: format(new Date(data.fecha_final), "dd/MM/yyyy hh:mm a"),
      parqueos: data.parqueos.map((parqueo) => {
        if (parqueo.location) {
          const [lat, lng] = parqueo.location.split(",");
          return {
            ...parqueo,
            latitud: lat,
            longitud: lng,
          };
        } else {
          return {
            ...parqueo,
            latitud: "",
            longitud: "",
          };
        }
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
          <label htmlFor="tipo" className="form-label">
            Tipo de evento
          </label>
          <div className="d-flex align-items-center">
            <select
              id="tipo"
              className="form-select"
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
            </select>
            {loading && (
              <Spinner
                animation="border"
                role="status"
                size="sm"
                className="ms-2"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </div>
          {errors.tipo && (
            <span className={classNames(styles.Error)}>
              {errors.tipo.message}
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
                label="Descripción"
                {...register(`parqueos.${index}.descripcion`, {
                  required: "Este campo es obligatorio",
                })}
              />
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
                {...register(`parqueos.${index}.capacidad`, {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.parqueos?.[index]?.capacidad && (
                <span className={classNames(styles.Error)}>
                  {errors.parqueos[index].capacidad?.message}
                </span>
              )}
              <Input
                label="Capacidad Usada"
                type="number"
                {...register(`parqueos.${index}.requeridos`, {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.parqueos?.[index]?.requeridos && (
                <span className={classNames(styles.Error)}>
                  {errors.parqueos[index].requeridos?.message}
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
                descripcion: "",
                direccion: "",
                location: "",
                capacidad: 0,
                requeridos: 0,
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
    </div>
  );
};

export { AddEventForm };
