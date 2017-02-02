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

}