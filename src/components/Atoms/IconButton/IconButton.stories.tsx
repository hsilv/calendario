import { Meta, StoryFn } from "@storybook/react";
import { IconButton } from "./index";
import { ButtonProps } from "./types";

export default {
  title: "Atoms/IconButton",
  component: IconButton,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <IconButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  children: "Primary Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  children: "Secondary Button",
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
  children: "Success Button",
};
