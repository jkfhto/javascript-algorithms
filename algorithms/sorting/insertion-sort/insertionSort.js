export function insertionSort(array) {
    var temp;
    for (var i = 0; i < array.length - 1; i++) { //表示趟数，一共 array.length-1 次
        for (var j = i + 1; j > 0; j--) {
            if (array[j] < array[j - 1]) { //前j - 1个数已经排好序，现在将第j个数插到前面的有序数列中，使得这n个数也是排好顺序的
                temp = array[j - 1];
                array[j - 1] = array[j];
                array[j] = temp;
            } else { // 需要排序的当前值大于已经排序好的数组中的最大值直接跳出循环
                break;
            }
        }
    }
    return array;
}

console.log(insertionSort([55, 15, 12, 321, 22, 212, 554, 48]));
