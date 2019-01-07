/**
 * 反转单链表
 * 英文版:https://leetcode.com/problems/reverse-linked-list/
 * 中文版:https://leetcode-cn.com/problems/reverse-linked-list/
 * 输入: 1->2->3->4->5->NULL
 * 输出: 5->4->3->2->1->NULL
 */
import { LinkedList } from "./linkedList2";
function reverseList(list) {
    let prevNode = null;
    let currentNode = list.head;
    while (currentNode !== null) {
        const next = currentNode.next; //保存数据
        currentNode.next = prevNode;
        prevNode = currentNode;
        currentNode = next;
    }
    list.head = prevNode; //更新头节点
}

const _LinkedList = new LinkedList()
_LinkedList.insert('123', 'head')
_LinkedList.insert('456', '123')
_LinkedList.insert('789', 'head')
_LinkedList.insert('abc', 'head')
console.log('-------------remove item------------')
_LinkedList.remove('456')
// _LinkedList.remove("789");
// _LinkedList.remove("abc");
// _LinkedList.remove("123");
_LinkedList.display();
console.log('-------------find by item------------')
_LinkedList.findByValue('123')
console.log('-------------find by index------------')
_LinkedList.findByIndex(2)
reverseList(_LinkedList);
_LinkedList.display();