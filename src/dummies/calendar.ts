type Category = {
  id: number;
  // user
  // code: string;
  name: string;
  parent?: Category;
  level: number;
  color: number;
  // createdAt
  // modifiedAt
}

type Schedule = {
  id: number;
  category: Category;
  title: string;
  // body: string;
  startDate: Date;
  endDate: Date;
}

export interface ScheduleWithoutCategory extends Omit<Schedule, 'category'> {}

export interface CategoryWithSchedule extends Category {
  scheduleList: ScheduleWithoutCategory[];
  // subCategoryList: CategoryWithSchedule[];
}

type MainCalendarDto = {
  categoryList: CategoryWithSchedule[];
}

const newDummyCategory = (i: number, color: number): CategoryWithSchedule[] => {
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
          startDate: new Date(2023, 11, 1),
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