import {Item, Bin} from "../ItemAndBin";
import {PackingAlg} from "../PackingAlg";


//this will be the most naive implementation of this alg
export class HarmonicFit extends PackingAlg {
    numBins : number;
    firstUnopenedBin : number;
    openBins: Array<Bin>;
    openBinsOriginalPosition: Array<number>;
    constructor(bins: Array<Bin>, numBins: number){
        super(bins);
        this.numBins = numBins;
        this.firstUnopenedBin = numBins;
        this.initOpenBins();
    }

    initOpenBins(){
        this.openBins = Array<Bin>(this.numBins);
        this.openBinsOriginalPosition = Array<number>(this.numBins);
        for (var i = 0; i < this.openBins.length; i++){
            this.openBins[i] = this.bins[i];
            this.openBinsOriginalPosition[i] = i;
        }
    }

    binIndex(item:Item):number{
        let inverseSize = 1./item.size;
        if (inverseSize >= this.numBins){
            return this.numBins-1;
        } else {
            return Math.floor(1./item.size);
        }
    }

    //the returned binID will be the ID of it in the original list
    placeItem(item: Item):number{
        let binID = -1;
        this.timerStart();
        let binIndex = this.binIndex(item);
        if (this.openBins[binIndex].testFit(item) === -1){
            //see if the bins are out of space
            if (this.firstUnopenedBin === this.bins.length){
                throw new Error("There are no more bins to open.");
            }

            //close this bin and open a new one
            this.openBins[binIndex] = this.bins[this.firstUnopenedBin];
            this.openBinsOriginalPosition[binIndex] = this.firstUnopenedBin;
            this.firstUnopenedBin++;
            
        } 
        this.openBins[binIndex].add(item);
        binID = this.openBinsOriginalPosition[binIndex];//look up where we had this bin itiially

        
        this.timerStop();
        return binID;
    }
}
