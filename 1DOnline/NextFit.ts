import {Item, Bin} from "../ItemAndBin";
import {PackingAlg} from "../PackingAlg";

export class NextFit extends PackingAlg {
    openBin:number;

    constructor(bins: Array<Bin>){
        super(bins);
        this.openBin = 0;
    }
    placeItem(item: Item):number{
        let binID = -1;
        if (this.bins[this.openBin].testFit(item)>=0){
            this.bins[this.openBin].add(item);
            binID = this.openBin;
        } else if(this.openBin < this.bins.length - 1) {
            this.openBin += 1;
            this.placeItem(item);
        } else {
            throw new Error("There is not enough capacity to hold all items.");
        }
        return binID;
    }
}