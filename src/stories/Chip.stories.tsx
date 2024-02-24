import Chip from "@/components/common/Chip";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: 'newRed',
    label: 'chip',
  }
};