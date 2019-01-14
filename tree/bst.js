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

}

let _BST = new BST();
_BST.add2(20);
_BST.add2(30);
_BST.add2(15);
window._BST = _BST;
console.log(JSON.stringify(_BST));
