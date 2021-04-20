async function lometo_partition(l, r) {
    const blocks = document.querySelectorAll('.block');

    // Storing the value of pivot element
    const pivot = Number(blocks[r].childNodes[0].innerHTML);
    let i = l - 1;
    blocks[r].style.backgroundColor = '#FF4949';

    for (var j = l; j <= r - 1; j++) {
        // To change background-color of the
        // blocks to be compared
        blocks[j].style.backgroundColor = '#ff9696';

        // To wait for 100 milliseconds
        await addDelay();

        var value = Number(blocks[j].childNodes[0].innerHTML);

        // To compare value of two blocks
        if (value < pivot) {
            i++;
            swapAttributes(blocks[i], blocks[j]);

            await addDelay();
        }
    }

    i++;
    await addDelay(100 * 6);

    // Swapping the ith with pivot element
    swapAttributes(blocks[i], blocks[r]);

    blocks[i].style.backgroundColor = '#13CE66';

    await addDelay(100 * 6);

    // Change the styles of the array blocks to default.
    for (var k = 0; k < arraySize; k++) {
        blocks[k].style.backgroundColor = '#6b5b95'
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



async function hoare_partition(l, r) {
    let blocks = document.querySelectorAll('.block');
    let pivot = Number(blocks[l].childNodes[0].innerHTML);

    let i = l - 1;
    let j = r + 1;

    while (true) {
        // Find leftmost element greater than
        // or equal to pivot
        do {
            i++;
            if (i - 1 >= l) {
                blocks[i - 1].style.backgroundColor = '#FF4949';
            };
            blocks[i].style.backgroundColor = 'yellow';
            //To wait for 700 milliseconds
            await addDelay();
        } while (Number(blocks[i].childNodes[0].innerHTML) < pivot);

        // Find rightmost element smaller than
        // or equal to pivot
        do {
            j--;
            if (j + 1 <= r) {
                blocks[j + 1].style.backgroundColor = 'green';
            };
            blocks[j].style.backgroundColor = 'yellow';
            //To wait for 700 milliseconds
            await addDelay();

        } while (Number(blocks[j].childNodes[0].innerHTML) > pivot);

        // If two pointers met.
        if (i >= j) {
            return j;
        }


        await addDelay();

        //swapping ith and jth element
        swapAttributes(blocks[i], blocks[j]);

    }
}
