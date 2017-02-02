import {TwoDPackingAlg} from "../../TwoDPackingAlg";
import {Rectangle} from "../../Rectangle";
import {RectangleBin} from "../../RectangleBin";
import {pTree,node,extremaPoints,dirs} from "./pTree";

export class NLBT extends TwoDPackingAlg{
    recurDepth:number;
    currBestPTree;
    constructor(binSpec:RectangleBin,items:Array<Rectangle>,recurDepth=3){
        super(binSpec,items);
        this.recurDepth = recurDepth;
        this.currBestPTree = new pTree();
        //copy the items to be placed
    }

    placeRect(rect:Rectangle){
        if(this.currBestPTree.empty() === true){
            this.currBestPTree.rootNode.rect = rect;
        }else{

        }
    }


}