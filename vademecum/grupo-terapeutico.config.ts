import { IConfig } from "./interface";

export const GrupoTerapeuticoCf: IConfig = {
  nameUrl: "clasificacion-terapeutica",
  pageInit: 1,
  pageEnd: 7,
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
