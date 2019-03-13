

// Initialize Firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAlJf9pn1Ff6o0Lpfl0p67tDh4-_e0tWNo",
    authDomain: "train01-hwk.firebaseapp.com",
    databaseURL: "https://train01-hwk.firebaseio.com",
    projectId: "train01-hwk",
    storageBucket: "",
    messagingSenderId: "57831239759"
};
firebase.initializeApp(config);

//   variablet to reference the database
var database = firebase.database();
console.log(database);
//  intital variables store in firebase
var name = "";
var destination = "";
var time = "";
var frequency = "";

//  this click button changes what is store in firebase
$("#add-train-btn").on("click", function (event) {
   
    //   prevent the page from refreshing
    event.preventDefault();
    console.log("add-train-btn")

    //  reassigning the values to what its getting from the input.
    var name = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var time = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();


    // wiht this push method we are going to give a unique a Id to each data that gets input and the  data becomes a child to the reference
    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
    })
})
// This function allows me to update the page in real-time when the firebase database changes
database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();
    console.log(snapshot.val().name);

    var tRow = $("<tr>").append(
        $("<td>").text(sv.name),
        $("<td>").text(sv.destination),
        $("<td>").text(sv.time),
        $("<td>").text(sv.frequency),

    );


    $("#employee-table > tbody").append(tRow);
}, function (errorObject) {

    console.log("there is an error" + errorObject.code);


})

