async function lometo_partition(l, r) {
    const blocks = document.querySelectorAll('.block');

    // Storing the value of pivot element
    const pivot = Number(blocks[r].childNodes[0].innerHTML);
    let i = l - 1;

    setSecondaryBackgroundColor(blocks[r]);

    for (var j = l; j <= r - 1; j++) {
        // To change background-color of the
        // blocks to be compared
        setTemporaryBackgroundColor(blocks[j]);

        // To wait for 100 milliseconds
        await addDelay();

        var value = Number(blocks[j].childNodes[0].innerHTML);

        // To compare value of two blocks
        if (value < pivot) {
            i++;
            await swapAttributes(blocks[i], blocks[j]);
        }
    }

    i++;

    await addDelay(100 * 5);
    // Swapping the ith with pivot element
    await swapAttributes(blocks[i], blocks[r]);
    setPassedBackgroundColor(blocks[i]);

    await addDelay(100 * 5);

    // Change the styles of the array blocks to default.
    for (var k = 0; k < arraySize; k++) {
        setDefaultBackgroundColor(blocks[k]);
    };

    return i;

}

// Asynchronous QuickSort function
async function QuickSort(l = 0, r = arraySize - 1, delay = 100) {
    // QuickSort Algorithm
    if (l < r) {
        //Storing the index of pivot element after partition
        let pivot_idx = await lometo_partition(l, r);
        //Recursively calling quicksort for left partition
        await QuickSort(l, pivot_idx - 1);
        //Recursively calling quicksort for right partition
        await QuickSort(pivot_idx + 1, r);
    }

}
