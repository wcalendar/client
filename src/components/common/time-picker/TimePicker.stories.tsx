import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from '@storybook/preview-api';
import { ChangeEventHandler, useState } from "react";
import time from "@/lib/time";
import TimePicker from ".";

const meta = {
  title: 'Components/TimePicker',
  component: TimePicker,
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '12.5rem',
  },
  /* eslint-disable */
  render: (args) => {
    return <TimePicker {...args}/>
  },
  /* eslint-enable */
};