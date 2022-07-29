// Importing node modules
import {v4 as uuid} from 'uuid';
import Element from '../../element-component/Element';

// Creates an indices array to know which elements at which indices to merge sequentially
// For each set of indices, the two "subarrays" are merged in-place
// After everything is sorted, colors are returned to normal and stopSort is called
const mergeSort = async (array, stopSort, setElementsArray, speed) => {
  let temp = [...array];
  let l = 0;
  let r = array.length - 1;
  let indicesArray = [];
  recursiveSplit(l, r, indicesArray);
  for (let i = 0; i < indicesArray.length; i++) {
    temp = await merge(temp, indicesArray[i][0], indicesArray[i][1], indicesArray[i][2], setElementsArray, speed);
  }
  temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
  setElementsArray(temp);
  stopSort();
}

// Creates an array of l, m, and r values (i.e. [l, m, r]) recursively and pushes them onto an indicesArray
// For each l, m, and r value, merge will be called on them
const recursiveSplit = (l, r, indicesArray) => {
  if (l >= r) return ;
  let m = Math.floor((l+r)/2);
  recursiveSplit(l, m, indicesArray);
  recursiveSplit(m+1, r, indicesArray);
  indicesArray.push([l, m, r]);
}
// Essentially runs that animation of sorting the array
// Creates two subarrays that represent the two ranges on temp that will be sorted (subarray ranges are created by recursiveSplit)
// Sorts the two subarrays in-place by altering temp to match the sorting process
// Returns temp at the end to be used for the next merge to be done; This way temp won't reset to its original value on every call
  // Kept happening on first implementation and was a headache
const merge = async (temp, l, m, r, setElementsArray, speed) => {
  temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
  // Defining the ranges of the left and right arrays
  let leftRange = m - l + 1;
  let rightRange = r - m;

  // Creating temp left and right arrays
  let leftArray = new Array(leftRange);
  let rightArray = new Array(rightRange);

  // Copy data over from input temp to the temporary left and right arrays
  for (let i = 0; i < leftRange; i++) {
    leftArray[i] = temp[l + i];
  }
  for (let i = 0; i < rightRange; i++) {
    rightArray[i] = temp[m + i + 1];
  }

  // Merge the two temporary arrays back into the input temp
  let leftIndex = 0;
  let rightIndex = 0;
  let tempIndex = l;

  // While there are elements in both temporary arrays left
  // To find the element at leftIndex in the original temp, add leftIndex + l + rightIndex
  // TO find the element at rightIndex in the original temp, add rightIndex + leftArray.length + l
  while (leftIndex < leftRange && rightIndex < rightRange) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, speed);
    }).then(async () => {
      temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
      // The weird index values are because any rightIndex signifies the number of elements that were spliced in front of the leftArray
        // and l represents the buffer in front if the two arrays
      temp[leftIndex + l + rightIndex] = <Element key={uuid()} height={temp[leftIndex + l + rightIndex].props.height} classList='element checking' />;
      // This index value is like this because every value in the right array comes after every other value in the leftArray (so we add left's length)
        // And every right value that was spliced in front also come before the right array (so we add the right index)
      temp[rightIndex + leftArray.length + l] = <Element key={uuid()} height={temp[rightIndex + leftArray.length + l].props.height} classList='element checking' />;
      await setElementsArray(temp);
      return temp;
    });
    if (leftArray[leftIndex].props.height < rightArray[rightIndex].props.height) {
      leftIndex++;
    }
    else {
      // The weird indice values are explained above in the while loop within the .then statement
      temp = await initiateSort(temp, tempIndex, rightIndex + l + leftArray.length, setElementsArray, speed);
      rightIndex++;
    }
    tempIndex++;
  }
  // Don't need to worry about leftover elements in left or right array because they are already in the correct order in temp after exiting while loop
  return temp;
}

// Creates a promise that resolves after "speed" amount of time and then changes array state to rerender and show the two elements that are being compared
// Calls next func after all of that happens
const initiateSort = async (temp, indexOne, indexTwo, setElementsArray, speed) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, speed)
  }).then(async () => {
    temp = [...temp];
    temp[indexOne] = <Element key={uuid()} height={temp[indexOne].props.height} classList='element sorting' />;
    temp[indexTwo] = <Element key={uuid()} height={temp[indexTwo].props.height} classList='element sorting' />;
    await setElementsArray(temp);
  }).then(async () => {
    return await initiateSwapping(temp, indexOne, indexTwo, setElementsArray, speed);
  })
}

// This function is in charge of actually "swapping" the two elements at the two indices
// This only runs if the element in the right index needs to come before the left index
// This doesn't actually swap anything; it splices out the right element and splices it back into the correct index
  // This pushes everything else in the array down 1 index value
const initiateSwapping = async (temp, indexOne, indexTwo, setElementsArray, speed) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, speed)
  }).then(async () => {
    temp = [...temp];
    let elementTwo = temp.splice(indexTwo, 1)[0];
    temp.splice(indexOne, 0, elementTwo);
    await setElementsArray(temp);
    return temp;
  })
}

export default mergeSort;