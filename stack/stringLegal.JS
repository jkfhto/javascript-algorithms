/**
 * 判断字符串中括号是否合法
 */
import { StackBasedArray } from "./stack2";
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