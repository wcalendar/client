import time from "@/lib/time";
import { CategoryDto, ResDto, SearchResult } from "@/types";

const y = time.now().year();
const m = time.now().month();

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

const dSearchResult: SearchResult = {
  categories: ['카테고리 1', '카테고리 2'],
  groupCode: 101,
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