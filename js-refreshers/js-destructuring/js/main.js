console.log('########## Destructuring Array ################');
const colors = ['red', 'blue', 'yellow'];

// Assign each array element a variable, WITHOUT Array destructuring
// let red    = colors[0];
// let blue   = colors[1];
// let yellow = colors[2];
// console.log(red, blue, yellow);

// Rewrite the above assignment, WITH Array destructuring
let [red, blue, yellow] = colors;
console.log(red, blue, yellow);



console.log('########## Destructuring Object ################');
let props = {
    firstName: 'John',
    lastName: 'Doe',
    age: 33
}

// Assign each object property a variable, WITHOUT Object destructuring
// let firstName   = props.firstName;
// let lastName    = props.lastName;
// let age         = props.age;
// console.log(firstName, lastName, age)

// Rewrite the above assignment, WITH Object destructuring
let {firstName, lastName, age} = props;
console.log(firstName, lastName, age);

