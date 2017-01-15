import {Item, Bin} from "../ItemAndBin";
import {PackingAlg} from "../PackingAlg";

export class BestFit extends PackingAlg {

    constructor(bins: Array<Bin>){
        super(bins);
    }
    placeItem(item: Item):number{
        let binID = -1;
        
        return binID;
    }
}
