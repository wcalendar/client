import MonthPicker from "@/components/common/month-picker/MonthPicker";
import time from "@/lib/time";
import { Meta, StoryObj } from "@storybook/react";
import dayjs, { Dayjs } from "dayjs";
import { useArgs } from '@storybook/preview-api';

const meta = {
  title: 'Components/MonthPicker',
  component: MonthPicker,
  argTypes: {
    value: {
      control: 'date'
    }
  },
} satisfies Meta<typeof MonthPicker>

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    buttonType: 'big',
    value: time.now(),
  },
  /* eslint-disable */
  render: (args) => {
    const [{value}, updateArgs] = useArgs<{ value: number }>();

    const handleChange = (value: Dayjs) => {
      updateArgs({value: value.valueOf()});
    }

    return <MonthPicker {...args} value={dayjs(value)} onChange={handleChange} />
  },
  /* eslint-enable */
}