export class Item {
    size:
    number;
    name:
    string;
    constructor(size:number,name:string){
        this.size = size;
        this.name = name;
    }
    clone():Item{
        return new Item(this.size,this.name);
    }
    draw(ctx:CanvasRenderingContext2D,xOffset,yOffset:number,width:number,style?:Object){
        ctx.fillStyle = "#ABC";//set the color
        ctx.fillRect(xOffset,yOffset,width,this.size);
        ctx.strokeRect(xOffset,yOffset,width,this.size);
    }
}

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
    clone():Bin{
        return new Bin(this.capacity);

    }
    //returns the remaining size if the item fits and -1 if it doesn't
    testFit(item: Item): number {
        if (this.capacityRemaining - item.size > 0){
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

    draw(ctx: CanvasRenderingContext2D,xOffset:number,yOffset:number,width:number,style?:Object){
        //Todo
        console.log(width);
        ctx.strokeRect(xOffset,yOffset,width,1);

        let capacityOfItemsSoFar = 0;
        this.storedItems.forEach((item,index)=>{
            console.log(capacityOfItemsSoFar)
            item.draw(ctx,xOffset,yOffset + capacityOfItemsSoFar,width);
            capacityOfItemsSoFar += item.size;
        });
    }
}

