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
    blocks[0].style.backgroundColor = '#13CE66';
}
