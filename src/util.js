/* Contains extraneous functions needed to create the graph */

/* PUBLIC INTERFACE */
export function distArrToGraphableArr(distArr) {
    let parentArr = [];
    for (let i = 1; i < distArr.length; i++) {
        let instance = { Result: i, Probability: distArr[i] };
        parentArr.push(instance);
    }
    return parentArr;
}