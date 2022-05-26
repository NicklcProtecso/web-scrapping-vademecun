import { DataFrame } from "dataframe-js";
import { JSDOM } from "jsdom";
import { GrupoTerapeuticoCf } from "./vademecum/grupo-terapeutico.config";
import { IColumn, IConfig } from "./vademecum/interface";
import { LaboratoriosConfig } from "./vademecum/laboratorios.config";
import { MedicamentosConfig } from "./vademecum/medicamentos.config";
import { PatologiasConfig } from "./vademecum/patologias.config";
class ScraperVademecum {
  config: IConfig;

  constructor(config: IConfig) {
    this.config = config;
  }

  getUrl(nameUrl, nroPage) {
    return `https://pe.ivademecum.com/${nameUrl}_page-${nroPage}.html`;
  }

  async getDataFromUrl(url) {
    const data = [];
    try {
      const dom = await JSDOM.fromURL(url);
      const { document } = dom.window;
      const table = document.querySelector("table");
      const thead = table.querySelector("thead");
      const tbody = table.querySelector("tbody");
      const trs = tbody.querySelectorAll("tr");
      trs.forEach((tr) => {
        const tds = tr.querySelectorAll("td");
        const row = {};
        this.config.columns.forEach((column) => {
          row[column.name] = this.getItem(tds, column);
        });
        data.push(row);
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  getItem(tds: Element[], column: IColumn) {
    const { index, type, tag } = column;
    if (tag === "anchor") {
      const a = tds[index].querySelector("a");
      if (type === "href") {
        return a.href;
      } else if (type === "text") {
        return a.textContent;
      }
    } else if (tag === "none") {
      return tds[index].textContent;
    }
  }

  async getDataFromAllPages() {
    let dataAll = [];
    for (let i = this.config.pageInit; i <= this.config.pageEnd; i++) {
      const data = await this.getDataFromUrl(
        this.getUrl(this.config.nameUrl, i)
      );
      dataAll = [...dataAll, ...data];
    }
    return dataAll;
  }

  toCsv(data, filename) {
    const df = new DataFrame(data);
    df.toText(";", true, `${filename}.csv`);
  }

  async urlToCsv() {
    const data = await this.getDataFromAllPages();
    this.toCsv(data, `assets/vademecum/${this.config.nameUrl}`);
  }
}

(async () => {
  try {
    const scraper = new ScraperVademecum(MedicamentosConfig);
    await scraper.urlToCsv();
  } catch (e) {
    console.log(e);
  }
})();
