import { Rectangle } from "../../Rectangle";

export enum dirs {
    h = 1,
    v
}
interface Offsets{
    xOffset:number;
    yOffset:number;
}
/**object that will act as the node of the pTree. 
 * Value will store h or v as 0 or 1, respectively.
 */
export class node {
    right: node;
    left: node;
    value: dirs;
    rect: Rectangle;
    uid :number;

    constructor(left = null, right = null, value = dirs.h, rect = new Rectangle(1, 1),uid = Math.random()) {
        this.left = left;
        this.right = right;
        this.value = value;
        this.rect = rect;
        this.uid = uid;
    }
    clone(): node {
        if (this.rect === null) {
            return new node(this.left, this.right, this.value, null,this.uid);
        } else {
            return new node(this.left, this.right, this.value, this.rect.clone(),this.uid);
        }
    }
    setLeft(n: node) {
        this.left = n;
    }
    setRight(n: node) {
        this.right = n;
    }
    setValue(val: dirs) {
        this.value = val;
    }
    setRect(rect: Rectangle) {
        this.rect = rect;
    }
    isLeaf(): boolean {
        return (this.left === this.right && this.left === null);
    }

}

export interface extremaPoints {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
/**Placement tree.
 * Every leaf represents an item to place and every internal node
 * either has a value of 'h' or 'v' determining whether there is a vertical
 * or horizontal split.
 * Keep track of extreme points of the layout when each object is added.
 */
export class pTree {
    rootNode: node;
    extrema: extremaPoints;
    constructor() {
        this.rootNode = null;
        this.extrema = { left: 0, right: 0, top: 0, bottom: 0 };
    }
    /** returns a deep copy of the tree */
    clone(): pTree {
        let clonedTree = new pTree();
        if (this.rootNode !== null) {
            clonedTree.rootNode = this.rootNode.clone();
            this.cloneHelper(this.rootNode, clonedTree.rootNode);
        }
        //copy the remaining data
        clonedTree.extrema = Object.assign({},this.extrema);
        return clonedTree;
    }
    /**helper function that copy's the current node to the cloned tree and then
     * recurrsively walks the rest of the tree
     */
    cloneHelper(originalNode, copiedNode) {
        //left
        if (originalNode.left !== null) {
            copiedNode.left = originalNode.left.clone();
            this.cloneHelper(originalNode.left, copiedNode.left);
        }
        //right
        if (originalNode.right !== null) {
            copiedNode.right = originalNode.right.clone();
            this.cloneHelper(originalNode.right, copiedNode.right);
        }
    }
    /**Calculates the size of the current tree.
     * This is used in determining best placements of rectangles.
     */

    boundingBoxArea(): number {
        let height = this.extrema.right - this.extrema.left;
        let width = this.extrema.top - this.extrema.bottom;

        return height * width;
    }
    calculateScore(): number {
        let score = 0;

        score = this.boundingBoxArea();

        return score;
    }
    empty(): boolean {
        if (this.rootNode === null) {
            return true;
        } else {
            return this.rootNode.isLeaf();
        }
    }
    printHelper(currNode: node, textArray: Array<string>, level: number, leftOffset: number): number {
        let tALen = textArray.length;


        if (currNode !== null) {
            //follow left
            leftOffset += this.printHelper(currNode.left, textArray, level + 1, leftOffset);

            //follow right
            let rightOffset = this.printHelper(currNode.right, textArray, level + 1, 1);

            textArray[level] += ' '.repeat(Math.floor((leftOffset + rightOffset))) + currNode.rect.toString();


            console.log(Math.floor(currNode.rect.toString().length / 2));
            return leftOffset + Math.floor(currNode.rect.toString().length / 2);
        } else {
            textArray[level] += ' '.repeat(leftOffset + 12);
            return leftOffset + 12;
        }

    }

