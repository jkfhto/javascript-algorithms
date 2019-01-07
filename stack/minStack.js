/**
 * 实现一个有min方法的栈，除了常见的push，pop操作，提供一个min方法返回栈里最小的元素，且时间复杂度为O(1)
 * 原理:使用两个栈，normalStack正常压栈，出栈。minStack压栈时将当前最小的元素压栈
 */
import { StackBasedArray } from "./stack2";
function minStack() {
    var normalStack = new StackBasedArray();
    var minStack = new StackBasedArray();

    this.push = function (item) {
        normalStack.push(item);
        // 如果minStack为空,直接放⼊入,如果item⼩小于minStack栈顶元素,放⼊入其中
        // 这样做的⽬目的,是保证minStack的栈顶始终保存栈的最小值
        if (minStack.isEmpty() || item < minStack.top()) {
            minStack.push(item);
        } else {
            // 如果item大于等于栈顶元素,把minStack的栈顶元素再放⼊一次
            // minStack的元素个数要和normalStack 保持一致
            minStack.push(minStack.top());
        }
    }

    // 弹出栈顶元素
    this.pop = function () {
        normalStack.pop();
        minStack.pop();
    };

    // 返回栈的最小值
    this.min = function () {
        return minStack.top();
    };

}

let _minstack = new minStack();
_minstack.push(3);
_minstack.push(6);
_minstack.push(8);
console.log(_minstack.min());
_minstack.push(2);
console.log(_minstack.min());