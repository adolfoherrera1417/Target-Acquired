import {Queue} from './Queue'

const solve = (matrix, start, endNode) => {
    var queue = new Queue();
    let found = false;
    // Create visited matrix
    var visited = []
    for(let i = 0; i < 20; i++) {
        visited.push(new Array(20).fill(false))
    }

    // create prev matrix
    var prev = []
    for(let i = 0; i < 20; i++) {
        prev.push(new Array(20).fill(null))
    }

    let visitedPathInOrder = []
    visitedPathInOrder.push(start);
    queue.enqueue(start);

    while(!queue.isEmpty()) {
        let node = queue.peek();
        queue.dequeue();

        let x = node.x;
        let y = node.y;

        if ((x < 0) || (y < 0) || (x >= 20) || (y >= 20) || matrix[x][y] === "W" || visited[x][y]) {
			continue;
        }
    
        visited[x][y] = true;
        visitedPathInOrder.push({x,y})

        if(endNode.x === x && endNode.y === y) {
            found = true;
            break;
        }


        queue.enqueue({x: x,y: y-1}); //left;
		if(y - 1 >= 0 && !visited[x][y-1]) {prev[x][y-1] = node;}

		queue.enqueue({x,y:y+1}); //right;
		if (y+1 < 20 && !visited[x][y+1]) {prev[x][y+1] = node;}

		queue.enqueue({x: x+1,y}); //top;
		if(x + 1 < 20 && !visited[x+1][y]) {prev[x+1][y] = node;}

		queue.enqueue({x: x-1,y}); //bottom;
		if(x - 1 >= 0 && !visited[x-1][y]) {prev[x-1][y] = node;}

    }

    return {prev,visitedPathInOrder,found};

}

const reconstructPath = (start, end, prev) => {
    let temp = [];
    while (end.x !== start.x || end.y !== start.y) {
        temp.push(end);
        end = prev[end.x][end.y];
    }
    temp.push(start);
    let reversed = temp.reverse();
    return reversed;
}

export const BFSShortestPath = (matrix, startNode, endNode) => {
    let {prev,visitedPathInOrder,found} = solve(matrix, startNode, endNode);
    let path = found ? reconstructPath(startNode,endNode,prev) : [];
    return {path,visitedPathInOrder};
}