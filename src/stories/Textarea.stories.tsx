import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from '@storybook/preview-api';
import Textarea from "@/components/common/textarea";

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: '',
    width: '100%',
    height: '5rem',
    placeholder: '',
    disabled: false,
    description: '',
  },
  /* eslint-disable */
  render: (args) => {
    const [{value}, updateArgs] = useArgs<{ value: string }>();

    const handleChange = (v: string) => {
      updateArgs({ value: v });
    };

    return <Textarea {...args} value={value} onChange={handleChange} />
  },
  /* eslint-enable */
}