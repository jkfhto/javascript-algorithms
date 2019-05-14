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

import { StackBasedArray } from "../../stack/stack2";
import { QueueBasedArray } from "../../queue/queue";

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
            let curNode = _StackBasedArray.pop(); //移除栈顶的元素
            console.log(curNode.element);
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
     * 广度优先遍历的意义:
     * 更快找到问题的解
     * 常用于算法设计中 - 最短路径
     */

    /**
     * 二分搜索树的层序遍历
     * 层序遍历, 从左到右一层一层遍历
     * 借助队列实现
     */
    levelOrder(){
        let _QueueBasedArray = new QueueBasedArray();
        _QueueBasedArray.enqueue(this.root);
        while (!_QueueBasedArray.isEmpty()){
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
    
    /**
     * 查找二分搜索树中最小元素
     */
    minimum(){
        if (this.isEmpty()){
            throw("二分搜索树为空没有最小值！");
        }else{
            return this.minimumRecursive(this.root);
        }
    }

    minimumRecursive(node){
        if(node.left===null){
            return node;
        }
        return this.minimumRecursive(node.left);
    }

    /**
     * 查找二分搜索树中最大元素
     */
    maximum() {
        if (this.isEmpty()) {
            throw("二分搜索树为空没有最大值！");
        } else {
            return this.maximumRecursive(this.root);
        }
    }

    maximumRecursive(node) {
        if (node.right === null) {
            return node;
        }
        return this.maximumRecursive(node.right);
    }

    /**
     * 删除最小值
     * 在删除最小节点之前, 先要找到这个最小节点, 根据二分搜索树的特性可知, 从根节点一直往左找, 最后一个没有左子树的节点一定就是整棵树的最小值。
     * 对于删除最小值时, 存在两种情况:
     * 最小值就是一个叶子节点, 直接删除该节点即可
     * 如果最小值所在的节点还有右子树, 则用右子树的根节点替换当前节点即可
     */

    /**
     * 删除二分搜索树中最小值所在的节点，并返回该节点
     */
    removeMin(){
        let res = this.minimum();//获取最小值
        this.root = this.removeMinRecursive(this.root);//删除最小值所在的节点
        return res;//返回最小值
    }
    
    /**
     * 删除以node为根节点的二分搜索树中的最小节点，递归算法
     * 返回删除节点后新的二分搜索树的跟节点
     */
    removeMinRecursive(node){
        if (node.left === null) { //当前删除的节点存在右子树 将被删除的节点的父节点的左子树指向被删除节点的右子树
            this.size--;
            return node.right; //返回右子树 
        }
        node.left = this.removeMinRecursive(node.left); //递归重新构建左子树
        return node; //返回当前节点 重新构建父节点的左子树
    }

    /**
     * 删除二分搜索树中最大值所在的节点，并返回该节点
     */
    removeMax() {
        let res = this.maximum();//获取最大值
        this.root = this.removeMaxRecursive(this.root);//删除最大值所在的节点
        return res;//返回最大值
    }

    /**
     * 删除以node为根节点的二分搜索树中的最大节点，递归算法
     * 返回删除节点后新的二分搜索树的跟节点
     */
    removeMaxRecursive(node) {
        if (node.right === null) { //当前删除的节点存在左子树 将被删除的节点的父节点的右子树指向被删除节点的左子树
            this.size--;
            return node.left; //返回左子树
        }
        node.right = this.removeMaxRecursive(node.right); //递归重新构建右子树
        return node; //返回当前节点 重新构建父节点的右子树
    }

    /**
     * 删除二分搜索树中么个节点
     */
    remove(element) {
        this.root = this.removRecursive(this.root, element); //删除最小值所在的节点
    }
    
    /**
     * 删除以node为根节点的二分搜索树中值为element的节点， 递归算法
     * 返回删除节点后新的二分搜索树的跟节点
     */
    removRecursive(node, element) {
        if (node === null) { //没有值为element的节点
            return null;
        }
        if (element < node.element) {
            node.left = this.removRecursive(node.left, element);
            return node;
        } else if (element > node.element) {
            node.right = this.removRecursive(node.right, element);
            return node;
        } else {
            
            if (node.left === null) { //待删除的节点左子树为空的情况
                this.size--;
                return node.right; //返回右子树 替换当前节点
            } else if (node.right === null) { //待删除的节点左子树为空的情况
                this.size--;
                return node.left; //返回左子树 替换当前节点
            } else { 
                //待删除的节点左，右子树都不为空的情况
                //找到比待删除节点大的最小的节点，即待删除节点右子树的最小节点
                //用这个节点替换待删除的节点
                //新节点的右子树指向待删除节点右子树删除最小节点后的右子树
                //新节点的左子树指向待删除节点的左子树
                let newNode = new TreeNode(this.minimumRecursive(node.right).element); //待删除节点右子树的最小节点
                newNode.right = this.removeMinRecursive(node.right); //待删除节点右子树删除最小节点
                newNode.left = node.left;
                return newNode; //返回新节点 替换当前节点
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
_BST.add2(26);
// _BST.add2(17);
// _BST.add2(155);
// _BST.add2(41);
window._BST = _BST;
console.log("前序遍历：" + _BST.preOrder());
console.log("中序遍历：" + _BST.inOrder());
console.log("后序遍历：" + _BST.postOrder());
console.log("非递归前序遍历：" + _BST.preOrderNR())
console.log("层序遍历：" + _BST.levelOrder());
console.log("获取最小值：" + _BST.minimum().element);
console.log("获取最大值：" + _BST.maximum().element);
console.log("删除节点12：" + _BST.remove(30));
console.log("前序遍历：" + _BST.preOrder());
// console.log("中序遍历：" + _BST.inOrder());
// console.log("删除最小节点：" + _BST.removeMin().element);
// console.log("删除最小节点：" + _BST.removeMin().element);
// console.log("删除最大节点：" + _BST.removeMax().element);
// console.log("删除最大节点：" + _BST.removeMax().element);