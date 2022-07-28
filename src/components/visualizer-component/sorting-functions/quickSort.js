// Importing node modules
import {v4 as uuid} from 'uuid';
import Element from '../../element-component/Element';

// Plan: 
  // I will be implementing a solution similar to how I implemened merge sort
  // Create an algorithm that will recursively append an array holding a pivot value and a range to be sorted (e.g. [pivot, startIndex, endIndex])
  // By the end of the recursion, I will have a complete array of subarrays in the correct order to be sorted
  // Each entry in the array will then be used to sort that specific range in the actual array
  // This method will be able to retain the specific order in which quick sort will sort and it will be easier to animate
const quickSort = async (array, stopSort, setElementsArray, speed) => {
  let temp = [...array];
  let dummyArray = temp.map(el => el.props.height);
  let ranges = [];
  createRanges(dummyArray, 0, dummyArray.length - 1, ranges);
  for (let i = 0; i < ranges.length; i++) {
    temp = await initiatePass(temp, ranges[i][0], ranges[i][1], ranges[i][2], setElementsArray, speed);
  }
  temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
  await setElementsArray(temp);
  stopSort();
}

// This function will create the array of pivots and ranges (all the pivots and ranges are in index values; e.g. [pivotIndex, leftIndex, rigtIndex])
// Essentially it does quick sort with a dummy array of only heights, this array maps one-to-one with the original array
// As it performs the quick sort algorithm, it will append the pivot and range values before each range of values is sorted
// This basically creates "instructions" for the animations functions to follow; sorts everything before, then animates it step-by-step
const createRanges = (array, left, right, ranges) => {
  // let currentPivot = findPivot(array, left, right); <---- Don't need this because it creates too many comparisons
  let currentPivot = Math.floor((left + right) / 2);
  ranges.push([currentPivot, left, right])
  if (left >= right) {
    return;
  }
  let pivotIndex = partition(array, left, right, currentPivot);
  createRanges(array, left, pivotIndex - 1, ranges);
  createRanges(array, pivotIndex, right, ranges);
}

// This function will find the correct pivotIndex for each of the ranges in the above function; sorts the dummy array as a side product
const partition = (array, left, right, pivot) => {
  while (left <= right) {
    while (array[left] < array[pivot]) {
      left++;
    }
    while (array[right] > array[pivot]) {
      right--;
    }

    if (left <= right) {
      [array[left], array[right]] = [array[right], array[left]];
      if (pivot === left) {
        pivot = right;
      }
      else if (pivot === right) {
        pivot = left;
      }
      left++;
      right--;
    }
  }
  return left;
}

// Note: the two functions above (createRanges and partition) are the essence of quick sort; everything after deals with animating

// This function will start the chain of animations for each entry in the ranges array
// Sets the pivot to a pivot color and then iterates the array that is being checked until it finds something that needs to swap
// After the while loop is broke, the array is returned to be used for the next step
const initiatePass = async (temp, pivot, left, right, setElementsArray, speed) => {
  temp = [...temp];
  if (left === right) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, speed)
    }).then(async () => {
      temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
      temp[pivot] = <Element key={uuid()} height={temp[pivot].props.height} classList='element pivot' />;
      await setElementsArray(temp);
      return temp;
    })
  }
  while (left <= right) {
    temp = await initiateCheck(temp, pivot, left, right, setElementsArray, speed);
    while (temp[left].props.height < temp[pivot].props.height) {
      left++;
      temp = await initiateCheck(temp, pivot, left, right, setElementsArray, speed);
    }
    while (temp[right].props.height > temp[pivot].props.height) {
      right--;
      temp = await initiateCheck(temp, pivot, left, right, setElementsArray, speed);
    }

    if (left <= right) {
      temp = await initiateSort(temp, pivot, left, right, setElementsArray, speed);
      if (pivot === left) {
        pivot = right;
      }
      else if (pivot === right) {
        pivot = left;
      }
      left++;
      right--;
    }
  }
  return temp;
}

// This will be responsible for highlighting the elements that are being checked
// This function doesn't do any logic, it simply highlights the two indices that are inputted
  // If the pivot is the same index as the left or right, the pivot color is prioritized
const initiateCheck = async (temp, pivot, indexOne, indexTwo, setElementsArray, speed) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, speed);
  }).then(async () => {
    temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
    temp[indexOne] = <Element key={uuid()} height={temp[indexOne].props.height} classList='element checking' />;
    temp[indexTwo] = <Element key={uuid()} height={temp[indexTwo].props.height} classList='element checking' />;
    temp[pivot] = <Element key={uuid()} height={temp[pivot].props.height} classList='element pivot' />;
    await setElementsArray(temp);
    return temp;
  })
}


// THESE FUNCTIONS CAME FROM MERGE SORT; refactored to work for quick sort
// Creates a promise that resolves after "speed" amount of time and then changes array state to rerender and show the two elements that are being compared
// Calls next func after all of that happens
const initiateSort = async (temp, pivot, indexOne, indexTwo, setElementsArray, speed) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, speed)
  }).then(async () => {
    temp = [...temp];
    if (indexOne === indexTwo) {
      return temp;
    }
    temp[indexOne] = <Element key={uuid()} height={temp[indexOne].props.height} classList='element sorting' />;
    temp[indexTwo] = <Element key={uuid()} height={temp[indexTwo].props.height} classList='element sorting' />;
    temp[pivot] = <Element key={uuid()} height={temp[pivot].props.height} classList='element pivot' />;
    await setElementsArray(temp);
  }).then(async () => {
    return await initiateSwapping(temp, indexOne, indexTwo, setElementsArray, speed);
  })
}

// This function is in charge of actually "swapping" the two elements at the two indices
// This only runs if the element in the right index needs to come before the left index
// This essentially just swaps the elements at indexOne and indexTwo and then returns the altered array
const initiateSwapping = async (temp, indexOne, indexTwo, setElementsArray, speed) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, speed)
  }).then(async () => {
    temp = [...temp];
    let firstEl = temp[indexOne];
    temp[indexOne] = temp[indexTwo];
    temp[indexTwo] = firstEl;
    await setElementsArray(temp);
    return temp;
  })
}



// This is a helper function for choosing a good pivot; This makes the algorithm a lot fast creating an effective O(nlog(n)) on average
// This is needed because, without it, quicksort could choose the worst pivot every time causing a O(n^2)
// IMPORTANT: This function is actually not needed since it makes the sorting worse if the array is random or pseudorandom
  // The number of comparisons are too much for larger arrays and cause the call stack to exceed
  // This quick sort algorithm does not use this function but it's still here to show what could be done
const findPivot = (array, left, right) => {
  if (right - left + 1 < 3) {
    return left;
  }
  let first = array[left];
  let middle = array[Math.floor((left + right) / 2)];
  let last = array[right];
  if ((first < middle && first > last) || (first > middle && first < last)) {
    return left;
  }
  else if ((middle < first && middle > last) || (middle > first && middle < last)) {
    return Math.floor((left + right) / 2);
  }
  else {
    return right;
  }
}

export default quickSort;