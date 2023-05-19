function fibonacciGenerator(n) {
    let array = [];

    for(let i = 1; i <=n; i++) {
        if(i === 1){
            array.push(0);
        } else if(i === 2){
            array.push(1);
        } else {
            let temp1 = array[i-3];
            let temp2 = array[i-2];
            array.push(temp1+temp2);
        }
    }

    return array;
}

console.log(fibonacciGenerator(5));