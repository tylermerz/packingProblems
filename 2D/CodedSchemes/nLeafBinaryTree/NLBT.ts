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
            //set the rectangle to be at the origin
            rect.xPos = 0;
            rect.yPos = 0;
            this.currBestPTree.rootNode.rect = rect;
            this.currBestPTree.updateExtremaHelper(this.currBestPTree.rootNode);
        }else{
            //recursively place rect at all possible spots
            let nextPTrees:Array<pTree>=[];
            this.placeRectHelper(this.currBestPTree.rootNode,rect,0,nextPTrees);
            this.currBestPTree = nextPTrees.sort((a:pTree,b:pTree)=>{return (a.calculateScore()-b.calculateScore())})[0];
        }
    }

    placeRectHelper(workingNode:node,rect:Rectangle,recurLevel:number,nextPTrees:Array<pTree>){
        if (workingNode !== null&& recurLevel <= this.recurDepth){
            //call on left branch
            //this.placeRectHelper(n.left,rect,recurLevel+1,nextPTrees);
            //call on right branch
            //this.placeRectHelper(n.right,rect,recurLevel+1,nextPTrees);


            //make a copy of the currBestPTree
            let currBestPTreeCopy = this.currBestPTree.clone();
            let workingNodeCopy = currBestPTreeCopy.findEquivalentNode(workingNode);
            //now with a full copy of the previous tree I can modify it

            //do the replacement on this node
            let currNode = workingNodeCopy.clone();
            workingNodeCopy.uid = Math.random();
            
            //replace with v split
            
            //left leg
            //fix the coordinates of the new rect that is placed
            rect.xPos = workingNodeCopy.rect.xPos;
            rect.yPos = workingNodeCopy.rect.yPos - rect.height;

            workingNodeCopy.setValue(dirs.v);
            workingNodeCopy.setRect(null);
            workingNodeCopy.left = new node(null, null, dirs.h, rect);
            workingNodeCopy.right  = currNode;
            currBestPTreeCopy.updateExtremaHelper(workingNodeCopy);
            //add it to the list of trees to score at the end
            nextPTrees.push(currBestPTreeCopy);
             
            
            
            
            
            //make a copy of the currBestPTree
            currBestPTreeCopy = this.currBestPTree.clone();
            workingNodeCopy = currBestPTreeCopy.findEquivalentNode(workingNode);
            //now with a full copy of the previous tree I can modify it

            //do the replacement on this node
            currNode = workingNodeCopy.clone();
            workingNodeCopy.uid = Math.random();
            
            //replace with h split
            
            //left leg
            //fix the coordinates of the new rect that is placed
            rect.xPos = workingNodeCopy.rect.xPos-rect.width;
            rect.yPos = workingNodeCopy.rect.yPos;

            workingNodeCopy.setValue(dirs.h);
            workingNodeCopy.setRect(null);
            workingNodeCopy.left = new node(null, null, dirs.h, rect);
            workingNodeCopy.right  = currNode;
            currBestPTreeCopy.updateExtremaHelper(workingNodeCopy);

            //add it to the list of trees to score at the end
            nextPTrees.push(currBestPTreeCopy);

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