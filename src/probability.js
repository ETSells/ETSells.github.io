/* This file contains algorithms needed to generate the probability array. */
/* Design goals: Do as many array operatons in-place as possible. Reduce   */
/* Big-O runtime where possible/applicable. Handle any relevant exceptions.*/
/* Caller will not sanitize input. Make sure to properly validate inputs.  */

/* PUBLIC INTERFACE: Takes a string in the format   */
/* "XXXXdYYYY" where XXXX and YYYY are numbers.     */
/* Takes the input, converts it to a usable form,   */
/* then generates the correct distribution. null    */
/* return indicates improper input format.          */
export function parseAndProcessInput(input) {
    /* Local vars */
    let numDiceBuf = "";
    let diceSizeBuf = "";
    let secondHalf = false;
    let i = 0;

    /* String processing */
    while (secondHalf == false) {
        if (input.at(i) == "d") {
            secondHalf = true;
        }
        else if (!(parseInt(input.at(i)) == NaN))   {
            numDiceBuf += input.at(i);
        }
        else {
            return null;
        }
        i++;
    }
    while (secondHalf === true) {
        if (i >= input.length) {
            secondHalf = false;
        }
        else if (!(parseInt(input.at(i)) == NaN))   {
            diceSizeBuf += input.at(i);
        }
        else {
            return null;
        }
        i++;
    }

    /* Cast Buffers */
    let numDice = parseInt(numDiceBuf)
    let diceSize = parseInt(diceSizeBuf)
    if (numDice == NaN && diceSize == NaN) {
        return null;
    }
    else if (numDice == NaN) {
        numDice = 1
    }

    /* Generate and return the distribution array */
    return generateDistribution(numDice, diceSize);
}

/* PRIVATE */
/* Using a dynamic programming approach, generate an array with */
/* the discrete probability distribution of rolling XXdYY.      */
function generateDistribution(numDice, diceSize) {
    console.log(numDice);
    console.log(diceSize);

    /* Base Case (numDice = 1) */
    let distr = new Array(diceSize + 1) /* position 0 is empty for convenience */
    distr.fill(0); /* Undefined behavior if not initialized to a number */
    for (let i = 1; i <= diceSize; i++) {
        distr[i] = 1;
    }

    /* Dynamic Programming loop. Runtime: O(diceSize ^ numDice) */
    for (let i = 2; i <= numDice; i++) {
        let newDist = new Array((diceSize * i) + 1); /* Initialize to 0 up to max value */
        newDist.fill(0); /* Undefined behavior if not initialized to a number */
        for (let j = 1; j < distr.length; j++) {
            for (let k = 1; k <= diceSize; k++) {
                let totalRoll = j + k;
                newDist[totalRoll] += distr[j]
            }
        }
        distr = newDist;
    }

    /* ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter */
    return occurrencesToProbability(distr.filter(i => !Number.isNaN(i)));

}

/* PRIVATE */
/* Divide every elem of distArr by numOccurrences. Sanitize the array. */
function occurrencesToProbability(distArr) {
    let numOccurrences = 0;
    let sanitizedArr = [];

    for (let i = 0; i < distArr.length; i++) {
        if (distArr[i] != NaN && distArr[i] != null) { /* NaN elements throw off this calculation */
            numOccurrences += distArr[i];
        }
    }
    
    for (let i = 0; i < distArr.length; i++) {
        distArr[i] = distArr[i] / numOccurrences;
    }

    return distArr.filter(i => !Number.isNaN(i));
}