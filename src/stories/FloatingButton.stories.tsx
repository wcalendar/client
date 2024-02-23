import FloatingButton from "@/components/common/FloatingButton";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: 'Components/FloatingButton',
  component: FloatingButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof FloatingButton>

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
}