import { IConfig } from "./interface";

export const MedicamentosConfig: IConfig = {
  nameUrl: "medicamentos",
  pageInit: 1,
  pageEnd: 359,
  columns: [
    {
      name: "code",
      index: 0,
      type: "text",
      tag: "none",
    },
    {
      name: "name",
      index: 1,
      type: "text",
      tag: "anchor",
    },
    {
      name: "url",
      index: 1,
      type: "href",
      tag: "anchor",
    },
    {
      name: "active-ingredient",
      index: 2,
      type: "text",
      tag: "none",
    },
    {
      name: "laboratory",
      index: 3,
      type: "text",
      tag: "none",
    },
  ],
};
