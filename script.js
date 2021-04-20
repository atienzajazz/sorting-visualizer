const container = document.getElementById('array');
const timeout = 300;
const arraySize = 20;


async function Sort() {
    const sortingCategory = document.getElementById('sorting-categories');
    const sortingButton = document.getElementById('sorting-button');
    sortingButton.disabled = true;
    sortingButton.classList.add('disabled');
    switch (sortingCategory.value) {
        case 'bubble-sort':
            await BubbleSort();
            break;
        case 'selection-sort':
            await SelectionSort();
            break;
        case 'insertion-sort':
            await InsertionSort();
            await addGreenBackgroundToBlocks();
            break;
        case 'heap-sort':
            await HeapSort();
            break;
        case 'quick-sort':
            await QuickSort();
            addGreenBackgroundToBlocks();
            break;
        case 'merge-sort':
            await MergeSort();
            addGreenBackgroundToBlocks();
            break;
        default:
            break;
    }
    sortingButton.disabled = false;
    sortingButton.classList.remove('disabled');
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

// Used on Recursive Algorithms as it only changes its value,
// rather than swap the nodes and encounter unexpected bugs.
function swapAttributes(nodeA, nodeB) {
    return new Promise(resolve => {
        var temp1 = nodeA.style.height;
        var temp2 = nodeA.childNodes[0].innerText;
        nodeA.style.height = nodeB.style.height;
        nodeB.style.height = temp1;
        nodeA.childNodes[0].innerText = nodeB.childNodes[0].innerText;
        nodeB.childNodes[0].innerText = temp2;
        resolve();
    });
}

async function addGreenBackgroundToBlocks() {
    let blocks = document.querySelectorAll('.block');
    for (let i = 0; i < blocks.length; i++) {
        await addDelay();
        blocks[i].style.backgroundColor = '#13CE66';
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
        arrayElement.style.height = `${value * 3}px`;
        arrayElement.style.transform = `translate(${i * 30}px)`;

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