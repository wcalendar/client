import time from "@/lib/time";
import { Dayjs } from "dayjs";

export type CategoryColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray';

export type CategoryDto = {
  id: number;
  // user
  // code: string;
  name: string;
  parent?: CategoryDto;
  level: number;
  color: CategoryColor;
  // createdAt
  // modifiedAt
  memo?: string;
}

type ScheduleDto = {
  id: number;
  category: CategoryDto;
  title: string;
  // body: string;
  startDate: Date;
  endDate: Date;
  isFinished: boolean;
}

export type Schedule = {
  id: number;
  categoryId: number;
  title: string;
  // body: string;
  startDate: Dayjs;
  endDate: Dayjs;
  isFinished: boolean;
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

type MainCalendarDto = {
  categoryList: CategoryWithScheduleDto[];
}

const y = time.now().year();
const m = time.now().month();
const newDummyCategory = (i: number, color: CategoryColor): CategoryWithScheduleDto[] => {
  return [
    {
      id: i,
      name: 'W Calendar',
      level: 0,
      color,
      scheduleList: [
        {
          id: i+1,
          title: 'Splash Page',
          startDate:  new Date(y, m, 1),
          endDate: new Date(y, m, 7),
          isFinished: false,
        }
      ],
    },
    {
      id: i+2,
      name: 'Test',
      level: 1,
      color,
      scheduleList: [
        {
          id: i+3,
          title: 'Splash Test',
          startDate: new Date(y, m, 4),
          endDate: new Date(y, m, 7),
          isFinished: true,
        },
      ],
    },
    {
      id: i+4,
      name: 'Deploy',
      level: 1,
      color,
      scheduleList: [],
    },
    {
      id: i+5,
      name: 'AWS',
      level: 2,
      color,
      scheduleList: [
        {
          id: i+6,
          title: '배포하기',
          startDate: new Date(y, m, 31),
          endDate: new Date(y, m, 31),
          isFinished: false,
        },
      ],
    },
  ]
}

const calendarDummyData: MainCalendarDto = {
  categoryList: [
    {
      id: 0,
      name: 'Test',
      level: 0,
      color: 'green',
      scheduleList: [
        {
          id: 100,
          title: '긴 일정',
          startDate: new Date(y, m, 2),
          endDate: new Date(y, m, 29),
          isFinished: false,
        },
        {
          id: 101,
          title: '중간 일정',
          startDate: new Date(y, m, 2),
          endDate: new Date(y, m, 16),
          isFinished: false,
        },
        {
          id: 102,
          title: '짧은 일정',
          startDate: new Date(y, m, 2),
          endDate: new Date(y, m, 3),
          isFinished: false,
        },
        {
          id: 103,
          title: '가운데 중간 일정',
          startDate: new Date(y, m, 16),
          endDate: new Date(y, m, 29),
          isFinished: false,
        },
        {
          id: 104,
          title: '가운데 중간 일정2',
          startDate: new Date(y, m, 17),
          endDate: new Date(y, m, 28),
          isFinished: false,
        },
      ],
    },
    {
      id: 999,
      name: 'overMonth',
      level: 1,
      color: 'green',
      memo: 'zxcv',
      scheduleList: [
        {
          id: 105,
          title: '지난 달 부터',
          startDate: new Date(2023, m, 1),
          endDate: new Date(y, m, 16),
          isFinished: false,
        },
        {
          id: 106,
          title: '지난 달 부터 다음 달 까지',
          startDate: new Date(2023, m, 1),
          endDate: new Date(2099, 1, 1),
          isFinished: false,
        },
        {
          id: 107,
          title: '다음 달 까지',
          startDate: new Date(y, m, 14),
          endDate: new Date(2099, 1, 1),
          isFinished: false,
        }
      ],
    },
    ...newDummyCategory(1, 'red'),
    ...newDummyCategory(8, 'orange'),
    ...newDummyCategory(15, 'yellow'),
    ...newDummyCategory(22, 'green'),
    ...newDummyCategory(29, 'blue'),
    ...newDummyCategory(36, 'purple'),
    ...newDummyCategory(42, 'gray'),
    ...newDummyCategory(49, 'red'),
  ]
}

const categoryListDummyData: CategoryDto[] = [
  {
    id: 1,
    name: '카테고리 1',
    level: 0,
    color: 'red',
  },
  {
    id: 2,
    name: '카테고리 2',
    level: 1,
    color: 'blue',
  },
  {
    id: 3,
    name: '카테고리 3',
    level: 2,
    color: 'red',
  },
  {
    id: 4,
    name: '카테고리 4',
    level: 1,
    color: 'red',
  },
  {
    id: 5,
    name: '카테고리 5',
    level: 0,
    color: 'red',
  },
  {
    id: 6,
    name: '카테고리 6',
    level: 1,
    color: 'red',
  },
]

export {
  calendarDummyData,
  categoryListDummyData,
}