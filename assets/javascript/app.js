

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
var nextArrival = "";
var minutesAway ="";

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
    console.log(snapshot.val().destination);
    console.log(snapshot.val().time);
    console.log(snapshot.val().frequency);

    // moments js
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(sv.time, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

     // Difference between the times
     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
    var timeRemaining = diffTime % sv.frequency;
    console.log(timeRemaining);

     // Minute Until Train
     var minutesAway = sv.frequency - timeRemaining;
     console.log("MINUTES TILL TRAIN: " + minutesAway);

     // Next Train
    nextArrival =  moment().add(minutesAway, "minutes").format("HH:mm a");

 




    //  var minutesDiff = moments().diff(sv.time,'minutes');

    var tRow = $("<tr>").append(
        $("<td>").text(sv.name),
        $("<td>").text(sv.destination),
        $("<td>").text(sv.frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
        // $("<td>").text(sv.time),


    );


    $("#train-table > tbody").append(tRow);
}, function (errorObject) {

    console.log("there is an error" + errorObject.code);


})

// moment(nextArrival).format("HH:mm");