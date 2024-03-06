import ScheduleChip from "@/components/calendar/ScheduleChip";
import time from "@/lib/time";
import { NewScheduleToRender } from "@/types";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from '@storybook/preview-api';

const meta = {
  title: 'Components/Calendar/ScheduleChip',
  component: ScheduleChip,
} satisfies Meta<typeof ScheduleChip>

export default meta;
type Story = StoryObj<typeof meta>

const scheduleToRender: NewScheduleToRender = {
  categoryId: 'c1',
  categoryColor: 'newRed',
  categoryLevel: 0,
  id: 's1',
  groupCode: 'g1',
  content: 'Schedule 1',
  isPriority: true,
  isFinished: false,
  startDate: time.new(2024,2,1),
  endDate: time.new(2024,2,3),
  startDayToRender: 1,
  endDayToRender: 3,
};

export const Default: Story = {
  args: {
    schedule: scheduleToRender,
  },
  render: (args) => {
    const [{schedule}, updateArgs] = useArgs<{ schedule: NewScheduleToRender }>();

    const handleFinish = () => {
      updateArgs({
        schedule: {
          ...schedule,
          isFinished: !schedule.isFinished,
        }
      });
    };

    return <ScheduleChip schedule={schedule} onFinish={handleFinish} />
  }
}