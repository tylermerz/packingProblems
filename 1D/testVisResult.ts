/*
Class to test the different packing solutions.
*/
import { Item, Bin } from "./ItemAndBin";
import { PackingAlg } from "./PackingAlg";
import { Report, TestSolution } from "./TestSolution";
import {BestFit} from "./1DOnline/BestFit";
import {HarmonicFit} from "./1DOnline/HarmonicFit";


export class OneDVisualizationBackend {
    numBins:number;
    numItems:number;
    minItemSize:number;
    maxItemSize:number;
    testSol:TestSolution;
    ctx:CanvasRenderingContext2D;

    constructor(numBins:number,numItems:number,minItemSize:number,maxItemSize:number,ctx:CanvasRenderingContext2D){
        this.numBins = numBins;
        this.numItems = numItems;
        this.minItemSize = minItemSize;
        this.maxItemSize = maxItemSize;
        this.ctx = ctx;
    }

    pack(){

        //initialize bins
        let initBins = Array<Bin>(this.numBins);

        for (var i = 0; i < initBins.length; i++) {
            initBins[i] = new Bin(1);
        }

        //initialize items
        let initItems = Array<Item>(this.numItems);

        for (var i = 0; i < initItems.length; i++) {
            initItems[i] = new Item(Math.random()* (this.maxItemSize - this.minItemSize) + this.minItemSize,"item" + i.toString());
        };
        //let testAlg = new BestFit(initBins);
        let testAlg = new HarmonicFit(initBins,3);

        let testSol = new TestSolution(testAlg,initItems);
        try{
            testSol.placeAllItems();
        } catch(err){
            alert(err);
        }
        this.testSol = testSol;
    }
    drawBins() {
        this.ctx.clearRect(0,0,this.ctx.canvas.clientWidth,this.ctx.canvas.clientHeight);
        this.ctx.save();
        this.ctx.scale(this.ctx.canvas.clientWidth,-1*this.ctx.canvas.clientHeight);
        this.ctx.lineWidth = 2 / this.ctx.canvas.clientWidth;
        this.ctx.translate(0,-1);
        this.testSol.draw(this.ctx,this.numBins);
        this.ctx.restore();
    }
}