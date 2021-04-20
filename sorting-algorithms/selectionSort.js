async function SelectionSort() {
    let blocks = document.querySelectorAll('.block');
    for (let i = 0; i < blocks.length; i++) {
        let lowestIdx = i;
        let lowestValue = Number(blocks[i].childNodes[0].innerHTML);

        for (let j = i + 1; j < blocks.length; j++) {

            setSecondaryBackgroundColor(blocks[j]);
            const currentBlockValue = Number(blocks[j].childNodes[0].innerHTML);

            // To compare value of the lowest and current block
            if (currentBlockValue < lowestValue) {

                // Change the color of the previous lowest block to default
                // for a pleasing animation 
                setDefaultBackgroundColor(blocks[lowestIdx]);

                lowestIdx = j;
                lowestValue = currentBlockValue;

                setPassedBackgroundColor(blocks[lowestIdx]);
            }

            // To wait for .3 sec
            await addDelay();
            if (!(j == lowestIdx)) {
                setDefaultBackgroundColor(blocks[j]);
            }

        }
        // Change background for the blocks that will be swapped

        await swap(blocks[lowestIdx], blocks[i]);
        blocks = document.querySelectorAll('.block');

        // 
        setDefaultBackgroundColor(blocks[lowestIdx]);
        setPassedBackgroundColor(blocks[i]);


    }

}