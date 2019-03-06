var config = {
    apiKey: "AIzaSyBAmst3BSZr_a7p9fjUNkeZ3oBL02KiLcg",
    authDomain: "train-scheduler-95522.firebaseapp.com",
    databaseURL: "https://train-scheduler-95522.firebaseio.com",
    projectId: "train-scheduler-95522",
    storageBucket: "train-scheduler-95522.appspot.com",
    messagingSenderId: "1073844518517"
};
firebase.initializeApp(config);
//   moment().format();

// Global variable list
var database = firebase.database();
// Display intial variables on the page in the table

// Listen for the click on the submit button
$(document).on("click", "#add-train-btn", function () {
    // capture the text in the form fields and save it as a variable
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = $("#first-train-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    database.ref().set({
        name: trainName,
        dest: destination,
        ftt: firstTrainTime,
        freq: frequency
    });

    database.ref().on("value", function (snapshot) {
        console.log(snapshot.val());
        console.log(snapshot.val().name);

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


    })
});

database.ref().on("value", function (snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.val().name);

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
});

// store it in firebase as an array of train objects
// display it in the top table 