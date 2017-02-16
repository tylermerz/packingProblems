import {Rectangle} from "./2D/Rectangle";
import {RectangleBin} from "./2D/RectangleBin";
import {node,pTree} from "./2D/CodedSchemes/nLeafBinaryTree/pTree";
import {NLBT} from "./2D/CodedSchemes/nLeafBinaryTree/NLBT";

import {describe,it} from "mocha";
const assert = require("assert");
describe('2D', function () {
    describe('NLBT', function () {
        describe('placeRootRect', function () {
            it('Should place be an empty pTree.', function () {
                let alg = new NLBT(new RectangleBin(1,1),[new Rectangle(0.1,0.5)],3);
                assert.equal(alg.currBestPTree.empty(),true);
            });
            it('Should place the root rectangle that is specified.', function () {
                let rectToPlace= new Rectangle(0.1,0.5);
                let alg = new NLBT(new RectangleBin(1,1),[rectToPlace],3);
                alg.placeAllRects();
                assert.equal(alg.currBestPTree.rootNode.rect,rectToPlace);
            });
            it('Should update the extrema points to be the root rectangle', function () {
                let rectToPlace= new Rectangle(0.1,0.5);
                let alg = new NLBT(new RectangleBin(1,1),[rectToPlace],3);
                alg.placeAllRects();
                assert.deepEqual(alg.currBestPTree.extrema,{left:0,right:rectToPlace.width,top:rectToPlace.height,bottom:0});
            });
            it('Should add one rectangle to the tree', function () {
                let rectToPlace= new Rectangle(0.1,0.5);
                let rectToPlace2= new Rectangle(0.1,0.1);
                let alg = new NLBT(new RectangleBin(1,1),[rectToPlace,rectToPlace2],0);
                alg.placeAllRects();
                assert.deepNotEqual(alg.currBestPTree.extrema,{left:0,right:rectToPlace.width,top:rectToPlace.height,bottom:0});
            });
        });
        
    });
    describe('pTree', function () {
        describe('node', function () {
            it('Should return true that it is a leaf.', function () {
                let leaf = new node();
                assert.equal(leaf.isLeaf(),true);
            });
            it('Should return false because it is not a leaf.', function () {
                let pT = new pTree();
                pT.rootNode = new node();
                pT.rootNode.left = new node();
                assert.equal(pT.rootNode.isLeaf(),false);
            });
        });
        
    });
    describe('Rectangle', function () {
        describe('#clone()', function () {
            it('Should make a copy of the original rectangle.', function () {
                var rOrig = new Rectangle(1,2,3,4);
                assert.deepEqual(rOrig, rOrig.clone());
            });
            it('Clone should be at a different memory address.', function () {
                var rOrig = new Rectangle(1,2,3,4);
                assert.notEqual(rOrig, rOrig.clone());
            });
        });
    });

    describe('RectangleBin', function () {
        describe('#allowedPlacement()', function () {
            it('Should return false because of overlap.', function () {
                let rBin = new RectangleBin(1,1);
                rBin.add(new Rectangle(.5,.5),0.25,0.25);
                assert.equal(rBin.allowedPlacement(new Rectangle(0.5,0.5),0.25,0.25), false);
            });
            it('Should return true because there is no overlap.', function () {
                let rBin = new RectangleBin(1,1);
                rBin.add(new Rectangle(.5,.5),0.,0.);
                assert.equal(rBin.allowedPlacement(new Rectangle(0.5,0.5),0.5,0.5), true);
            });
            it('Try to place the same rectangle.', function () {
                let rBin = new RectangleBin(1,1);
                rBin.add(new Rectangle(.5,.5),0.,0.);
                assert.equal(rBin.allowedPlacement(new Rectangle(0.5,0.5),0.,0.), false);
            });


        });
    });
});
