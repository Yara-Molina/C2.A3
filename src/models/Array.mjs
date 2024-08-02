export function mergeSort(arr) {
    let iterations = 0;

    function merge(left, right) {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            iterations++;
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }

    function mergeSortRecursive(array) {
        if (array.length <= 1) {
            return array;
        }
        const middleIndex = Math.floor(array.length / 2);
        const left = array.slice(0, middleIndex);
        const right = array.slice(middleIndex);
        return merge(mergeSortRecursive(left), mergeSortRecursive(right));
    }

    const sortedArray = mergeSortRecursive(arr);
    return { sortedArray, iterations };
}

export function insertionSort(arr) {
    let iterations = 0;
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            iterations++;
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return { sortedArray: arr, iterations };
}

export function countingSort(arr) {
    let iterations = 0;
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const count = Array(max - min + 1).fill(0);

    arr.forEach(num => {
        iterations++;
        count[num - min]++;
    });

    let sortedIndex = 0;
    count.forEach((num, i) => {
        while (num > 0) {
            iterations++;
            arr[sortedIndex++] = i + min;
            num--;
        }
    });

    return { sortedArray: arr, iterations };
}

export function findMostFrequentElement(arr) {
    const freqMap = {};
    let maxCount = 0;
    let mostFrequentElement = arr[0];

    arr.forEach(num => {
        if (freqMap[num] === undefined) {
            freqMap[num] = 0;
        }
        freqMap[num]++;
        if (freqMap[num] > maxCount) {
            maxCount = freqMap[num];
            mostFrequentElement = num;
        }
    });

    return { element: mostFrequentElement, count: maxCount };
}
