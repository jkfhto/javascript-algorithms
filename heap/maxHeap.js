/**
 * ​ 堆是计算机科学中一类特殊的数据结构，它虽然也被叫做优先队列，但它并不是队列，它并不是按照先进先出的原则进行数据存储的，它更像是一棵二叉树
 */

/**
 * 最大堆的实现是通过构造二叉堆， 而二叉堆的实质是一棵完全二叉树， 它具备以下性质：
 * 任一节点都是小于（ 最小堆） 或大于（ 最大堆） 其子节点， 而根节点是最大或最小值。
 * 堆总是一棵完全二叉树， 即除最后一层外， 其它层都是满的， 而最后一层也应是自左向右填入数据
 */

/**
 * 数组中的索引从0开始， 元素个数为n, 在堆中给定索引为i的节点时：
 * 如果i = 0, 节点i是根节点， 否则节点i的父节点为(i - 1) / 2
 * 如果2 * i + 1 > n - 1, 则节点i无左子女， 否则节点i的左子女为2 * i + 1
 * 如果2 * i + 2 > n - 1, 则节点i无右子女， 否则节点i的右子女为2 * i + 2
 */

class maxHeap{
    constructor(){
        this.heapArray = [];
    }

    /**
     * 返回堆中元素个数
     */
    getSize(){
        return this.heapArray.length;
    }

    /**
     * 返回一个布尔值，表示堆中是否为空
     */
    isEmpty(){
        return this.heapArray.length===0;
    }

    /**
     * 返回完全二叉树的数组表示中，一个索引所代表的元素
     */
    getValue(index) {
        return this.heapArray[index];
    }

    /**
     * 返回完全二叉树的数组表示中，一个索引所代表的元素的父亲节点的索引
     */
    getParent(index){
        if(index===0){
            console.log("index-0 doesn't have parent");
            return;
        }
        return Math.floor((index - 1) / 2);
    }

    /**
     * 返回完全二叉树的数组表示中，一个索引所代表的元素的左孩子节点的索引
     */
    getLeftChild(index){
        return index * 2 + 1;
    }

    /**
     * 返回完全二叉树的数组表示中，一个索引所代表的元素的右孩子节点的索引
     */
    getRightChild(index) {
        return index * 2 + 2;
    }
    
    /**
     * 向堆中添加元素
     */
    add(element){
        this.heapArray.push(element);
        this.siftUp(this.getSize()-1);//上浮
    }

    /**
     * 上浮 
     * 原理：如果父节点的关键码小于当前节点的关键码，将父节点和当前节点进行位置互换，并继续向上比较调整，直到根节点，调整结束，否则说明，不需要调整了
     */
    siftUp(childIndex) {
        let parentIndex = this.getParent(childIndex);
        while (childIndex > 0 && this.getValue(childIndex) > this.getValue(parentIndex)) { //父节点的关键码小于当前节点的关键码 交换节点
            this.swap(childIndex,parentIndex);
            childIndex = parentIndex;//更新子节点索引
            parentIndex = this.getParent(childIndex);//更新父节点索引
        }
    }

    /**
     * 交换索引对应的节点值
     */
    swap(i,j){
        let length = this.getSize();
        if (i < 0 || i >= length || j < 0 || j >= length){
            throw("index is illegal")
        }
        let value = this.heapArray[i];
        this.heapArray[i] = this.heapArray[j];
        this.heapArray[j] = value;
    }

    /**
     * 获取堆中最大元素
     */
    findMax(){
        return this.heapArray[0];
    }

    /**
     * 移除堆中末尾的元素
     */
    removeLast(){
        this.heapArray.pop();
    }

    /**
     * 取出堆中最大元素
     */
    extractMax(){
        let result = this.findMax();
        this.swap(0,this.getSize()-1);
        this.removeLast();
        this.siftDown(0);
        return result;
    }

    /**
     * 下沉
     * 原理：如果父节点的关键码大于两个子女中的最小关键码，说明，不需要调整了，否则，将父节点和拥有最小关键码的子女进行位置互换，并继续向下比较调整，直到当前节点没有左孩子 调整结束
     */
    siftDown(parentIndex) {
        let length = this.getSize();
        while (this.getLeftChild(parentIndex) < length) {
            let leftChildIndex = this.getLeftChild(parentIndex);
            if (leftChildIndex + 1 <= length && this.getValue(leftChildIndex + 1) > this.getValue(leftChildIndex)) { //右孩子存在且右孩子的关键码大于左孩子的关键码
                leftChildIndex+=1;//存储左右孩子节点最大关键码的索引
            }
            if (this.getValue(parentIndex) < this.getValue(leftChildIndex)){//当前节点的关键码小于左右节点的最大关键码
                this.swap(parentIndex, leftChildIndex);
                parentIndex = leftChildIndex;
            } else { //当前节点的关键码大于两个子女中的最小关键码
                break;
            }
        }
    }

    /**
     * 取出堆中的最大元素，放入一个新元素
     * 原理：直接将堆顶元素替换然后进行siftDown操作，一次O(logn)的操作
     */
    replace(element){
        let result = this.findMax();
        this.heapArray[0] = element;
        this.siftDown(0);//调整为最大堆
        return result;
    }

    /**
     * 将任意数组整理成堆 heapify
     * 原理：调整算法的基本思想是找到所有的分支节点，然后根据这些分支节点的索引从大到小依次进行调整，每次调整时，进行siftDown操作，从后向前一直到根节点
     * heapify算法时间复杂度为O(n)
     */
    init(arr){
        this.heapArray = new Array(arr.length);
        let heapLength = arr.length;
        // 填充this.heapArray, 目前还不是一个堆
        for (var i = 0; i < heapLength; i++) {
            this.heapArray[i] = arr[i];
        }
        var curr_pos = this.getParent(heapLength-1);// 获取最后一个分支节点
        while (curr_pos >= 0) {
            this.siftDown(curr_pos); // 局部自下向上进行调整 保证局部是一个最小堆
            curr_pos -= 1;           // 调整下一个分支节点
        }
    }

    /**
     * 遍历堆中所有节点
     */
    display() {
        for(var i=0;i<this.heapArray.length;i++){
            console.log(this.heapArray[i]);
        }
    }
}

let _maxHeap = new maxHeap();
for(var i=0;i<100000;i++){
    _maxHeap.add(Math.floor(Math.random()*1000000));
}
let _arr = [];
for(var i=0;i<100000;i++){
    _arr[i] = _maxHeap.extractMax();
}

for(var i=1;i<100000;i++){
    if(_arr[i-1]<_arr[i]){
        throw("有错")
    }
}
console.log("堆实现正确");
// _maxHeap.add(28);
// _maxHeap.add(30);
// _maxHeap.add(16);
// _maxHeap.add(41);
// _maxHeap.add(82);
// _maxHeap.add(55);
// _maxHeap.add(3);
// _maxHeap.add(65);
// _maxHeap.add(43);

let heapArr=[28,30,16,41,82,55,3,65,43];
_maxHeap.init(heapArr);
_maxHeap.display();
console.log("取出堆中最大元素："+_maxHeap.extractMax());
_maxHeap.replace(53);
_maxHeap.display();


