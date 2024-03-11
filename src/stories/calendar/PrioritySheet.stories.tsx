import { Meta, StoryObj } from "@storybook/react";
import PrioritySheet from "@/components/calendar/PrioritySheet";
import time from "@/lib/time";
import { Priority } from "@/types";
import { rest } from "msw";
import { baseURL } from "@/lib/apis";
import { calendarDummyData } from "@/dummies/calendar";

const meta = {
  title: 'Components/Calendar/PrioritySheet',
  component: PrioritySheet,
  parameters: {
    msw: {
      handlers: [
        rest.get(`${baseURL}schedules/*`, (req, res, ctx) => {
          return res(ctx.json(calendarDummyData[0]));
        }),
        rest.put(`${baseURL}schedules`, (req, res, ctx) => {
          return res(ctx.json({}));
        })
      ]
    }
  }
} satisfies Meta<typeof PrioritySheet>

export default meta;
type Story = StoryObj<typeof meta>

const priorities: Priority[] = [
  {
    categoryId: 'c1',
    scheduleId: 's1',
    groupCode: 'g1',
    date: time.now(),
    priority: 1,
    isFinished: false,
    color: 'newGreen',
    level: 0,
    content: 'Priority Chip',
  },
  {
    categoryId: 'c2',
    scheduleId: 's2',
    groupCode: 'g2',
    date: time.now(),
    priority: 2,
    isFinished: false,
    color: 'newRed',
    level: 0,
    content: 'SChedule',
  },
  {
    categoryId: 'c3',
    scheduleId: 's3',
    groupCode: 'g3',
    date: time.now(),
    priority: 3,
    isFinished: false,
    color: 'newPink',
    level: 0,
    content: 'Priority Chip 3',
  },
];

export const Default: Story = {
  args: {
    date: time.now(),
    priorities,
  }
  /* eslint-disable */
  /* eslint-enable */
}