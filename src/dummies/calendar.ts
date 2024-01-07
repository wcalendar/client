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

const calendarDummyData: ResDto<CategoryDto[]> = {
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
          scheduleId: 1101,
          categoryId: 100,
          scheduleGroupCode: 101,
          scheduleContent: "긴 일정",
          schedulePriority: 100,
          finished: false,
        }),
        ...range(y, m, 2, 10, {
          scheduleId: 2101,
          categoryId: 100,
          scheduleGroupCode: 102,
          scheduleContent: "중간 일정",
          schedulePriority: 101,
          finished: false,
        }),
        ...range(y, m, 2, 3, {
          scheduleId: 3101,
          categoryId: 100,
          scheduleGroupCode: 103,
          scheduleContent: "짧은 일정",
          schedulePriority: 102,
          finished: false,
        }),
        ...range(y, m, 10, 20, {
          scheduleId: 4101,
          categoryId: 100,
          scheduleGroupCode: 104,
          scheduleContent: "가운데 중간 일정",
          schedulePriority: 103,
          finished: false,
        }),
        ...range(y, m, 11, 20, {
          scheduleId: 5101,
          categoryId: 100,
          scheduleGroupCode: 105,
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

const categoryListDummyData: CategoryDto[] = calendarDummyData.resultBody;

export {
  calendarDummyData,
  categoryListDummyData,
}