/**
 * 优先队列
 */
import { maxHeap } from "./maxHeap";
class PriorityQueue{
    constructor(){
        this.maxHeap = new maxHeap();
    }

    // 向队列尾部添加⼀一个元素
    enqueue(item) {
        this.maxHeap.add(item);
    };
    // 移除队列头部的元素
    dequeue() {
        return this.maxHeap.extractMax();
    };
    // 返回队列头部的元素
    head() {
        return this.maxHeap.findMax();
    }
    // 返回队列列大小
    size() {
        return this.maxHeap.getSize();
    }
    // clear
    clear() {
        this.maxHeap = [];
    }
    // isEmpty 判断是否为空队列
    isEmpty() {
        return this.maxHeap.isEmpty();
    }
}
export {PriorityQueue};