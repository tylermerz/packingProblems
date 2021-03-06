import {Item, Bin} from "./ItemAndBin";
process.hrtime = require('browser-process-hrtime');
/**
 * Generalized class from which all packing algs. are derived.
 * Has naive timing functions to compute basic performance stats.
*/
export class PackingAlg {
    bins : Array<Bin>;
    timeTaken:number;
    TS:[number, number];

    constructor(bins: Array<Bin>) {
        this.bins = new Array<Bin>(bins.length);
        bins.forEach((currentBin,index)=> {
            this.bins[index] = currentBin.clone();
        });
        this.timeTaken = 0;
    }
    timerStart() {
        this.TS = process.hrtime();
    }

    timerStop() {
        let td=process.hrtime(this.TS);
        this.timeTaken += td[0]*1e9+td[1];
        //this.timeTaken += performance.now()-this.TS; 
    }
    placeItem(item: Item):number {
        return -1;
    }
}

