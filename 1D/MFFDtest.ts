/*
Class to test the different packing solutions.
*/
import { Item, Bin } from "./ItemAndBin";
import { PackingAlg } from "./PackingAlg";
import { ModifiedFFD } from "./1DOffline/ModifiedFFD";
import { Report } from "./TestSolution";
import {TestSolutionOffline} from "./TestSolutionOffline";
var fs = require('fs');

//we will use a normalized capacity of all bins to 1
//all items will be of size <=1

let numBins = 1000;

//initialize bins
let initBins = Array<Bin>(numBins);

for (var i = 0; i < initBins.length; i++) {
    initBins[i] = new Bin(1);
}

let scale = 1.;
//initialize items
let initItems = Array<Item>(scale*numBins);

let TT = [];
let numTest = 1000;
let resultData = {packingEff:[],timeTaken:[]};
//call the solution
for (var i =0; i<numTest; i++) {
    for (var j = 0; j < initItems.length; j++) {
        initItems[j] = new Item(Math.random()/scale,"item" + j.toString());
    };

    //next fit alg.
    let testAlg = new ModifiedFFD(initBins);

    let testSol = new TestSolutionOffline(testAlg, initItems);

    testSol.placeAllItems();

    //console.log(testSol.reportStatus().packingEff);
    let rep = testSol.reportStatus()
              resultData["packingEff"].push(rep.packingEff);

    resultData["timeTaken"].push(rep.timeTaken);
};

fs.writeFileSync("ModifiedFFD.json",JSON.stringify(resultData));