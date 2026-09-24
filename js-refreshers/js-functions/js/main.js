console.log("########## Normal function ############")
function normalFunction() {
    console.log('Normal function');
}
normalFunction();

function normalFunctionWithReturn() {
    return 'Normal function with return'
}

console.log(normalFunctionWithReturn());

console.log("########## Arrow functions ############")

const arrowFunction = () => {
    console.log("Arrow function");
}
arrowFunction();

const arrowFunctionWithReturn = () => {
    return "Arrow function with return";
}
console.log(arrowFunctionWithReturn());

const arrowFunctionWithReturn2 = () =>  ("Arrow function 2 with return");
console.log(arrowFunctionWithReturn2());

const arrowFunctionWithReturn3 = () =>  (
    {text:"Arrow function 2 with return"}
);
console.log(arrowFunctionWithReturn3());
