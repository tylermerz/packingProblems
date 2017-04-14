import { Item, Bin } from "../ItemAndBin";
import { PackingAlgOffline } from "../PackingAlgOffline";


/**
 * Offline alg. from repacking from Garey and Johnson.
 * According to  Coffman Csirik this has the best worst-case performance of
 * any known algorithm as of 2007.
*/
export class ModifiedFFD extends PackingAlgOffline {
    lastKeyBin:number;
    openBins:Array<Bin>;

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

    placeSmallItems() {
        let nextItem = this.items.pop();
        let openBin = 0;

        while(nextItem !== undefined && this.items.length>0) {
            if (openBin >= this.bins.length) {
                throw new Error("Ran out of capacity to fit items.");
            }

            if(this.bins[openBin].testFit(nextItem) ===-1 ) {
                openBin++;
            } else {
                this.bins[openBin].add(nextItem);
                nextItem = this.items.pop();
            }
        }
    }

    /**Place all of the items with size greater than 1/3 using the FFD alg. */
    placeLargeItems() {
        //pack all items with size > 1/3
        let nextItem = this.items.pop();
        let openBin = 0;

        while(nextItem.size > 1/3. && this.items.length>0) {
            if (this.bins[openBin].testFit(nextItem) === -1) {
                openBin ++;
            }

            this.bins[openBin].add(nextItem);
            nextItem = this.items.pop();
        }

        //if it kicks out becaues the item is too small, but it back on the stack to be placed later in the alg.
        if (nextItem.size < 1/3.) {
            this.items.push(nextItem);
        }
    }

    /** pack the key bins with the smallest item remaining and then the second item that fits best */
    packKeyBins(keyBins : Array<Bin>) {
        //sort the bins so that the top of the stack has the most remaining space
        keyBins.sort((a,b)=> {
            return b.capacityRemaining-a.capacityRemaining;
        });
        //pack key bins from largest space remaining to smallest space remaining
        //pack smallest item still available into key bin with biggest space remaining
        //try to fit the biggest key item possible in remaining gap
        this.items.reverse();//want smallest items to pop first

        for (var i = 0; i < keyBins.length; i++) {
            let smallestItem = this.items.pop();

            if (smallestItem === undefined) {
                break;//placed all of the items.
            } else if (keyBins[i].testFit(smallestItem)===-1) {
                this.items.push(smallestItem);
                break;
            }

            //place smallest item
            keyBins[i].add(smallestItem);
            //see if we can get a second remaining item in this bin
            let foundSecondFit = false;

            for (var k = 0; k<this.items.length; k++) {
                if (keyBins[i].testFit(this.items[k]) !== -1) {
                    keyBins[i].add(this.items.splice(k,1)[0]);
                    foundSecondFit = true;
                }
            }

            if (foundSecondFit === false) {
                break;
            }
        }

        this.items.reverse();//put things back to the way they were
    }
    /** the returned binID will be the ID of it in the original list
     * At the end of the item placing and repacking, bin 0 (in the active list) will always be empty
     */
    placeAllItems() {
        let binID = -1;
        this.timerStart();
        //sort the items. The first item which will be popped off has the largest size
        this.items.sort((a,b)=> {
            return a.size - b.size;
        });
        this.placeLargeItems();
        this.lastKeyBin = 0;
        //identify key bins (only one item with size > 1/2)
        let keyBins = this.bins.filter((bin,index)=> {
            if (bin.capacityRemaining <=1/2) {
                this.lastKeyBin = Math.max(0,this.lastKeyBin);
            }

            return (bin.capacityRemaining <= 1/2);
        });
        this.packKeyBins(keyBins);
        this.placeSmallItems();
        //break out of special key loop behavior when there is only 1 key item remaining or a second key item can't be fit
        //contiue on with FFD for the remaining items
        this.timerStop();
        return binID;
    }
}
