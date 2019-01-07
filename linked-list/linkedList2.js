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
}

export {LinkedList,ListNode};