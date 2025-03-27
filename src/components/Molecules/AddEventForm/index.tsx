import React, { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import classNames from "classnames";
import { format } from "date-fns";
import styles from "./AddEventForm.module.scss";
import { Button } from "@components/Atoms";
import { MapInput } from "@/components/Atoms/Map/input";
import useEvent from "@/hooks/useEvent";
import useCategory from "@/hooks/useCategory";
import { EventFields } from "../EventFieldsForm";
import { AddEventFormValues as FormValues } from "./types";
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

const AddEventForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    /*  control, */
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const { loading, findAll, categories } = useCategory();

  /* const { fields, append, remove } = useFieldArray({
    control,
    name: "parqueos",
    }); */

  const { createEvent, loading: LoadingCreating, event, setEvent } = useEvent();
  useEffect(() => {
    setEvent(null);
    findAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (event) {
      window.location.reload();
    }
  }, [event]);

  const latitud = watch("latitud");
  const longitud = watch("longitud");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formData = {
      ...data,
      latitud: latitud || data.latitud,
      longitud: longitud || data.longitud,
      fecha_inicial: format(new Date(data.fecha_inicial), "dd/MM/yyyy hh:mm a"),
      fecha_final: format(new Date(data.fecha_final), "dd/MM/yyyy hh:mm a"),
      tipo: Number(data.tipo),
      estimado: Number(data.estimado),
      oficio: data.oficio,
      /*   parqueos: data.parqueos.map((parqueo) => {
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
            latitud: parqueo.latitud,
            longitud: parqueo.longitud,
          };
        }
      }), */
    };
    console.log(formData);
    createEvent(formData);
  };

  return (
    <div className={classNames(styles.FormContainer)}>
      <form
        className={classNames(styles.Formulario)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <EventFields
          register={register}
          errors={errors}
          watch={watch}
          formOption="Vecino"
        />
        <div className={classNames(styles.FormGroup)}>
          <MapInput
            latFieldName="latitud"
            lngFieldName="longitud"
            register={register}
            setValue={setValue}
            className={styles.Map}
          />
          {errors.latitud && (
            <span className={classNames(styles.Error)}>
              {errors.latitud.message}
            </span>
          )}
        </div>

        {/* <div className={classNames(styles.Parking)}>
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
                latFieldName={`parqueos.${index}.latitud`}
                lngFieldName={`parqueos.${index}.longitud`}
                register={register}
                setValue={setValue}
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
        </div> */}
        {event && (
          <span className={classNames(styles.Success)}>
            Evento creado exitosamente, puede cerrar esta ventana
          </span>
        )}
        <Button type="submit" variant="success" disabled={LoadingCreating}>
          {LoadingCreating ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Cargando...
            </>
          ) : (
            "Agregar Evento"
          )}
        </Button>
      </form>
    </div>
  );
};

export { AddEventForm };
