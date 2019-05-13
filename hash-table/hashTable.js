// 创建HashTable构造函数
//使用链地址法实现
class HashTable{
    // 定义属性
    constructor(){
        this.storage = []; //storage作为我们的数组, 数组中存放相关的元素
        this.count = 0; //count表示当前已经存在了多少数据
        this.limit = 8; //limit用于标记数组中一共可以存放多少个元素
    }
    
    // 判断是否是质数
    isPrime(num) {
        var temp = parseInt(Math.sqrt(num))
        // 2.循环判断
        for (var i = 2; i <= temp; i++) {
            if (num % i == 0) {
                return false
            }
        }
        return true
    }

    // 获取质数
    getPrime(num) {
        while (!isPrime(num)) {
            num++
        }
        return num
    }

    // 哈希函数
    //1：将字符串转成比较大的数字：hashCode
    //2：将hashCode压缩到数组范围之类
    hashFunc(str, max) {
        // 1.初始化hashCode的值
        var hashCode = 0

        // 2.霍纳算法, 来计算hashCode的数值
        for (var i = 0; i < str.length; i++) {
            hashCode = 37 * hashCode + str.charCodeAt(i)
        }

        // 3.取模运算
        hashCode = hashCode % max
        return hashCode
    }

    // 修改，添加数据
    put(key, value) {
        // 1.获取key对应的index
        var index = this.hashFunc(key, this.limit)

        // 2.取出数组(也可以使用链表)
        // 数组中放置数据的方式: [[ [k,v], [k,v], [k,v] ] , [ [k,v], [k,v] ]  [ [k,v] ] ]
        var bucket = this.storage[index]

        // 3.判断这个数组是否存在
        if (bucket === undefined) {
            // 3.1创建桶
            bucket = []
            this.storage[index] = bucket
        }

        // 4.判断是新增还是修改原来的值.
        var override = false
        for (var i = 0; i < bucket.length; i++) {
            var tuple = bucket[i]
            if (tuple[0] === key) {//修改
                tuple[1] = value
                override = true
            }
        }

        // 5.执行添加，新增
        if (!override) {
            bucket.push([key, value])
            this.count++
            //0.75 loadFactor 转载因子 大于0.75会进行扩容
            if (this.count > this.limit * 0.75) {
                var primeNum = this.getPrime(this.limit * 2)
                this.resize(primeNum)
            }
        }
    }

    // 获取存放的数据
    get(key) {
        // 1.获取key对应的index
        var index = this.hashFunc(key, this.limit)

        // 2.获取对应的bucket
        var bucket = this.storage[index]

        // 3.如果bucket为null, 那么说明这个位置没有数据
        if (bucket == null) {
            return null
        }

        // 4.有bucket, 判断是否有对应的key
        for (var i = 0; i < bucket.length; i++) {
            var tuple = bucket[i]
            if (tuple[0] === key) {
                return tuple[1]
            }
        }

        // 5.没有找到, return null
        return null
    }

    // 删除数据
    remove(key) {
        // 1.获取key对应的index
        var index = this.hashFunc(key, this.limit)

        // 2.获取对应的bucket
        var bucket = this.storage[index]

        // 3.判断同是否为null, 为null则说明没有对应的数据
        if (bucket == null) {
            return null
        }

        // 4.遍历bucket, 寻找对应的数据
        for (var i = 0; i < bucket.length; i++) {
            var tuple = bucket[i]
            if (tuple[0] === key) {
                bucket.splice(i, 1)
                this.count--

                // 缩小数组的容量
                //0.25 loadFactor 转载因子 小于0.25会缩小容量
                if (this.limit > 7 && this.count < this.limit * 0.25) {
                    var primeNum = this.getPrime(Math.floor(this.limit / 2))
                    this.resize(primeNum)
                }
            }
            return tuple[1]
        }

        // 5.来到该位置, 说明没有对应的数据, 那么返回null
        return null
    }

    // isEmpty方法
    isEmpty() {
        return this.count == 0
    }

    // size方法
    size() {
        return this.count
    }

    // 哈希表扩容
    resize(newLimit) {
        // 1.保存旧的数组内容
        var oldStorage = this.storage

        // 2.重置属性
        this.limit = newLimit
        this.count = 0
        this.storage = []

        // 3.遍历旧数组中的所有数据项, 并且重新插入到哈希表中
        oldStorage.forEach(function (bucket) {
            // 1.bucket为null, 说明这里面没有数据
            if (bucket == null) {
                return
            }

            // 2.bucket中有数据, 那么将里面的数据重新哈希化插入
            for (var i = 0; i < bucket.length; i++) {
                var tuple = bucket[i]
                this.put(tuple[0], tuple[1])
            }
        }).bind(this)
    }
}