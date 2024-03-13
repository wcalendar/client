import Input from "@/components/common/Input";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from '@storybook/preview-api';

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
  args: {
    value: '',
  },
  /* eslint-disable */
  render: (args) => {
    const [{value}, updateArgs] = useArgs<{ value: string }>();

    const handleChange = (v: string) => {
      updateArgs({ value: v });
    };

    return <Input {...args} value={value} onChange={handleChange} />
  },
  /* eslint-enable */
}