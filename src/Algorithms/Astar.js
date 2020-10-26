const { Heap } = require('heap-js');
//https://github.com/ignlg/heap-js

// Node class to calculate its own values

//gCost = distance from starting node
//hCost = distance from the target node
//fCost = gCost + hCost

let neighbors = [[0,1],[0,-1],[1,0],[-1,0]];

class sNode {
    bObstacle = false;
    opened = false;
    closed = false;
    gCost = Infinity;
    fCost = Infinity;
    parent;
    x;
    y;
    isWall = false;

    // constructor
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
            let temp = new sNode(i,j)
            if (matrix[i][j] === 'W') {
                temp.isWall = true;
            }
            nodeMatrixRow.push(temp);
            
        }
        nodeMatrix.push(nodeMatrixRow);
    }
    return nodeMatrix;
}

const solve = (graph, startNode, endNode) => {
    const customPriorityComparator = (a, b) => a.fCost - b.fCost;
    let visitedPathInOrder = [];
    let openList = new Heap(customPriorityComparator);
    let SQRT2 = Math.SQRT2;
    let m = graph.length;
    let n = graph[0].length;
    //Grab actual node object from graph
    startNode = graph[startNode.x][startNode.y];
    endNode = graph[endNode.x][endNode.y];

    startNode.gCost = 0;
    startNode.fCost = 0;

    openList.push(startNode);
    startNode.opened = true;
    
    while(!openList.isEmpty()) {
        let node = openList.peek();
        openList.pop();
        visitedPathInOrder.push(node);
        node.closed = true;
        graph[node.x][node.y] = node;
        if (node === endNode) {
            let path = reconstructPath(endNode);
            return {path,visitedPathInOrder};
        }

        for (let i = 0; i < neighbors.length; i++) {
            let r = node.x+neighbors[i][0];
            let c = node.y+neighbors[i][1];
            if (r < 0 || r >= m || c < 0 || c >= n) {
                continue;
            }

            let neighbor = graph[r][c];
            const tempNeighbor = graph[r][c];
            if (neighbor.closed || neighbor.isWall) {
                continue;
            }

            let x = neighbor.x;
            let y = neighbor.y;

            let possibleGCost = node.gCost + ((x - node.x === 0 || y - node.y === 0) ? 1 : SQRT2);

            if (!neighbor.opened || possibleGCost < neighbor.gCost) {
                neighbor.gCost = possibleGCost;
                neighbor.fCost = neighbor.gCost + 3 * manhattanDistance(neighbor,endNode);
                neighbor.parent = node;

                if (!neighbor.opened) {
                    openList.push(neighbor);
                    neighbor.opened = true;
                    graph[neighbor.x][neighbor.y] = neighbor;
                } else {
                    openList.remove(tempNeighbor);
                    openList.push(neighbor)
                }
            }

        }
        
    }
    return [];
}

const manhattanDistance = (current_cell, goal) => {
    let dx = Math.abs(current_cell.x  - goal.x);
    let dy = Math.abs(current_cell.y - goal.y);
    return dx + dy;
}

const reconstructPath = (endNode) => {
    let path = []
    while(endNode.parent != undefined) {
        path.push({x: endNode.x, y: endNode.y});
        endNode = endNode.parent;
    }
    path.push({x:0,y:0});
    path = path.reverse();
    return path;
}

export const AstarShortestPath = (matrix, startNode, endNode) => {
    let graph = createNodeMatrix(matrix);
    let {path,visitedPathInOrder} = solve(graph,startNode,endNode);
    return {path,visitedPathInOrder};
}

