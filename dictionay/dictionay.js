// 创建字典的构造函数
class Dictionay{
    constructor(){
        // 字典属性
        this.items = {};
    }
    
    // 字典操作方法
    // 在字典中添加键值对
    set(key, value) {
        this.items[key] = value;
    }

    // 判断字典中是否有某个key
    has(key) {
        return this.items.hasOwnProperty(key);
    }

    // 从字典中移除元素
    remove(key) {
        // 1.判断字典中是否有这个key
        if (!this.has(key)) return false;

        // 2.从字典中删除key
        delete this.items[key];
        return true;
    }

    // 根据key去获取value
    get(key) {
        return this.items[key];
    }

    // 获取所有的keys
    keys() {
        return Object.keys(this.items);
    }

    // 获取所有的value
    values() {
        return Object.values(this.items);
    }

    // size方法
    size() {
        return this.keys().length;
    }

    // clear方法
    clear() {
        this.items = {};
    }
}