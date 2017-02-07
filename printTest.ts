import {pTree} from "./2D/CodedSchemes/nLeafBinaryTree/pTree";
import {node} from "./2D/CodedSchemes/nLeafBinaryTree/pTree";
import {dirs} from "./2D/CodedSchemes/nLeafBinaryTree/pTree";
import {Rectangle  } from "./2D/Rectangle";
let pT = new pTree();

pT.rootNode = new node(new node(new node(),new node(),dirs.h,new Rectangle(0.1,0.1)),
                    new node(new node(),null,dirs.h,new Rectangle(0.2,0.2)),
                    dirs.h);

pT.print();