export type CategoryColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'gray';

export type Category = {
  categoryId?: number;
  categoryName: string;
  categoryColor: CategoryColor;
  categoryLevel: number;
  categoryDescription?: string;
  categoryVisible: boolean;
  categoryStartDate: string;
  categoryEndDate: string;
  children?: Category;
};
