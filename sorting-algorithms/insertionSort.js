async function InsertionSort() {
    let blocks = document.querySelectorAll('.block');

    // Insertion Algorithm
    for (let i = 0; i < blocks.length; i++) {

        for (let j = 0; j < i; j++) {
            // To change background-color of the
            // blocks to be compared
            blocks[j].style.backgroundColor = '#FF4949';
            blocks[i].style.backgroundColor = '#FF4949';

            // To wait for .1 sec
            await addDelay();

            const currentValue = Number(blocks[i].childNodes[0].innerHTML);
            const blockValue = Number(blocks[j].childNodes[0].innerHTML);

            // To compare value of two blocks
            if (blockValue > currentValue) {
                await swap(blocks[j], blocks[i]);
                blocks = document.querySelectorAll('.block');
            }

            // Changing the color to the previous one
            blocks[j].style.backgroundColor = '#6b5b95';
            blocks[i].style.backgroundColor = '#6b5b95';
        }

    }


}