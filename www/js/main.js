var lat = 0;
var lng = 0;
(function () {
    "use strict";
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    function onDeviceReady() {
        // Obsługa zdarzeń wstrzymywania i wznawiania działania oprogramowania Cordova
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Załadowano oprogramowanie Cordova. Wykonaj tutaj wszystkie wymagane kroki inicjowania tego oprogramowania.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 4000, maximumAge: 10000, enableHighAccuracy: true });
    };

    function onPause() {
        // TODO: Ta aplikacja została zawieszona, Zapisz tutaj stan aplikacji.
    };

    function onResume() {
        // TODO: Ta aplikacja została ponownie aktywowana. Przywróć tutaj stan aplikacji.
    };
})();

// Funkcja obsługuje proces wyświetlenia menu.
function menuFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
};

// Funkcja zwracająca datę.
function getData() {
    $(".form_datetime").datetimepicker({ format: 'yyyy-mm-dd' });
}

function logIn() {
    $(".back").click(function () {
        $(".signUp").addClass("active-sx");
        $(".signIn").addClass("inactive-dx");
        $(".signIn").removeClass("active-dx");
        $(".signUp").removeClass("inactive-sx");
    });
}

function signIn() {
    $(".log-in").click(function () {
        $(".signIn").addClass("active-dx");
        $(".signUp").addClass("inactive-sx");
        $(".signUp").removeClass("active-sx");
        $(".signIn").removeClass("inactive-dx");
    });
}

// Funkcja sprawdza połączenie z internetem.
function internetConnection() {
    var networkState = navigator.connection.type;
    if (networkState == 'none') {
        return "false";
    }
    else {
        return "true";
    }
}

// Funkcja pobiera współrzędne GPS z urządzenia.
function GPSDevice() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 4000, maximumAge: 10000, enableHighAccuracy: true });
}

// Funkcja wykona się dla prawidłowego pobrania współrzędnych.
function onSuccess(pos) {
    lat = pos.coords.latitude;
    lng = pos.coords.longitude;
}

function onError(error) {
    //alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

// Oblicza dystans w linii prostej między dwoma punktami.
// Na wejściu metoda otrzymuje dane lokalizacyjne dwóch punktów.
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // dystans w km
    d = Round(d, 2);
    return (d);
}

// Funkcja zaokrągla wartości po przecinku.
function Round(n, k) {
    var factor = Math.pow(10, k);
    return Math.round(n * factor) / factor;
}

// Funkcja zamienia stopnie na radiany.
function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

// Metoda otwiera aplikacje Google Maps i wskazuje docelowe miejsce.
// Metoda na wejściu otrzymuje dwie zmienne: długość lat oraz długość lon.
function showGoogleMaps(lat, lon) {
    window.open("https://maps.google.com/maps?daddr=" + lat + "," + lon + "&amp;ll=");
}

// Metoda wykonuje zapytanie na api z quantor.pl.
function searchOffer() {
    GPSDevice();
    if (lat != 0 && lng != 0) {
        var e = document.getElementById("transaction");
        var transactionQuantor = e.options[e.selectedIndex].value;
        var f = document.getElementById("currency");
        var currencyQuantor = f.options[f.selectedIndex].value;
        if (this.internetConnection() === "true") {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", "https://quantor.pl/api/cantormap", true); // false for synchronous request
            xmlHttp.setRequestHeader("X-AUTH-TOKEN", "zuBtJ6gS7Vh7Wrcf");
            xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlHttp.setRequestHeader("User-Agent", "PostmanRuntime/7.11.0");
            xmlHttp.setRequestHeader("Accept", "*/*");
            xmlHttp.setRequestHeader("Cache-Control", "no-cache");
            xmlHttp.setRequestHeader("Postman-Token", "174e13cd-4edf-4598-9953-169b3f1f2eab,430aecde-2f62-4b3e-a8cf-024b7d64a687");
            xmlHttp.setRequestHeader("Host", "quantor.pl");
            xmlHttp.setRequestHeader("cookie", "device_view=full");
            xmlHttp.setRequestHeader("accept-encoding", "gzip, deflate");
            xmlHttp.setRequestHeader("content-length", "33");
            xmlHttp.setRequestHeader("Connection", "keep-alive");
            xmlHttp.timeout = 5000;

            xmlHttp.addEventListener('load', function () {
                if (this.status === 200) {
                    getValue(JSON.parse(this.responseText), transactionQuantor);
                }
                else {
                    alert('Połączenie zakończyło się statusem ' + this.status + ' spróbuj ponownie za chwile');
                }
            });

            xmlHttp.addEventListener('error', function (e) {
                alert('Niestety coś poszło nie tak :/');
            });

            xmlHttp.addEventListener('timeout', function () {
                alert('Coś tłoczno na łączu internetowym :/ spróbuj ponownie za chwilę :)');
            });

            xmlHttp.send("currency=" + currencyQuantor + "&transaction=" + transactionQuantor);
        }
        else {
            alert("No wiesz..., internet jest mi potrzebny :) ");
        }
    }
}

