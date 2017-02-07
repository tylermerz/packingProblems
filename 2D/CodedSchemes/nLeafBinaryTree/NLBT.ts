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
            this.currBestPTree.updateExtremaHelper(this.currBestPTree.rootNode);
        }else{
            //recursively place rect at all possible spots
            this.placeRectHelper(this.currBestPTree.rootNode,rect,0);
        }
    }

    placeRectHelper(node:node,rect:Rectangle,recurLevel:number){
        if (node !== null&& recurLevel <= this.recurDepth){
            //call on left branch
            this.placeRectHelper(node.left,rect,recurLevel+1);
            //call on right branch
            this.placeRectHelper(node.right,rect,recurLevel+1);

            //do the replacement on this node
            let currNode = node.clone();
            //replace with v split
            node.setValue(dirs.v);
            node.setRect(null);
            //left leg
            node.left = node;
            //right leg
            node.right = node;
            
            //replace with h split
            node.setValue(dirs.h);
        }
    }


}