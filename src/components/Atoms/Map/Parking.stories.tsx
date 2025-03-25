import { Meta, StoryFn } from "@storybook/react";
import { ParkingMap, ParkingMapProps } from "./parkings";

export default {
  title: "Atoms/ParkingMap",
  component: ParkingMap,
  argTypes: {
    lat: { control: "number" },
    lng: { control: "number" },
    parqueos: { control: "object" },
  },
} as Meta;

const Template: StoryFn<ParkingMapProps> = (args) => <ParkingMap {...args} />;

export const Default = Template.bind({});
Default.args = {
  lat: 51.505,
  lng: -0.09,
  parqueos: [
    { latitud: 51.515, longitud: -0.1 },
    { latitud: 51.525, longitud: -0.11 },
  ],
};
