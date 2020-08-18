import {Queue} from './Queue'


const solve = (start) => {
    var queue = new Queue();
    
    // Create matrix with walls
    let mat = []
    for (let i = 0; i < 10;i++) {
        mat.push(new Array(10).fill("P"))
    }
    mat[0][6] = "W";
    mat[1][6] = "W";
    mat[2][6] = "W";
    mat[3][6] = "W";
    mat[4][6] = "W";
    mat[5][5] = "W";
    mat[6][5] = "W";
    mat[7][4] = "W";
    mat[7][8] = "T";
    // Create visited matrix
    var visited = []
    for(var i = 0; i < 10; i++) {
        visited.push(new Array(10).fill(false))
    }

    // create prev matrix
    var prev = []
    for(var i = 0; i < 10; i++) {
        prev.push(new Array(10).fill(null))
    }

    let visitedPathInOrder = []
    visitedPathInOrder.push(start);
    queue.enqueue(start);

    while(!queue.isEmpty()) {
        let node = queue.peek();
        queue.dequeue();

        let x = node.x;
        let y = node.y;

        if ((x < 0) || (y < 0) || (x >= 10) || (y >= 10) || mat[x][y] === "W" || visited[x][y]) {
			continue;
        }
        if(mat[x][y] === "T") {
            break;
        }
        visited[x][y] = true;
        visitedPathInOrder.push({x,y})
        queue.enqueue({x: x,y: y-1}); //left;
		if(y - 1 > 0 && !visited[x][y-1]) {prev[x][y-1] = node;}

		queue.enqueue({x,y:y+1}); //right;
		if (y+1 < 10 && !visited[x][y+1]) {prev[x][y+1] = node;}

		queue.enqueue({x: x+1,y}); //top;
		if(x + 1 < 10 && !visited[x+1][y]) {prev[x+1][y] = node;}

		queue.enqueue({x: x-1,y}); //bottom;
		if(x - 1 > 0 && !visited[x-1][y]) {prev[x-1][y] = node;}

    }

    return {prev,visitedPathInOrder};

}

const reconstructPath = (start, end, prev) => {
    let temp = [];

    while (end.x != start.x || end.y != start.y) {
        temp.push(end);
        end = prev[end.x][end.y];
    }

    let reversed = temp.reverse();
    return reversed;
}

export const BFSShortestPath = (n) => {
    let {prev,visitedPathInOrder} = solve({x: 0, y: 0});
    let path = reconstructPath({x: 0, y: 0},{x: 7, y: 7},prev)
    return {path,visitedPathInOrder};
}