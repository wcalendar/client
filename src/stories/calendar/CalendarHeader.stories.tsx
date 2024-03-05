import CalendarHeader, { CalendarMode } from "@/components/calendar/CalendarHeader";
import { CurrentDateProvider } from "@/providers/CurrentDateProvider/CurrentDateProvider";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from '@storybook/preview-api';

const meta = {
  title: 'Components/Calendar/CalendarHeader',
  component: CalendarHeader,
} satisfies Meta<typeof CalendarHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    calendarMode: 'category',
  },
  render: (args) => {
    const [{calendarMode}, updateArgs] = useArgs<{calendarMode: CalendarMode}>();

    const handleCalendarModeChange = (value: CalendarMode) => {
      updateArgs({calendarMode: value});
    };

    return <CalendarHeader {...args} calendarMode={calendarMode} onCalendarModeChange={handleCalendarModeChange} />
  },
  decorators: [
    (Story) => {
      return <CurrentDateProvider><Story /></CurrentDateProvider>
    },
  ]
};