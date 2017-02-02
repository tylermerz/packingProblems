export class Rectangle {
    width:number;
    height:number;
    xPos:number;
    yPos:number;
    constructor(width:number, height:number,xPos =0,yPos=0){
        if (xPos <0 || yPos<0){
            throw new Error("Positions must be positive.");
        }
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
}