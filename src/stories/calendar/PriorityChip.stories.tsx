import time from "@/lib/time";
import { Priority } from "@/types";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from '@storybook/preview-api';
import PriorityChip from "@/components/calendar/PriorityChip";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

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
    index: 0,
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

    return <PriorityChip {...args} priority={priority} onFinish={onFinish} />
  },
  /* eslint-enable */
  decorators: [
    (Story) => {
      return <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId='priorityList'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Story />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    },
  ]
}