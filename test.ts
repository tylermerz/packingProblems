/*
Class to test the different packing solutions.
*/
import { Item, Bin } from "./ItemAndBin";
import { PackingAlg } from "./PackingAlg";
import { REP3 } from "./1DOnlineWithRepack/REP3";
import { Report, TestSolution } from "./TestSolution";





//we will use a normalized capacity of all bins to 1
//all items will be of size <=1

let numBins = 10;

//initialize bins
let initBins = Array<Bin>(numBins);
for (var i = 0; i < initBins.length; i++) {
    initBins[i] = new Bin(1);
}

let scale = 1.;
//initialize items
let initItems = Array<Item>(scale*numBins);
for (var i = 0; i < initItems.length; i++) {
    initItems[i] = new Item(Math.random()/scale,"item" + i.toString());
};


//call the solution


//next fit alg.
let testAlg = new REP3(initBins);
let testSol = new TestSolution(testAlg, initItems);

testSol.placeAllItems();
console.log(testSol.reportStatus());

console.log(testSol.reportStatus().timeTaken);
console.log(testSol.reportStatus().packingEff);

