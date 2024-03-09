import CategoryCalendar from "@/components/calendar/category-calendar/CategoryCalendar";
import { calendarDummyData } from "@/dummies/calendar";
import { baseURL } from "@/lib/apis";
import { Meta, StoryObj } from "@storybook/react";
import { rest } from 'msw';

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
  /** eslint-disable */
  render: (args) => {
    return <div style={{ width: '100%', height: '100vh' }}><CategoryCalendar /></div>
  }
  /** eslint-enable */
}