//instead of doing a simple merge sort we have to do a merge sort of an array of animations

export function getMergeSortAnimations(array){
    const animations = [];
    if(array.length <= 1){
        return array;
    }
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length-1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, startIndex, endIndex, auxiliaryArray, animations){
    if(startIndex === endIndex){
        return;
    }
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSortHelper(auxiliaryArray, startIndex, middleIndex, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIndex + 1, endIndex, mainArray, animations);
    doMerge(mainArray, startIndex, middleIndex, endIndex, auxiliaryArray, animations);
}

//this will add animations to the animations array
function doMerge(mainArray, startIndex, middleIndex, endIndex, auxiliaryArray, animations){
    let k = startIndex;
    let i = startIndex;
    let j = middleIndex + 1;
    while(i <= middleIndex && j <= endIndex){
        //i and j are the 2 values we are comparing, we push them to change their colors
        animations.push([i, j]);
        //same 2 values we compare again to change their colors back
        animations.push([i, j]);
        if(auxiliaryArray[i] <= auxiliaryArray[j]){
            //overwrite value at k in original array with value at i in auxiliary array
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else{
            //overwrite value at k in original array with value at j in auxiliary array
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    while(i <= middleIndex){
        //values that we are comparing are pushed to change their colors
        animations.push([i, i]);
        //values that we are comparing are pushed a second time to change the colors back
        animations.push([i, i]);
        //overwrite value at k in original array with value at i in auxiliary array
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }

    while(j <= endIndex){
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}