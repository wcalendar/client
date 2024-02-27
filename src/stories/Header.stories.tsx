
import Header from "@/components/common/new-header/Header";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: 'Components/Header',
  component: Header,
  argTypes: {},
} satisfies Meta<typeof Header>

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
}