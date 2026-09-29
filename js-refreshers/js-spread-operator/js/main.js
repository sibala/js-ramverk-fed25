/**
 * Spread operator
 */

console.log("### Spread can be used for assigning values to function arguments ###");
function sum(x, y, z) {
    console.log(x + y + z);
}
let numbers = [1, 2, 3];
sum(...numbers);


console.log("### Spread can be used for retrieving function arguments ###");
function sum(...args) {
    console.log(args);
    console.log(args[0] + args[1] + args[2]);
}
sum(1, 2, 3, 5, 6);


console.log("### Spread can be used for adding elements to an array ###");
let array = [1, 2, 3]
let element1 = 4
let element2 = 5
let element3 = 6
let newArray = [
    ...array,
    element1,
    element2,
    element3,
]

console.log(newArray);


console.log("### Spread can be used for merging 2 arrays ###");
let array1 = [1, 2, 3]
let array2 = [4, 5, 6]
newArray = [
    ...array1,
    ...array2
]

console.log(newArray);


console.log("### Spread can be used for merging a parameter (property OR method) with an objects ###");
let object = {firstname: 'John'}
let parameter = "Doe";
newObject = {
    ...object,
    lastname: 'doe'
}

console.log(newObject);

console.log("### Spread can be used for merging 2 objects ###");
let object1 = {firstname: 'John', lastname: 'Doe', age: 33}
let object2 = {hobby: 'Coding'};
// NOTE! the latter overrides the previous value
let object3 = {hobby: 'fishing'};
newObject = {
    ...object1,
    ...object2,
    ...object3
}

console.log(newObject);


console.log("### More examples with mergin objects with spread operator ###");
let todo = {id: 1, task: 'syssla1', disabled: false}
newObject = {
    ...todo,
    disabled: true
}

// Spread does the following with the object
// NOTE! the latter overrides the previous value
// newObject = {
//     id: 1, 
//     task: 'syssla1', 
//     disabled: false,
//     disabled: true
// }

console.log(newObject);

  