import { mergeSort, insertionSort, countingSort, findMostFrequentElement } from '../models/Array.mjs';

window.findMostFrequent = function(sortMethod) {
    const arrayInput = document.getElementById('arrayInput').value;
    const array = arrayInput.split(',').map(Number);
    let sortedArray;
    let resultElement;

    switch (sortMethod) {
        case 'mergeSort':
            sortedArray = mergeSort(array);
            resultElement = document.getElementById('mergeSortResult');
            break;
        case 'insertionSort':
            sortedArray = insertionSort(array);
            resultElement = document.getElementById('insertionSortResult');
            break;
        case 'countingSort':
            sortedArray = countingSort(array);
            resultElement = document.getElementById('countingSortResult');
            break;
    }

    const mostFrequent = findMostFrequentElement(sortedArray);
    resultElement.innerText = `Most frequent element is ${mostFrequent.element} with ${mostFrequent.count} occurrences.`;
}
