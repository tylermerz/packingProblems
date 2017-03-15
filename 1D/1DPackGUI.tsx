import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {OneDVisualizationBackend} from './testVisResult';



export class OneDPackGUI extends React.Component<any, any> {

    state: Object;

    constructor(props: Object) {
        super(props);
        this.state = {
            numberOfBinsToDisplay: 10,
            numberOfItemsToPack: 10,
            minItemSize:0.1,
            maxItemSize:1
        };
        this.calculateAndDisplay = this.calculateAndDisplay.bind(this);

    };

    calculateAndDisplay(event){
        event.preventDefault();

        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");

        let backend = new OneDVisualizationBackend(this.state["numberOfBinsToDisplay"],this.state["numberOfItemsToPack"],this.state["minItemSize"],this.state["maxItemSize"],ctx);

        backend.pack();
        backend.drawBins();
    }
    render() {
        return (
                <div>
    
                    <form onSubmit={this.calculateAndDisplay}>
                        <label htmlFor='numberOfBinsToDisplay'>Number of bins: </label>
                        <input type='number' onChange={(e => this.setState({ numberOfBinsToDisplay: Number(e.target.value) }))} name='numberOfBinsToDisplay' value={this.state["numberOfBinsToDisplay"]}/><br />

                        <label htmlFor='numberOfItemsToPack'>Number of Items: </label>
                        <input type='number' name='numberOfItemsToPack' onChange={(e => this.setState({numberOfItemsToPack : Number(e.target.value) }))} value={this.state["numberOfItemsToPack"]} /><br />
                        
                        <label htmlFor='minItemSize'>Minimum item size: </label>
                        <input type='number' name='minItemSize' step={0.01} onChange={(e => this.setState({minItemSize : Number(e.target.value) }))} value={this.state["minItemSize"]} /><br />
                        
                        <label htmlFor='maxItemSize'>Maximum item size: </label>
                        <input type='number' disabled name='maxItemSize' onChange={(e => this.setState({maxItemSize : Number(e.target.value) }))} value={this.state["maxItemSize"]} /><br /><br />
                        
                        <input type='submit' name='Submit' />
                    </form>
                </div>
        );
    }
};

ReactDOM.render(
    <OneDPackGUI />,
document.getElementById('1DPackGUI'))
