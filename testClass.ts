/*
Class to test the different packing solutions.
*/

interface Item {
    size:
    number;
    name:
    string;
}

interface Report{
    bins : Array<Bin>;
    itemsNotPlaced : Array<Item>;
    timeTaken ?: number;
}

class Bin {
    numberItemsStored: number;
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
        this.numberItemsStored = 0;
    }

    //returns the remaining size if the item fits and -1 if it doesn't
    testFit(item: Item): number {
        return Math.max(this.capacityRemaining - item.size, -1);
    }

    add(item: Item) {
        this.storedItems.push(item);
        this.capacityRemaining = this.capacityRemaining - item.size;
        this.numberItemsStored += 1;
    }

    remove(item: Item) {
        //find out of the item exists
        let itemIndex = this.storedItems.findIndex((testItem: Item) => item === testItem);
        if (itemIndex === -1) {
            throw new Error("Item could not be removed because it does not exist.");
        } else {
            this.storedItems.splice(itemIndex, 1);
            this.capacityRemaining += item.size;
        }
    }
}


export class PackingAlg{
    bins : Array<Bin>;
    timeTaken:number;

    constructor(bins: Array<Bin>){
        this.bins = bins;
        this.timeTaken = 0;
    }

    placeItem(item: Item):number{
        return -1;
    }
}


export class NextFit extends PackingAlg {
    openBin:number;

    constructor(bins: Array<Bin>){
        super(bins);
        this.openBin = 0;
    }
    placeItem(item: Item):number{
        let binID = -1;
        if (this.bins[this.openBin].testFit(item)>=0){
            this.bins[this.openBin].add(item);
            binID = this.openBin;
        } else if(this.openBin < this.bins.length - 1) {
            this.openBin += 1;
            this.placeItem(item);
        } else {
            throw new Error("There is not enough capacity to hold all items.");
        }
        return binID;
    }
}

export class BestFit extends PackingAlg {

    constructor(bins: Array<Bin>){
        super(bins);
    }
    placeItem(item: Item):number{
        let binID = -1;
        
        return binID;
    }
}

export class TestSolution {
    initialItems : Array<Item>;
    packingSol : PackingAlg;
    workingItems : Array<Item>;

    constructor(packingSol : PackingAlg, initalItems : Array<Item>) {
        this.initialItems = initalItems;
        this.workingItems = initalItems;
        this.packingSol = packingSol;
    }

    //place the next piece in the workingItems list and return the number of the bin that it was put in
    //return -1 if this can't be placed
    placeNextItem() : number {
        if (this.workingItems.length > 0){
            return this.packingSol.placeItem(this.workingItems.pop());
        } else {
            return -1;
        }
    }

    placeAllItems() {
        while (this.workingItems.length > 0){
            this.placeNextItem();
        }
    }

    reportStatus():Report{
        
        let rep : Report = {bins:this.packingSol.bins,
            itemsNotPlaced:this.workingItems,
        timeTaken:this.packingSol.timeTaken}; 
        //ask about the bins from the Alg
        return rep;

    }

}

//we will use a normalized capacity of all bins to 1
//all items will be of size <=1

let numBins = 10;

//initialize bins
let initBins = Array<Bin>(numBins);
for (var i  = 0; i < initBins.length; i++){
    initBins[i] = new Bin(1);
}


//initialize items
let initItems = Array<Item>(numBins);
for (var i  = 0; i < initItems.length; i++){
    initItems[i] = {size: Math.random(),
                    name: "item"+i.toString()};
}


//call the solution

//next fit alg.
let testAlg = new NextFit(initBins);
let testSol = new TestSolution(testAlg,initItems);

testSol.placeAllItems();
console.log(testSol.reportStatus());


//Best fit alg testing
let testAlg = new BestFit(initBins);
let testSol2 = new TestSolution(testAlg,initItems);
testSol2.placeAllItems();
console.log(testSol2.reportStatus());
