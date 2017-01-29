import {Item, Bin} from "../ItemAndBin";
import {PackingAlg} from "../PackingAlg";


/**
 * alg that tries to fit the item into the bin with the least amount of wasted space.
 * calculates wasted space for all bins available---easy place to pick up efficiency.
*/
export class BestFit extends PackingAlg {

    maximumCapacity:number;
    constructor(bins: Array<Bin>) {
        super(bins);
        let caps = this.bins.map((currentBin)=> {
            return currentBin.capacity;
        });
        this.maximumCapacity = Math.max(...caps);
    }

    placeItem(item: Item):number {
        this.timerStart();

        let binID = -1;

        //for all of the bins find out how much space left over there is
        let remainders = this.bins.map((currBin)=>{
            return currBin.testFit(item);
        });

        //find the bin with the minimum positive remainder.
        //remainder of -1 here means that the item won't fit in that bin.
        let minRemainder;

        for (var i =0; i < remainders.length; i++) {
            let currRemainder = remainders[i];

            if (currRemainder >=0) {
                if (minRemainder === undefined) {
                    minRemainder = currRemainder;
                    binID = i;
                } else if (currRemainder < minRemainder) {
                    minRemainder = currRemainder;
                    binID = i;
                }
            }
        };

        //could not fit the item
        if (minRemainder === undefined) {
            throw new Error("Could not fit item in any bin.");
        } else {
            this.bins[binID].add(item);
        }

        this.timerStop();
        return binID;
    }
}
