import { Meta, StoryFn } from "@storybook/react";
import { CalendarHeader } from "./index";

export default {
  title: "Organisms/CalendarHeader",
  component: CalendarHeader,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: StoryFn = (args) => <CalendarHeader {...args} />;
export const Default = Template.bind({});
