export function selctionSort(array) {
    for (var i = 0; i < array.length - 1; i++) { //表示趟数，一共 array.length-1 次
        var minIndex = i; //选出该趟排序的最小值对应的索引
        for (var j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex != i) { //判断是否需要进数据交换
            var temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
        }
    }
    return array;
}

console.log(selctionSort([55, 15, 12, 321, 22, 212, 554, 48]));
