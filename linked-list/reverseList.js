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
_LinkedList.append('123')
_LinkedList.append('456')
_LinkedList.append('789')
_LinkedList.append('abc')
_LinkedList.print();
reverseList(_LinkedList);
_LinkedList.print();