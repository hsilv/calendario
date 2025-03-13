import { Meta, StoryFn } from "@storybook/react";
import { Calendar } from "./index";

export default {
  title: "Organisms/Calendar",
  component: Calendar,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: StoryFn = (args) => <Calendar {...args} />;
export const Default = Template.bind({});