    print(): void {
        let textArray = Array<string>(10);
        for (var i = 0; i < textArray.length; i++) {
            textArray[i] = "";
        }
        //walk the tree and display each item
        this.printHelper(this.rootNode, textArray, 0, 0);
        textArray.forEach(str => {
            if (str.trim() !== "") {
                console.log(str);
            }
        });
    }
    /**walk the tree from the root and decide if any of the extreme points
     * have changed because of an update
     */
    updateExtrema(): void {
        this.extrema.top = 0;
        this.extrema.bottom = 0;
        this.extrema.left = 0;
        this.extrema.right = 0;

        this.findBoundsOfSubTree(this.rootNode,this.extrema);

    }
    updateExtremaHelper(node: node): void {
        this.findBoundsOfSubTree(node,this.extrema);
    }
    findBoundsOfSubTree(node:node,ext:extremaPoints){
        if (node !== null) {
            if (node.isLeaf()) {
                ext.bottom = Math.min(ext.bottom, node.rect.yPos);
                ext.top = Math.max(ext.top, node.rect.yPos + node.rect.height);
                ext.left = Math.min(ext.left, node.rect.xPos);
                ext.right = Math.max(ext.right, node.rect.xPos + node.rect.width);
            } else {
                //go down the right
                this.findBoundsOfSubTree(node.right,ext);

                //go down the left
                this.findBoundsOfSubTree(node.left,ext);
            }
        }
    }
    /**function to find the equivalent node in a copy of a tree.
     * Search is base on finding a node with the same coordinates.
     */
    findEquivalentNode(nodeToFind: node): node {
        let foundNode: node = null;

        foundNode = this.findEquivalentNodeHelper(nodeToFind, this.rootNode);

        return foundNode;
    }

    findEquivalentNodeHelper(nodeToFind: node, currentNode: node): node {
        if (currentNode !== null) {
            if (currentNode.uid === nodeToFind.uid){
                return currentNode;
            }
            //continue down left
            let lReturn = this.findEquivalentNodeHelper(nodeToFind, currentNode.left);
            if (lReturn !== null) {
                return lReturn;
            }
            //then right
            let rReturn = this.findEquivalentNodeHelper(nodeToFind, currentNode.right);
            if (rReturn !== null) {
                return rReturn;
            }
        }
        //fall through to null
        return null;
    }

    /**Takes a pTree and updates all of the coordinates of the rectangles to be correct */
    fixCoordinates(){
        this.fixCoordinatesHelper(this.rootNode,{xOffset:0,yOffset:0});

    }

    fixCoordinatesHelper(workingNode:node,offsets:Offsets):Offsets{
        if (workingNode.isLeaf()){
            workingNode.rect.xPos = offsets.xOffset;
            workingNode.rect.yPos = offsets.yOffset;
            return {xOffset: offsets.xOffset+workingNode.rect.width,yOffset: offsets.yOffset+workingNode.rect.height};
        } else{ 
            let offsetLeft = this.fixCoordinatesHelper(workingNode.left,offsets);

            let offsetRight:Offsets;
            if (workingNode.value=dirs.v){
                offsetRight = this.fixCoordinatesHelper(workingNode.right,{xOffset:offsets.xOffset,yOffset:offsetLeft.yOffset})
            } else {
                //horizontal split
                offsetRight = this.fixCoordinatesHelper(workingNode.right,{xOffset:offsetLeft.xOffset,yOffset:offsets.yOffset})
            }

            return {xOffset:Math.max(offsets.xOffset,offsetLeft.xOffset,offsetRight.xOffset),yOffset:Math.max(offsets.yOffset,offsetLeft.yOffset,offsetRight.yOffset)}
        }
    }
    propogateCoordinateShiftDown(workingNode:node,xShift:number,yShift:number){
        if (workingNode.isLeaf()){
            console.log("shift")
            console.log(xShift)
            console.log(yShift)
            console.log(workingNode.rect)
            workingNode.rect.xPos +=xShift;
            workingNode.rect.yPos +=yShift;
            console.log(workingNode.rect)
        } else {
            //recurse
            this.propogateCoordinateShiftDown(workingNode.left,xShift,yShift);
            this.propogateCoordinateShiftDown(workingNode.right,xShift,yShift);
        }
    }
}