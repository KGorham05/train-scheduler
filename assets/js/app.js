// Configure firebase
var config = {
    apiKey:                 "AIzaSyBAmst3BSZr_a7p9fjUNkeZ3oBL02KiLcg",
    authDomain:             "train-scheduler-95522.firebaseapp.com",
    databaseURL:            "https://train-scheduler-95522.firebaseio.com",
    projectId:              "train-scheduler-95522",
    storageBucket:          "train-scheduler-95522.appspot.com",
    messagingSenderId:      "1073844518517"
};

firebase.initializeApp(config);
// Save the firebase database to a variable
var database = firebase.database();

// function for creating, calculating, and displaying train information on the page. 
// takes in a snapshot from firebase as a variable. 
function displayTrainInfo(snapshot) {
 
    var tr                  = $("<tr>");
    var tdTrain             = $("<td>");
    var tdDestination       = $("<td>");
    var tdFrequency         = $("<td>");
    var tdNextArrival       = $("<td>");
    var tdMinAway           = $("<td>");    
    
    var trainFrequency      = snapshot.val().freq;
    var ftt                 = snapshot.val().ftt;
    var timeFormat          = "HH:mm"
    var fttConverted        = moment(ftt, timeFormat);
    var currentTime         = moment();
    var diffTime            = moment().diff(moment(fttConverted), "minutes");
    var tRemainder          = diffTime % trainFrequency;
    var tMinutesTillTrain   = trainFrequency - tRemainder;
    var nextTrain           = currentTime.add(tMinutesTillTrain, "minutes");
    
    tdTrain                 .text(snapshot.val().name);
    tdDestination           .text(snapshot.val().dest);
    tdFrequency             .text(snapshot.val().freq);
    tdNextArrival           .text(nextTrain.format("h:mm a"));
    tdMinAway               .text(tMinutesTillTrain);

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

    var trainName =         $("#train-name-input").val().trim();
    var destination =       $("#destination-input").val().trim();
    var firstTrainTime =    $("#first-train-time-input").val().trim();
    var frequency =         $("#frequency-input").val().trim();

    // getElementById returns an element object that I can use to interact with the element. 
    // I'm saving each field as an object so I can make sure all fields have input before adding a train to firebase.

    var trainNameObject =   document.getElementById("train-name-input");
    var destObject =        document.getElementById("destination-input");
    var fttObject =         document.getElementById("first-train-time-input");
    var freqObject =        document.getElementById("frequency-input");

    // There's got to be a better way of checking this... 
    if (
        (trainNameObject   && trainNameObject.value) &&
        (destObject        && destObject.value) &&
        (fttObject         && fttObject.value) &&
        (freqObject        && freqObject.value)
    ) {
        database.ref().push({
            name: trainName,
            dest: destination,
            ftt:  firstTrainTime,
            freq: frequency
        });
    } else {
        alert("You must have an input in every field!")
    };
    document.getElementById("train-input-form").reset();

});
// This runs the displayTrainInfo function when the page loads, and if another train is added to the database.
database.ref().on("child_added", function (childSnap) {
    displayTrainInfo(childSnap);
});



