import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from '@storybook/preview-api';
import ToggleButton from "@/components/common/toggle-button";

const meta = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    checked: false,
  },
  /* eslint-disable */
  render: (args) => {
    const [{value}, updateArgs] = useArgs<{ value: boolean }>();

    const handleChange = (v: boolean) => {
      updateArgs({ value: v });
    };

    return <ToggleButton {...args} checked={value} onChange={handleChange} />
  },
  /* eslint-enable */
}