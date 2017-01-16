import {Item, Bin} from "../ItemAndBin";
import {PackingAlg} from "../PackingAlg";


//this will be the most naive implementation of this alg
export class BestFit extends PackingAlg {

    maximumCapacity:number;
    constructor(bins: Array<Bin>){
        super(bins);

        let caps = this.bins.map((currentBin)=>{
            return currentBin.capacity;
        });
        this.maximumCapacity = Math.max(...caps);
    }

    placeItem(item: Item):number{
        this.timerStart();

        let binID = -1;

        let remainders = this.bins.map((currBin)=>{
            return currBin.testFit(item);
        });

        
        let minRemainder;
        for (var i =0; i < remainders.length; i++){
            let currRemainder = remainders[i];
            if (currRemainder >=0){
                if (minRemainder === undefined){
                    minRemainder = currRemainder;
                    binID = i;
                } else if (currRemainder < minRemainder){
                    minRemainder = currRemainder;
                    binID = i;
                }
            }
        };

        //could not fit the item
        if (minRemainder === undefined){
            throw new Error("Could not fit item in any bin.");
        } else {
            this.bins[binID].add(item);
        }
        
        this.timerStop();
        return binID;
    }
}
