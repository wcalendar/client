export type Category = {
  id?: number;
  name: string;
  color: string;
  parent?: Category;
  level: number;
  memo?: string;
};
