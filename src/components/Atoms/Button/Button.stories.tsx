import { Meta, StoryFn } from "@storybook/react";
import { Button } from "./index";
import { ButtonProps } from "./types";

export default {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

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
