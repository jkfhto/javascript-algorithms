export function insertionSort(array) {
    for (var i = 1; i < array.length; i++) { //表示趟数，一共 array.length-1 次
        var value = array[i];
        for (var j = i - 1; j >= 0; j--) {
            if (array[j] > value) { //前i个数已经排好序，现在将第i+1个数插到前面的有序数列中，使得这i+1个数也是排好顺序的
                array[j + 1] = array[j]; // 数据移动
            } else { // 需要排序的当前值大于已经排序好的数组中的最大值直接跳出循环
                break;
            }
        }
        array[j + 1] = value; // 插入数据
    }
    return array;
}

console.log(insertionSort([55, 15, 12, 321, 22, 212, 554, 48]));
