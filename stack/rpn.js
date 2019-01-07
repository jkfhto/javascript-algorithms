/**
 * 计算逆波兰表达式
 * 说明:逆波兰表达式又叫后缀表达式.它将复杂表达式转换为可以依靠简单操作得到计算结果的表达式
 * ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"] 等价于((10 *(6 / ((9 + 3) * -11))) + 17) + 5
 * ["4", "13", "5", "/", "+"] 等价于(4 + (13 / 5))
 * 原理:遍历数组，如果当期元素是数字则压栈，如果当前元素是操作符则从栈顶连续弹出两个元素，并进行相应计算，将计算结果压栈。遍历完成，栈里只有一个元素，就是最终的表达式的计算结果
 */
import { StackBasedArray } from "./stack2";
function calc_exp(params) {
    var stack = new StackBasedArray();
    var operationType = ["+", "-", "*", "/"];
    for(var i=0;i<params.length;i++){
        var item =params[i];
        let totalNum = 0;
        if (operationType.indexOf(item)>=0) {//处理操作符
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
            stack.push(totalNum*1);
        }else{
            //数字直接入栈
            stack.push(item*1);
        }
    }
    //表达式如果是正确的,最终,栈⾥里里还有⼀一个元素,且正是表达式的计算结果
    return stack.pop();
}
var exp_1 = ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"];
console.log("exp_1:" + calc_exp(exp_1));