/*
Class to test the different packing solutions.
*/
import { Item, Bin } from "./ItemAndBin";
import { PackingAlg } from "./PackingAlg";
import { NextFit } from "./1DOnline/NextFit";
import { Report, TestSolution } from "./TestSolution";
import {BestFit} from "./1DOnline/BestFit";
import {HarmonicFit} from "./1DOnline/HarmonicFit";




//we will use a normalized capacity of all bins to 1
//all items will be of size <=1

let numBins = 100;

//initialize bins
let initBins = Array<Bin>(numBins);
for (var i = 0; i < initBins.length; i++) {
    initBins[i] = new Bin(1);
}

//initialize items
let initItems = Array<Item>(15);
for (var i = 0; i < initItems.length; i++) {
    initItems[i] = new Item(Math.random(),"item" + i.toString());
};

//call the solution


//next fit alg.
let testAlg = new NextFit(initBins);
let testSol = new TestSolution(testAlg, initItems);

testSol.placeAllItems();




//Best fit alg testing
let testAlg2 = new BestFit(initBins);
let testSol2 = new TestSolution(testAlg2,initItems);
testSol2.placeAllItems();



//Harmonic Fit
let testAlg3 = new HarmonicFit(initBins,10);
let testSol3 = new TestSolution(testAlg3,initItems);
testSol3.placeAllItems();

module.exports= { drawBins: function (ctx : CanvasRenderingContext2D) {
    ctx.save();
    ctx.scale(600,-300);
    ctx.lineWidth = 2 / 600.;
    ctx.translate(0,-1);
    testSol3.draw(ctx,15);
    ctx.restore();
}
                }
