import {Rectangle} from "./Rectangle";
import {RectangleBin} from "./RectangleBin";

export abstract class TwoDPackingAlg {
    binSpec:RectangleBin;
    rects:Array<Rectangle>;
    constructor(binSpec:RectangleBin,items:Array<Rectangle>){
        this.binSpec = binSpec.clone();
        this.rects = items;
    }
    placeAllRects():void{
        while (this.rects.length > 0){
            this.placeRect(this.rects.pop());
        }

    }
    placeRect(rect:Rectangle):void{

    }
}