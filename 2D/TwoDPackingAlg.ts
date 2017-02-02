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
        this.rects.forEach(rect=>{
            this.placeRect(rect);
        });
    }
    placeRect(rect:Rectangle):void{

    }
}