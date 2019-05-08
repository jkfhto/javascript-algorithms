/**
 * 判断字符串中括号是否合法
 */
import { StackBasedArray } from "./stack2";
function is_leagl_brackets(string) {
    var rule = {
        ")": "(",
        "}": "{",
        "]": "["
    };
    var stack = new StackBasedArray();
    for (var i = 0; i < string.length; i++) {
        if (string[i] === "(" || string[i] === "{" || string[i] === "[") {
            stack.push(string[i])
        } else {
            if ((string[i] === ")" || string[i] === "}" || string[i] === "]") && rule[string[i]] !== stack.pop()) {
                return false;
            }
        }

    }
    return stack.isEmpty();
}
console.log(is_leagl_brackets("()()))"));
console.log(is_leagl_brackets("sdf(ds(ew(we)rw)rwqq)qwewe"));
console.log(is_leagl_brackets("()()sd()(sd()fw))("));