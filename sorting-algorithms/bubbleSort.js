// Asynchronous BubbleSort function
async function BubbleSort() {
    let blocks = document.querySelectorAll('.block');

    // BubbleSort Algorithm
    for (let i = 0; i < blocks.length; i += 1) {
        for (let j = 0; j < blocks.length - i - 1; j += 1) {
            // To change background-color of the
            // blocks to be compared
            setSecondaryBackgroundColor(blocks[j]);
            setSecondaryBackgroundColor(blocks[j + 1]);


            await addDelay();

            const value1 = Number(blocks[j].childNodes[0].innerHTML);
            const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

            // To compare value of two blocks
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll('.block');
            }

            // Changing the color to default
            setDefaultBackgroundColor(blocks[j]);
            setDefaultBackgroundColor(blocks[j + 1]);

        }

        // changing the color of greatest element
        // found in the above traversal
        setPassedBackgroundColor(blocks[blocks.length - i - 1]);

    }
}