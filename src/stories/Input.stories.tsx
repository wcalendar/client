import Input from "@/components/common/Input";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
}