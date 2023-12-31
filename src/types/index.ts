export type CategoryColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'gray';

export type Category = {
  id?: number;
  name: string;
  color: CategoryColor;
  parent?: Category;
  level: number;
};
