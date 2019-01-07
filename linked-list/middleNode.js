/**
 * 返回链表的中间结点 如果有两个中间结点，则返回第二个中间结点 
 * 方法:使用快慢指针 快的遍历完了 慢指针刚好指向中间节点
 * 英文版:https://leetcode.com/problems/middle-of-the-linked-list/
 * 中文版:https://leetcode-cn.com/problems/middle-of-the-linked-list/
 */
import { LinkedList } from "./linkedList2";
function middleNode(list) {
    let slow = list.head;
    let fast = list.head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}
const _LinkedList = new LinkedList()
_LinkedList.insert('123', 'head')
_LinkedList.insert('456', '123')
_LinkedList.insert('789', 'head')
_LinkedList.insert('abc', 'head')
console.log("中间节点为：" + JSON.stringify(middleNode(_LinkedList)));