/*
Class to test the different packing solutions.
*/
import { Item, Bin } from "./ItemAndBin";
import { PackingAlg } from "./PackingAlg";
import { REP3 } from "./1DOnlineWithRepack/REP3";
import {NextFit} from "./1DOnline/NextFit";
import { Report, TestSolution } from "./TestSolution";

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

for (var i = 0; i < initItems.length; i++) {
    initItems[i] = new Item(Math.random()/scale,"item" + i.toString());
};

let TT = [];

let numTest = 1000;

let resultData = {packingEff:[],timeTaken:[]};

//call the solution
for (var i =0; i<numTest; i++) {
    for (var j = 0; j < initItems.length; j++) {
        initItems[i] = new Item(Math.random()/scale,"item" + j.toString());
    };

    //next fit alg.
    let testAlg = new NextFit(initBins);

    let testSol = new TestSolution(testAlg, initItems);

    testSol.placeAllItems();

    //console.log(testSol.reportStatus().packingEff);
    let rep = testSol.reportStatus()
              resultData["packingEff"].push(rep.packingEff);

    resultData["timeTaken"].push(rep.timeTaken);
};

fs.writeFileSync("NF.json",JSON.stringify(resultData));