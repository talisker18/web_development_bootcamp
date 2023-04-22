function whoIsBuying(names){
    let numberOfPeople = names.length;
    let randomPersonPosition = Math.floor(Math.random() * numberOfPeople);
    let randomPerson = names[randomPersonPosition];

    return randomPerson + " is going to buy lunch today";
}

var names = ["joel", "john", "bob"];

console.log(whoIsBuying(names));