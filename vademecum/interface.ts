export interface IColumn {
  name: string;
  index: number;
  type: string;
  tag: string;
}
export interface IConfig {
  nameUrl: string;
  pageInit: number;
  pageEnd: number;
  columns: IColumn[];
}
