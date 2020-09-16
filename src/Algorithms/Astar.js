// const { Heap } = require('heap-js');
//https://github.com/ignlg/heap-js

// Node class to calculate its own values

//gCost = distance from starting node
//hCost = distance from the target node
//fCost = gCost + hCost

// const PriorityQueue = require('./pq.js');

class sNode {
    bObstacle = false;
    visted = false;
    gCost = Infinity;
    fCost = Infinity;
    parent;
    x;
    y;

    // constructor
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// const queue = new PriorityQueue();


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

const solve = (matrix, endNode) => {
    // Create a min Queue based on nodes fcost value
    console.log("++++++++++++++++++++++")
    const customPriorityComparator = (a, b) => a.fCost - b.fCost;
    let openList = new Heap(customPriorityComparator);
    let openList = new PriorityQueue((a, b) => a.fCost <= b.fCost);
    let closedList = new Set();
    let visitedPathInOrder = [];
    let startNode = matrix[0][0];
    startNode.gCost = 0;
    startNode.hCost = manhattanDistance(startNode,endNode);
    startNode.fCost = startNode.gCost + startNode.hCost;
    matrix[0][0] = startNode;
    openList.push(startNode);
    
    let count = 0;

    while(!openList.isEmpty()) {
        let currentNode = openList.peek();
        console.log(currentNode);
        openList.pop();
        closedList.add(currentNode);

        if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
            break;
        }
        
        visitedPathInOrder.push(currentNode);
        currentNode.visted = true;
        //Grab LEFT node
        let neighbor;
        if (currentNode.y - 1 >= 0 && !closedList.has(matrix[currentNode.x][currentNode.y-1])) {
            neighbor = matrix[currentNode.x][currentNode.y-1];
            let tentativeGCost = currentNode.gCost + manhattanDistance(neighbor,currentNode);
            
            if (tentativeGCost < neighbor.gCost) {
                neighbor.parent = currentNode;
                neighbor.gCost = tentativeGCost;
                neighbor.fCost = neighbor.gCost + manhattanDistance(neighbor,endNode);
            }
            matrix[neighbor.x][neighbor.y] = neighbor;
            if (!openList.contains(neighbor)) {
                openList.push(neighbor);
            }
        }

        //Grab RIGHT node
        if (currentNode.y + 1 < matrix.length && !closedList.has(matrix[currentNode.x][currentNode.y+1])) {
            neighbor = matrix[currentNode.x][currentNode.y+1];

            let tentativeGCost = currentNode.gCost + manhattanDistance(neighbor,currentNode);
            console.log("Calcualting Bottom Node...")
            console.log("tentativGCost: " + tentativeGCost);
            if (tentativeGCost < neighbor.gCost) {
                neighbor.parent = currentNode;
                neighbor.gCost = tentativeGCost;
                neighbor.fCost = neighbor.gCost + manhattanDistance(neighbor,endNode);
                console.log("Manhattan Distance: " + manhattanDistance(neighbor,endNode))
                console.log("fCost: " + neighbor.fCost);
            }
            matrix[neighbor.x][neighbor.y] = neighbor;
            if (!openList.contains(neighbor)) {
                openList.push(neighbor);
            }
        }
        
        //Grab TOP node
        if (currentNode.x - 1 >= 0 && !closedList.has(matrix[currentNode.x-1][currentNode.y])) {
            neighbor = matrix[currentNode.x - 1][currentNode.y];
        
            let tentativeGCost = currentNode.gCost + manhattanDistance(neighbor,currentNode);
            
            if (tentativeGCost < neighbor.gCost) {
                neighbor.parent = currentNode;
                neighbor.gCost = tentativeGCost;
                neighbor.fCost = neighbor.gCost + manhattanDistance(neighbor,endNode);
            }
            matrix[neighbor.x][neighbor.y] = neighbor;
            if (!openList.contains(neighbor)) {
                openList.push(neighbor);
            }
        }

        //Grab BOTTOM node
        if (currentNode.x + 1 < matrix[0].length && !closedList.has(matrix[currentNode.x+1][currentNode.y])) {
            neighbor = matrix[currentNode.x + 1][currentNode.y];
            console.log('--------------------');
            let tentativeGCost = currentNode.gCost + manhattanDistance(neighbor,currentNode);

            console.log("Calcualting Right Node...")
            console.log("tentativGCost: " + tentativeGCost);
            if (tentativeGCost < neighbor.gCost) {
                
                neighbor.parent = currentNode;
                neighbor.gCost = tentativeGCost;
                neighbor.fCost = neighbor.gCost + manhattanDistance(neighbor,endNode);

                console.log("Manhattan Distance: " + manhattanDistance(neighbor,endNode))
                console.log("fCost: " + neighbor.fCost);
            }
            matrix[neighbor.x][neighbor.y] = neighbor;
            if (!openList.contains(neighbor)) {
                openList.push(neighbor);
            }
        }
        matrix[currentNode.x][currentNode.y] = currentNode;
        count = count + 1;
        console.log("++++++++++++++++++++++")
    }
    let path = matrix;
    return {path,closedList,visitedPathInOrder};
}

const manhattanDistance = (current_cell, goal) => {
    let dstX = Math.abs(current_cell.x  - goal.x);
    let dstY = Math.abs(current_cell.y - goal.y);
    if (dstX > dstY) {
        return 14*dstY + 10* (dstX-dstY);
    }
    return 14*dstX + 10 * (dstY-dstX);
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

const reconstructVisitedPath = (closedList) => {
    let visitedPathInOrder = []
    for (let i = 0; i < closedList.length; i++) {
        visitedPathInOrder.push({x: closedList[i].x,y: closedList[i].y});
    }
    return visitedPathInOrder;
}
export const  AstarShortestPath = (matrix, endNode) => {
    let nodeMatrix = createNodeMatrix(matrix);
    let {path,closedList,visitedPathInOrder} = solve(nodeMatrix,endNode);
    let legitPath = reconstructPath(path,path[endNode.x][endNode.y]);
    visitedPathInOrder = reconstructVisitedPath(visitedPathInOrder)
    path = legitPath
    return {path,visitedPathInOrder};
}

let tempmatrix = [];
for (let i = 0; i < 10;i++) {
    tempmatrix.push(new Array(10).fill("E"))
}

// let {path,visitedPathInOrder} = AstarShortestPath(tempmatrix,{x:1, y:7});
// console.log(path)
// console.log(visitedPathInOrder.length);