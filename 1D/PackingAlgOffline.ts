import {Item, Bin} from "./ItemAndBin";
import {PackingAlg} from "./PackingAlg";
/**
 * Generalized class from which all packing algs. are derived.
 * Has naive timing functions to compute basic performance stats.
*/
export class PackingAlgOffline extends PackingAlg {
    bins : Array<Bin>;
    timeTaken:number;
    items:Array<Item>;

    constructor(bins: Array<Bin>) {
        super(bins);
    }
    loadItems(items:Array<Item>) {
        this.items = items;
    }
    placeAllItems() {
        0==0;
    }
}

