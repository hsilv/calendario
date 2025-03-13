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
Default.args = {};
