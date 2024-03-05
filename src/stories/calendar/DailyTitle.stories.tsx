import DailyTitle from "@/components/calendar/DailyTitle";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: 'Components/Calendar/DailyTitle',
  component: DailyTitle,
  argTypes: {
    date: {
      control: {
        type: 'number',
        min: 1,
        max: 31,
      }
    },
    day: {
      control: {
        type: 'number',
        min: 0,
        max: 6,
      }
    }
  },
} satisfies Meta<typeof DailyTitle>

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    date: 3,
    day: 2,
    selected: false,
  }
}