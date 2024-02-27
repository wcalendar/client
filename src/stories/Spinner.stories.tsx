import Spinner from "@/components/common/new-spinner/Spinner";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {},
} satisfies Meta<typeof Spinner>

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
}