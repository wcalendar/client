import SearchBar from "@/components/common/SearchBar/SearchBar";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  argTypes: {},
} satisfies Meta<typeof SearchBar>

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {

    return <SearchBar {...args} />
  },
}