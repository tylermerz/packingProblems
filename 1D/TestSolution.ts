import { Item, Bin } from "./ItemAndBin";
import { PackingAlg } from "./PackingAlg";

/** Object interface that summarizes the solution's progress*/
export interface Report {
    bins: Array<Bin>;
    itemsNotPlaced: Array<Item>;
    timeTaken?: number;
    packingEff: number;
    binsUsed: number;
}


/**
 * General wrapper for packing alg. and items to be placed.
*/
export class TestSolution {
    initialItems: Array<Item>;
    packingSol: PackingAlg;
    workingItems: Array<Item>;

    constructor(packingSol: PackingAlg, initalItems: Array<Item>) {
        this.initialItems = Array<Item>(initalItems.length);
        initalItems.forEach((currItem,index)=> {
            this.initialItems[index] = currItem.clone();
        });
        this.workingItems = this.initialItems;
        this.packingSol = packingSol;
    }

    /** place the next piece in the workingItems list and return the number of the bin that it was put in
     * return -1 if this can't be placed
     */
    placeNextItem(): number {
        if (this.workingItems.length > 0) {
            return this.packingSol.placeItem(this.workingItems.pop());
        } else {
            return -1;
        }
    }

    placeAllItems() {
        while (this.workingItems.length > 0) {
            this.placeNextItem();
        }
    }

    /**Returns a Report object for the current solution at the current iteration.*/
    reportStatus(): Report {
        let binsWhichHaveItems = this.packingSol.bins.filter((bin) => {
            if (bin.numberItemsStored > 0) {
                return true;
            }
        });


        let totalCap = binsWhichHaveItems.reduce((total, nextBin) => {
            return total + nextBin.capacity;
        }, 0);

        let totalUsedCap = binsWhichHaveItems.reduce((total, nextBin) => {
            return total + nextBin.capacity - nextBin.capacityRemaining;
        }, 0);

        let rep: Report = {
            bins: this.packingSol.bins,
            itemsNotPlaced: this.workingItems,
            timeTaken: this.packingSol.timeTaken,
            packingEff: totalUsedCap / totalCap,
            binsUsed: binsWhichHaveItems.length
        };
        //ask about the bins from the Alg
        return rep;

    }

    /** Draws each of the requested bins onto the provided HTML5 canvas. */
    draw(ctx: CanvasRenderingContext2D, binsToPlot?: number) {
        //layout the canvas
        let status = this.reportStatus();
        let totalBinWidth;
        ctx.save();//push the context to the stack to save any translations

        if (binsToPlot === undefined) {
            totalBinWidth = 1./status.binsUsed;
            status.bins.forEach((currBin, index) => {
                if (currBin.numberItemsStored > 0) {
                    currBin.draw(ctx, totalBinWidth);
                    ctx.translate(totalBinWidth,0);
                }
            });
        } else {
            totalBinWidth = 1./binsToPlot;
            status.bins.forEach((currBin, index) => {
                if (index < binsToPlot) {
                    currBin.draw(ctx, totalBinWidth);
                    ctx.translate(totalBinWidth,0);
                }
            });
        }

        ctx.restore();
    }

}

