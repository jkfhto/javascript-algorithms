export function bubbleSort(array) {
    var temp; //临时变量
    var flag = false; //是否交换的标志
    for (var i = 0; i < array.length; i++) { //表示趟数，一共 array.length-1 次
        flag = false; // 每次遍历标志位都要先置为false，才能判断后面的元素是否发生了交换
        for (var j = 0; j < array.length - i; j++) { //选出该趟排序的最大值往后移动
           if (array[j] > array[j+1]){
               temp = array[j];
               array[j] = array[j+1];
               array[j+1] = temp;
               flag = true; //只要有发生了交换，flag就置为true
           }
        }
        if (!flag) { // 判断标志位是否为false，如果为false，说明后面的元素已经有序，就直接终止遍历
            break;
        }
    }
    return array;
}

console.log(bubbleSort([55, 15, 12, 321, 22, 212, 554, 48]));
