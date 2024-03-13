import CategoryCalendar from "@/components/calendar/category-calendar/CategoryCalendar";
import { calendarDummyData } from "@/dummies/calendar";
import { baseURL } from "@/lib/apis";
import { CurrentDateProvider } from "@/providers/CurrentDateProvider/CurrentDateProvider";
import { useCurrentDate } from "@/providers/CurrentDateProvider/useCurrentDate";
import { Meta, StoryObj } from "@storybook/react";
import { rest } from 'msw';
import { useArgs } from '@storybook/preview-api';
import time from "@/lib/time";

const meta = {
  title: 'Components/Calendar/CategoryCalendar',
  component: CategoryCalendar,
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [
        rest.get(`${baseURL}schedules/*`, (req, res, ctx) => {
          return res(ctx.json(calendarDummyData[0]));
        })
      ]
    }
  }
  
} satisfies Meta<typeof CategoryCalendar>

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    categoryToRenderList: [],
    openedCategories: {},
    selectedDate: undefined,
  },
  /* eslint-disable */
  render: (args) => {
    const { currentDate } = useCurrentDate();

    const [{ selectedDate }, updateArgs] = useArgs();
  
    const handleDateSelect = (value: number) => {
      updateArgs({ selectedDate: time.new(currentDate.year(), currentDate.month(), value) });
    };

    return <div style={{ width: '100%', height: '100vh' }}><CategoryCalendar {...args} selectedDate={selectedDate} onDateSelect={handleDateSelect} /></div>
  },
  /* eslint-enable */
  decorators: (Story) => {
    return (
      <CurrentDateProvider>
        <Story />
      </CurrentDateProvider>
    );
  }
}