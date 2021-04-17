const container = document.getElementById('array');

const timeout = 750;

// Function to generate the array of blocks
function generatearray() {
    container.innerHTML = "";
    for (let i = 0; i < 20; i++) {
        // Return a value from 1 to 100 (both inclusive)
        const value = Math.ceil(Math.random() * 100);

        // Creating element div
        const arrayElement = document.createElement('div');

        // Adding class 'block' to div
        arrayElement.classList.add('block');

        // Adding style to div
        arrayElement.style.height = `${value * 3}px`;
        arrayElement.style.transform = `translate(${i * 30}px)`;

        // Creating label element for displaying
        // size of particular block
        const arrayLabel = document.createElement('label');
        arrayLabel.classList.add('block_id');
        arrayLabel.innerText = value;

        // Appending created elements to index.html
        arrayElement.appendChild(arrayLabel);
        container.appendChild(arrayElement);
    }
}

// Promise to swap two blocks
function swap(el1, el2) {
    return new Promise(resolve => {
        // For exchanging styles of two blocks
        const temp = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = temp;

        window.requestAnimationFrame(() => {
            // For waiting for .25 sec
            setTimeout(() => {
                container.insertBefore(el2, el1);
                resolve();
            }, timeout);
        });
    });
}

// Asynchronous BubbleSort function
async function BubbleSort(delay = 100) {
    let blocks = document.querySelectorAll('.block');

    // BubbleSort Algorithm
    for (let i = 0; i < blocks.length; i += 1) {
        for (let j = 0; j < blocks.length - i - 1; j += 1) {
            // To change background-color of the
            // blocks to be compared
            blocks[j].style.backgroundColor = '#FF4949';
            blocks[j + 1].style.backgroundColor = '#FF4949';

            // To wait for .1 sec
            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            const value1 = Number(blocks[j].childNodes[0].innerHTML);
            const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

            // To compare value of two blocks
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll('.block');
            }

            // Changing the color to the previous one
            blocks[j].style.backgroundColor = '#6b5b95';
            blocks[j + 1].style.backgroundColor = '#6b5b95';
        }

        // changing the color of greatest element
        // found in the above traversal
        blocks[blocks.length - i - 1].style.backgroundColor = '#13CE66';
    }
}

// Asynchronous Heapify function
async function maxHeapify(n, i) {
    var blocks = document.querySelectorAll(".block");
    var largest = i; // Initialize largest as root
    var left = 2 * i + 1; // left = 2*i + 1
    var right = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (
        left < n &&
        Number(blocks[left].childNodes[0].innerHTML) >
        Number(blocks[largest].childNodes[0].innerHTML)
    )
        largest = left;

    // If right child is larger than largest so far
    if (
        right < n &&
        Number(blocks[right].childNodes[0].innerHTML) >
        Number(blocks[largest].childNodes[0].innerHTML)
    )
        largest = right;

    // If largest is not root
    if (largest != i) {
        blocks[i].style.backgroundColor = '#FF4949';
        blocks[largest].style.backgroundColor = '#FF4949';
        var tempHeight = blocks[i].style.height;
        var tempInnerText = blocks[i].childNodes[0].innerText;
        blocks[i].style.height = blocks[largest].style.height;
        blocks[largest].style.height = tempHeight;
        blocks[i].childNodes[0].innerText = blocks[largest].childNodes[0].innerText;
        blocks[largest].childNodes[0].innerText = tempInnerText;



        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, timeout)
        );
        blocks[i].style.backgroundColor = '#6b5b95';
        blocks[largest].style.backgroundColor = '#6b5b95';

        // Recursively Hapify the affected sub-tree
        await maxHeapify(n, largest);
    }
}

async function HeapSort(n = 20) {
    var blocks = document.querySelectorAll(".block");

    // Build heap (rearrange array)
    for (var i = n / 2 - 1; i >= 0; i--) {
        await maxHeapify(n, i);
    }

    // One by one extract an element from heap
    for (var i = n - 1; i > 0; i--) {

        // Move current root to end
        var temp1 = blocks[i].style.height;
        var temp2 = blocks[i].childNodes[0].innerText;
        blocks[i].style.height = blocks[0].style.height;
        blocks[0].style.height = temp1;
        blocks[i].childNodes[0].innerText = blocks[0].childNodes[0].innerText;
        blocks[0].childNodes[0].innerText = temp2;
        blocks[i].style.backgroundColor = '#13CE66';
        // blocks[j].style.backgroundColor = '#FF4949';
        // blocks[j + 1].style.backgroundColor = '#FF4949';

        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, timeout)
        );

        // Call max Heapify on the reduced heap
        await maxHeapify(i, 0);
    }
}

async function InsertionSort() {
    alert('Insertion sort');
}
async function MergeSort() {
    alert('Merge sort');
}
async function SelectionSort() {
    alert('Selection sort');
}

async function Sort() {
    const sortingCategory = document.getElementById('sorting-categories');
    const sortingButton = document.getElementById('sorting-button');
    sortingButton.disabled = true;
    sortingButton.classList.add('disabled');
    switch (sortingCategory.value) {
        case 'bubble-sort':
            await BubbleSort();
            break;
        case 'heap-sort':
            await HeapSort();
            break;
        case 'insertion-sort':
            await InsertionSort();
            break;
        case 'merge-sort':
            await MergeSort();
            break;
        case 'selection-sort':
            await SelectionSort();
            break;
        default:
            break;
    }
    sortingButton.disabled = false;
    sortingButton.classList.remove('disabled');
}