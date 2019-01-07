/**
 * 实现浏览器的前进和后退功能
 * 原理:我们使用两个栈，X 和 Y，我们把首次浏览的页面依次压入栈 X，当点击后退按钮时，再依次从栈 X 中出栈，并将出栈的数据依次放入栈 Y。当我们点击前进按钮时，我们依次从栈 Y 中取出数据，放入栈 X 中。当栈 X 中没有数据时，那就说明没有页面可以继续后退浏览了。当栈 Y 中没有数据，那就说明没有页面可以点击前进按钮浏览了。
 * 
 */
import { StackBasedArray } from "./stack2";
class browserStack {
    constructor() {
        this.stackX = new StackBasedArray();
        this.stackY = new StackBasedArray();
    }

    pushHistory(str) {
        this.stackX.push(str)
        this.stackY.clear() //访问新页面 清空栈
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