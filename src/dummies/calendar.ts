import { Dayjs } from "dayjs";

type CategoryDto = {
  id: number;
  // user
  // code: string;
  name: string;
  parent?: CategoryDto;
  level: number;
  color: number;
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
}

export type ScheduleWithoutCategoryDto = {
  id: number;
  title: string;
  // body: string;
  startDate: Date;
  endDate: Date;
}

export type ScheduleWithoutCategory = {
  id: number;
  title: string;
  // body: string;
  startDate: Dayjs;
  endDate: Dayjs;
}

export interface CategoryWithScheduleDto extends CategoryDto {
  scheduleList: ScheduleWithoutCategoryDto[];
}

export type CategoryWithSchedule = {
  id: number;
  name: string;
  level: number;
  color: number;
  memo?: string;
  scheduleList: ScheduleWithoutCategory[];
}

type MainCalendarDto = {
  categoryList: CategoryWithScheduleDto[];
}

const newDummyCategory = (i: number, color: number): CategoryWithScheduleDto[] => {
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
          startDate:  new Date(2023, 11, 1),
          endDate: new Date(2023, 11, 7),
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
          startDate: new Date(2023, 11, 4),
          endDate: new Date(2023, 11, 7),
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
          startDate: new Date(2023, 11, 31),
          endDate: new Date(2023, 11, 31),
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
      color: 3,
      scheduleList: [
        {
          id: 100,
          title: '긴 일정',
          startDate: new Date(2023, 11, 2),
          endDate: new Date(2023, 11, 29),
        },
        {
          id: 101,
          title: '중간 일정',
          startDate: new Date(2023, 11, 2),
          endDate: new Date(2023, 11, 16),
        },
        {
          id: 102,
          title: '짧은 일정',
          startDate: new Date(2023, 11, 2),
          endDate: new Date(2023, 11, 3),
        },
        {
          id: 103,
          title: '가운데 중간 일정',
          startDate: new Date(2023, 11, 16),
          endDate: new Date(2023, 11, 29),
        },
        {
          id: 104,
          title: '가운데 중간 일정2',
          startDate: new Date(2023, 11, 17),
          endDate: new Date(2023, 11, 28),
        },
      ],
    },
    {
      id: 999,
      name: 'overMonth',
      level: 1,
      color: 3,
      memo: 'zxcv',
      scheduleList: [
        {
          id: 105,
          title: '지난 달 부터',
          startDate: new Date(2023, 10, 1),
          endDate: new Date(2023, 11, 16),
        },
        {
          id: 106,
          title: '지난 달 부터 다음 달 까지',
          startDate: new Date(2023, 10, 1),
          endDate: new Date(2024, 1, 1),
        },
        {
          id: 107,
          title: '다음 달 까지',
          startDate: new Date(2023, 11, 14),
          endDate: new Date(2024, 1, 1),
        }
      ],
    },
    ...newDummyCategory(1, 0),
    ...newDummyCategory(8, 1),
    ...newDummyCategory(15, 2),
    ...newDummyCategory(22, 3),
    ...newDummyCategory(29, 4),
    ...newDummyCategory(36, 5),
    ...newDummyCategory(42, 6),
    ...newDummyCategory(49, 0),
  ]
}

export {
  calendarDummyData,
}