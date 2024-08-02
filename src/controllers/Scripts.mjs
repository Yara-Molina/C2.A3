import { mergeSort, insertionSort, countingSort, findMostFrequentElement } from '../models/Array.mjs';

const executionTimes = {
    mergeSort: 0,
    insertionSort: 0,
    countingSort: 0
};

const iterationTimes = {
    mergeSort: 0,
    insertionSort: 0,
    countingSort: 0
};

let chartInstances = {
    execution: null,
    iteration: null
};

function measureTime(func, args) {
    const start = performance.now();
    const result = func(...args);
    const end = performance.now();
    return { result, time: end - start };
}

function updateCharts() {
    const ctxExecution = document.getElementById('timeChart').getContext('2d');
    const ctxIteration = document.getElementById('iterationChart').getContext('2d');

    console.log('Execution times:', executionTimes);
    console.log('Iteration times:', iterationTimes);

    if (chartInstances.execution) {
        chartInstances.execution.destroy();
    }

    if (chartInstances.iteration) {
        chartInstances.iteration.destroy();
    }

    chartInstances.execution = new Chart(ctxExecution, {
        type: 'bar',
        data: {
            labels: ['Merge Sort', 'Insertion Sort', 'Counting Sort'],
            datasets: [{
                label: 'Tiempo de Ejecución (ms)',
                data: [
                    executionTimes.mergeSort,
                    executionTimes.insertionSort,
                    executionTimes.countingSort
                ],
                backgroundColor: 'rgba(144, 238, 144, 0.5)', // Verde claro
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    chartInstances.iteration = new Chart(ctxIteration, {
        type: 'bar',
        data: {
            labels: ['Merge Sort', 'Insertion Sort', 'Counting Sort'],
            datasets: [{
                label: 'Tiempo de Iteración (ms)',
                data: [
                    iterationTimes.mergeSort,
                    iterationTimes.insertionSort,
                    iterationTimes.countingSort
                ],
                backgroundColor: 'rgba(255, 159, 64, 0.5)', // Naranja claro
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function clearResults() {
    document.getElementById('mergeSortResult').innerText = '';
    document.getElementById('insertionSortResult').innerText = '';
    document.getElementById('countingSortResult').innerText = '';

    if (chartInstances.execution) {
        chartInstances.execution.destroy();
    }

    if (chartInstances.iteration) {
        chartInstances.iteration.destroy();
    }

    const ctxExecution = document.getElementById('timeChart').getContext('2d');
    const ctxIteration = document.getElementById('iterationChart').getContext('2d');

    chartInstances.execution = new Chart(ctxExecution, {
        type: 'bar',
        data: {
            labels: ['Merge Sort', 'Insertion Sort', 'Counting Sort'],
            datasets: [{
                label: 'Tiempo de Ejecución (ms)',
                data: [0, 0, 0],
                backgroundColor: 'rgba(144, 238, 144, 0.5)', // Verde claro
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    chartInstances.iteration = new Chart(ctxIteration, {
        type: 'bar',
        data: {
            labels: ['Merge Sort', 'Insertion Sort', 'Counting Sort'],
            datasets: [{
                label: 'Tiempo de Iteración (ms)',
                data: [0, 0, 0],
                backgroundColor: 'rgba(255, 159, 64, 0.5)', // Naranja claro
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

window.findMostFrequent = function(sortMethod) {
    const arrayInput = document.getElementById('arrayInput').value;
    const array = arrayInput.split(',').map(Number);
    let sortedArray;
    let resultElement;
    let timingInfo;
    let iterationTime;

    switch (sortMethod) {
        case 'mergeSort':
            timingInfo = measureTime(mergeSort, [array]);
            sortedArray = timingInfo.result;
            resultElement = document.getElementById('mergeSortResult');
            executionTimes.mergeSort = timingInfo.time;
            iterationTime = measureTime(() => mergeSort(array), [array]).time;
            iterationTimes.mergeSort = iterationTime;
            break;
        case 'insertionSort':
            timingInfo = measureTime(insertionSort, [array]);
            sortedArray = timingInfo.result;
            resultElement = document.getElementById('insertionSortResult');
            executionTimes.insertionSort = timingInfo.time;
            iterationTime = measureTime(() => insertionSort(array), [array]).time;
            iterationTimes.insertionSort = iterationTime;
            break;
        case 'countingSort':
            timingInfo = measureTime(countingSort, [array]);
            sortedArray = timingInfo.result;
            resultElement = document.getElementById('countingSortResult');
            executionTimes.countingSort = timingInfo.time;
            iterationTime = measureTime(() => countingSort(array), [array]).time;
            iterationTimes.countingSort = iterationTime;
            break;
    }

    const mostFrequent = findMostFrequentElement(sortedArray);
    resultElement.innerHTML = `
        <p>El elemento más frecuente es ${mostFrequent.element} con ${mostFrequent.count} ocurrencias.</p>
        <p>Tiempo de ejecución: ${timingInfo.time.toFixed(2)} ms</p>
        <p>Tiempo de iteración: ${iterationTime.toFixed(2)} ms</p>
    `;

    updateCharts();
}

window.clearResults = clearResults
