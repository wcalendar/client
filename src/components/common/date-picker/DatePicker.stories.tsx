import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from '@storybook/preview-api';
import { ChangeEventHandler, useState } from "react";
import DatePicker from ".";
import time from "@/lib/time";

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  argTypes: {
    min: {
      control: 'date',
    },
    max: {
      control: 'date',
    }
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '100%',
  },
  /* eslint-disable */
  render: (args) => {
    const [{checked}, updateArgs] = useArgs();

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      updateArgs({checked: e.target.checked});
    };

    return <DatePicker {...args}/>
  },
  /* eslint-enable */
};