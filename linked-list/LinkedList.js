/**
 * 链表相对于数组并不需要一块连续的内存空间， 它通过“ 指针” 将一组零散的内存块串联起来使用
 */

class ListNode {
  constructor(element) {
    this.element = element;
    this.next = null; //后继指针
  }
}

class LinkedList {
    constructor() {
        this.head = new ListNode("head"); //头结点
    }

    /**
     * 查找结点中“ 值等于某个给定值” 的结点
     */
    findByValue(value) {
        let currentNode = this.head;
        while (currentNode !== null && currentNode.element !== value) {
            currentNode = currentNode.next;
        }
        console.log("findByValue:" + JSON.stringify(currentNode));
        return currentNode === null ? undefined : currentNode;
    }

    /**
     * 查找给定指针指向的结点
     */
    findByIndex(index) {
        let currentNode = this.head;
        let currentIndex = 0;
        while (currentNode !== null && currentIndex !== index) {
            currentNode = currentNode.next;
            currentIndex++;
        }
        console.log("findByIndex:" + JSON.stringify(currentNode));
        return currentNode === null ? undefined : currentNode;
    }

    /**
     * 将新节点插入到结点中“ 值等于某个给定值” 的结点后面
     */
    insert(newElement, oldElement) {
        const currentNode = this.findByValue(oldElement);
        if (currentNode === undefined) {
            console.log("没有找到指定值得节点");
        } else {
            const newNode = new ListNode(newElement);
            newNode.next = currentNode.next;
            currentNode.next = newNode;
        }
    }

    /**
     * 查找结点中“ 值等于某个给定值” 的结点的前一个节点
     */
    findPrev(value) {
        let currentNode = this.head;
        while (currentNode.next !== null && currentNode.next.element !== value) {
            currentNode = currentNode.next;
        }
        console.log("findPrev:" + JSON.stringify(currentNode));
        return currentNode.next === null ? undefined : currentNode;
    }

    /**
     * 删除结点中“ 值等于某个给定值” 的结点
     */
    remove(value) {
        const currentNode = this.findByValue(value)
        if (currentNode === undefined) {
            console.log('未找到元素')
        } else {
            const prevNode = this.findPrev(value)
            prevNode.next = currentNode.next
        }
    }

    /**
     * 遍历链表所有节点
     */
    display() {
        let currentNode = this.head
        while (currentNode !== null) {
            console.log(JSON.stringify(currentNode.element))
            currentNode = currentNode.next
        }
    }

    /**
     * 反转单链表
     * https://leetcode-cn.com/problems/reverse-linked-list/
     * 输入: 1->2->3->4->5->NULL
     * 输出: 5->4->3->2->1->NULL
     */
    reverseList() {
        let prevNode = null;
        let currentNode = this.head;
        while (currentNode !== null) {
            const next = currentNode.next; //保存数据
            currentNode.next = prevNode;
            prevNode = currentNode;
            currentNode = next;
        }
        this.head = prevNode;//更新头节点
    }

    /**
     * 两两交换链表中的节点 给定 1->2->3->4, 你应该返回 2->1->4->3(需要交换当前两个节点及关联当前节点的前一个节点)
     * https://leetcode-cn.com/problems/swap-nodes-in-pairs/
     */
    swapPairs() {
        if (!this.head || !this.head.next) return;
        let pHead = {};//用于保存head节点的前驱结点
        let prevNode = pHead;//两两交换节点的前驱结点
        let currentNode = this.head;
        prevNode.next = currentNode;
        let node1,node2;
        while (prevNode.next !== null && prevNode.next.next!==null){
            node1 = prevNode.next;//当前节点
            node2= node1.next;//下一个节点
            prevNode.next = node2;//将前驱结点的next指向下一个节点 注意:首次循环时prevNode与pHead指向同一个内存地址，更新pHead节点，指向交换后的head节点
            node1.next = node2.next;//交换两个节点的next 注意:必须先交换next 在执行下面一步，否则会死循环
            node2.next = node1;//将交换后的节点的next指向 交换前的前驱结点
            prevNode = node1;//更新两两交换节点的前驱结点 指向一个新的对象与pHead节点失去关联
        }
        this.head =  pHead.next;//更新head
    }

    /**
     * 判断链表中是否有环 使用快慢指针 快的追上慢的则有环
     * https://leetcode-cn.com/problems/linked-list-cycle/
     */
    hasCycle(){
        let slow = this.head;
        let fast = this.head; 
        while(fast!==null&&fast.next!==null){
            slow = slow.next;
            fast = fast.next.next;
            if(slow===fast){
                return true;
            }
        }
        return false;
    }

    /**
     * 返回链表的中间结点 如果有两个中间结点，则返回第二个中间结点 使用快慢指针 快的遍历完了 慢指针刚好指向中间节点
     * https://leetcode-cn.com/problems/middle-of-the-linked-list/
     */
    middleNode(){
        let slow = this.head;
        let fast = this.head;
        while (fast !== null && fast.next !== null){
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    /**
     * 删除链表的倒数第N个节点 使用快慢两个指针 快指针先向前行走N步 然后快,慢指针同时开始行走保持恒定的间隔 快指针到达链表末尾时  慢指针刚好处于倒数第N个节点的位置
     * https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/ 给定的 n 保证是有效的。
     */
    removeNthFromEnd(n){
        let startNode = new ListNode();
        startNode.next = this.head;
        let slow = startNode;
        let fast = startNode;
        for (var i = 1; i <= n;i++){
            fast = fast.next;
        }
        while (fast.next !== null) {//判断快指针是否到达最后一个结点
            fast = fast.next;
            slow = slow.next;
        }
        slow.next = slow.next.next;//删除倒数第N个节点 注意:slow指向当前需要删除的节点的前驱节点 
        return startNode.next;

    }

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
_LinkedList.display()
console.log('-------------find by item------------')
_LinkedList.findByValue('123')
console.log('-------------find by index------------')
_LinkedList.findByIndex(2)
_LinkedList.reverseList();
_LinkedList.display();
_LinkedList.swapPairs();
_LinkedList.display();
console.log("链表的中心节点为:" + JSON.stringify(_LinkedList.middleNode()));