// Funkcja wyciąga potrzebne dane z pliku JSON i następnie eksportuje je do swojego pliku JSON do późniejszych operacji.
// Na wejściu metoda otrzymuje dane w strukturze JSON oraz typ przeprowadzonej transakcji.
function getValue(dane, transactionQuantor) {
    var result = new Array();
    var counterArray = -1;
    for (var step = 0; step < dane.rates.length; step++) {
        var myObject = new Object();
        for (var counter = 0; counter < 4; counter++) {
            if ((dane.rates[step].saleValue) != 0) { // sprawdzenie czy w pliku JSON jest wartość 0 (dla sprzedaży)
                if ((dane.rates[step].purchaseValue) != 0) { // sprawdzenie czy w pliku JSON jest wartość 0 (dla kupna)
                    if (counter == 0) {
                        counterArray++;
                        myObject.name = dane.rates[step].name;
                    }
                    else if (counter == 1) {
                        myObject.street = dane.rates[step].street;
                        myObject.lat = dane.rates[step].lat;
                        myObject.lng = dane.rates[step].lng;
                    }
                    else if (counter == 2) {
                        if (transactionQuantor === 'sale') { // warunek sprawdza dla jakiej transakcji ma czytac zmienną z pliku JSON
                            myObject.value = dane.rates[step].saleValue;
                        }
                        else {
                            myObject.value = dane.rates[step].purchaseValue;
                        }
                    }
                    else if (counter == 3) {
                        var distance = getDistanceFromLatLonInKm(lat, lng, dane.rates[step].lat, dane.rates[step].lng);
                        myObject.distance = distance;
                    }
                }
                else {
                    counter = 4;
                }
            }
            else {
                counter = 4;
            }
        }
        if (counterArray != -1) {
            if ((dane.rates[step].saleValue) != 0) {
                if ((dane.rates[step].purchaseValue) != 0) {
                    result[counterArray] = myObject;
                    delete myObject;
                }
            }
        }
    }
    objectJSON = JSON.stringify(result);
    sortJSON(JSON.parse(objectJSON), transactionQuantor);
    delete result;
}

