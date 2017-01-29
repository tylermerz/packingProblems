import {Item, Bin} from "../ItemAndBin";
import {PackingAlg} from "../PackingAlg";

/**
 * Most naive packing alg.
 * Packs items into the only open bin. If the item doesn't fit,
 * close that bin and open a new one.
*/
export class NextFit extends PackingAlg {
    openBin:number;

    constructor(bins: Array<Bin>) {
        super(bins);
        this.openBin = 0;
    }
    placeItem(item: Item):number {
        this.timerStart();
        let binID = -1;

        if (this.bins[this.openBin].testFit(item)>=0) {
            this.bins[this.openBin].add(item);
            binID = this.openBin;
        } else if(this.openBin < this.bins.length - 1) {
            this.openBin += 1;
            this.placeItem(item);
        } else {
            throw new Error("There is not enough capacity to hold all items.");
        }

        this.timerStop()
        return binID;
    }
}