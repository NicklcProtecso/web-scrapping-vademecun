"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dataframe_js_1 = require("dataframe-js");
var jsdom_1 = require("jsdom");
var ClasificacionTerapeutica = {
    nameUrl: "clasificacion-terapeutica",
    pageInit: 1,
    pageEnd: 3,
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
var ScraperVademecum = /** @class */ (function () {
    function ScraperVademecum(config) {
        this.config = config;
    }
    ScraperVademecum.prototype.getUrl = function (nameUrl, nroPage) {
        return "https://pe.ivademecum.com/" + nameUrl + "_page-" + nroPage + ".html";
    };
    ScraperVademecum.prototype.getDataFromUrl = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var data, dom, document_1, table, thead, tbody, trs, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, jsdom_1.JSDOM.fromURL(url)];
                    case 2:
                        dom = _a.sent();
                        document_1 = dom.window.document;
                        table = document_1.querySelector("table");
                        thead = table.querySelector("thead");
                        tbody = table.querySelector("tbody");
                        trs = tbody.querySelectorAll("tr");
                        trs.forEach(function (tr) {
                            var tds = tr.querySelectorAll("td");
                            var row = {};
                            _this.config.columns.forEach(function (column) {
                                row[column.name] = _this.getItem(tds, column);
                            });
                            data.push(row);
                        });
                        return [2 /*return*/, data];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ScraperVademecum.prototype.getItem = function (tds, column) {
        var index = column.index, type = column.type, tag = column.tag;
        if (tag === "anchor") {
            var a = tds[index].querySelector("a");
            if (type === "href") {
                return a.href;
            }
            else if (type === "text") {
                return a.textContent;
            }
        }
        else if (tag === "none") {
            return tds[index].textContent;
        }
    };
    ScraperVademecum.prototype.getDataFromAllPages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dataAll, i, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataAll = [];
                        i = this.config.pageInit;
                        _a.label = 1;
                    case 1:
                        if (!(i <= this.config.pageEnd)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getDataFromUrl(this.getUrl(this.config.nameUrl, i))];
                    case 2:
                        data = _a.sent();
                        dataAll = __spreadArray(__spreadArray([], dataAll), data);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, dataAll];
                }
            });
        });
    };
    ScraperVademecum.prototype.toCsv = function (data, filename) {
        var df = new dataframe_js_1.DataFrame(data);
        df.toText(";", true, filename + ".csv");
    };
    return ScraperVademecum;
}());
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var scraper, data, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                scraper = new ScraperVademecum(ClasificacionTerapeutica);
                return [4 /*yield*/, scraper.getDataFromAllPages()];
            case 1:
                data = _a.sent();
                scraper.toCsv(data, "clasificacion-terapeutica");
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=scraper.js.map