import {Item, Bin} from "./ItemAndBin";

/**
 * Generalized class from which all packing algs. are derived.
 * Has naive timing functions to compute basic performance stats.
*/
export class PackingAlg {
    bins : Array<Bin>;
    timeTaken:number;
    TS:number;

    constructor(bins: Array<Bin>) {
        this.bins = new Array<Bin>(bins.length);
        bins.forEach((currentBin,index)=> {
            this.bins[index] = currentBin.clone();
        });
        this.timeTaken = 0;
    }
    timerStart() {
        this.TS = Date.now();
    }

    timerStop() {
        this.timeTaken += Date.now()-this.TS;
    }
    placeItem(item: Item):number {
        return -1;
    }
}

