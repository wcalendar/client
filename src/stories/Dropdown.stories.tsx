import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from '@storybook/preview-api';
import Dropdown from "@/components/common/dropdown/index";

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    values: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7'],
    selectedIdx: null,
    width: '100%',
    disabled: false,
    placeholder: 'Choose Item',
    description: 'description',
  },
  /* eslint-disable */
  render: (args) => {
    const [{ selectedIdx }, updateArgs] = useArgs<{ selectedIdx: number }>();

    const handleChange = (v: number) => {
      updateArgs({ selectedIdx: v });
    };

    return <Dropdown {...args} selectedIdx={selectedIdx} onChange={handleChange} />
  },
  /* eslint-enable */
}