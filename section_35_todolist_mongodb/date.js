//we can log our own module by using the module object
//console.log(module); //this line runs when we require this module elsewhere

//export this modules function so we can use it elsewhere
module.exports.getDate = getDate; //without ()... we can also shortcut 'module.exports' with just 'exports'
module.exports.getDay = getDay; //without ()

//or do it directly with anonymous function
/**
 * module.exports.getDate = function() {
 * var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    return day;
 * }
 *
 */

function getDate() {
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    return day;
}

function getDay() {
    var today = new Date();

    var options = {
        weekday: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    return day;
}

