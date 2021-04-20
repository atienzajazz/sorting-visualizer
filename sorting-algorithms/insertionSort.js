async function InsertionSort() {
    let blocks = document.querySelectorAll('.block');

    // Insertion Algorithm
    for (let i = 0; i < blocks.length; i++) {

        for (let j = 0; j < i; j++) {
            // To change background-color of the
            // blocks to be compared

            setSecondaryBackgroundColor(blocks[j]);
            setSecondaryBackgroundColor(blocks[j + 1]);

            // To wait for .1 sec
            await addDelay();

            const currentValue = Number(blocks[i].childNodes[0].innerHTML);
            const blockValue = Number(blocks[j].childNodes[0].innerHTML);

            // To compare value of two blocks
            if (blockValue > currentValue) {
                await swap(blocks[j], blocks[i]);
                blocks = document.querySelectorAll('.block');
            }

            // Changing the color to default
            setDefaultBackgroundColor(blocks[j]);
            setDefaultBackgroundColor(blocks[i]);
        }

    }


}