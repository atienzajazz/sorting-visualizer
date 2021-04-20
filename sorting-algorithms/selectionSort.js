async function SelectionSort() {
    let blocks = document.querySelectorAll('.block');
    for (let i = 0; i < blocks.length; i++) {
        let lowestIdx = i;
        let lowestValue = Number(blocks[i].childNodes[0].innerHTML);

        for (let j = i + 1; j < blocks.length; j++) {
            blocks[j].style.backgroundColor = '#FF4949';
            const currentBlockValue = Number(blocks[j].childNodes[0].innerHTML);

            // To compare value of the lowest and current block
            if (currentBlockValue < lowestValue) {
                blocks[lowestIdx].style.backgroundColor = '#6b5b95';
                lowestIdx = j;
                lowestValue = currentBlockValue;
                blocks[lowestIdx].style.backgroundColor = '#13CE66';
            }
            // blocks[j].style.backgroundColor = '#6b5b95';

            // To wait for .3 sec
            await addDelay();
            if (!(j == lowestIdx)) {
                blocks[j].style.backgroundColor = '#6b5b95';
            }

        }
        // Change background for the blocks that will be swapped

        await swap(blocks[lowestIdx], blocks[i]);
        blocks = document.querySelectorAll('.block');

        // Return to normal
        blocks[lowestIdx].style.backgroundColor = '#6b5b95';
        blocks[i].style.backgroundColor = '#13CE66';

    }

}