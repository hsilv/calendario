import { Meta, StoryFn } from "@storybook/react";
import { CalendarDisplayOptions } from "./index";

export default {
  title: "Molecules/CalendarDisplayOptions",
  component: CalendarDisplayOptions,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: StoryFn = (args) => <CalendarDisplayOptions {...args} />;
export const Default = Template.bind({});
