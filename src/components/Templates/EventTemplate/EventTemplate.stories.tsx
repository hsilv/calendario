import { Meta, StoryFn } from "@storybook/react";
import { EventTemplate } from "./index";

export default {
  title: "Templates/EventTemplate",
  component: EventTemplate,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: StoryFn = (args) => <EventTemplate {...args} />;
export const Default = Template.bind({});
