const container = document.getElementById('array');
const timeout = 300;
const arraySize = 20;

const primaryColor = '#6b5b95';
const secondaryColor = '#FF4949';
const temporaryColor = '#FF9696';
const passedColor = '#13CE66';

async function Sort() {
    const sortingCategory = document.getElementById('sorting-categories');
    const sortingButton = document.getElementById('sorting-button');
    const generateArrayButton = document.getElementById('generate-array-button');

    sortingButton.disabled = true;
    generateArrayButton.disabled = true;

    switch (sortingCategory.value) {
        case 'bubble-sort':
            await BubbleSort();
            break;
        case 'selection-sort':
            await SelectionSort();
            break;
        case 'insertion-sort':
            await InsertionSort();
            await changeAllBackgroundToPassed();
            break;
        case 'heap-sort':
            await HeapSort();
            break;
        case 'quick-sort':
            await QuickSort();
            changeAllBackgroundToPassed();
            break;
        case 'merge-sort':
            await MergeSort();
            changeAllBackgroundToPassed();
            break;
        default:
            break;
    }

    sortingButton.disabled = false;
    generateArrayButton.disabled = false;
}



function setDefaultBackgroundColor(element) {
    element.style.backgroundColor = primaryColor;
}

function setSecondaryBackgroundColor(element) {
    element.style.backgroundColor = secondaryColor;
}

function setTemporaryBackgroundColor(element) {
    element.style.backgroundColor = temporaryColor;
}

function setPassedBackgroundColor(element) {
    element.style.backgroundColor = passedColor;
}


// For future Improvement if you want to over engineer
function setBlockColor(color, ...elements) {
    elements.forEach(element => {
        element.style.backgroundColor = color;
    });
}


// Promise to swap two blocks
function swap(nodeA, nodeB) {
    return new Promise(resolve => {
        // For exchanging styles of two blocks
        const temp = nodeA.style.transform;
        nodeA.style.transform = nodeB.style.transform;
        nodeB.style.transform = temp;

        window.requestAnimationFrame(() => {
            // For waiting for .25 sec
            setTimeout(() => {
                const parentA = nodeA.parentNode;
                const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

                // Move `nodeA` to before the `nodeB`
                nodeB.parentNode.insertBefore(nodeA, nodeB);

                // Move `nodeB` to before the sibling of `nodeA`
                parentA.insertBefore(nodeB, siblingA);
                resolve();
            }, timeout);
        });
    });
}

// Used Recursive Algorithms as it only changes its value,
// rather than swap the nodes and encounter unexpected bugs.
function swapAttributes(nodeA, nodeB) {
    return new Promise(resolve => {
        var tempHeight = nodeA.style.height;
        var tempText = nodeA.childNodes[0].innerText;
        nodeA.style.height = nodeB.style.height;
        nodeB.style.height = tempHeight;
        nodeA.childNodes[0].innerText = nodeB.childNodes[0].innerText;
        nodeB.childNodes[0].innerText = tempText;
        resolve();
    });
}

async function changeAllBackgroundToPassed() {
    let blocks = document.querySelectorAll('.block');
    for (let i = 0; i < blocks.length; i++) {
        await addDelay();
        setPassedBackgroundColor(blocks[i]);
    }
}

function addDelay(delay = 100) {
    return new Promise(resolve =>
        setTimeout(() => {
            resolve();
        }, delay)
    );
}

// Function to generate the array of blocks
function generatearray() {
    container.innerHTML = "";
    for (let i = 0; i < arraySize; i++) {
        // Return a value from 1 to 100 (both inclusive)
        const value = Math.ceil(Math.random() * 100);

        // Creating element div
        const arrayElement = document.createElement('div');

        // Adding class 'block' to div
        arrayElement.classList.add('block');

        // Adding style to div
        arrayElement.style.height = `calc(${value} * var(--array-height))`;
        arrayElement.style.transform = `translate(calc(${i} * var(--array-transform)))`;


        // Creating label element for displaying
        // size of particular block
        const arrayLabel = document.createElement('label');
        arrayLabel.classList.add('block_id');
        arrayLabel.innerText = value

        // Appending created elements to index.html
        arrayElement.appendChild(arrayLabel);
        container.appendChild(arrayElement);
    }

}

generatearray();
