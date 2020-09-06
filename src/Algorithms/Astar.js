const { Heap } = require('heap-js');
//https://github.com/ignlg/heap-js

const customPriorityComparator = (a, b) => a.fcost - b.fcost;
const minHeap = new Heap(customPriorityComparator);

const solve = () => {

    minHeap.init([{fcost: 10,gcost:20,hcost:23},{fcost: 5,gcost:20,hcost:23},{fcost: 100,gcost:20,hcost:23}]);
    console.log(minHeap.peek());
}


solve();