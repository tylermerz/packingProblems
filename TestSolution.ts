import {Item, Bin} from "./ItemAndBin";
import {PackingAlg} from "./PackingAlg";

export interface Report{
    bins : Array<Bin>;
    itemsNotPlaced : Array<Item>;
    timeTaken ?: number;
}

export class TestSolution {
    initialItems : Array<Item>;
    packingSol : PackingAlg;
    workingItems : Array<Item>;

    constructor(packingSol : PackingAlg, initalItems : Array<Item>) {
        this.initialItems = initalItems;
        this.workingItems = initalItems;
        this.packingSol = packingSol;
    }

    //place the next piece in the workingItems list and return the number of the bin that it was put in
    //return -1 if this can't be placed
    placeNextItem() : number {
        if (this.workingItems.length > 0){
            return this.packingSol.placeItem(this.workingItems.pop());
        } else {
            return -1;
        }
    }

    placeAllItems() {
        while (this.workingItems.length > 0){
            this.placeNextItem();
        }
    }

    reportStatus():Report{
        
        let rep : Report = {bins:this.packingSol.bins,
            itemsNotPlaced:this.workingItems,
        timeTaken:this.packingSol.timeTaken}; 
        //ask about the bins from the Alg
        return rep;

    }

}

