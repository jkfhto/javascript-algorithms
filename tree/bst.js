/**
 * 二分搜索树
 * 1:动态数据结构
 * 2:是一颗二叉树
 * 3:二分搜索树的每个节点的值:
 * 每个节点的值都大于其左子树的所有节点的值
 * 每个节点的值都小于其右子树的所有节点的值
 * 4:每一颗子树也是二分搜索树
 * 5:一般二分搜索树不包含重复元素, 当然也可以定义包含重复元素的二分搜索树 
 * 如果想要包含重复元素的话, 只需要定义二分搜索树的左节点的值小于等于当前节点的值或右节点的值大于等于当前节点即可
 * 6:二分搜索树天然的具有递归特性
 */

import { StackBasedArray } from "../stack/stack2";

class TreeNode {
    constructor(element) {
        this.element = element;
        this.left = null; //左孩子
        this.right = null; //右孩子
    }
}

class BST {
    constructor() {
        this.root = null; //跟节点
        this.size = 0; //节点数量
    }

    isEmpty() {
        return this.size === 0;
    }

    getSize() {
        return this.size;
    }

    /**
     * 向二分搜索树添加新元素
     */
    add(element) {
        if (this.root === null) { //添加根节点
            this.root = new TreeNode(element);
            this.size++;
        } else {
            this.addRecursive(this.root, element);
        }
    }

    /**
     * 向二分搜索树添加新元素
     */
    add2(element) {
        this.root = this.addRecursive2(this.root, element)
    }

    /**
     * 向以node为根节点的二分搜索树添加新元素，递归算法
     */
    addRecursive(node, element) {
        if (element === node.element) {
            return;
        } else if (element < node.element && node.left === null) { //插入左孩子
            node.left = new TreeNode(element);
            this.size++;
            return;
        } else if (element > node.element && node.right === null) { //插入右孩子
            node.right = new TreeNode(element);
            this.size++;
            return;
        }

        if (element < node.element) { //遍历左子树
            this.addRecursive(node.left, element);
        } else {
            this.addRecursive(node.right, element);
        }
    }

    /**
     * 向以node为根节点的二分搜索树添加新元素，递归算法
     * 返回插入新节点后二分搜索树的跟节点
     */
    addRecursive2(node, element) {
        if (node === null) {
            this.size++;
            return new TreeNode(element);
        }

        if (element < node.element) { //遍历左子树
            node.left = this.addRecursive2(node.left, element);
        } else if (element > node.element) {
            node.right = this.addRecursive2(node.right, element);
        }
        return node;
    }

    /**
     * 查询二分搜索树是否含有么个元素
     */
    contains(element) {
        return this.containsRecursive(this.root, element)
    }

    /**
     * 查询以node为根节点的二分搜索树是否含有么个元素，递归算法
     */
    containsRecursive(node, element) {
        if (node === null) {
            return false;
        }
        if (element === node.element) {
            return true;
        } else if (element < node.element) {
            return this.containsRecursive(node.left, element);
        } else {
            return this.containsRecursive(node.right, element);
        }
    }

    /**
     * 遍历操作
     * 遍历操作就是把所有的节点都访问一遍
     * 访问的原因和业务相关
     * 遍历分类
     * 深度优先遍历:
     * 前序遍历: 对当前节点的遍历在对左右孩子节点的遍历之前, 遍历顺序: 当前节点 - > 左孩子 - > 右孩子
     * 中序遍历: 对当前节点的遍历在对左右孩子节点的遍历中间, 遍历顺序: 左孩子 - > 当前节点 - > 右孩子
     * 后序遍历: 对当前节点的遍历在对左右孩子节点的遍历之后, 遍历顺序: 左孩子 - > 右孩子 - > 当前节点
     * 广度优先遍历:
     * 层序遍历: 按层从左到右进行遍历
     */

    /**
     * 前序遍历
     * 最自然，最常用的遍历方式
     */
    preOrder() {
        this.preOrderRecursive(this.root);
    }

    /**
     * 前序遍历以node为根节点的二分搜索树， 递归算法
     */
    preOrderRecursive(node) {
        if (node === null) {
            return;
        }
        console.log(node.element);
        this.preOrderRecursive(node.left);
        this.preOrderRecursive(node.right);
    }

    /**
     * 中序遍历
     * 二分搜索树中序遍历的结果是顺序的
     */
    inOrder() {
        this.inOrderRecursive(this.root);
    }

    /**
     * 中序遍历以node为根节点的二分搜索树， 递归算法
     */
    inOrderRecursive(node) {
        if (node === null) {
            return;
        }
        this.inOrderRecursive(node.left);
        console.log(node.element);
        this.inOrderRecursive(node.right);
    }

    /**
     * 后序遍历
     * 后序遍历的一个应用: 为二分搜索树释放内存
     */
    postOrder() {
        this.postOrderRecursive(this.root);
    }

    /**
     * 后序遍历以node为根节点的二分搜索树， 递归算法
     */
    postOrderRecursive(node) {
        if (node === null) {
            return;
        }
        this.postOrderRecursive(node.left);
        this.postOrderRecursive(node.right);
        console.log(node.element);
    }

    /**
     * 二分搜索树的非递归前序遍历
     */
    preOrderNR() {
        let _StackBasedArray = new StackBasedArray();
        _StackBasedArray.push(this.root);
        while (!_StackBasedArray.isEmpty()) {
            let curNode = _StackBasedArray.pop();
            console.log(curNode);
            if (curNode.right !== null) {
                _StackBasedArray.push(curNode.right); //压人右孩子
            }
            if (curNode.left !== null) {
                _StackBasedArray.push(curNode.left); //压人左孩子
            }
        }
    }

    /**
     * 层序遍历
     * 按层从左到右进行遍历
     * 广度优先遍历
     */

    /**
     * 二分搜索树的层序遍历
     * 层序遍历, 从左到右一层一层遍历
     * 借助队列实现
     */
    levelOrder() {
        let _QueueBasedArray = new QueueBasedArray();
        _QueueBasedArray.enqueue(this.root);
        while (!_QueueBasedArray.isEmpty()) {
            let curNode = _QueueBasedArray.dequeue(); //移除队列头部的元素
            console.log(curNode.element);
            if (curNode.left !== null) {
                _QueueBasedArray.enqueue(curNode.left); //左孩子入队列
            }
            if (curNode.right !== null) {
                _QueueBasedArray.enqueue(curNode.right); //右孩子入队列
            }
        }
    }

}

let _BST = new BST();
_BST.add2(20);
_BST.add2(30);
_BST.add2(15);
_BST.add2(33);
_BST.add2(12);
_BST.add2(16);
window._BST = _BST;
console.log("前序遍历：" + _BST.preOrder());
console.log("中序遍历：" + _BST.inOrder());
console.log("后序遍历：" + _BST.postOrder());
console.log("非递归前序遍历：" + _BST.preOrderNR());
console.log("层序遍历：" + _BST.levelOrder());