import {TestSolution} from "./TestSolution";
import { Item, Bin } from "./ItemAndBin";
import { PackingAlgOffline } from "./PackingAlgOffline";

export class TestSolutionOffline extends TestSolution{
    constructor(packingSol: PackingAlgOffline, initalItems: Array<Item>) {
        super(packingSol,initalItems);
        this.packingSol.loadItems(initalItems);
    }
    placeAllItems() {
        this.packingSol.placeAllItems();
    }
}