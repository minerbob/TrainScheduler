// Initialize Firebase

const config = {
    apiKey: "AIzaSyCnPj0WOEgDUHXLbpXG9ML6OHXXp2vX_4U",
    authDomain: "bob1-31197.firebaseapp.com",
    databaseURL: "https://bob1-31197.firebaseio.com",
    projectId: "bob1-31197",
    storageBucket: "",
    messagingSenderId: "580808993373",
    appId: "1:580808993373:web:7b72705b758e6415"
};

firebase.initializeApp(config);

var dataRef = firebase.database();

var trainData = dataRef.ref('trainData');


// Initial Values
var firstTime = "03:30";

// Assumptions
var tFrequency = 0;

// train name
var tName = "";

// train Desinsation 
var tDestination = "";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

// Capture Button Click
$("#add-train").on("click", function (event) {
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    tname = $("#name-input").val().trim();
    tDestination = $("#destination-input").val().trim();
    firstTime = $("#firstTime-input").val().trim();
    tFrequency = $("frequency-input").val().trim();

    // Code for the train data
    trainData.push({
        tname: tname,
        tDestination: tDestination,
        firstTime: firstTime , 
        tFrequency: tFrequency
    });



});

//usernameRef.on("child_added", function (childSnapshot) {
//    
//    // Log everything that's coming out of snapshot
//    console.log(childSnapshot.val().name);
//    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
//    console.log(childSnapshot.val().name);
//    console.log(childSnapshot.val().email);
//    console.log(childSnapshot.val().comment);
//    console.log(childSnapshot.val().joinDate);
//
//    // full list of items to the well
//    $("#full-member-list").append("<div class='well'><span class='member-name'> " +
//        childSnapshot.val().name +
//        " </span><span class='member-email'> " + childSnapshot.val().email +
//
//        " </span><span class='member-comment'> " + childSnapshot.val().comment +
//        " </span></div>");
//
//    // Handle the errors
//}, function (errorObject) {
//    console.log("Errors handled: " + errorObject.code);
//});
//
//usernameRef.orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
//    // Change the HTML to reflect
//    $("#name-display").text(snapshot.val().name);
//    $("#email-display").text(snapshot.val().email);
//    $("#comment-display").text(snapshot.val().comment);
//});
