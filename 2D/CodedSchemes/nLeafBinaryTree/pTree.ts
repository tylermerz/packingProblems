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
        return new node(this.left,this.right,this.value);
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
        this.rootNode = new node();
        this.extrema = {left:0,right:0,top:0,bottom:0};
    }
    clone():pTree{
        return new pTree();
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
        return this.rootNode.isLeaf();
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
            this.extrema.bottom = Math.min(this.extrema.bottom,node.rect.yPos);
            this.extrema.top = Math.max(this.extrema.top,node.rect.yPos+node.rect.height);
            this.extrema.left = Math.min(this.extrema.left,node.rect.xPos);
            this.extrema.right = Math.max(this.extrema.right,node.rect.xPos+node.rect.width);
            //go down the right
            this.updateExtremaHelper(node.right);

            //go down the left
            this.updateExtremaHelper(node.left);
        }
    }

}