
function getBlockValue(block) {
    return Number(block.childNodes[0].innerHTML);
}

async function MergeSort() {

    let blocks = [...(document.querySelectorAll('.block'))];

    const animations = await mergeSort(blocks);

    for (let i = 0; i < animations.length; i++) {
        // We always get the updated block elements.
        let auxilaryBlock = document.querySelectorAll('.block');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const color = i % 3 === 0 ? primaryColor : secondaryColor;
            await addDelay(10);
            auxilaryBlock[barOneIdx].style.backgroundColor = color;
            auxilaryBlock[barTwoIdx].style.backgroundColor = color;
        } else {
            const [barOneIdx, barTwo] = animations[i];
            await swap(auxilaryBlock[barOneIdx], barTwo);
        }
    }


}

async function mergeSort(array) {
    if (array.length <= 1)
        return array;
    let auxilaryArray = array.slice();
    let animations = [];

    await mergeSortHelper(array, 0, array.length - 1, auxilaryArray, animations);

    return animations;
}

async function mergeSortHelper(mainArray, startIdx, endIdx, auxilaryArray, animations) {
    if (startIdx == endIdx)
        return;
    let middleIdx = Math.floor((startIdx + endIdx) / 2);
    await mergeSortHelper(auxilaryArray, startIdx, middleIdx, mainArray, animations);
    await mergeSortHelper(auxilaryArray, middleIdx + 1, endIdx, mainArray, animations);
    await doMerge(mainArray, startIdx, middleIdx, endIdx, auxilaryArray, animations);
}

async function doMerge(mainArray, startIdx, middleIdx, endIdx, auxilaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        const startIdxValue = getBlockValue(auxilaryArray[i]);
        const middleIdxValue = getBlockValue(auxilaryArray[j]);

        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);

        if (startIdxValue <= middleIdxValue) {
            animations.push([k, auxilaryArray[i]]);
            mainArray[k++] = auxilaryArray[i++];
        } else {
            animations.push([k, auxilaryArray[j]]);
            mainArray[k++] = auxilaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxilaryArray[i]]);
        mainArray[k++] = auxilaryArray[i++];
    }

    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxilaryArray[j]]);
        mainArray[k++] = auxilaryArray[j++];
    }

}