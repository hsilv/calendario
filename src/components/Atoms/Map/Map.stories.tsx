import { Meta, StoryFn } from "@storybook/react";
import { Map } from "./index";

export default {
  title: "Atoms/Map",
  component: Map,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: StoryFn = (args) => <Map {...args} />;

export const Default = Template.bind({});
Default.args = {
  lat: 51.505,
  lng: -0.09,
  className: "custom-map-class",
};

export const WithGeolocation = Template.bind({});
WithGeolocation.args = {
  lat: undefined,
  lng: undefined,
  className: "custom-map-class",
};
