console.log('############## Array.map()  ###############')
const numbers = [1, 2, 3, 4];

// .map.() loops through an array to perform a certain task on each element
let newArray1 = numbers.map(number => number)
// Expected output: [1, 2, 3, 4]
console.log(newArray1);

let newArray2 = numbers.map(number => number * 2)
// Expected output: [2, 4, 6, 8]
console.log(newArray2);

let newArray3 = numbers.map(number => `<li> ${number} </li>`)
// Expected output: ["<li>1</li>", "<li>2</li>", "<li>3</li>", "<li>4</li>"]
console.log(newArray3);

// Eaxmple on usage in React
// <ul> 
//    {numbers.map(number => `<li> ${number} </li>`)}
// </ul>

console.log('############## Array.filter()  ###############')
const ages = [25, 12, 4, 55];
let filteredArray1 = ages.filter(age => age >=18)
// Expected output: [25, 55]
console.log(filteredArray1);

let todos = ['task 1', 'task 2', 'task 3'];
let filteredArray2 = todos.filter(todo => todo !== 'task 1')
// Expected output: ['task 2', 'task 3']
console.log(filteredArray2);







