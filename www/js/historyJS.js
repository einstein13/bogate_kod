// funkcja wyświetla historię użytkownika z localStorage.
function showHistory() {
    text = localStorage.getItem("userHistory");
    obj = JSON.parse(text);
    document.getElementById('historyID').innerHTML = "";
    var body = document.getElementsByTagName('body')[0];
    for (var i = 0; i < obj.length; i++) {
        var div = document.createElement('div');
        div.setAttribute("class", "historyBox");
        this.createElementDiv(div, "historyUser", obj[i].data);
        this.createElementDiv(div, "testHistory", obj[i].tranzakcja + ": " + obj[i].ilosc + " " + obj[i].waluta);
        this.createElementDiv(div, "testHistory", "Po kursie: " + obj[i].kurs);
        this.createElementDiv(div, "testHistory", "Na kwotę: " + obj[i].wartosc + " zł");
        this.createElementDiv(div, "testHistory", "W kantorze: " + obj[i].kantor);
        body.appendChild(div);
    }
}

// Funkcja obsługująca event kliknięcia poszczególnej opcji sortowania.
function selectOption() {
    var typeSort = document.getElementById("historySort").value;
    var text = localStorage.getItem("userHistory");
    var objectJSON = JSON.parse(text);
    jsonToArray(objectJSON, typeSort);
    location.reload();
}

 // Funkcja zamieniająca strukturę pliku JSON na tablicę.
function jsonToArray(json, typeSort) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
        result.push(json[key]);
    });

    sortBy(result, { prop: "data" }, typeSort);
    var objectJSON = JSON.stringify(result);
    localStorage.setItem("userHistory", objectJSON); // zapis do localStorage
    return result;
}

// Główna funkcja sortowania po dacie w koncie użytkownika.
var sortBy = (function () {
    var toString = Object.prototype.toString;
    var parse = function (x) { return x; };
    var getItem = function (x) {
        var isObject = x != null && typeof x === "object";
        var isProp = isObject && this.prop in x;
        return this.parser(isProp ? x[this.prop] : x);
    };

    return function sortby(array, cfg, typeSort) {
        if (!(array instanceof Array && array.length)) return [];
        if (toString.call(cfg) !== "[object Object]") cfg = {};
        if (typeof cfg.parser !== "function") cfg.parser = parse;
        cfg.desc = !!cfg.desc ? -1 : 1;
        return array.sort(function (a, b) {
            a = getItem.call(cfg, a);
            b = getItem.call(cfg, b);
            if (typeSort === "old") {
                return cfg.desc * (a < b ? -1 : +(a > b));
            }
            else if (typeSort === "new") {
                return cfg.desc * (a > b ? -1 : +(a < b));
            }
        });
    };
}());
