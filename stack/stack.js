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

let _StackBasedArray = new StackBasedArray();
_StackBasedArray.push(123);
_StackBasedArray.push(456);
_StackBasedArray.push(789);
console.log('-------弹出栈顶元素------', _StackBasedArray.pop());
console.log(_StackBasedArray.items)

/**
 * 用栈实现表达式求值 简单的加减乘除
 * 原理:其中一个保存操作数的栈，另一个是保存运算符的栈。我们从左向右遍历表达式，当遇到数字，我们就直接压入操作数栈；当遇到运算符，就与运算符栈的栈顶元素进行比较。如果比运算符栈顶元素的优先级高，就将当前运算符压入栈；如果比运算符栈顶元素的优先级低或者相同，从运算符栈中取栈顶运算符，从操作数栈的栈顶取 2 个操作数，然后进行计算，再把计算完的结果压入操作数栈，继续比较。
 */
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

/**
 * 判断字符串中括号是否合法
 */
function is_leagl_brackets(string) {
    var stack = new StackBasedArray();
    for (var i = 0; i < string.length; i++) {
        if (string[i] === "(") {
            stack.push(string[i]);
        } else if (string[i] === ")") {
            // 如果为空,就说明没有左括号与之抵消
            if (stack.isEmpty()) {
                return false;
            } else {
                // 将栈顶的元素弹出
                stack.pop();
            }
        }
    }
    return stack.size() === 0;
}
console.log(is_leagl_brackets("()()))"));
console.log(is_leagl_brackets("sdf(ds(ew(we)rw)rwqq)qwewe"));
console.log(is_leagl_brackets("()()sd()(sd()fw))("));


/**
 * 计算逆波兰表达式
 * 说明:逆波兰表达式又叫后缀表达式.它将复杂表达式转换为可以依靠简单操作得到计算结果的表达式
 * ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"] 等价于((10 *(6 / ((9 + 3) * -11))) + 17) + 5
 * ["4", "13", "5", "/", "+"] 等价于(4 + (13 / 5))
 * 原理:遍历数组，如果当期元素是数字则压栈，如果当前元素是操作符则从栈顶连续弹出两个元素，并进行相应计算，将计算结果压栈。遍历完成，栈里只有一个元素，就是最终的表达式的计算结果
 */

function calc_exp(params) {
    var stack = new StackBasedArray();
    var operationType = ["+", "-", "*", "/"];
    for (var i = 0; i < params.length; i++) {
        var item = params[i];
        let totalNum = 0;
        if (operationType.indexOf(item) >= 0) {//处理操作符
            let num2 = stack.pop();
            let num1 = stack.pop();
            switch (item) {
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
            //将计算结果压栈
            stack.push(totalNum * 1);
        } else {
            //数字直接入栈
            stack.push(item * 1);
        }
    }
    //表达式如果是正确的,最终,栈⾥里里还有⼀一个元素,且正是表达式的计算结果
    return stack.pop();
}
var exp_1 = ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"];
console.log("exp_1:" + calc_exp(exp_1));

/**
 * 实现浏览器的前进和后退功能
 * 原理:我们使用两个栈，X 和 Y，我们把首次浏览的页面依次压入栈 X，当点击后退按钮时，再依次从栈 X 中出栈，并将出栈的数据依次放入栈 Y。当我们点击前进按钮时，我们依次从栈 Y 中取出数据，放入栈 X 中。当栈 X 中没有数据时，那就说明没有页面可以继续后退浏览了。当栈 Y 中没有数据，那就说明没有页面可以点击前进按钮浏览了。
 * 
 */
class browserStack {
    constructor() {
        this.stackX = new StackBasedArray();
        this.stackY = new StackBasedArray();
    }

    pushHistory(str) {
        this.stackX.push(str)
        this.stackY.clear()//访问新页面 清空栈
        this.displayAllStack()
    }

    //前进
    forward() {
        let history = this.stackY.pop();
        if (!history) {
            console.log("终止前进！");
            return;
        }
        this.stackX.push(history);
        this.displayAllStack();
    }

    //后退
    back() {
        let history = this.stackX.pop();
        if (!history) {
            console.log("终止后退！");
            return;
        }
        this.stackY.push(history);
        this.displayAllStack();
    }

    // 打印栈内数据
    displayAllStack() {
        console.log('---stackY---')
        this.stackY.display()
        console.log('---stackX---')
        this.stackX.display()
    }
}

const browser = new browserStack()
browser.pushHistory('www.google.com')
browser.pushHistory('www.baidu.com')
browser.pushHistory('www.github.com')
// 后退
browser.back()
browser.back()
browser.forward()
browser.pushHistory('www.new.com')
browser.back()
browser.forward()