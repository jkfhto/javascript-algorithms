/**
 * 实际上，栈既可以用数组来实现，也可以用链表来实现。用数组实现的栈，我们叫作顺序栈，用链表实现的栈，我们叫作链式栈
 */

class StackBasedArray {
    constructor() {
        this.items = []; // 使用数组存储数据
    }

    /**
     * 添加一个元素到栈顶
     */
    push(item) {
        this.items.push(item);
    };

    /**
     * 弹出栈顶元素
     */
    pop() {
        return this.items.pop();
    };

    /**
     * 返回栈顶元素
     */
    top() {
        return this.items[this.items.length - 1];
    };

    /**
     * 判断栈是否为空
     */
    isEmpty() {
        return this.items.length == 0;
    };

    /**
     * 返回栈里元素的个数
     */
    size() {
        return this.items.length;
    };

    /**
     * 清空栈
     */
    clear() {
        this.items = []
    }

    /**
     * 打印栈
     */
    display() {
        for (var i = this.items.length - 1; i >= 0; i--) {
            console.log(this.items[i]);
        }
    }

}

export {StackBasedArray};