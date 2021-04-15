const container = document.getElementById('array');

const sortingButton = document.getElementById('sorting-button');

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
            }, 250);
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

            console.log('run');
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

async function HeapSort() {
    alert('Heap sort');
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

function Sort() {
    const sortingCategory = document.getElementById('sorting-categories');
    sortingButton.disabled = true;
    sortingButton.classList.add('disabled');
    switch (sortingCategory.value) {
        case 'bubble-sort':
            BubbleSort();
            break;
        case 'heap-sort':
            HeapSort();
            break;
        case 'insertion-sort':
            InsertionSort();
            break;
        case 'merge-sort':
            MergeSort();
            break;
        case 'selection-sort':
            SelectionSort();
            break;
        default:
            break;
    }
    sortingButton.disabled = false;
    sortingButton.classList.remove('disabled');
}