import time from "@/lib/time";
import { Dayjs } from "dayjs";

export type CategoryColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray';

export type ScheduleDto = {
  scheduleId: number;
  categoryId: number;
  scheduleContent: string;
  scheduleDate: string;
  schedulePriority: number;
  finished: boolean;
}

export type CategoryDto = {
  categoryId: number;
  categoryName: string;
  categoryLevel: number;
  categoryColor: CategoryColor;
  categoryStartDate: string;
  categoryEndDate: string;
  categoryDescription: string;
  categoryVisible: boolean;
  schedules: ScheduleDto[];
  children: CategoryDto[];
}

export type ScheduleWithoutCategoryDto = {
  id: number;
  title: string;
  // body: string;
  startDate: Date;
  endDate: Date;
  isFinished: boolean;
}

export type ScheduleWithoutCategory = {
  id: number;
  title: string;
  // body: string;
  startDate: Dayjs;
  endDate: Dayjs;
  isFinished: boolean;
}

export interface CategoryWithScheduleDto extends CategoryDto {
  scheduleList: ScheduleWithoutCategoryDto[];
}

export type CategoryWithSchedule = {
  id: number;
  name: string;
  level: number;
  color: CategoryColor;
  memo?: string;
  scheduleList: ScheduleWithoutCategory[];
}

type CalendarResDto = {
  resultMessage: string;
  resultBody: CategoryDto[];
}

const range = (y: number, m: number, fd: number, td: number, schedule: Omit<ScheduleDto, 'scheduleDate'>): ScheduleDto[] => {
  const result: ScheduleDto[] = [];

  for(let i=fd; i<=td; i++) {
    result.push({
      ...schedule,
      scheduleDate: time.toString(time.new(y, m, i), 'YYYY-MM-DD'),
    });
  }

  return result;
}

const y = time.now().year();
const m = time.now().month();

const newDummyCategory = (i: number, color: CategoryColor): CategoryDto[] => {
  return [
    {
      categoryId: i,
      categoryName: "W Calendar",
      categoryLevel: 0,
      categoryColor: color,
      categoryStartDate: time.toString(time.new(2024, 0), 'YYYY-MM-DD'),
      categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
      categoryDescription: "W calendar is good",
      categoryVisible: true,
      schedules: [
        ...range(y, m, 1, 7, {
          scheduleId: i+1,
          categoryId: i,
          scheduleContent: "Splash Page",
          schedulePriority: i,
          finished: false,
        }),
      ],
      children: [
        {
          categoryId: i+2,
          categoryName: 'Test',
          categoryLevel: 1,
          categoryColor: color,
          categoryStartDate: time.toString(time.new(2024, 0), 'YYYY-MM-DD'),
          categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
          categoryDescription: "It is test",
          categoryVisible: true,
          schedules: [
            ...range(y, m, 4, 7, {
              scheduleId: i+3,
              categoryId: i+2,
              scheduleContent: "Splash Test",
              schedulePriority: i+1,
              finished: false,
            }),
          ],
          children: [],
        },
        {
          categoryId: i+4,
          categoryName: 'Deploy',
          categoryLevel: 1,
          categoryColor: color,
          categoryStartDate: time.toString(time.new(2024, 0), 'YYYY-MM-DD'),
          categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
          categoryDescription: "How to Deploy",
          categoryVisible: true,
          schedules: [],
          children: [
            {
              categoryId: i+5,
              categoryName: 'AWS',
              categoryLevel: 2,
              categoryColor: color,
              categoryStartDate: time.toString(time.new(2024, 0), 'YYYY-MM-DD'),
              categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
              categoryDescription: "AWS is hard",
              categoryVisible: true,
              schedules: [
                ...range(y, m, 27, 27, {
                  scheduleId: i+5,
                  categoryId: i+4,
                  scheduleContent: "배포하기",
                  schedulePriority: i+2,
                  finished: false,
                })
              ],
              children: [],
            }
          ],
        },
      ]
    },
  ]
}

