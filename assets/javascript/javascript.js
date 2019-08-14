
$(document).ready(function () {

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

    function timeValue(firstTime, tFrequency) {

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

        // Current Time
        var currentTime = moment();

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;

        // Minute Until Train
        return tFrequency - tRemainder;

    }

    // Capture Button Click
    $("#add-train").on("click", function (event) {
        event.preventDefault();
        tname = $("#tName-input").val().trim();
        tDestination = $("#destination-input").val().trim();
        firstTime = $("#firstTime-input").val().trim();
        tFrequency = $("#frequency-input").val().trim();

        // Code for the train data
        trainData.push({
            tname: tname,
            tDestination: tDestination,
            firstTime: firstTime,
            tFrequency: tFrequency
        });



    });

    trainData.on("child_added", function (childSnapshot) {

        var tr = $("<tr>");
        tr.append("<td>" + childSnapshot.val().tname + "</td>");
        tr.append("<td>" + childSnapshot.val().tDestination + "</td>");
        tr.append("<td>" + childSnapshot.val().tFrequency + "</td>");
        tr.append("<td>" + moment(moment().add(timeValue(childSnapshot.val().firstTime, childSnapshot.val().tFrequency), "minutes")).format("hh:mm A") + "</td>");
        tr.append("<td>" + timeValue(childSnapshot.val().firstTime, childSnapshot.val().tFrequency) + "</td>");
        $("#member-list").append(tr);

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });



})

