import { Meta, StoryFn } from "@storybook/react";
import { MapInput } from "./input";
import { useForm, Controller } from "react-hook-form";

export default {
  title: "Atoms/MapInput",
  component: MapInput,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: StoryFn = () => {
  const { control } = useForm({
    defaultValues: {
      location: "51.505,-0.09",
    },
  });

  return (
    <Controller
      name="location"
      control={control}
      render={({ field }) => {
        const [lat, lng] =
          typeof field.value === "string" ? field.value.split(",") : ["", ""];
        return (
          <MapInput
            latProps={{ ...field, value: lat }}
            lngProps={{ ...field, value: lng }}
            className="custom-map-class"
          />
        );
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  latProps: { value: "51.505" },
  lngProps: { value: "-0.09" },
  className: "custom-map-class",
};

export const WithGeolocation = Template.bind({});
WithGeolocation.args = {
  latProps: { value: "" },
  lngProps: { value: "" },
  className: "custom-map-class",
};
