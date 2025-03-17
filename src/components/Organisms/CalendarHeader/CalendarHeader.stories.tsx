import { Meta, StoryFn } from "@storybook/react";
import { CalendarHeader } from "./index";
import { CalendarHeaderProps } from "./types";
import { CalendarProvider } from "@/context/Calendar/calendarContext";

export default {
  title: "Organisms/CalendarHeader",
  component: CalendarHeader,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <CalendarProvider>
        <Story />
      </CalendarProvider>
    ),
  ],
} as Meta;

const Template: StoryFn<CalendarHeaderProps> = (args) => (
  <CalendarHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onAddEvent: () => console.log("Add Event"),
  currentDate: new Date(),
};