// Funkcja sortuje plik JSON w zależności od wyboru transakcji.
// Na wejściu metoda otrzymuje zmienną z danymi w strukturze JSON oraz zmienną odnoszącą się do wybranej transakcji.
function sortJSON(dane, transactionQuantor) {
    var check = 1;
    do {
        check = 0;
        for (var i = 1; i < dane.length; i++) {
            if (transactionQuantor === "sale") {
                if (parseFloat(dane[i].value) < parseFloat(dane[i - 1].value)) {
                    check += 1;
                    poprzedniName = dane[i].name;
                    nastepnyName = dane[i - 1].name;
                    poprzedniStreet = dane[i].street;
                    nastepnyStreet = dane[i - 1].street;
                    poprzedniLat = dane[i].lat;
                    nastepnyLat = dane[i - 1].lat;
                    poprzedniLng = dane[i].lng;
                    nastepnyLng = dane[i - 1].lng;
                    poprzedniValue = dane[i].value;
                    nastepnyValue = dane[i - 1].value;
                    poprzedniDistance = dane[i].distance;
                    nastepnyDistance = dane[i - 1].distance;

                    dane[i].name = nastepnyName;
                    dane[i - 1].name = poprzedniName;
                    dane[i].street = nastepnyStreet;
                    dane[i - 1].street = poprzedniStreet;
                    dane[i].lat = nastepnyLat;
                    dane[i - 1].lat = poprzedniLat;
                    dane[i].lng = nastepnyLng;
                    dane[i - 1].lng = poprzedniLng;
                    dane[i].value = nastepnyValue;
                    dane[i - 1].value = poprzedniValue;
                    dane[i].distance = nastepnyDistance;
                    dane[i - 1].distance = poprzedniDistance;
                }
                else {
                    check += 0;
                }
            }
            else {
                if (parseFloat(dane[i].value) > parseFloat(dane[i - 1].value)) {
                    check += 1;
                    poprzedniName = dane[i].name;
                    nastepnyName = dane[i - 1].name;
                    poprzedniStreet = dane[i].street;
                    nastepnyStreet = dane[i - 1].street;
                    poprzedniLat = dane[i].lat;
                    nastepnyLat = dane[i - 1].lat;
                    poprzedniLng = dane[i].lng;
                    nastepnyLng = dane[i - 1].lng;
                    poprzedniValue = dane[i].value;
                    nastepnyValue = dane[i - 1].value;
                    poprzedniDistance = dane[i].distance;
                    nastepnyDistance = dane[i - 1].distance;

                    dane[i].name = nastepnyName;
                    dane[i - 1].name = poprzedniName;
                    dane[i].street = nastepnyStreet;
                    dane[i - 1].street = poprzedniStreet;
                    dane[i].lat = nastepnyLat;
                    dane[i - 1].lat = poprzedniLat;
                    dane[i].lng = nastepnyLng;
                    dane[i - 1].lng = poprzedniLng;
                    dane[i].value = nastepnyValue;
                    dane[i - 1].value = poprzedniValue;
                    dane[i].distance = nastepnyDistance;
                    dane[i - 1].distance = poprzedniDistance;
                }
                else {
                    check += 0;
                }
            }
        }
    } while (check > 0);
    var objectJSON = JSON.stringify(dane);
    showDataJSON(JSON.parse(objectJSON));
}

// Funkcja wyświetla dane w głównym oknie aplikacji.
// Na wejściu metoda otrzymuje dane typu JSON.
function showDataJSON(dane) {
    document.getElementById('indexId').innerHTML = "";
    var body = document.getElementsByTagName('body')[0];
    for (var step = 0; step < dane.length; step++) {
        var div = document.createElement('div');
        div.setAttribute("class", "historyBox");
        for (var counter = 0; counter < 4; counter++) {
            if ((dane[step].saleValue) != 0) { // sprawdzenie czy w pliku JSON jest wartość 0 (dla sprzedaży)
                if ((dane[step].purchaseValue) != 0) { // sprawdzenie czy w pliku JSON jest wartość 0 (dla kupna)
                    if (counter == 0) {
                        this.createElementDiv(div, "cantorText", dane[step].name);
                    }
                    else if (counter == 1) {
                        this.createElementDivWithGPS(div, "streetText", dane[step].street, dane[step].lat, dane[step].lng);
                    }
                    else if (counter == 2) {
                        this.createElementDiv(div, "courseText", ("KURS: " + dane[step].value));
                    }
                    else if (counter == 3) {
                        var distance = getDistanceFromLatLonInKm(lat, lng, dane[step].lat, dane[step].lng);
                        this.createElementDiv(div, "locationText", "~" + distance + " km od Ciebie");
                    }
                }
                else {
                    counter = 4;
                }
            }
            else {
                counter = 4;
            }
        }
        body.appendChild(div);
    }
}

// Funkcja tworzy element Div z odpowienimi danymi.
// Na wejściu funkcja otrzymuje główny uchwyt do elementu, nazwę klasy oraz wartość do wstawienie.
function createElementDiv(mainDiv, nameClass, value) {
    var div = document.createElement('div');
    div.setAttribute("class", nameClass);
    div.appendChild(document.createTextNode(value));
    mainDiv.appendChild(div);
}

// Funkcja robi to samo co createElementDiv lecz z tą róźnicą iż, dołącza obrazek lokalizacji.
// Na wejściu metoda otrzymuje główny uchwyt do elementu, nazwę klasy, wartość do wstawienia oraz koordynanty GPS.
function createElementDivWithGPS(mainDiv, nameClass, value, lat, lng) {
    var div = document.createElement('div');
    div.setAttribute("class", nameClass);
    div.appendChild(document.createTextNode(value + " "));
    div.setAttribute("onclick", "showGoogleMaps(" + lat + "," + lng + ")");
    var img = document.createElement("img");
    img.src = "images/gps.png";
    div.appendChild(img);
    mainDiv.appendChild(div);
}

