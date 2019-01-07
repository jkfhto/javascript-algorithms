/**
 * 用栈实现表达式求值 简单的加减乘除
 * 原理:其中一个保存操作数的栈，另一个是保存运算符的栈。我们从左向右遍历表达式，当遇到数字，我们就直接压入操作数栈；当遇到运算符，就与运算符栈的栈顶元素进行比较。如果比运算符栈顶元素的优先级高，就将当前运算符压入栈；如果比运算符栈顶元素的优先级低或者相同，从运算符栈中取栈顶运算符，从操作数栈的栈顶取 2 个操作数，然后进行计算，再把计算完的结果压入操作数栈，继续比较。
 */
import { StackBasedArray } from "./stack2";
class expressionEvaluation {
    constructor() {
        this.operationNum = {
            "+": 1,
            "-": 1,
            "*": 2,
            "/": 2
        }
        this.dataStack = new StackBasedArray();
        this.operationStack = new StackBasedArray();
    }

    /**
     * 根据表达式字符串求值
     */
    calculateEvaluation(str) {
        let _str = "";
        for (var i = 0; i < str.length; i++) {
            let value = str[i];
            let operationNum = this.operationNum[value];
            if (operationNum) { //处理运算符
                this.dataStack.push(_str * 1); //数字入操作数栈
                this.calculate2(operationNum, value);
                _str = ""; //数字还原
            } else {
                _str += value; //字符串合并成数字
                if (i === str.length - 1) {
                    this.dataStack.push(_str * 1); //最后一个数字入操作数栈
                    return this.calculate2(-1); //-1:最后一个数字入栈 入栈结束 计算最终结果
                }
            }
        }

    }

    calculate2(operationNum, operationType) {
        let topType = this.operationStack.top();
        let topNum = this.operationNum[this.operationStack.top()] || 0;
        let totalNum = 0;
        if (operationNum > topNum) { //递归终止 比运算符栈顶元素的优先级高，就将当前运算符压入栈
            this.operationStack.push(operationType);
        } else { //比运算符栈顶元素的优先级低或者相同，从运算符栈中取栈顶运算符，从操作数栈的栈顶取 2 个操作数，然后进行计算，再把计算完的结果压入操作数栈，继续比较
            let num2 = this.dataStack.pop();
            let num1 = this.dataStack.pop();
            switch (topType) {
                case "+":
                    totalNum += num1 + num2;
                    break;
                case "-":
                    totalNum += num1 - num2;
                    break;
                case "*":
                    totalNum += num1 * num2;
                    break;
                case "/":
                    totalNum += num1 / num2;
                    break;
            }
            this.operationStack.pop();
            if (operationNum !== -1 || !this.dataStack.isEmpty()) { //兼容入栈结束 计算最终结果
                this.dataStack.push(totalNum); //把运算结果入操作数栈
                return this.calculate2(operationNum, operationType); //递归继续比较
            } else {
                console.log("完成！");
                return totalNum;
            }

        }
    }

}

let _expressionEvaluation = new expressionEvaluation();
console.log("12/3*4+5-67+82-12/5/4=" + _expressionEvaluation.calculateEvaluation("12/3*4+5-67+82-12/5/4"));