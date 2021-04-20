// Asynchronous Heapify function
async function maxHeapify(n, i) {
    const blocks = document.querySelectorAll(".block");
    let largest = i; // Initialize largest as root
    let left = 2 * i + 1; // left = 2*i + 1
    let right = 2 * i + 2; // right = 2*i + 2


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
        setSecondaryBackgroundColor(blocks[i]);
        setSecondaryBackgroundColor(blocks[largest]);

        await swapAttributes(blocks[i], blocks[largest]);

        await addDelay(300);


        setDefaultBackgroundColor(blocks[i]);
        setDefaultBackgroundColor(blocks[largest]);

        // Recursively Hapify the affected sub-tree
        await maxHeapify(n, largest);
    }
}

async function HeapSort() {
    var blocks = document.querySelectorAll(".block");
    const n = arraySize;

    // Build heap (rearrange array)
    for (var i = n / 2 - 1; i >= 0; i--) {
        await maxHeapify(n, i);
    }

    // One by one extract an element from heap
    for (var i = n - 1; i > 0; i--) {

        // Move current root to end
        await swapAttributes(blocks[i], blocks[0]);

        setPassedBackgroundColor(blocks[i]);

        // Call max Heapify on the reduced heap
        await maxHeapify(i, 0);
    }

    // Assuring every block is changed to passed color.
    setPassedBackgroundColor(blocks[0]);
}
