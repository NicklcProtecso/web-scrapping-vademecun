import { DataFrame } from "dataframe-js";
const puppeteer = require("puppeteer");
const fs = require("fs");
const jsdom = require("jsdom");

class Scraper {
  url: string;
  document: Document;
  body: any;
  data: any;
  filename: string;

  constructor(url: string, filename: string) {
    this.url = url;
    this.filename = filename;
  }

  async getBodyFromUrl() {
    const browser = await puppeteer.launch(); //{ headless: false, slowMo: 250 }
    const page = await browser.newPage();
    const response = await page.goto(this.url);
    this.body = await response.text();
    await browser.close();
  }

  async setDocumentFromFile() {
    const body = fs.readFileSync(this.filename, "utf8");
    const {
      window: { document },
    } = new jsdom.JSDOM(body);
    this.document = document;
  }

  saveBody() {
    fs.writeFile(this.filename, this.body, function (err) {
      if (err) throw err;
      console.log(`File ${this.filename} is created successfully.`);
    });
  }

  getInfoProduct() {
    const products = this.document.querySelectorAll("fp-filtered-product-list");
    let informations: NodeListOf<Element>;
    products.forEach((info) => {
      informations = info.querySelectorAll("fp-product-small");
    });
    const data = [];
    informations.forEach((info) => {
      const name = this.getDataTrimQuerySelector(
        info,
        "fp-product-card-information fp-product-name"
      );
      const presentation = this.getDataTrimQuerySelector(
        info,
        "fp-product-card-information fp-product-description"
      );
      const price = this.getDataTrimQuerySelector(
        info,
        "fp-product-card-price fp-product-price"
      );
      const product = {
        name,
        presentation,
        price,
      };
      data.push(product);
    });
    this.data = data;
  }

  getDataTrimQuerySelector(element: Element, selectors: string) {
    try {
      const text = element.querySelector(selectors).textContent;
      const name = text.replace(/\s+/g, " ").trim();
      return name;
    } catch (error) {
      return "NULL";
    }
  }

  createDataFrame() {
    const df = new DataFrame(this.data);
    df.show();
    df.toText(";", true, "data.txt");
  }
}

(async () => {
  try {
    const scraper = new Scraper("", "web.html");
    await scraper.setDocumentFromFile();
    scraper.getInfoProduct();
    scraper.createDataFrame();
  } catch (e) {
    console.log(e);
  }
})();
