/**
 * Obejcts that will be packed by the packing algorithms
*/
export class Item {
    size:
    number;
    name:
    string;
    constructor(size:number,name:string) {
        this.size = size;
        this.name = name;
    }
    clone():Item {
        return new Item(this.size,this.name);
    }
    draw(ctx:CanvasRenderingContext2D,width:number,style?:Object) {
        ctx.fillStyle = "#ABC";//set the color
        ctx.fillRect(0,0,width,this.size);
        ctx.strokeRect(0,0,width,this.size);
    }
}

/**
 * Class where Items can be stored
*/
export class Bin {
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
    /** Returns a copy of the bin. No contents are copied. */
    clone():Bin {
        return new Bin(this.capacity);

    }

    /** returns the remaining size if the item fits and -1 if it doesn't */
    testFit(item: Item): number {
        if (this.capacityRemaining - item.size > 0) {
            return this.capacityRemaining - item.size;
        } else {
            return -1;
        }
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

    pop():Item {
        let itemToReturn = this.storedItems.pop();
        this.numberItemsStored--;
        this.capacityRemaining += itemToReturn.size;

        return itemToReturn;
    }

    draw(ctx: CanvasRenderingContext2D,width:number,style?:Object) {
        //Todo
        ctx.strokeRect(0,0,width,1);
        ctx.save();//push the current translation onto the stack
        this.storedItems.forEach((item,index)=> {
            item.draw(ctx,width);
            ctx.translate(0,item.size);
        });
        ctx.restore();//restore the y translation
    }
}

