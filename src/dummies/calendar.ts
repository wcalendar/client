import time from "@/lib/time";
import { CategoryDto, ResDto, ScheduleToRender, SearchResult } from "@/types";

const y = time.now().year();
const m = time.now().month();

const calendarDummyDataMonth = (month: number): ResDto<CategoryDto[]> => ({
  resultMessage: "",
  resultBody: [
    {
      categoryId: 'c1',
      categoryName: 'Category 1',
      categoryLevel: 0,
      categoryColor: 'red',
      categoryStartDate: time.toString(time.new(2023, 0), 'YYYY-MM-DD'),
      categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
      categoryDescription: "",
      categoryVisible: true,
      schedules: [
        {
          scheduleId: 's1',
          categoryId: 'c1',
          scheduleGroupCode: 'g1',
          scheduleContent: "Schedule 1",
          schedulePriority: 0,
          scheduleDate: time.toString(time.new(2024, month, 2), 'YYYY-MM-DD'),
          isFinished: false,
          isPriority: true,
        },
        {
          scheduleId: 's2',
          categoryId: 'c1',
          scheduleGroupCode: 'g1',
          scheduleContent: "Schedule 1",
          schedulePriority: 0,
          scheduleDate: time.toString(time.new(2024, month, 3), 'YYYY-MM-DD'),
          isFinished: false,
          isPriority: true,
        },
        {
          scheduleId: 's3',
          categoryId: 'c1',
          scheduleGroupCode: 'g2',
          scheduleContent: "Schedule 2",
          schedulePriority: 1,
          scheduleDate: time.toString(time.new(2024, month, 2), 'YYYY-MM-DD'),
          isFinished: false,
          isPriority: true,
        },
        {
          scheduleId: 's4',
          categoryId: 'c1',
          scheduleGroupCode: 'g2',
          scheduleContent: "Schedule 2",
          schedulePriority: 1,
          scheduleDate: time.toString(time.new(2024, month, 3), 'YYYY-MM-DD'),
          isFinished: false,
          isPriority: true,
        },
        {
          scheduleId: 's5',
          categoryId: 'c1',
          scheduleGroupCode: 'g2',
          scheduleContent: "Schedule 2",
          schedulePriority: 0,
          scheduleDate: time.toString(time.new(2024, month, 4), 'YYYY-MM-DD'),
          isFinished: false,
          isPriority: true,
        },
        {
          scheduleId: 's6',
          categoryId: 'c1',
          scheduleGroupCode: 'g6',
          scheduleContent: "Schedule 6",
          schedulePriority: 2,
          scheduleDate: time.toString(time.new(2024, month, 3), 'YYYY-MM-DD'),
          isFinished: false,
          isPriority: true,
        },
      ],
      children: [
        {
          categoryId: 'c2',
          categoryName: 'Category 2',
          categoryLevel: 1,
          categoryColor: 'red',
          categoryStartDate: time.toString(time.new(2023, 0), 'YYYY-MM-DD'),
          categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
          categoryDescription: "",
          categoryVisible: true,
          schedules: [
            {
              scheduleId: 's7',
              categoryId: 'c2',
              scheduleGroupCode: 'g3',
              scheduleContent: "Schedule 3",
              schedulePriority: 2,
              scheduleDate: time.toString(time.new(2024, month, 2), 'YYYY-MM-DD'),
              isFinished: false,
              isPriority: true,
            },
            {
              scheduleId: 's8',
              categoryId: 'c2',
              scheduleGroupCode: 'g3',
              scheduleContent: "Schedule 3",
              schedulePriority: 3,
              scheduleDate: time.toString(time.new(2024, month, 3), 'YYYY-MM-DD'),
              isFinished: false,
              isPriority: true,
            },
            {
              scheduleId: 's9',
              categoryId: 'c2',
              scheduleGroupCode: 'g4',
              scheduleContent: "Schedule 4",
              schedulePriority: 3,
              scheduleDate: time.toString(time.new(2024, month, 2), 'YYYY-MM-DD'),
              isFinished: false,
              isPriority: true,
            },
          ],
          children: [
            {
              categoryId: 'c3',
              categoryName: 'Category 3',
              categoryLevel: 2,
              categoryColor: 'red',
              categoryStartDate: time.toString(time.new(2023, 0), 'YYYY-MM-DD'),
              categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
              categoryDescription: "",
              categoryVisible: true,
              schedules: [
                {
                  scheduleId: 's10',
                  categoryId: 'c3',
                  scheduleGroupCode: 'g5',
                  scheduleContent: "Schedule 5",
                  schedulePriority: 4,
                  scheduleDate: time.toString(time.new(2024, month, 2), 'YYYY-MM-DD'),
                  isFinished: false,
                  isPriority: true,
                },
                {
                  scheduleId: 's11',
                  categoryId: 'c3',
                  scheduleGroupCode: 'g5',
                  scheduleContent: "Schedule 5",
                  schedulePriority: 4,
                  scheduleDate: time.toString(time.new(2024, month, 3), 'YYYY-MM-DD'),
                  isFinished: false,
                  isPriority: true,
                },
                {
                  scheduleId: 's12',
                  categoryId: 'c3',
                  scheduleGroupCode: 'g5',
                  scheduleContent: "Schedule 5",
                  schedulePriority: 1,
                  scheduleDate: time.toString(time.new(2024, month, 4), 'YYYY-MM-DD'),
                  isFinished: false,
                  isPriority: true,
                },
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

const searchDummyData: ScheduleToRender[] = [
  {
    id: 's1',
    categoryId: 'c1',
    groupCode: 'g1',
    content: "Schedule 1",
    isFinished: false,
    isPriority: true,
    startDate: time.new(2024, 1, 2),
    endDate: time.new(2024, 1, 3),
  },
  {
    id: 's3',
    categoryId: 'c1',
    groupCode: 'g2',
    content: "Schedule 2",
    isFinished: false,
    isPriority: true,
    startDate: time.new(2024, 1, 2),
    endDate: time.new(2024, 1, 4),
  },
  {
    id: 's6',
    categoryId: 'c1',
    groupCode: 'g6',
    content: "Schedule 6",
    isFinished: false,
    isPriority: true,
    startDate: time.new(2024, 1, 3),
    endDate: time.new(2024, 1, 3),
  },
  {
    id: 's7',
    categoryId: 'c2',
    groupCode: 'g3',
    content: "Schedule 3",
    isFinished: false,
    isPriority: true,
    startDate: time.new(2024, 1, 2),
    endDate: time.new(2024, 1, 3),
  },
  {
    id: 's9',
    categoryId: 'c2',
    groupCode: 'g4',
    content: "Schedule 4",
    isFinished: false,
    isPriority: true,
    startDate: time.new(2024, 1, 2),
    endDate: time.new(2024, 1, 2),
  },
  {
    id: 's10',
    categoryId: 'c3',
    groupCode: 'g5',
    content: "Schedule 5",
    isFinished: false,
    isPriority: true,
    startDate: time.new(2024, 1, 2),
    endDate: time.new(2024, 1, 4),
  },
];

const dSearchResult: SearchResult = {
  categories: ['카테고리 1', '카테고리 2'],
  groupCode: '101',
  content: '밥 먹기',
  isFinished: false,
  startDate: time.new(y, m, 15),
  endDate: time.new(y, m, 17),
};

const dSearchResultList: SearchResult[] =[
  dSearchResult,
];

export {
  calendarDummyData,
  categoryListDummyData,
  dSearchResultList,
}