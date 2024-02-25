import CheckBox from "@/components/common/CheckBox";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from '@storybook/preview-api';
import { ChangeEventHandler, useState } from "react";

const meta = {
  title: 'Components/CheckBox',
  component: CheckBox,
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: true,
  },
  /* eslint-disable */
  render: (args) => {
    const [{checked}, updateArgs] = useArgs();

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      updateArgs({checked: e.target.checked});
    };

    return <CheckBox {...args} onChange={handleChange} checked={checked} />
  },
  /* eslint-enable */
};