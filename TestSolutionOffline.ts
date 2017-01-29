import {TestSolution} from "./TestSolution";
import { Item, Bin } from "./ItemAndBin";
import { PackingAlgOffline } from "./PackingAlgOffline";

export class TestSolutionOffline extends TestSolution {
    packingSol:PackingAlgOffline;
    constructor(packingSol: PackingAlgOffline, initalItems: Array<Item>) {
        super(packingSol,initalItems);
        //this.packingSol = packingSol;
        this.packingSol.loadItems(this.workingItems);
    }
    placeAllItems() {
        this.packingSol.placeAllItems();
    }
}