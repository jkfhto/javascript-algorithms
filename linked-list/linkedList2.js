/**
 * 链表相对于数组并不需要一块连续的内存空间， 它通过“ 指针” 将一组零散的内存块串联起来使用
 */

// 定义节点
class ListNode {
    constructor(element) {
        this.element = element;
        this.next = null; //后继指针
    }
}

class LinkedList{
    constructor(){
        this.length = 0; // 长度
        this.head = null; // 头节点
        this.tail = null; // 尾节点
    }

    // 添加一个新元素
    append(data) {
        // 创建新节点
        var node = new ListNode(data);
        // 如果是空链表
        if (this.head == null) {
            this.head = node;
            this.tail = this.head;
        } else {
            this.tail.next = node; // 尾节点指向新创建的节点
            this.tail = node; // tail指向链表的最后一个节点
        }
        this.length += 1; // 长度加1
        return true;
    };

    // 返回链表大小
    length() {
        return this.length;
    };

    // 获取指定位置的节点
    get_node(index) {
        if (index < 0 || index >= this.length) {
            return null;
        }
        var curr_node = this.head;
        var node_index = index;
        while (node_index-- > 0) {
            curr_node = curr_node.next;
        }
        return curr_node;
    };
    // 在指定位置插入新的元素
    insert(index, data) {
        // index == length,说明是在尾节点的后面新增,直接调用append方法即可
        if (index == this.length) {
            return this.append(data);
        } else if (index > this.length || index < 0) {
            // index范围错误
            return false;
        } else {
            var new_node = new Node(data);
            if (index == 0) {
                // 如果在头节点前面插入,新的节点就变成了头节点
                new_node.next = this.head;
                this.head = new_node;
            } else {
                // 要插入的位置是index,找到索引为index-1的节点,然后进行连接
                var pre_node = this.get_node(index - 1);
                new_node.next = pre_node.next;
                pre_node.next = new_node;
            }
            this.length += 1;
            return true;
        }
    };
    // 删除指定位置的节点
    remove(index) {
        // 参数不合法
        if (index < 0 || index >= this.length) {
            return null;
        } else {
            var del_node = null;
            // 删除的是头节点
            if (index == 0) {
                // head指向下一个节点
                del_node = this.head;
                this.head = this.head.next;
                // 如果head == null,说明之前链表只有一个节点
                if (!this.head) {
                    this.tail = null;
                }
            } else {
                // 找到索引为index-1的节点
                var pre_node = this.get_node(index - 1);
                del_node = pre_node.next;
                pre_node.next = pre_node.next.next;
                // 如果删除的是尾节点
                if (del_node.next == null) {
                    this.tail = pre_node;
                }
            }
            this.length -= 1;
            del_node.next = null;
            return del_node.element;
        }
    };
    // 删除尾节点
    remove_tail() {
        return this.remove(this.length - 1);
    };
    // 删除头节点
    remove_head() {
        return this.remove(0);
    };
    // 返回指定位置节点的值
    findByIndex(index) {
        var node = this.get_node(index);
        if (node) {
            return node.element;
        }
        return null;
    };
    // 返回链表头节点的值
    head() {
        return this.findByIndex(0);
    }
    // 返回链表尾节点的值
    tail() {
        return this.findByIndex(this.length - 1);
    }
    // 返回指定元素的索引,如果没有,返回-1
    // 有多个相同元素,返回第一个
    indexOf(data) {
        var index = -1;
        var curr_node = this.head;
        while (curr_node) {
            index += 1
            if (curr_node.element == data) {
                return index;
            } else {
                curr_node = curr_node.next;
            }
        }
        return -1;
    };
    // 输出链表
    print() {
        var curr_node = this.head;
        var str_link = ""
        while (curr_node) {
            str_link += curr_node.element.toString() + " ->";
            curr_node = curr_node.next;
        }
        str_link += "null";
        console.log(str_link);
        console.log("长度为" + this.length.toString());
    };
    // isEmpty
    isEmpty() {
        return this.length == 0;
    };
    // 清空链表
    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    };

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
}

export {
    LinkedList,
    ListNode
};