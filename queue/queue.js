/**
 * 队列跟栈一样，也是一种操作受限的线性表数据结构。它具有先进先出的特性，支持在队尾插入元素，在队头删除元素。跟栈一样，队列可以用数组来实现，也可以用链表来实现。用数组实现的栈叫作顺序栈，用链表实现的栈叫作链式栈。同样，用数组实现的队列叫作顺序队列，用链表实现的队列叫作链式队列
 */
class QueueBasedArray {
    constructor(){
        this.items = []; // 存储数据
    }
    
    // 向队列列尾部添加⼀一个元素
    enqueue(item) {
        items.push(item);
    };
    // 移除队列列头部的元素
    dequeue() {
        return items.shift();
    };
    // 返回队列列头部的元素
    head() {
        return items[0];
    }
    // 返回队列列⼤大⼩小
    size() {
        return items.length;
    }
    // clear
    clear() {
        items = [];
    }
    // isEmpty 判断是否为空队列列
    isEmpty() {
        return items.length == 0;
    }
};

/**
 * 约瑟夫环
 * 原理:
 */