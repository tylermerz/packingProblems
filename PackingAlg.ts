import {Item, Bin} from "./ItemAndBin";

export class PackingAlg{
    bins : Array<Bin>;
    timeTaken:number;

    constructor(bins: Array<Bin>){
        this.bins = bins;
        this.timeTaken = 0;
    }

    placeItem(item: Item):number{
        return -1;
    }
}

