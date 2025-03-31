import React, { useEffect, useState } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFieldArrayReturn,
} from "react-hook-form";
import { Input } from "@components/Atoms";
import { MapInput } from "@/components/Atoms/Map/input";
import { Button, Spinner } from "react-bootstrap";
import classNames from "classnames";
import styles from "./AddParkingsForm.module.scss";
import { AddEventFormValues } from "../AddEventForm/types";
import { UseFormSetValue } from "react-hook-form";
import useParking from "@/hooks/useParking";

interface AddParkingsFormProps {
  fields: UseFieldArrayReturn<AddEventFormValues, "parqueos">["fields"];
  append: UseFieldArrayReturn<AddEventFormValues, "parqueos">["append"];
  remove: UseFieldArrayReturn<AddEventFormValues, "parqueos">["remove"];
  register: UseFormRegister<AddEventFormValues>;
  errors: FieldErrors<AddEventFormValues>;
  setValue: UseFormSetValue<AddEventFormValues>;
}

const AddParkingsForm: React.FC<AddParkingsFormProps> = ({
  fields,
  append,
  remove,
  register,
  errors,
  setValue,
}) => {
  const { findMany, parkings, loading } = useParking();
  const [, setSelectedParkingId] = useState<string | null>(null);
  const [defaultLng, setDefaultLng] = useState<number | undefined>();
  const [defaultLat, setDefaultLat] = useState<number | undefined>();

  useEffect(() => {
    console.log(parkings);
  }, [parkings]);

  const handleDescriptionChange = async (index: number, value: string) => {
    setValue(`parqueos.${index}.descripcion`, value); // Actualiza el valor del campo
    await findMany(value); // Realiza la búsqueda según el criterio
  };

  useEffect(() => {
    console.log(defaultLat);
  }, [defaultLat]);

  const handleParkingSelect = (index: number, value: string) => {
    const selectedParking = parkings.find(
      (parking) => parking.descripcion === value
    );
    if (selectedParking) {
      // Actualiza todos los campos excepto "reservados"
      setValue(`parqueos.${index}.descripcion`, selectedParking.descripcion);
      setValue(`parqueos.${index}.direccion`, selectedParking.direccion);
      setValue(`parqueos.${index}.lat`, selectedParking.latitud);
      setValue(`parqueos.${index}.lng`, selectedParking.longitud);
      setValue(`parqueos.${index}.capacidad`, selectedParking.capacidad || 0); // Si "capacidad" no está en los datos, usa 0 como valor predeterminado
      setValue(`parqueos.${index}.id`, selectedParking.id); // Agrega el ID del parqueo seleccionado

      setSelectedParkingId(selectedParking.id); // Guarda el ID seleccionado

      setDefaultLat(selectedParking.latitud);
      setDefaultLng(selectedParking.longitud);
    }
  };

  return (
    <div className={classNames(styles.Parking)}>
      <label className={classNames(styles.Label)}>Parqueos del evento</label>

      {fields.map((field, index) => (
        <div
          key={field.id || index}
          className={classNames(styles.ParqueoGroup)}
        >
          <h4>Parqueo {index + 1}</h4>
          <div className={classNames(styles.InputGroup)}>
            <Input
              label="Descripcion"
              list={`parqueos-suggestions-${index}`}
              className={classNames(styles.Input)}
              {...register(`parqueos.${index}.descripcion`, {
                required: "Este campo es obligatorio",
                onChange: (e) => handleDescriptionChange(index, e.target.value), // Llama a la función al cambiar
              })}
              onBlur={(e) => handleParkingSelect(index, e.target.value)} // Detecta la selección
            />
            {parkings && (
              <datalist id={`parqueos-suggestions-${index}`}>
                {parkings.map((parking) => (
                  <option key={parking.id} value={parking.descripcion} />
                ))}
              </datalist>
            )}
            {loading && (
              <Spinner
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className={classNames(styles.LoadingSpinner)}
              />
            )}
          </div>
          {errors.parqueos?.[index]?.descripcion && (
            <span className={classNames(styles.Error)}>
              {errors.parqueos[index].descripcion?.message}
            </span>
          )}
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
            latFieldName={`parqueos.${index}.lat`}
            lngFieldName={`parqueos.${index}.lng`}
            lat={defaultLat}
            lng={defaultLng}
            register={register}
            setValue={setValue}
            className={styles.Map}
          />
          {errors.parqueos?.[index]?.lat && (
            <span className={classNames(styles.Error)}>
              {errors.parqueos[index].lat?.message}
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
            {...register(`parqueos.${index}.reservados`, {
              required: "Este campo es obligatorio",
            })}
          />
          {errors.parqueos?.[index]?.reservados && (
            <span className={classNames(styles.Error)}>
              {errors.parqueos[index].reservados?.message}
            </span>
          )}
          <Button variant="danger" type="button" onClick={() => remove(index)}>
            Eliminar
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="success"
        className={classNames(styles.Button)}
        onClick={() =>
          append({
            descripcion: "",
            direccion: "",
            capacidad: 0,
            reservados: 0,
            lat: 14.626861756068456,
            lng: -90.515273809433,
          })
        }
      >
        + Agregar Parqueo
      </Button>
    </div>
  );
};

export { AddParkingsForm };
