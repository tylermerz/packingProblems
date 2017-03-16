import { Item, Bin } from "../ItemAndBin";
import { PackingAlg } from "../PackingAlg";


/**
 * Semionline alg. with repacking from Galambos and Woeginger.
*/
export class REP3 extends PackingAlg {
    numBins: number;
    firstUnopenedBin: number;
    openBins: Array<Bin>;
    openBinsOriginalPosition: Array<number>;
    weightingFunctionArray;

    /** numBins determines how many harmoinc sub-intervals to divide the range (0,1] into.*/
    constructor(bins: Array<Bin>) {
        super(bins);
        this.firstUnopenedBin = 3;
        this.initOpenBins();
        this.initWeightingFunction();
    }

    /**construct the weighting function for 3 subdivisions from Gerhard and Woeginger.
     * This is hard coded because it is not a long series and a generalized solution would be inefficient.
     * We have stopped at 3 subdivisions because the 4th subdiviion only applies betwee 1/42 -> 0. Diminishing returns.
     */
    initWeightingFunction() {
        this.weightingFunctionArray = [];
        this.weightingFunctionArray.push(function (item: Item) {
            return 0;
        });//0. we will never call this.
        this.weightingFunctionArray.push(function (item: Item) {
            return item.size + 0.5;
        });//1. 1->1/2
        this.weightingFunctionArray.push(function (item: Item) {
            return item.size + 1. / 6.;
        });//2. 1/2->1/3
        this.weightingFunctionArray.push(function (item: Item) {
            return 4. / 3. * item.size;
        });//3. 1/3-1/6
        this.weightingFunctionArray.push(function (item: Item) {
            return 4. / 3. * item.size;
        });//4. 1/3-1/6
        this.weightingFunctionArray.push(function (item: Item) {
            return 4. / 3. * item.size;
        });//5. 1/3-1/6
        this.weightingFunctionArray.push(function (item: Item) {
            return item.size + 1. / 42.;
        });//6. 1/6-1/7
        this.weightingFunctionArray.push(function (item: Item) {
            return 7. / 6. * item.size;
        });//7. 1/7-0
    }

    /** open up the three bins that we are going to work with */
    initOpenBins() {
        this.openBins = Array<Bin>(3);
        this.openBinsOriginalPosition = Array<number>(3);

        for (var i = 0; i < this.openBins.length; i++) {
            this.openBins[i] = this.bins[i];
            this.openBinsOriginalPosition[i] = i;
        }
    }

    /**weighting function described in Galambos and Woeginger */
    weightingFunction(item: Item): number {
        let weightBin = Math.floor(1. / item.size);

        if (weightBin > 7) {//correct for very small items
            weightBin = 7;
        }

        return this.weightingFunctionArray[weightBin](item);
    }

    /**call the weighting function on each item in the bin and return the sum */
    weighBin(bin: Bin): number {

        return bin.storedItems.map(item => {
            return this.weightingFunction(item);
        }).reduce((a, b) => { return a + b });

    }

    /**repack open bins using the First fit decreasing alg. */
    FFDOpenBins() {
        //clear out all of the items in the open bins and sort them
        let tempBinArray: Array<Item> = [];
        this.openBins.forEach((currBin) => {
            while (currBin.storedItems.length > 0) {
                tempBinArray.push(currBin.pop());
            }
        });
        tempBinArray.sort((a, b) => {
            return a.size - b.size;
        });
        //place them into the first bin which they fit
        //no need to worry about the items not fitting because we are guaranteed they will by design
        let workingBin = 0;

        while (tempBinArray.length > 0) {
            let itemToBePlaced = tempBinArray.pop();

            if (this.openBins[workingBin].testFit(itemToBePlaced) === -1) {
                //close this bin and move on
                workingBin++;
                
            }

            this.openBins[workingBin].add(itemToBePlaced);
        }
    }

    /**repack the open bin array such that:
     * 1 there is at least 1 empty bin
     * 2 there is at least 1 bin with score >=1
     *      2a this bin will subsequently be closed
     *      2b open a new bin
     *
     * Uses first fit decreasing algorithm to repack bins initially
     */
    repackOpenBins() {
        this.FFDOpenBins();

        //after the FFD sort, if there is an empty bin, it will be bin 3
        if (this.openBins[2].numberItemsStored !== 0) {
            //determine weight of each bin
            this.openBins.forEach((currBin, index) => {
                let weight = this.weighBin(currBin);

                if (weight >= 1) {
                    //replace with new bin
                    this.openBins[index] = this.bins[this.firstUnopenedBin];
                    this.firstUnopenedBin++;
                    if (this.firstUnopenedBin >= this.numBins){
                        throw new Error("Trying to use more bins than available.");
                    }
                }
            });
        }
    }

    /** the returned binID will be the ID of it in the original list
     * At the end of the item placing and repacking, bin 0 (in the active list) will always be empty
     */
    placeItem(item: Item): number {
        let binID = -1;
        this.timerStart();
        //Doesn't matter where we initially put the nw item since we are going to reshuffle immediately
        this.openBins[2].add(item);
        binID = this.openBinsOriginalPosition[2];

        this.repackOpenBins();

        this.timerStop();
        return binID;
    }
}
