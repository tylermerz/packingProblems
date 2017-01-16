import {Item, Bin} from "../ItemAndBin";
import {PackingAlg} from "../PackingAlg";

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
        let minPossbleRemainder = this.maximumCapacity - item.size;

        let remainders = Array<number>(this.bins.length);
        for (var i =0; i < remainders.length; i++){
            remainders[i] = this.bins[i].testFit(item);
            if (remainders[i]==minPossbleRemainder){
                break;
            }
        }
 
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
                if (currRemainder == minPossbleRemainder){ 
                    break;
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
