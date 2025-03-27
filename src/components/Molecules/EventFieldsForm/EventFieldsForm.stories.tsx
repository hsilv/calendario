import { Meta, StoryFn } from "@storybook/react";
import { EventFields } from "./index";
import { useForm } from "react-hook-form";
import { AddEventFormValues } from "../AddEventForm/types";

export default {
  title: "Molecules/EventFieldsForm",
  component: EventFields,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: StoryFn = (args) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddEventFormValues>({
    defaultValues: {
      nombre: "",
      descripcion: "",
      propietario: "",
      tipo: undefined,
      estimado: 0,
      oficio: "",
      fecha_inicial: "",
      fecha_final: "",
      lugar: "",
    },
  });

  const onSubmit = (data: AddEventFormValues) => {
    console.log("Formulario enviado:", data);
  };

  return (
    <form
      onSubmit={(e) => {
        console.log("Submit disparado");
        handleSubmit(onSubmit)(e);
      }}
    >
      <EventFields
        {...args}
        register={register}
        errors={errors}
        watch={watch}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export const Default = Template.bind({});
Default.args = {
  formOption: "Vecino",
};
