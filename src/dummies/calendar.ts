import time from "@/lib/time";
import { CategoryColor, CategoryDto, ResDto, ScheduleDto } from "@/types";

const range = (y: number, m: number, fd: number, td: number, schedule: Omit<ScheduleDto, 'scheduleDate'>): ScheduleDto[] => {
  const result: ScheduleDto[] = [];

  let id = 0;
  for(let i=fd; i<=td; i++) {
    result.push({
      ...schedule,
      scheduleId: schedule.scheduleId + 1000 + (id++),
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
          scheduleId: i,
          categoryId: i,
          scheduleGroupCode: i+1,
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
              scheduleId: i+2,
              categoryId: i+2,
              scheduleGroupCode: i+3,
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
                  categoryId: i+5,
                  scheduleGroupCode: i+6,
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

const calendarDummyDataMonth = (month: number): ResDto<CategoryDto[]> => ({
  resultMessage: "",
  resultBody: [
    {
      categoryId: 1,
      categoryName: 'Category 1',
      categoryLevel: 0,
      categoryColor: 'red',
      categoryStartDate: time.toString(time.new(2023, 0), 'YYYY-MM-DD'),
      categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
      categoryDescription: "",
      categoryVisible: true,
      schedules: [
        {
          scheduleId: 2,
          categoryId: 1,
          scheduleGroupCode: 101,
          scheduleContent: "Schedule 1",
          schedulePriority: 0,
          scheduleDate: time.toString(time.new(2024, month, 2), 'YYYY-MM-DD'),
          finished: false,
        },
        {
          scheduleId: 3,
          categoryId: 1,
          scheduleGroupCode: 102,
          scheduleContent: "Schedule 2",
          schedulePriority: 1,
          scheduleDate: time.toString(time.new(2024, month, 2), 'YYYY-MM-DD'),
          finished: false,
        },
        {
          scheduleId: 9,
          categoryId: 1,
          scheduleGroupCode: 106,
          scheduleContent: "Schedule 6",
          schedulePriority: 0,
          scheduleDate: time.toString(time.new(2024, month, 3), 'YYYY-MM-DD'),
          finished: false,
        },
      ],
      children: [
        {
          categoryId: 4,
          categoryName: 'Category 2',
          categoryLevel: 1,
          categoryColor: 'red',
          categoryStartDate: time.toString(time.new(2023, 0), 'YYYY-MM-DD'),
          categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
          categoryDescription: "",
          categoryVisible: true,
          schedules: [
            {
              scheduleId: 5,
              categoryId: 4,
              scheduleGroupCode: 103,
              scheduleContent: "Schedule 3",
              schedulePriority: 2,
              scheduleDate: time.toString(time.new(2024, month, 2), 'YYYY-MM-DD'),
              finished: false,
            },
            {
              scheduleId: 6,
              categoryId: 4,
              scheduleGroupCode: 104,
              scheduleContent: "Schedule 4",
              schedulePriority: 3,
              scheduleDate: time.toString(time.new(2024, month, 2), 'YYYY-MM-DD'),
              finished: false,
            },
          ],
          children: [
            {
              categoryId: 7,
              categoryName: 'Category 3',
              categoryLevel: 2,
              categoryColor: 'red',
              categoryStartDate: time.toString(time.new(2023, 0), 'YYYY-MM-DD'),
              categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
              categoryDescription: "",
              categoryVisible: true,
              schedules: [
                {
                  scheduleId: 8,
                  categoryId: 7,
                  scheduleGroupCode: 105,
                  scheduleContent: "Schedule 5",
                  schedulePriority: 4,
                  scheduleDate: time.toString(time.new(2024, month, 2), 'YYYY-MM-DD'),
                  finished: false,
                }
              ],
              children: [],
            }
          ],
        },
      ],
    }
  ]
});

const calendarDummyData: ResDto<CategoryDto[]>[] = [
  calendarDummyDataMonth(0),
  calendarDummyDataMonth(1),
  calendarDummyDataMonth(2),
  calendarDummyDataMonth(3),
  calendarDummyDataMonth(4),
  calendarDummyDataMonth(5),
  calendarDummyDataMonth(6),
  calendarDummyDataMonth(7),
  calendarDummyDataMonth(8),
  calendarDummyDataMonth(9),
  calendarDummyDataMonth(10),
  calendarDummyDataMonth(11),
]

const categoryListDummyData: CategoryDto[] = calendarDummyData[0].resultBody;

export {
  calendarDummyData,
  categoryListDummyData,
}