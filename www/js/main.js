(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Obsługa zdarzeń wstrzymywania i wznawiania działania oprogramowania Cordova
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Załadowano oprogramowanie Cordova. Wykonaj tutaj wszystkie wymagane kroki inicjowania tego oprogramowania.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
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

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};

// funkcja obsługuje proces kliknięcia w menu wyszukiwania
function expand() {
  $(".search").toggleClass("close");
  $(".input").toggleClass("square");
  if ($('.search').hasClass('close')) {
    $('input').focus();
  } else {
    $('input').blur();
  }
}
$('button').on('click', expand);

// funkcja ustawia w dropdown wybraną wartość przez użytkownika
function getItem() {
    $(".dropdown-menu a").click(function () {
        $(this).parents(".dropdown").find('.btn').html($(this).text());
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
    });
}

// funkcja filtrujaca wyszukiwarkę.
function filterSearch() {
    let filterValue = document.getElementById('filterInput').value.toUpperCase(); // pobranie wartości z wyszukiwarki
    let ul = document.getElementById('tips'); // pobranie elementu ul
    let li = ul.querySelectorAll('li.name-item'); // pobranie listy podpowiedzi
    // Pętla wyświetlająca przefiltrowane podpowiedzi
    for (let i = 0; i < li.length; i++) {
        let a = li[i].getElementsByTagName('a')[0];
        if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}

// funkcja wyświetla lub nie wyświetla danego diva.
function displayShow(idElement, bool) {
    x = document.getElementById(idElement);
    if (bool === 'true') {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function getData() {
    $(".form_datetime").datetimepicker({ format: 'yyyy-mm-dd' });
}
// plik javaScript do definowania funkcji
// metody objete w funkcjach jss 


/*function logIn() {
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
}*/

// Funkcja sprawdza połączenie z internetem
function internetConnection() {
    var networkState = navigator.connection.type;
    if (networkState == 'none') {
        return "false";
    }
    else {
        return "true";
    }
}

function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 5000, maximumAge: 10000, enableHighAccuracy: true });
}

function onSuccess(pos) {
    lat = pos.coords.latitude;
    lng = pos.coords.longitude;
}

function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    return "brak danych";
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

// funkcja zaokrągla wartości po przecinku.
function Round(n, k) {
    var factor = Math.pow(10, k);
    return Math.round(n * factor) / factor;
}

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
   //onDeviceReady();
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
           alert('Wystąpił błąd połączenia');
       });
   
       xmlHttp.addEventListener('timeout', function () {
           alert('Upłynął czas zapytania, proszę spróbować ponownie za chwilę');
       });
   
       xmlHttp.send("currency=" + currencyQuantor+"&transaction="+transactionQuantor);
   }
   else {
       alert("Brak dostępu do internetu");
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
                        //lat = 50.2585222;
                        //lng = 20.2585241;
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
function createElementDiv(mainDiv,nameClass,value) {
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

//Logowanie przez mail przy wykorzystaniu Firebase

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        var email_verified = user.emailVerified;

        if(email_verified) {
            document.getElementById("verify_btn").style.display = "none";
        }
        else {
            document.getElementById("verify_btn").style.display = "block";
        }

        document.getElementById("user_para").innerHTML = "Welcome User : " + email_id + "<br/> Verified: " + email_verified;
  
      }
  
    } else {
      // No user is signed in.
  
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
  
    }
  });
  
  function login(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
      // ...
    });
  
  }
  
  function logout(){
    firebase.auth().signOut();
  };

  function create_account() {

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    
        window.alert("Error : " + errorMessage);
})};

  function send_verification() {

    var user = firebase.auth().currentUser;

    user.sendEmailVerification.then(function() {
        //Email send
        window.alert("Verification sent");
    }).catch(function(error) {
        //error happenned
        window.alert("Error: " + error.message);
    })
  }
  