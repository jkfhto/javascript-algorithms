/**
 * 删除链表的倒数第N个节点 
 * 方法:使用快慢两个指针 快指针先向前行走N步 然后快,慢指针同时开始行走保持恒定的间隔 快指针到达链表末尾时  慢指针刚好处于倒数第N个节点的位置
 * 英文版:https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/ 给定的 n 保证是有效的。
 * 中文版:https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/ 给定的 n 保证是有效的。
 */
import { LinkedList,ListNode } from "./linkedList2";
function removeNthFromEnd(list, n) {
    let startNode = new ListNode();
    startNode.next = list.head;
    let slow = startNode;
    let fast = startNode;
    for (var i = 1; i <= n; i++) {
        fast = fast.next;
    }
    while (fast.next !== null) { //判断快指针是否到达最后一个结点
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next; //删除倒数第N个节点 注意:slow指向当前需要删除的节点的前驱节点 
    return startNode.next;
}
let _LinkedList = new LinkedList()
_LinkedList.insert('123', 'head')
_LinkedList.insert('456', '123')
_LinkedList.insert('789', 'head')
_LinkedList.insert('abc', 'head')
_LinkedList.head = removeNthFromEnd(_LinkedList, 5)
_LinkedList.display();