//------------------------------------------ skrypty do dodawania transakcji-----

// Funkcja pobiera poszczególne dane z formularza dodawania transakcji.
// Jeśli wszystko przebiegnie prawidłowo (pola nie są puste) metoda dodaje dane do pamięci urządzenia w postaci struktury JSON.
function addTransaction() {
    var tran = document.getElementById("transactionEnd");
    var transactionQuantor = tran.options[tran.selectedIndex].value;
    var curr = document.getElementById("currencyEnd");
    var currencyQuantor = curr.options[curr.selectedIndex].value;
    var cant = document.getElementById("cantorEnd");
    var cantor = cant.options[cant.selectedIndex].value;
    var howMuch = document.getElementById("howMuch").value;
    var unitRate = document.getElementById("unitRate").value;
    var date = document.getElementById("getDate").value;
    if (howMuch !== "" && unitRate !== "" && date !== "") {
        var object = new Object();
        var result = new Array();
        object.tranzakcja = transactionQuantor;
        object.waluta = currencyQuantor;
        object.kantor = cantor;
        object.ilosc = howMuch;
        object.kurs = unitRate;
        object.wartosc = unitRate * howMuch;
        object.data = date;
        result[0] = object;
        text = localStorage.getItem("userHistory");
        if (text == null) { // warunek sprawdzający czy taki plik istnieje
            objectJSON = JSON.stringify(result);
        }
        else {
            obj = JSON.parse(text);
            obj.push(result[0]);
            objectJSON = JSON.stringify(obj);
        }
        localStorage.setItem("userHistory", objectJSON);
        delete object;
        delete result;
        alert("I cyk dodane do historii :)");
    }
    else {
        alert("Wszystkie pola są ważne :)");
    }
}

// Funkcja sprawdzająca czy jestesmy zalogowani.
function checkLogin(forIndex, nameHTML) {
    if (confirm('Czy jesteś zalogowany?')) {
        location.href = nameHTML;
    }
    else {
        if (forIndex === "no") {
            location.href = "signIn.html";
        }
        else {
            location.href = "html/signIn.html";
        }  
    }
}

function accountResult() {
    text = localStorage.getItem("userHistory");
    object = JSON.parse(text);
    // zwraca sumę kwoty 
    var sumaKwot = 0;
    for (var i = 0; i < object.length; i++) {
        alert
        sumaKwot += object[i].wartosc;
    }

    var iloscEuro = (text.split("€").length - 1);
    var iloscCHF = (text.split("CHF").length - 1);
    var iloscSEK = (text.split("SEK").length - 1);
    var iloscDolar = (text.split("$").length - 1);
    var iloscFunt = (text.split("£").length - 1);

    var maxValue = (Math.max(iloscEuro, iloscCHF, iloscSEK, iloscDolar, iloscFunt));
    var resultValue;
    if (maxValue == iloscEuro) {
        resultValue = "EURO";
    } else if (maxValue == iloscCHF) {
        resultValue = "FRANK SZWAJCARSKI";
    } else if (maxValue == iloscSEK) {
        resultValue ="KORONA SZWEDZKA";
    } else if (maxValue == iloscDolar) {
        resultValue = "DOLAR" ;
    } else if (maxValue == iloscFunt) {
        resultValue = "FUNT BRYTYJSKI" ;
    } else {
        resultValue = "Brak danych";
    }

    document.getElementById('accountID').innerHTML = "";
    var body = document.getElementsByTagName('body')[0];

    showAccount(body, "historyBox", resultValue, "Twoją ulubioną walutą:");
    showAccount(body, "historyBox", object.length, "Wszystkich transakcji:");
    showAccount(body, "historyBox", sumaKwot, "Łączna wartość wymiany [w zł]:");

}

function showAccount( body, nameclass, resultValue, text) {
    var div = document.createElement('div');
    div.setAttribute("class", nameclass);
    this.createElementDiv(div, "testHistory", text);
    this.createElementDiv(div, "historyUser", resultValue);
    body.appendChild(div);
}