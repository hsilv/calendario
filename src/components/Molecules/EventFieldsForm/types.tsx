import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { AddEventFormValues } from "../AddEventForm/types";

type FormOption = "PMT" | "Vecino";

interface EventFieldsFormProps {
  register: UseFormRegister<AddEventFormValues>;
  errors: FieldErrors<AddEventFormValues>;
  watch: UseFormWatch<AddEventFormValues>;
  formOption?: FormOption;
}

export type { EventFieldsFormProps };
