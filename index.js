const { JSDOM } = require("jsdom");

const url = "https://pe.ivademecum.com/principios-activos_page-2.html";
JSDOM.fromURL(url).then((dom) => {
  const { document } = dom.window;
  const table = document.querySelector("table");
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");
  const trs = tbody.querySelectorAll("tr");
  trs.forEach((tr) => {
    const tds = tr.querySelectorAll("td");
    const code = tds[0].textContent;
    const name = tds[1].querySelector("a").textContent;
    const url = tds[1].querySelector("a").href;
    console.log(code, name, url);
  });
});
