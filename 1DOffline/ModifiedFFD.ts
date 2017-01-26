import { Item, Bin } from "../ItemAndBin";
import { PackingAlgOffline } from "../PackingAlgOffline";


/**
 * Offline alg. from repacking from Garey and Johnson.
 * According to  Coffman Csirik this has the best worst-case performance of
 * any known algorithm as of 2007.
*/
export class ModifiedFFD extends PackingAlgOffline {



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



    /** the returned binID will be the ID of it in the original list
     * At the end of the item placing and repacking, bin 0 (in the active list) will always be empty
     */
    placeAllItems() {
        let binID = -1;
        this.timerStart();

        //sort the items. The first item which will be popped off has the largest size
        this.items.sort((a,b)=>{
            return a.size - b.size;
        });

        //pack all items with size > 1/3

        //identify key bins (only one item with size > 1/2)

        //pack key bins from largest space remaining to smallest space remaining
        
        //pack smallest item still available into key bin with biggest space remaining
        
        //try to fit the biggest key item possible in remaining gap

        //break out of special key loop behavior when there is only 1 key item remaining or a second key item can't be fit

        //contiue on with FFD for the remaining items
        

        this.timerStop();
        return binID;
    }
}
