import {RectangleBin} from "./RectangleBin";

export class Rectangle {
    width:number;
    height:number;
    xPos:number;
    yPos:number;
    constructor(width:number, height:number,xPos =0,yPos=0){
        if (width <= 0 || height <= 0){
            throw new Error("Height and width must be greater than or equal to 0.");
        }
        this.width = width;
        this.height = height;
        this.xPos = xPos;
        this.yPos = yPos;
    }
    clone():Rectangle{
        return new Rectangle(this.width,this.height,this.xPos,this.yPos);
    }

    toString():string{
        let str = "";
        str+="x: "+this.xPos.toFixed(2)+", ";
        str+="y: "+this.yPos.toFixed(2)+", ";
        str+="w: "+this.width.toFixed(2)+", ";
        str+="h: "+this.height.toFixed(2);
        return str;
    }
    draw(ctx:CanvasRenderingContext2D){
        ctx.fillRect(this.xPos,this.yPos,this.width,this.height);
        ctx.strokeRect(this.xPos,this.yPos,this.width,this.height);
    }
    fits(bin:RectangleBin){
        if (this.xPos < 0 || this.yPos < 0 || this.xPos+this.width >bin.width || this.yPos +this.height>bin.height){
            return false;
        } else {
            return true;
        }
    }
}