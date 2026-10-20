console.log("########### setInterval/clearInterval #############")

let counter = 0
const increment = () => {
    counter++;
    console.log(counter)

    if (counter === 10) {
        clearInterval(countID);
    }
}


const countID = setInterval(
    increment, 
    1000 // 1000 millisec equals 1 sec
);


console.log("Detta kommer förmodligen köras innan setInterval hinner anropa increment(). setInterval är asynkront, dvs körs parallellt med annan kod ")

