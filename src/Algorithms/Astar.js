const { Heap } = require('heap-js');
//https://github.com/ignlg/heap-js

// const customPriorityComparator = (a, b) => a.fcost - b.fcost;


class sNode {
    bObstacle = false;
    visted = false;
    fGlobalGoal = Infinity;
    fLocalGoal = Infinity;
    x;
    y;
    parent;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const createNodeMatrix = (matrix) => {
    let nodeMatrix = [];
    for(let i = 0; i < matrix.length; i++) {
        let nodeMatrixRow = [];
        for (let j = 0; j < matrix[0].length; j++) {
            nodeMatrixRow.push(new sNode(i,j));
        }
        nodeMatrix.push(nodeMatrixRow);
    }
    return nodeMatrix;
}

const solve = (matrix) => {
    const customPriorityComparator = (a, b) => a.fGlobalGoal - b.fGlobalGoal;
    let openList = new Heap(customPriorityComparator);

    let startNode = matrix[0][0];
    startNode.fLocalGoal = 0;
    startNode.fGlobalGoal = manhattanDistance(startNode,matrix[1][1]);
    openList.push(startNode);

    while(!openList.isEmpty()) {
        let node = openList.peek();
        openList.pop();
        node.visted = true;

        //Grab top node
        let temp;
        if (node.y - 1 >= 0 && !matrix[node.x][node.y-1].visted) {
            temp = matrix[node.x][node.y-1];
            
           
            let fPossbilyLowerGoal = node.fLocalGoal + manhattanDistance(temp,matrix[1][1]);
            if (fPossbilyLowerGoal < temp.fLocalGoal) {
                temp.parent = node;
                temp.fLocalGoal = fPossbilyLowerGoal;
                temp.fGlobalGoal = temp.fLocalGoal + manhattanDistance(temp,matrix[1][1]);
            }
            matrix[temp.x][temp.y] = temp;
            if(temp.x === 1 && temp.y === 1) { break; }
            openList.push(temp);
        }

        //Grab bottom node
        if (node.y + 1 < matrix.length && !matrix[node.x][node.y+1].visted) {
            temp = matrix[node.x][node.y+1];
           


            let fPossbilyLowerGoal = node.fLocalGoal + manhattanDistance(temp,matrix[1][1]);
           

            if (fPossbilyLowerGoal < temp.fLocalGoal) {
                temp.parent = node;
                temp.fLocalGoal = fPossbilyLowerGoal;
                temp.fGlobalGoal = temp.fLocalGoal + manhattanDistance(temp,matrix[1][1]);
            }
            matrix[temp.x][temp.y] = temp;
            if(temp.x === 1 && temp.y === 1) { break; }
            openList.push(temp);


            
        }
        
        //Grab right node

        if (node.x - 1 >= 0 && !matrix[node.x-1][node.y].visted) {
            temp = matrix[node.x - 1][node.y];
        
            let fPossbilyLowerGoal = node.fLocalGoal + manhattanDistance(temp,matrix[1][1]);
           

            if (fPossbilyLowerGoal < temp.fLocalGoal) {
                temp.parent = node;
                temp.fLocalGoal = fPossbilyLowerGoal;
                temp.fGlobalGoal = temp.fLocalGoal + manhattanDistance(temp,matrix[1][1]);
            }
            matrix[temp.x][temp.y] = temp;
            if(temp.x === 1 && temp.y === 1) { break; }
            openList.push(temp);
        }

        //Grab left node
        if (node.x + 1 < matrix[0].length && !matrix[node.x+1][node.y].visted) {
            temp = matrix[node.x + 1][node.y];

        
            let fPossbilyLowerGoal = node.fLocalGoal + manhattanDistance(temp,matrix[1][1]);
            

            if (fPossbilyLowerGoal < temp.fLocalGoal) {
                temp.parent = node;
                temp.fLocalGoal = fPossbilyLowerGoal;
                temp.fGlobalGoal = temp.fLocalGoal + manhattanDistance(temp,matrix[1][1]);
            }
            matrix[temp.x][temp.y] = temp;
            if(temp.x === 1 && temp.y === 1) { break; }
            openList.push(temp);
        }

        matrix[node.x][node.y] = node;
    }
    return matrix;
}

const manhattanDistance = (current_cell, goal) => {
    let distance = Math.abs(current_cell.x  - goal.x) + Math.abs(current_cell.y - goal.y)
    return distance;
}

const reconstructPath = (matrix,endNode) => {
    let path = []
    while(endNode.parent != undefined) {
        path.push({x: endNode.x, y: endNode.y});
        endNode = endNode.parent;
    }
    path.push({x:0,y:0});
    path = path.reverse();
    return path;
}

const AstarShortestPath = (matrix) => {
    let nodeMatrix = createNodeMatrix(matrix);
    let path = solve(nodeMatrix);
    console.log(path);
    let legitPath = reconstructPath(path,path[1][1]);
    console.log(legitPath);
}


let matrix = [];
for (let i = 0; i < 3;i++) {
    matrix.push(new Array(3).fill("E"))
}

AstarShortestPath(matrix);