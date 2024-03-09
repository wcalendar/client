import time from "@/lib/time";
import { NewScheduleToRender, Priority } from "@/types";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from '@storybook/preview-api';
import PriorityChip from "@/components/calendar/PriorityChip";

const meta = {
  title: 'Components/Calendar/PriorityChip',
  component: PriorityChip,
} satisfies Meta<typeof PriorityChip>

export default meta;
type Story = StoryObj<typeof meta>

const priority: Priority = {
  categoryId: 'c1',
  scheduleId: 's1',
  groupCode: 'g1',
  date: time.now(),
  priority: 1,
  isFinished: false,
  color: 'newGreen',
  level: 0,
  content: 'Priority Chip',
}

export const Default: Story = {
  args: {
    priority: priority,
  },
  /* eslint-disable */
  render: (args) => {
    const [{priority}, updateArgs] = useArgs<{ priority: Priority }>();

    const onFinish = () => {
      updateArgs({
        priority: {
          ...priority,
          isFinished: !priority.isFinished,
        },
      });
    };

    return <PriorityChip priority={priority} onFinish={onFinish} />
  },
  /* eslint-enable */
}