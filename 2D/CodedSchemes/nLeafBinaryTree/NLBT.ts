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
        if(this.currBestPTree.rootNode === null){
            this.currBestPTree.rootNode = new node();
            this.currBestPTree.rootNode.rect = rect;
            this.currBestPTree.updateExtremaHelper(this.currBestPTree.rootNode);
        }else{
            //recursively place rect at all possible spots
            this.placeRectHelper(this.currBestPTree.rootNode,rect,0);
        }
    }

    placeRectHelper(n:node,rect:Rectangle,recurLevel:number){
        if (n !== null&& recurLevel <= this.recurDepth){
            //call on left branch
            //this.placeRectHelper(n.left,rect,recurLevel+1);
            //call on right branch
            //this.placeRectHelper(n.right,rect,recurLevel+1);

            //do the replacement on this node
            let currNode = n.clone();
            //replace with v split
            n.setValue(dirs.v);
            n.setRect(null);
            //left leg
            n.left = new node(null, null, dirs.h, rect);
            n.right  = currNode;
            this.currBestPTree.updateExtremaHelper(n);
            console.log(this.currBestPTree.extrema);
            console.log(n)


           /*     
            //this.currBestPTree.print();
            //right leg
            n.right= new node(null, null, dirs.h, rect);
            n.left = currNode;
            //this.currBestPTree.print();
            console.log(n)

            //replace with h split*/
        }
    }


}