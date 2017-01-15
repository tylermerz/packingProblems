/*
Class to test the different packing solutions.
*/
import {Item, Bin} from "./ItemAndBin";
import {PackingAlg} from "./PackingAlg";
import {NextFit} from "./1DOnline/NextFit";
import {Report, TestSolution} from "./TestSolution";




//we will use a normalized capacity of all bins to 1
//all items will be of size <=1

let numBins = 10;

//initialize bins
let initBins = Array<Bin>(numBins);
for (var i  = 0; i < initBins.length; i++){
    initBins[i] = new Bin(1);
}


//initialize items
let initItems = Array<Item>(numBins);
for (var i  = 0; i < initItems.length; i++){
    initItems[i] = {size: Math.random(),
                    name: "item"+i.toString()};
}

//call the solution

//next fit alg.
let testAlg = new NextFit(initBins);
let testSol = new TestSolution(testAlg,initItems);

testSol.placeAllItems();
console.log(testSol.reportStatus());

/*
//Best fit alg testing
let testAlg2 = new BestFit(initBins);
let testSol2 = new TestSolution(testAlg2,initItems);
testSol2.placeAllItems();
console.log(testSol2.reportStatus());
*/