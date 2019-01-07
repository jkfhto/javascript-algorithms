/**
 * 队列跟栈一样，也是一种操作受限的线性表数据结构。它具有先进先出的特性，支持在队尾插入元素，在队头删除元素。跟栈一样，队列可以用数组来实现，也可以用链表来实现。用数组实现的栈叫作顺序栈，用链表实现的栈叫作链式栈。同样，用数组实现的队列叫作顺序队列，用链表实现的队列叫作链式队列
 */
class QueueBasedArray {
    constructor() {
        this.items = []; // 存储数据
    }

    // 向队列列尾部添加⼀一个元素
    enqueue(item) {
        this.items.push(item);
    };
    // 移除队列列头部的元素
    dequeue() {
        return this.items.shift();
    };
    // 返回队列列头部的元素
    head() {
        return this.items[0];
    }
    // 返回队列列⼤大⼩小
    size() {
        return this.items.length;
    }
    // clear
    clear() {
        this.items = [];
    }
    // isEmpty 判断是否为空队列列
    isEmpty() {
        return this.items.length == 0;
    }
};

/**
 * 约瑟夫环
 * 说明:有一个数组a[100]，存放0-99；要求每隔两个数字删除一个数，到末尾是循环到开头继续进行，求最后一个被删除的数
 */

function Joseph_ring(params) {
    var Joseph_queue = new QueueBasedArray();
    for (var i = 0; i < params.length; i++) { //将元素插入队列
        Joseph_queue.enqueue(params[i]);
    }
    var num = 1;
    while (Joseph_queue.size() > 1) { //队列只有一个元素时终止循环
        var item = Joseph_queue.dequeue(); //从队列头部删除一个元素
        if (num % 3 !== 0) { //判断当前元素是不是需要删除
            Joseph_queue.enqueue(item); //将不需要删除的队列头部元素插入队列尾部 形成环
        }
        num++;
    }
    return Joseph_queue.head(); //将结果返回
}
var list = [];
for (var i = 0; i < 10; i++) {
    list.push(i);
}
console.log(Joseph_ring(list))

/**
 * 斐波拉契数列
 * 说明:使用队列实现计算斐波拉契数列第N项的值
 * 原理:
 */
function fibonacci_queue(n) {
    if (n === 1 || n === 2) {
        return 1;
    }
    var queue = new QueueBasedArray();
    queue.enqueue(1);
    queue.enqueue(1);
    while (n >= 3) {
        var num1 = queue.dequeue(); //从队列头部删除一个元素
        var num2 = queue.head(); //获取队列头部元素
        var item = num1 + num2; //f(n)=f(n-2)+f(n-2);
        queue.enqueue(item); //将结果插入队列
        n--;
    }
    queue.dequeue();
    return queue.head();
}
console.log(fibonacci_queue(7));