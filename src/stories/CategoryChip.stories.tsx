import CategoryChip from "@/components/calendar/CategoryChip";
import time from "@/lib/time";
import { NewCategoryToRender } from "@/types";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: 'Components/Calendar/CategoryChip',
  component: CategoryChip,
} satisfies Meta<typeof CategoryChip>

export default meta;
type Story = StoryObj<typeof meta>

const defaultCategoryToRender: NewCategoryToRender = {
  category: {
    id: 'c1',
    name: 'Category 1',
    level: 0,
    color: 'newRed',
    startDate: time.new(2024, 2, 1),
    endDate: time.new(2030, 2, 1),
    description: 'This is Category 1',
    isVisible: false,
    parentId: null,
    schedules: [],
    children: [{
      category: {
        id: 'c2',
        name: 'Category 2',
        level: 1,
        color: 'newRed',
        startDate: time.new(2024, 2, 1),
        endDate: time.new(2030, 2, 1),
        description: 'This is Category 2',
        isVisible: false,
        parentId: 'c1',
        schedules: [],
        children: [{
          category: {
            id: 'c3',
            name: 'Category 3',
            level: 2,
            color: 'newRed',
            startDate: time.new(2024, 2, 1),
            endDate: time.new(2030, 2, 1),
            description: 'This is Category 3',
            isVisible: false,
            parentId: 'c2',
            schedules: [],
            children: [],
          },
          lines: [],
        }],
      },
      lines: [],
    }],
  },
  lines: [],
};

const exampleCategoryToRender: NewCategoryToRender = {
  category: {
    id: 'c1',
    name: 'Category 1',
    level: 0,
    color: 'newRed',
    startDate: time.new(2024, 2, 1),
    endDate: time.new(2030, 2, 1),
    description: 'This is Category 1',
    isVisible: false,
    parentId: null,
    schedules: [],
    children: [{
      category: {
        id: 'c2',
        name: 'Category 2',
        level: 1,
        color: 'newRed',
        startDate: time.new(2024, 2, 1),
        endDate: time.new(2030, 2, 1),
        description: 'This is Category 2',
        isVisible: false,
        parentId: 'c1',
        schedules: [],
        children: [{
          category: {
            id: 'c3',
            name: 'Category 3',
            level: 2,
            color: 'newRed',
            startDate: time.new(2024, 2, 1),
            endDate: time.new(2030, 2, 1),
            description: 'This is Category 3',
            isVisible: false,
            parentId: 'c2',
            schedules: [],
            children: [],
          },
          lines: [],
        }],
      },
      lines: [],
    },
    {
      category: {
        id: 'c4',
        name: 'Category 4',
        level: 1,
        color: 'newRed',
        startDate: time.new(2024, 2, 1),
        endDate: time.new(2030, 2, 1),
        description: 'This is Category 4',
        isVisible: false,
        parentId: 'c1',
        schedules: [],
        children: [],
      },
      lines: [[], []],
    }
  ],
  },
  lines: [],
};

export const Default: Story = {
  args: {
    categoryToRender: defaultCategoryToRender,
  }
}

export const Example: Story = {
  args: {
    categoryToRender: exampleCategoryToRender,
  }
}