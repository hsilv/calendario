import { Meta, StoryFn } from "@storybook/react";
import { Event } from "./index";
import { EventProps } from "./types";

export default {
  title: "Molecules/Event",
  component: Event,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: StoryFn<EventProps> = (args) => <Event {...args} />;
export const Default = Template.bind({});
Default.args = {
  name: "Evento 1",
  desc: "Descripción del evento 1",
  init_date: new Date(),
  final_date: new Date(),
  lat: 0,
  lng: 0,
  place: "Lugar del evento 1",
  parkings: 52,
};
