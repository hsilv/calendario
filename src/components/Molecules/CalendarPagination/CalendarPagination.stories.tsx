import { Meta, StoryFn } from "@storybook/react";
import { CalendarPagination } from "./index";

export default {
  title: "Molecules/CalendarPagination",
  component: CalendarPagination,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: StoryFn = (args) => <CalendarPagination {...args} />;
export const Default = Template.bind({});
