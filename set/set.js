import { deflate } from "zlib";

class Set{
    constructor(){
        // 使用一个对象来保存集合的元素
        this.items = {}
    }
    

    // 判断集合中是否有某个元素
    contains(value) {
        return this.items.hasOwnProperty(value)
    }

    // 向集合中添加元素
    add(value) {
        // 1.判断集合中是否已经包含了该元素
        if (this.contains(value)) return false

        // 2.将元素添加到集合中
        this.items[value] = value
        return true
    }

    // 从集合中删除某个元素
    remove(value) {
        // 1.判断集合中是否包含该元素
        if (!this.contains(value)) return false

        // 2.包含该元素, 那么将元素删除
        delete this.items[value]
        return true
    }

    // 清空集合中所有的元素
    clear() {
        this.items = {}
    }

    // 获取集合的大小
    getSize() {
        return Object.keys(this.items).length

        /*
        考虑兼容性问题, 使用下面的代码
        let count = 0
        for (let value in this.items) {
            if (this.items.hasOwnProperty(value)) {
                count++
            }
        }
        return count
        */
    }

    // 获取集合中所有的值
    values() {
        return Object.keys(this.items)

        /*
        考虑兼容性问题, 使用下面的代码
        let keys = []
        for (let value in this.items) {
            keys.push(value)
        }
        return keys
        */
    }

    //并集
    union(otherSet) {
        let unionSet = new Set();
        let dataArr = this.values();
        for (let i = 0; i < dataArr.length; i++) {
            unionSet.add(dataArr[i]);
        }
        dataArr = otherSet.values();
        for (let i = 0; i < dataArr.length; i++) {
            unionSet.add(dataArr[i]);
        }
        return unionSet;
    }

    //交集
    intersect(otherSet) {
        let intersectSet = new Set();
        let values= this.values();
        for (let i = 0; i < values.length; i++) {
            otherSet.contains(values[i]) && intersectSet.add(values[i]);
        }
        return intersectSet;
    }

    //差集
    difference(otherSet) {
        let differenceSet = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            !otherSet.contains(values[i]) && differenceSet.add(values[i]);
        }
        return differenceSet;
    }

    //子集
    subSet(otherSet) {
        if (this.getSize() > otherSet.getSize()){
            return false;
        }
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if(!otherSet.contains(values[i])){
                return false;
            };
        }
        return true;
    }
}

export default Set;

const set1 = new Set();
set1.add("qqq");
set1.add("qqq");
set1.add("111");
set1.add("222");
console.log("set1：" + set1.values());
set1.remove("1111");
console.log(set1);
console.log(set1.values());
console.log(set1.getSize());
const set2 = new Set();
set2.add("22233");
set2.add("dfds");
set2.add("qqq");
console.log("set2：" + set2.values());
const set3 = set1.union(set2);
console.log("set3=>set1.union(set2)并集：" + set3.values());
const set4 = set1.intersect(set3);
console.log("set4=>set1.intersect(set3)交集：" + set4.values());
const set5 = set1.difference(set2);
console.log("set5=>set1.difference(set2)差集：" + set5.values());
console.log("set1.subSet(set3)子集：" + set1.subSet(set3));