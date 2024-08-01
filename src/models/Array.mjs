class ArrayUtils {
    constructor(array) {
        this.array = array;
    }

    // Merge Sort Implementation
    mergeSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        const middle = Math.floor(arr.length / 2);
        const left = arr.slice(0, middle);
        const right = arr.slice(middle);
        return this.merge(this.mergeSort(left), this.mergeSort(right));
    }

    merge(left, right) {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;
        while (leftIndex < left.length && rightIndex < right.length) {
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

    findModeWithMergeSort() {
        let sortedArray = this.mergeSort(this.array);
        let maxFrequency = 1;
        let mode = sortedArray[0];
        let currentFrequency = 1;
        for (let i = 1; i < sortedArray.length; i++) {
            if (sortedArray[i] === sortedArray[i - 1]) {
                currentFrequency++;
            } else {
                if (currentFrequency > maxFrequency) {
                    maxFrequency = currentFrequency;
                    mode = sortedArray[i - 1];
                }
                currentFrequency = 1;
            }
        }
        if (currentFrequency > maxFrequency) {
            mode = sortedArray[sortedArray.length - 1];
        }
        return mode;
    }

    // Counting Sort Implementation
    findModeWithCountingSort() {
        if (this.array.length === 0) return null;
        let maxElement = Math.max(...this.array);
        let minElement = Math.min(...this.array);
        let countArray = new Array(maxElement - minElement + 1).fill(0);
        this.array.forEach(num => countArray[num - minElement]++);
        let maxFrequency = 0;
        let mode = this.array[0];
        countArray.forEach((count, index) => {
            if (count > maxFrequency) {
                maxFrequency = count;
                mode = index + minElement;
            }
        });
        return mode;
    }

    // Insertion Sort Implementation
    insertionSort(arr) {
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
        return arr;
    }

    findModeWithInsertionSort() {
        let sortedArray = this.insertionSort([...this.array]);
        let maxFrequency = 1;
        let mode = sortedArray[0];
        let currentFrequency = 1;
        for (let i = 1; i < sortedArray.length; i++) {
            if (sortedArray[i] === sortedArray[i - 1]) {
                currentFrequency++;
            } else {
                if (currentFrequency > maxFrequency) {
                    maxFrequency = currentFrequency;
                    mode = sortedArray[i - 1];
                }
                currentFrequency = 1;
            }
        }
        if (currentFrequency > maxFrequency) {
            mode = sortedArray[sortedArray.length - 1];
        }
        return mode;
    }
}

// Ejemplo de uso
let array = [1, 2, 2, 3, 3, 3, 4, 4];
let utils = new ArrayUtils(array);

console.log(utils.findModeWithMergeSort()); // Salida: 3
console.log(utils.findModeWithCountingSort()); // Salida: 3
console.log(utils.findModeWithInsertionSort()); // Salida: 3
