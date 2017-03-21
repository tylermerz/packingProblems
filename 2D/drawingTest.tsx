import { Rectangle } from "./Rectangle";
import { RectangleBin } from "./RectangleBin";
import { node, pTree } from "./CodedSchemes/nLeafBinaryTree/pTree";
import { NLBT } from "./CodedSchemes/nLeafBinaryTree/NLBT";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TwoDVisualizationBackend } from './2DVisResult';



export class TwoDPackGUI extends React.Component<any, any> {

    state: Object;
    backend: TwoDVisualizationBackend;
    packedBinCTX:CanvasRenderingContext2D;
    stagingAreaCTX:CanvasRenderingContext2D;
    lookAheadCTX:CanvasRenderingContext2D;

    constructor(props: Object) {
        super(props);
        this.state = {
            recurDepth: 2,
            bins: ".5,.5\n.1,.1\n.2,.5"
        };
        this.calculateAndDisplayAll = this.calculateAndDisplayAll.bind(this);
        this.calculateAndDisplayOne = this.calculateAndDisplayOne.bind(this);
        this.reset = this.reset.bind(this);
        let packedBin = document.getElementById("packedBin");
        this.packedBinCTX = packedBin.getContext("2d");

        let stagingArea = document.getElementById("stagingArea");
        this.stagingAreaCTX = stagingArea.getContext("2d");

        let lookAhead = document.getElementById("lookAhead");
        this.lookAheadCTX = lookAhead.getContext("2d");

        this.backend = null;
    };

    parseBinsTextArea(binsTextArea: String): Array<Rectangle> {
        let rectArray: Array<Rectangle> = [];
        if (binsTextArea === "") {
            return [];
        }
        console.log(binsTextArea.split("\n"))
        binsTextArea.split("\n").forEach((line, lineIndex) => {
            if (line == undefined) {
                throw new Error("No blank lines are allowed in the bin spec.");
            }
            let lineSplit = line.split(',');


            let height = Number(lineSplit[0].trim());
            let width = Number(lineSplit[1].trim());

            rectArray.push(new Rectangle(height, width));
        });
        return rectArray;
    }
    calculateAndDisplayOne(event) {
        event.preventDefault();

        if (this.backend === null) {

            this.backend = new TwoDVisualizationBackend(this.parseBinsTextArea(this.state["bins"]), this.state["recurDepth"], this.packedBinCTX, this.stagingAreaCTX, this.lookAheadCTX);
        }

        this.backend.alg.placeRect(this.backend.alg.rects.pop());
        this.backend.drawPackedBin();
        this.backend.drawItemsToBePlaced();
        this.backend.drawLookAheadSolution();
    }
    calculateAndDisplayAll(event) {
        event.preventDefault();
        if (this.backend === null) {

            this.backend = new TwoDVisualizationBackend(this.parseBinsTextArea(this.state["bins"]), this.state["recurDepth"], this.packedBinCTX, this.stagingAreaCTX, this.lookAheadCTX);
        }

        this.backend.alg.placeAllRects();
        this.backend.drawPackedBin();
        this.backend.alg.currBestPTree.printDOTFile();
    }
    reset(){
        this.backend = null;
    }
    render() {
        return (
            <div>

                    <label htmlFor="bins">Bins: </label><br />
                    <textarea name="bins" rows={10} cols={10} onChange={(e => this.setState({ bins: (e.target.value) }))} value={this.state["bins"]}></textarea><br />
                    <label htmlFor='lookAheadDepth'>Look Ahead Depth: </label><br />
                    <input type='number' onChange={(e => this.setState({ recurDepth: Number(e.target.value) }))} max={3} name='lookAheadDepth' value={this.state["recurDepth"]} /><br />

                    <button onClick={this.calculateAndDisplayAll} >Pack All Objects</button>
                    <button onClick={this.calculateAndDisplayOne} >Pack Next Object</button>
                    <button onClick={this.reset} >Reset</button>
            </div>
        );
    }
};

ReactDOM.render(
    <TwoDPackGUI />,
    document.getElementById('GUI'))
