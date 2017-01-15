/*
Class to test the different packing solutions.
*/

interface Item {
    size:
    number;
    name:
    string;
}

class Bin {
    capacity:
    number;
    capacityRemaining:
    number;
    storedItems:
    Array<Item>;

    constructor(cap: number) {
        this.capacity = cap;
        this.capacityRemaining = cap;
        this.storedItems = [];
    }

    //returns the remaining size if the item fits and -1 if it doesn't
    testFit(item: Item): number {
        return Math.max(this.capacityRemaining - item.size, -1);
    }

    add(item: Item) {
        this.storedItems.push(item);
        this.capacityRemaining = this.capacityRemaining - item.size;
    }

    remove(item: Item) {
        //find out of the item exists
        let itemIndex = this.storedItems.findIndex((testItem: Item) => item === testItem);
        if (itemIndex === -1) {
            throw new Error("Item could not be removed because it does not exist.");
        } else {
            this.storedItems.splice(itemIndex, 1);
            this.capacityRemaining = this.capacityRemaining + item.size;
        }
    }
}


export class PackingAlg{
    
}

export class TestSolution {
    items : Array<Item>;
    bins : Array<Bin>;
    packingSol : PackingAlg;

    constructor(packingSol : PackingAlg, initalItems : Array<Item>, initalBins : Array<Bin>) {
        this.items = initalItems;
        this.bins = initalBins;
    }

    getNextPiece() {

    }

    getNextBin() {

    }

    getAllBins(): Array<Bin> {
        return [];
    }
}