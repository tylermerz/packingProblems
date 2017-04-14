import {Rectangle} from "./Rectangle";
import {RectangleBin} from "./RectangleBin";
import {node,pTree} from "./CodedSchemes/nLeafBinaryTree/pTree";
import {NLBT} from "./CodedSchemes/nLeafBinaryTree/NLBT";
import {TwoDPackingAlg} from './TwoDPackingAlg';

export class TwoDVisualizationBackend {
    packedBinCTX:CanvasRenderingContext2D;
    stagingAreaCTX:CanvasRenderingContext2D;
    alg:NLBT;
    itemsToPack:Array<Rectangle>;
    recurDepth:number;
    lookAheadCTX:CanvasRenderingContext2D;

    constructor(itemsToPack:Array<Rectangle>,recurDepth:number,packedBinCTX:CanvasRenderingContext2D,stagingAreaCTX:CanvasRenderingContext2D,lookAheadCTX:CanvasRenderingContext2D){
        this.itemsToPack = itemsToPack;
        this.packedBinCTX = packedBinCTX;
        this.stagingAreaCTX = stagingAreaCTX;
        this.recurDepth = recurDepth;
        this.lookAheadCTX = lookAheadCTX;

        if (this.itemsToPack.length === 0){
            for (var i =0;i<10;i++){
                let packableItem = new Rectangle(0.1*Math.ceil(Math.random()/0.1),0.1*Math.ceil(Math.random()/0.1))
                this.itemsToPack.push(packableItem);
            }
        }

        this.alg = new NLBT(new RectangleBin(10,10),this.itemsToPack,this.recurDepth,this.packedBinCTX);
    }
    drawItemsToBePlaced(){
        this.stagingAreaCTX.clearRect(0,0,this.stagingAreaCTX.canvas.clientWidth,this.stagingAreaCTX.canvas.clientHeight);
        let xOffset = 0;
        let itemSpacing = .1;
        this.itemsToPack.forEach((rect)=>{
            rect.xPos = xOffset;
            xOffset += rect.width;
            xOffset += itemSpacing;
            rect.draw(this.stagingAreaCTX);
        });
    }
    packAllItems(){

        this.alg.placeAllRects();

    }
    drawLookAheadSolution(){
        this.lookAheadCTX.clearRect(0,0,this.lookAheadCTX.canvas.clientWidth,this.lookAheadCTX.canvas.clientHeight);
        this.alg.lookAheadSolution.draw(this.lookAheadCTX);
    }
    drawPackedBin(){
        this.packedBinCTX.clearRect(0,0,this.packedBinCTX.canvas.clientWidth,this.packedBinCTX.canvas.clientHeight);
        this.alg.draw(this.packedBinCTX);

    }

}