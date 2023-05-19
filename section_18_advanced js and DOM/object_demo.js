//a javascript object containing a function
var bellBoy1 = {
    name: "Timmy",
    age: 19,
    hasWorkPermit: true,
    moveSuitcase: function() {
        alert("May I take your suitcase?");
        pichUpSuitcase();
        move();
    }
}

function pichUpSuitcase(){}
function move(){}

//method call on object
bellBoy1.moveSuitcase();

//a javascript object using constructor function (using this operator)
function BellBoy (name, age, hasWorkPermit) {
    this.name = name;
    this.age = 19;
    this.hasWorkPermit = true;
    this.moveSuitcase = function() {
        alert("May I take your suitcase?");
        pichUpSuitcase();
        move();
    }
}

var bellBoy2 = new BellBoy("Timmy", 19, true);
bellBoy2.moveSuitcase();