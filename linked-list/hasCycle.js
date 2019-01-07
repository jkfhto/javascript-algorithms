/**
 * 判断链表中是否有环 使用快慢指针 快的追上慢的则有环
 * 英文版:https://leetcode.com/problems/linked-list-cycle
 * 中文版:https://leetcode-cn.com/problems/linked-list-cycle/
 */
import { LinkedList } from "./linkedList2";
function hasCycle(list) {
    let slow = list.head;
    let fast = list.head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return slow;
        }
    }
    return false;
}