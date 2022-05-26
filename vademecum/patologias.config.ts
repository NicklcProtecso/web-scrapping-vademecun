import { IConfig } from "./interface";

export const PatologiasConfig: IConfig = {
  nameUrl: "patologias",
  pageInit: 1,
  pageEnd: 10,
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
  ],
};
