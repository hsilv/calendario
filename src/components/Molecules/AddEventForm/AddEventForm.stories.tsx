import { Meta, StoryFn } from "@storybook/react";
import { AddEventForm } from "./index";

export default {
  title: "Molecules/AddEventForm",
  component: AddEventForm,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: StoryFn = (args) => <AddEventForm pmt={false} {...args} />;
export const Default = Template.bind({});
