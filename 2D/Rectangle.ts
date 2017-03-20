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
        str+="x: "+this.xPos.toString()+", ";
        str+="y: "+this.yPos.toString()+", ";
        str+="w: "+this.width.toString()+", ";
        str+="h: "+this.height.toString();
        return str;
    }
    draw(ctx:CanvasRenderingContext2D){
        ctx.save();
        ctx.scale(100,100);
        ctx.fillStyle = '#AABBCC';//set the color
        ctx.lineWidth =1/100;
        ctx.fillRect(this.xPos,this.yPos,this.width,this.height);
        ctx.strokeRect(this.xPos,this.yPos,this.width,this.height);
        ctx.restore();
    }

}