import { mergeSort, insertionSort, countingSort, findMostFrequentElement } from '../models/Array.mjs';

const executionTimes = {
    mergeSort: 0,
    insertionSort: 0,
    countingSort: 0
};

const iterationCounts = {
    mergeSort: 0,
    insertionSort: 0,
    countingSort: 0
};

let chartInstances = {
    execution: null,
    iteration: null
};

function measureTimeAndIterations(func, args = []) {
    if (!Array.isArray(args)) {
        throw new TypeError('Arguments must be an array.');
    }
    const start = performance.now();
    const { sortedArray, iterations } = func(...args);
    const end = performance.now();
    return { result: sortedArray, time: end - start, iterations };
}

function updateCharts() {
    const ctxExecution = document.getElementById('timeChart').getContext('2d');
    const ctxIteration = document.getElementById('iterationChart').getContext('2d');

    console.log('Execution times:', executionTimes);
    console.log('Iteration counts:', iterationCounts);

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
                backgroundColor: 'rgba(144, 238, 144, 0.5)', 
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
                label: 'Conteo de Iteraciones',
                data: [
                    iterationCounts.mergeSort,
                    iterationCounts.insertionSort,
                    iterationCounts.countingSort
                ],
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
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
                backgroundColor: 'rgba(144, 238, 144, 0.5)', 
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
                label: 'Conteo de Iteraciones',
                data: [0, 0, 0],
                backgroundColor: 'rgba(255, 159, 64, 0.5)', 
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

    switch (sortMethod) {
        case 'mergeSort':
            timingInfo = measureTimeAndIterations(mergeSort, [array]);
            sortedArray = timingInfo.result;
            resultElement = document.getElementById('mergeSortResult');
            executionTimes.mergeSort = timingInfo.time;
            iterationCounts.mergeSort = timingInfo.iterations;
            break;
        case 'insertionSort':
            timingInfo = measureTimeAndIterations(insertionSort, [array]);
            sortedArray = timingInfo.result;
            resultElement = document.getElementById('insertionSortResult');
            executionTimes.insertionSort = timingInfo.time;
            iterationCounts.insertionSort = timingInfo.iterations;
            break;
        case 'countingSort':
            timingInfo = measureTimeAndIterations(countingSort, [array]);
            sortedArray = timingInfo.result;
            resultElement = document.getElementById('countingSortResult');
            executionTimes.countingSort = timingInfo.time;
            iterationCounts.countingSort = timingInfo.iterations;
            break;
    }

    const mostFrequent = findMostFrequentElement(sortedArray);
    resultElement.innerHTML = `
        <p>El elemento más frecuente es ${mostFrequent.element} con ${mostFrequent.count} ocurrencias.</p>
        <p>Tiempo de ejecución: ${timingInfo.time.toFixed(2)} ms</p>
        <p>Conteo de iteraciones: ${timingInfo.iterations}</p>
    `;

    updateCharts();
}

window.clearResults = clearResults;