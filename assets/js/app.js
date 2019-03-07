// configure firebase
var config = {
    apiKey: "AIzaSyBAmst3BSZr_a7p9fjUNkeZ3oBL02KiLcg",
    authDomain: "train-scheduler-95522.firebaseapp.com",
    databaseURL: "https://train-scheduler-95522.firebaseio.com",
    projectId: "train-scheduler-95522",
    storageBucket: "train-scheduler-95522.appspot.com",
    messagingSenderId: "1073844518517"
};
firebase.initializeApp(config);

// Global variable list
var database = firebase.database();
// Display intial variables on the page in the table

function displayTrainInfo(snapshot) {
    console.log("displayTrainInfo Function")
    var tr = $("<tr>");
    var tdTrain = $("<td>");
    tdTrain.text(snapshot.val().name);
    var tdDestination = $("<td>");
    tdDestination.text(snapshot.val().dest);
    var tdFrequency = $("<td>");
    tdFrequency.text(snapshot.val().freq);
    // these variables need moment.js
    var tdNextArrival = $("<td>");
    tdNextArrival.text("next-arrival-place-holder-text");
    var tdMinAway = $("<td>");
    tdMinAway.text("min-away-place-holder-text");
    tr.append(tdTrain);
    tr.append(tdDestination);
    tr.append(tdFrequency);
    tr.append(tdNextArrival);
    tr.append(tdMinAway);
    tr.appendTo($("#train-list"));
};


// Listen for the click on the submit button
$(document).on("click", "#add-train-btn", function () {
    // capture the text in the form fields and save it as a variable

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = $("#first-train-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // getElementById returns an element object that I can use to interact with the element. 
    // I'm saving each field as an object so I can make sure all fields have input before adding a train to firebase.

    var trainNameObject = document.getElementById("train-name-input");
    var destObject = document.getElementById("destination-input");
    var fttObject = document.getElementById("first-train-time-input");
    var freqObject = document.getElementById("frequency-input");

    // I don't entirely understand how this section works 
    if (
        (trainNameObject && trainNameObject.value) &&
        (destObject && destObject.value) &&
        (fttObject && fttObject.value) &&
        (freqObject && freqObject.value)
    ) {
        alert("Huston we have all values")
        database.ref().push({
        name: trainName,
        dest: destination,
        ftt: firstTrainTime,
        freq: frequency
    });
    } else {
        alert("You must have an input in every field!")
    };
});

database.ref().on("child_added", function (childSnap) {
    displayTrainInfo(childSnap);
});



// store it in firebase as an array of train objects
// display it in the top table 
