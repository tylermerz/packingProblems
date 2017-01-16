import {Item, Bin} from "../ItemAndBin";
import {PackingAlg} from "../PackingAlg";

export class BestFit extends PackingAlg {

    constructor(bins: Array<Bin>){
        super(bins);
    }

    placeItem(item: Item):number{
        this.timerStart();

        let binID = 0;
        let bestBinRemainder = this.bins[0].capacity;//FIX ME: very klugey 
        this.bins.forEach((currentBin,currentBinID)=>{
            let currentBinRemainder = currentBin.testFit(item);
            if ((currentBinRemainder < bestBinRemainder) && (currentBinRemainder >=0)){
                bestBinRemainder = currentBinRemainder;
                binID = currentBinID;
            }
        });

        //could not fit the item
        if (bestBinRemainder < 0){

            throw new Error("Could not fit item in any bin.");
        } else if( binID === -1){
            throw new Error("BinID -1");
        } else {
            this.bins[binID].add(item);
        }
        
        this.timerStop();
        return binID;
    }
}
