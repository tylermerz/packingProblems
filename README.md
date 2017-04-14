# packingProblems
Implementations of one dimensional and two dimensional packing problems.

The bulk of this work will be implementing algorithms and ideas from [1] in Typescript for the backend, Chart.js for plotting, and React for further visualizations and interactions.

[1] Gonzalez, Teofilo, ed. “Handbook of Approximation Algorithms and Metaheuristics.” Chapman & Hall/CRC Computer & Information Science Series (May 15, 2007). doi:10.1201/9781420010749.

## Installing
To install simply use npm after cloning the repository:
```bash
npm install
```

## Running
The project is split into two major portions, a 1D bin packing problem and a 2D bin packing problem.

### 1D packingProblems

#### Node
To run an example of the 1D code use the following commands from the base directory:

```bash
cd 1D
tsc
node test.js
```

This command will output `NF.json` (next fit algorithm for 1D bin packing) which holds a json object which has the packing efficiency and time taken, in nanoseconds, to pack the specified items into bins. `test.ts` can be edited to use any of the 1D packing algorithms, not just the next fit algorithm.

#### Web Browser
The results of the REP3 and best fit algorithms can be visualized using React and HTML5 canvas in a web browser. To view this open `1D/testing/1DGUI.html` after bundling the `1DPackGUI.tsx` file.

```bash
cd 1D/testing
webpack --config 1DGUIwebpack.config.js
```

### 2D packingProblems

Coming soon.