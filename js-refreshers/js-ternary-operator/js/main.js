let isRaining = true;
console.log('############## if-statement ###############')
if (isRaining) {
    console.log('Stay home')
} else {
    console.log('Go out')
}

console.log('############## Ternary operator ###############')
isRaining 
    ? console.log('Stay home') 
    : console.log('Go out');


let isSunShining = true;
console.log('############## nested if-statement ###############')
if (isRaining) {
    console.log('Stay home')
} else {
    if (isSunShining) {
        console.log('Go out for ice cream')
    } else {
        console.log('Go out for walk')
    }
}

console.log('############## Nested ternary operator ###############')
isRaining 
    ? console.log('Stay home') 
    : isSunShining 
        ? console.log('Go out for ice cream') 
        : console.log('Go out for walk');

console.log('############## Nested if-statement, with assignment ###############')
let string = '';
if (isRaining) {
    string = 'Stay home'
} else {
    if (isSunShining) {
        string = 'Go out for ice cream'
    } else {
        string = 'Go out for walk'
    }
}

console.log(string);

console.log('############## Nested ternary operator, with assignment  ###############')
string = isRaining 
    ? 'Stay home'
    : isSunShining 
        ? 'Go out for ice cream'
        : 'Go out for walk'

console.log(string)


console.log('############## Shorthand ternary operator  ###############')
// If true, print the value on the right of "&&", 
// else print the value on the left of "&&"
console.log(isRaining && "Stay home")

// NOTE! In React the following doesn't get rendered: false, true, null, undefined, ''
// Which makes some shorthand ternary operations with &&, 
// more applicable in React than in vanilla JS




