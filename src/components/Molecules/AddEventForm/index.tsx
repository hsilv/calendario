import React, { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import classNames from "classnames";
import { format } from "date-fns";
import styles from "./AddEventForm.module.scss";
import { Button } from "@components/Atoms";
import { MapInput } from "@/components/Atoms/Map/input";
import useEvent from "@/hooks/useEvent";
import { EventFields } from "../EventFieldsForm";
import { AddEventFormValues as FormValues } from "./types";
import { Spinner } from "react-bootstrap";

import { AddParkingsForm } from "../AddParkingsForm";

const AddEventForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "parqueos",
  });

  const { createEvent, loading: LoadingCreating, event, setEvent } = useEvent();

  useEffect(() => {
    setEvent(null);
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
      parqueos: data.parqueos.map((parqueo) => {
        return {
          ...parqueo,
          latitud: parqueo.lat,
          longitud: parqueo.lng,
        };
      }),
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
          formOption="PMT"
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

        {/* Incluir AddParkingsForm */}
        <AddParkingsForm
          fields={fields}
          append={append}
          remove={remove}
          register={register}
          errors={errors}
          setValue={setValue}
        />

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
