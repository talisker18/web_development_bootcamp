
function dice(){
    let randomNumber1 = Math.floor((Math.random() * 6)+1);
    document.querySelector(".img1").setAttribute("src", "images/dice"+randomNumber1+".png");

    let randomNumber2 = Math.floor((Math.random() * 6)+1);
    document.querySelector(".img2").setAttribute("src", "images/dice"+randomNumber2+".png");

    let result = document.getElementById("result");

    if(randomNumber1 > randomNumber2){
        result.innerHTML = "Player 1 wins";
    } else if(randomNumber1 === randomNumber2) {
        result.innerHTML = "Draw";
    } else {
        result.innerHTML = "Player 2 wins";
    }
}