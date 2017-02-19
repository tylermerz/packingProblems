import {Rectangle} from "../../Rectangle";

export enum dirs {
    h =1,
    v
}

/**object that will act as the node of the pTree. 
 * Value will store h or v as 0 or 1, respectively.
 */
export class node{
    right:node;
    left:node;
    value:dirs;
    rect:Rectangle;

    constructor(left=null,right=null,value=dirs.h,rect=new Rectangle(1,1)){
        this.left=left;
        this.right = right;
        this.value=value;
        this.rect = rect;
    }
    clone():node{
        if (this.rect === null){
            return new node(this.left,this.right,this.value,null);
        }else {
            return new node(this.left,this.right,this.value,this.rect.clone());
        }
    }
    setLeft(n:node){
        this.left = n;        
    }
    setRight(n:node){
        this.right = n;        
    }
    setValue(val:dirs){
        this.value=val;
    }
    setRect(rect:Rectangle){
        this.rect=rect;
    }
    isLeaf():boolean{
        return (this.left === this.right && this.left === null);
    }

}

export interface extremaPoints{
    left:number;
    right:number;
    top:number;
    bottom:number;
}
/**Placement tree.
 * Every leaf represents an item to place and every internal node
 * either has a value of 'h' or 'v' determining whether there is a vertical
 * or horizontal split.
 * Keep track of extreme points of the layout when each object is added.
 */
export class pTree{
    rootNode:node;
    extrema:extremaPoints;
    constructor(){
        this.rootNode = null;
        this.extrema = {left:0,right:0,top:0,bottom:0};
    }
    /** returns a deep copy of the tree */
    clone():pTree{
        let clonedTree = new pTree();
        if (this.rootNode !== null){
            clonedTree.rootNode = this.rootNode.clone();
            this.cloneHelper(this.rootNode,clonedTree.rootNode);
        }
        //copy the remaining data
        clonedTree.extrema = this.extrema;
        return clonedTree;
    }
    /**helper function that copy's the current node to the cloned tree and then
     * recurrsively walks the rest of the tree
     */
    cloneHelper(originalNode,copiedNode){
        //left
        if (originalNode.left !== null){
            copiedNode.left = originalNode.left.clone();
            this.cloneHelper(originalNode.left,copiedNode.left);
        }
        //right
        if (originalNode.right !== null){
            copiedNode.right = originalNode.right.clone();
            this.cloneHelper(originalNode.right,copiedNode.right);
        }
    }
    /**Calculates the size of the current tree.
     * This is used in determining best placements of rectangles.
     */

    boundingBoxArea():number{
        let height = this.extrema.right-this.extrema.left;
        let width = this.extrema.top-this.extrema.bottom;

        return height*width;
    }
    calculateScore():number{
        let score = 0;

        score = this.boundingBoxArea();

        return score;
    }
    empty():boolean{
        if (this.rootNode === null){
            return true;
        } else{
            return this.rootNode.isLeaf();
        }
    }
    printHelper(currNode:node,textArray:Array<string>,level:number,leftOffset:number):number{
        let tALen = textArray.length;


        if (currNode !== null){
            //follow left
            leftOffset += this.printHelper(currNode.left,textArray,level+1,leftOffset);

            //follow right
            let rightOffset = this.printHelper(currNode.right,textArray,level+1,1);
            
            textArray[level]+=' '.repeat(Math.floor((leftOffset+rightOffset))) +currNode.rect.toString();


            console.log(Math.floor(currNode.rect.toString().length/2));
            return leftOffset +Math.floor(currNode.rect.toString().length/2);
        } else {
            textArray[level]+=' '.repeat(leftOffset+12);
            return leftOffset+12;
        }
        
    }

    print():void{
        let textArray =Array<string>(10);
        for (var i=0;i<textArray.length;i++){
            textArray[i] = "";
        }
        //walk the tree and display each item
        this.printHelper(this.rootNode,textArray,0,0);
        textArray.forEach(str=>{
            if (str.trim()!== ""){
                console.log(str);
            }
        });
    }
    /**walk the tree from the root and decide if any of the extreme points
     * have changed because of an update
     */
    updateExtrema():void{
        this.extrema.top = this.rootNode.rect.height;
        this.extrema.bottom = 0;
        this.extrema.left = 0;
        this.extrema.right= this.rootNode.rect.width;

        //go down the right
        this.updateExtremaHelper(this.rootNode.right);

        //go down the left
        this.updateExtremaHelper(this.rootNode.left);

    }
    updateExtremaHelper(node:node):void{
        if (node !== null){
            if (node.isLeaf()){
                this.extrema.bottom = Math.min(this.extrema.bottom,node.rect.yPos);
                this.extrema.top = Math.max(this.extrema.top,node.rect.yPos+node.rect.height);
                this.extrema.left = Math.min(this.extrema.left,node.rect.xPos);
                this.extrema.right = Math.max(this.extrema.right,node.rect.xPos+node.rect.width);
            } else {
                //go down the right
                this.updateExtremaHelper(node.right);

                //go down the left
                this.updateExtremaHelper(node.left);
            }
        }
    }
    /**function to find the equivalent node in a copy of a tree.
     * Search is base on finding a node with the same coordinates.
     */
    findEquivalentNode(nodeToFind:node):node{
        let foundNode:node = null;

        foundNode = this.findEquivalentNodeHelper(nodeToFind,this.rootNode);

        return foundNode;
    }

    findEquivalentNodeHelper(nodeToFind:node,currentNode:node):node{
        if (currentNode !== null){
            if (currentNode.isLeaf()){
                console.log(currentNode);
                //check to see if this is the node we want
                if (nodeToFind.rect.xPos === currentNode.rect.xPos && nodeToFind.rect.yPos === currentNode.rect.yPos){
                    return currentNode;
                }
            }else {
                //continue down left
                let lReturn = this.findEquivalentNodeHelper(nodeToFind,currentNode.left);
                if (lReturn !== null){
                    return lReturn;
                }
                //then right
                let rReturn = this.findEquivalentNodeHelper(nodeToFind,currentNode.right);
                if (rReturn !== null){
                    return rReturn;
            }
        }

        return null;
    }
}