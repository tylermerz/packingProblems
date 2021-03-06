import { TwoDPackingAlg } from "../../TwoDPackingAlg";
import { Rectangle } from "../../Rectangle";
import { RectangleBin } from "../../RectangleBin";
import { pTree, node, extremaPoints, dirs } from "./pTree";

export class NLBT extends TwoDPackingAlg {
    recurDepth: number;
    currBestPTree;
    ctx: CanvasRenderingContext2D;
    lookAheadSolution:pTree;
    constructor(binSpec: RectangleBin, items: Array<Rectangle>, recurDepth = 2, ctx = null) {
        super(binSpec, items);
        this.recurDepth = recurDepth;
        this.currBestPTree = new pTree();
        this.ctx = ctx;
        this.lookAheadSolution = null;
        //copy the items to be placed
    }

    placeRect(rect: Rectangle) {
        if (this.currBestPTree.rootNode === null) {
            this.currBestPTree.rootNode = new node();
            //set the rectangle to be at the origin
            rect.xPos = 0;
            rect.yPos = 0;
            if (rect.fits(this.binSpec)){
                this.currBestPTree.rootNode.rect = rect;
                this.currBestPTree.updateExtrema();
            } else {
                throw new Error("First item doesn't fit in the bin.")
            }
            
        } else {
            //recursively place rect at all possible spots
            let firstLevelPTree: Array<pTree> = [];
            this.generateSingleLevelOfRecurrsion(this.currBestPTree, this.currBestPTree.rootNode, rect, firstLevelPTree);
            var nextLevelPTree: Array<Array<pTree>> = [];
            var currentLevelPTree: Array<Array<pTree>> = [];
            //load in the first level of pTrees for recurrsion
            firstLevelPTree.forEach((pT, index) => {
                currentLevelPTree[index] = [pT];
            });
            let lookAheadLevel = 1;
            let itemIndex=1;

            while (((itemIndex) < this.rects.length) && (lookAheadLevel < this.recurDepth)) {
                currentLevelPTree.forEach((pTArray, arrayIndex) => {
                    nextLevelPTree[arrayIndex] = [];
                    pTArray.forEach((pT, treeIndex) => {
                        let rectToPlace = this.rects[itemIndex];
                        var workingPTreeArrays: Array<pTree> = [];
                        this.generateSingleLevelOfRecurrsion(pT, pT.rootNode, rectToPlace, workingPTreeArrays);
                        nextLevelPTree[arrayIndex] = nextLevelPTree[arrayIndex].concat(workingPTreeArrays);
                    });
                    nextLevelPTree[arrayIndex].sort((a: pTree, b: pTree) => {
                        return (a.calculateScore() - b.calculateScore())
                    })
                });
                currentLevelPTree = nextLevelPTree;
                itemIndex++;
                lookAheadLevel++;
            }
            let bestScoreSentinel =this.binSpec.height*this.binSpec.width*2;//a valid score could never reach this 
            let bestScore =bestScoreSentinel; 
            let bestScoreIndex = 0;
            currentLevelPTree.forEach((pTreeArray, arrayIndex) => {
                if (currentLevelPTree[arrayIndex][0].calculateScore() < bestScore) {
                    bestScore = currentLevelPTree[arrayIndex][0].calculateScore();
                    bestScoreIndex = arrayIndex;
                }
            });
            if (firstLevelPTree.length == 0 || bestScore ==bestScoreSentinel){//no solutions fit inside the box
                throw new Error("Item cannot be fit inside bin.");
            }
            this.lookAheadSolution = currentLevelPTree[bestScoreIndex][0];
            this.currBestPTree = firstLevelPTree[bestScoreIndex];
        }
    }

