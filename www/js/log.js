//Logowanie przez mail przy wykorzystaniu Firebase

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        text = localStorage.getItem("database");
        if (text === "connect") {
            localStorage.setItem('database', 'inconnect');
            logout();
            location.reload();
        }
        else {
            localStorage.setItem('database', 'connect');
            location.href = "account.html";
        }
        // User is signed in.
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
     
        var user = firebase.auth().currentUser;

        if (user != null) {
            var email_id = user.email;
            var email_verified = user.emailVerified;
            if(email_verified) {
                document.getElementById("verify_btn").style.display = "none";
            }
            else {
                document.getElementById("verify_btn").style.display = "block";
            }
            //document.getElementById("user_para").innerHTML = "Welcome User : " + email_id + "<br/> Verified: " + email_verified;
        }
    }
    else {
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
  });
}

function logout(){
  firebase.auth().signOut();
};

function create_account() {

  var userEmail = document.getElementById("email_field2").value;
  var userPass = document.getElementById("password_field2").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
})};

// facebook

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}