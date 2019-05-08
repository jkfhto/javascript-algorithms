/**
 * 两两交换链表中的节点 给定 1->2->3->4, 你应该返回 2->1->4->3(需要交换当前两个节点及关联当前节点的前一个节点)
 * 英文版:https://leetcode.com/problems/swap-nodes-in-pairs
 * 中文版:https://leetcode-cn.com/problems/swap-nodes-in-pairs/
 */
import { LinkedList } from "./linkedList2";
function swapPairs(list) {
    if (!list.head || !list.head.next) return;
    let pHead = {}; //用于保存head节点的前驱结点
    let prevNode = pHead; //两两交换节点的前驱结点
    let currentNode = list.head;
    prevNode.next = currentNode;
    let node1, node2;
    while (prevNode.next !== null && prevNode.next.next !== null) {
        node1 = prevNode.next; //当前节点
        node2 = node1.next; //下一个节点
        prevNode.next = node2; //将前驱结点的next指向下一个节点 注意:首次循环时prevNode与pHead指向同一个内存地址，更新pHead节点，指向交换后的head节点
        node1.next = node2.next; //交换两个节点的next 注意:必须先交换next 在执行下面一步，否则会死循环
        node2.next = node1; //将交换后的节点的next指向 交换前的前驱结点
        prevNode = node1; //更新两两交换节点的前驱结点 指向一个新的对象与pHead节点失去关联
    }
    list.head = pHead.next; //更新head
}

const _LinkedList = new LinkedList()
_LinkedList.append('123')
_LinkedList.append('456')
_LinkedList.append('789')
_LinkedList.append('abc')
swapPairs(_LinkedList);
_LinkedList.print();