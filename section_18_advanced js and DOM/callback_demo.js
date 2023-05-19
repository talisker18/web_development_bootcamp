document.addEventListener("keydown", respondToKey(e)); //respondToKey(e) is a callback function

function respondToKey(event) {
    console.log("Key pressed: " + event.key);
}

//another example, simulate existing addEventListener method

function anotherAddEventListener(typeOfEvent, callbackFunction) { //no need to define the param here (like callbackFunction(event, testString) ). In this case, callbackFunction contains function(event){ console.log(event); console.log(testString); }
    //detect event code...

    //...

    //simulated p press event
    var eventThatHappened = {
        eventType: "keydown",
        key: "p",
        durationOfKeyDown: 2
    }

    if(eventThatHappened.eventType === typeOfEvent) {
        callbackFunction(eventThatHappened, "test"); //if this is true, lines of code will be executed from the function(event, testString). Make sure to match the number of params!!
    }
}

//calling the function
anotherAddEventListener("keydown", function(event, testString){ // function(event, testString) = callback function. the params are filled by the function call of line 22
    console.log(event);
    console.log(testString);
});