const calendarDummyData: CalendarResDto = {
  resultMessage: 'success',
  resultBody: [
    {
      categoryId: 100,
      categoryName: 'Test',
      categoryLevel: 0,
      categoryColor: 'green',
      categoryStartDate: time.toString(time.new(2024, 0), 'YYYY-MM-DD'),
      categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
      categoryDescription: "하하",
      categoryVisible: true,
      schedules: [
        ...range(y, m, 2, 20, {
          scheduleId: 101,
          categoryId: 100,
          scheduleContent: "긴 일정",
          schedulePriority: 100,
          finished: false,
        }),
        ...range(y, m, 2, 10, {
          scheduleId: 102,
          categoryId: 100,
          scheduleContent: "중간 일정",
          schedulePriority: 101,
          finished: false,
        }),
        ...range(y, m, 2, 3, {
          scheduleId: 103,
          categoryId: 100,
          scheduleContent: "짧은 일정",
          schedulePriority: 102,
          finished: false,
        }),
        ...range(y, m, 10, 20, {
          scheduleId: 104,
          categoryId: 100,
          scheduleContent: "가운데 중간 일정",
          schedulePriority: 103,
          finished: false,
        }),
        ...range(y, m, 11, 20, {
          scheduleId: 105,
          categoryId: 100,
          scheduleContent: "가운데 중간 일정2",
          schedulePriority: 104,
          finished: false,
        }),
      ],
      children: [],
    },
    ...newDummyCategory(1, 'red'),
    ...newDummyCategory(8, 'orange'),
    ...newDummyCategory(15, 'yellow'),
    ...newDummyCategory(22, 'green'),
    ...newDummyCategory(29, 'blue'),
    ...newDummyCategory(36, 'purple'),
    ...newDummyCategory(42, 'gray'),
    ...newDummyCategory(49, 'red'),
  ],
}

const categoryListDummyData: CategoryDto[] = [
  {
    categoryId: 1,
    categoryName: '카테고리 1',
    categoryLevel: 0,
    categoryColor: 'red',
    categoryStartDate: time.toString(time.new(2024, 0), 'YYYY-MM-DD'),
    categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
    categoryDescription: "하하",
    categoryVisible: true,
    schedules: [],
    children: [],
  },
  {
    categoryId: 2,
    categoryName: '카테고리 2',
    categoryLevel: 1,
    categoryColor: 'blue',
    categoryStartDate: time.toString(time.new(2024, 0), 'YYYY-MM-DD'),
    categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
    categoryDescription: "하하",
    categoryVisible: true,
    schedules: [],
    children: [],
  },
  {
    categoryId: 3,
    categoryName: '카테고리 3',
    categoryLevel: 2,
    categoryColor: 'blue',
    categoryStartDate: time.toString(time.new(2024, 0), 'YYYY-MM-DD'),
    categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
    categoryDescription: "하하",
    categoryVisible: true,
    schedules: [],
    children: [],
  },
  {
    categoryId: 4,
    categoryName: '카테고리 4',
    categoryLevel: 1,
    categoryColor: 'blue',
    categoryStartDate: time.toString(time.new(2024, 0), 'YYYY-MM-DD'),
    categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
    categoryDescription: "하하",
    categoryVisible: true,
    schedules: [],
    children: [],
  },
  {
    categoryId: 5,
    categoryName: '카테고리 5',
    categoryLevel: 0,
    categoryColor: 'blue',
    categoryStartDate: time.toString(time.new(2024, 0), 'YYYY-MM-DD'),
    categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
    categoryDescription: "하하",
    categoryVisible: true,
    schedules: [],
    children: [],
  },
  {
    categoryId: 6,
    categoryName: '카테고리 6',
    categoryLevel: 1,
    categoryColor: 'blue',
    categoryStartDate: time.toString(time.new(2024, 0), 'YYYY-MM-DD'),
    categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
    categoryDescription: "하하",
    categoryVisible: true,
    schedules: [],
    children: [],
  },
]

export {
  calendarDummyData,
  categoryListDummyData,
}