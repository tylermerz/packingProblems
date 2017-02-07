import {Rectangle} from "./Rectangle";

export class RectangleBin extends Rectangle{
    storedRects : Array<Rectangle>;

    constructor(height:number,width:number){
        super(height,width);
        this.storedRects = [];
    }
    clone():RectangleBin{
        return new RectangleBin(this.height,this.width);
    }
    /**place the rectangle at a given position. Guaranteed t be a valid place\ */
    add(rectToPlace:Rectangle,xPos:number,yPos:number):void{
        rectToPlace.xPos = xPos;
        rectToPlace.yPos = yPos;
        this.storedRects.push(rectToPlace);
    }
    /**Checks to see if this is a valid placement for a rectange given the current things inside */
    allowedPlacement(rectToPlace:Rectangle,xPos:number,yPos:number):boolean{
        
        //make sure that the rectangle stays inside the containment
        if (xPos>this.width || xPos < 0 || xPos+rectToPlace.width>this.width){
            throw new Error("Rectangle to be placed does not fit inside container.");
        }

        if (yPos>this.height || yPos < 0 || yPos+rectToPlace.height>this.height){
            throw new Error("Rectangle to be placed does not fit inside container.");
        }

        //loop through all currently placed rects and see if there is overlap
        for (var i = 0;i<this.storedRects.length;i++){
            let currRect = this.storedRects[i];

            //check to see if they are the same rect
            if (currRect.xPos === xPos && currRect.width === rectToPlace.width && currRect.yPos === yPos && currRect.height === rectToPlace.height){
                return false;
            }

            if ((currRect.xPos < xPos) && (currRect.xPos+currRect.width > xPos)){
                return false;
            } 
            if (currRect.xPos < xPos+rectToPlace.width && currRect.xPos+currRect.width > xPos+rectToPlace.height){
                return false;
            }

            if (currRect.yPos < yPos && currRect.yPos+currRect.height > yPos){
                return false;
            }
            if (currRect.yPos < yPos+rectToPlace.height && currRect.yPos+currRect.height > yPos+rectToPlace.width){
                return false;
            }
        };

        return true;
    }

}