    generateSingleLevelOfRecurrsion(workingPTree: pTree, workingNode: node, rect: Rectangle, nextPTrees: Array<pTree>) {
        if (workingNode !== null) {
            ///////////////////////////////////////////////////////////////////
            //Vertical split in the tree
            ///////////////////////////////////////////////////////////////////
            //make a copy of the currBestPTree
            let currBestPTreeCopy = workingPTree.clone();
            let workingNodeCopy = currBestPTreeCopy.findEquivalentNode(workingNode);
            let rectCopy = rect.clone();
            //now with a full copy of the previous tree I can modify it
            //do the replacement on this node
            let currNode = workingNodeCopy.clone();
            workingNodeCopy.uid = Math.random();
            //replace with v split
            workingNodeCopy.setValue(dirs.v);
            workingNodeCopy.setRect(null);
            workingNodeCopy.left = new node(null, null, dirs.h, rectCopy);
            workingNodeCopy.right = currNode;
            //propogate coordinate shift downward
            currBestPTreeCopy.fixCoordinates();
            currBestPTreeCopy.updateExtrema();
            //add it to the list of trees to score at the end
            if (this.binSpec.treeFits(currBestPTreeCopy)){
                nextPTrees.push(currBestPTreeCopy);
            }


            //make a copy of the currBestPTree
            currBestPTreeCopy = workingPTree.clone();
            workingNodeCopy = currBestPTreeCopy.findEquivalentNode(workingNode);
            rectCopy = rect.clone();
            //now with a full copy of the previous tree I can modify it
            //do the replacement on this node
            currNode = workingNodeCopy.clone();
            workingNodeCopy.uid = Math.random();
            //replace with v split
            workingNodeCopy.setValue(dirs.v);
            workingNodeCopy.setRect(null);
            workingNodeCopy.right = new node(null, null, dirs.h, rectCopy);
            workingNodeCopy.left = currNode;
            currBestPTreeCopy.fixCoordinates();
            currBestPTreeCopy.updateExtrema();
            //add it to the list of trees to score at the end

            if (this.binSpec.treeFits(currBestPTreeCopy)){
                nextPTrees.push(currBestPTreeCopy);
            }
            ///////////////////////////////////////////////////////////////////
            //Horizontal split in the tree
            ///////////////////////////////////////////////////////////////////
            //make a copy of the currBestPTree
            currBestPTreeCopy = workingPTree.clone();
            workingNodeCopy = currBestPTreeCopy.findEquivalentNode(workingNode);
            rectCopy = rect.clone();
            //now with a full copy of the previous tree I can modify it
            //do the replacement on this node
            currNode = workingNodeCopy.clone();
            workingNodeCopy.uid = Math.random();
            //replace with h split
            workingNodeCopy.setValue(dirs.h);
            workingNodeCopy.setRect(null);
            workingNodeCopy.left = new node(null, null, dirs.h, rectCopy);
            workingNodeCopy.right = currNode;
            currBestPTreeCopy.fixCoordinates();
            currBestPTreeCopy.updateExtrema();
            //add it to the list of trees to score at the end
            if (this.binSpec.treeFits(currBestPTreeCopy)){
                nextPTrees.push(currBestPTreeCopy);
            }
            //make a copy of the currBestPTree
            currBestPTreeCopy = workingPTree.clone();
            workingNodeCopy = currBestPTreeCopy.findEquivalentNode(workingNode);
            rectCopy = rect.clone();
            //now with a full copy of the previous tree I can modify it
            //do the replacement on this node
            currNode = workingNodeCopy.clone();
            workingNodeCopy.uid = Math.random();
            //replace with h split
            //left leg
            workingNodeCopy.setValue(dirs.h);
            workingNodeCopy.setRect(null);
            workingNodeCopy.right = new node(null, null, dirs.h, rectCopy);
            workingNodeCopy.left = currNode;
            currBestPTreeCopy.fixCoordinates();
            currBestPTreeCopy.updateExtrema();
            //add it to the list of trees to score at the end
            if (this.binSpec.treeFits(currBestPTreeCopy)){
                nextPTrees.push(currBestPTreeCopy);
            }
            //call on left branch
            this.generateSingleLevelOfRecurrsion(workingPTree, workingNode.left, rect, nextPTrees);
            //call on right branch
            this.generateSingleLevelOfRecurrsion(workingPTree, workingNode.right, rect, nextPTrees);
        }
    }

    draw(ctx:CanvasRenderingContext2D){
        ctx.save()
        ctx.scale(ctx.canvas.clientWidth/this.binSpec.width,ctx.canvas.clientHeight/this.binSpec.height);
        ctx.fillStyle = '#AABBCC';//set the color
        ctx.lineWidth =1/Math.max(ctx.canvas.clientWidth/this.binSpec.width,ctx.canvas.clientHeight/this.binSpec.height);
        this.currBestPTree.draw(ctx);
        ctx.restore();
    }


}