// Importing node modules
import {v4 as uuid} from 'uuid';
import Element from '../../element-component/Element';

// Notes: 
  // Essentially, quick sort works by choosing a pivot and moving elements around that pivot
  // There are two pointers or indices that point are incremented or decremeneted from the left and right respectively
  // Once the two pointers are more than the pivot (from the left) and less than the pivot (from the right), their positions are swapped
  // This is repeated recursively for the left and right partitions (part of the array to the left of the pivot and to the right) until the entire array is sorted


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
  console.log(dummyArray);
  // for (let i = 0; i < ranges.length; i++) {
  //   temp = await initiatePass(temp, ranges[i][0], ranges[i][1], ranges[i][2], setElementsArray, speed);
  // }
  temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
  setElementsArray(temp);
  stopSort();
}

// This function will create the array of pivots and ranges (all the pivots and ranges are in index values)
const createRanges = (array, left, right, ranges) => {
  // let currentPivot = findPivot(array, left, right);
  let currentPivot = Math.floor((left + right) / 2);
  ranges.push([currentPivot, left, right])
  if (left >= right) {
    return;
  }
  let pivotIndex = partition(array, left, right, currentPivot);
  createRanges(array, left, pivotIndex - 1, ranges);
  createRanges(array, pivotIndex, right, ranges);
}

// This function will find the correct index for each of the ranges in the above function; In charge of sorting the dummy array
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
      left++;
      right--;
    }
  }
  return left;
}

// This function will start the chain of animations for each entry in the ranges array
const initiatePass = async (temp, pivot, left, right, setElementsArray, speed) => {
  temp = [...temp];
  while (left <= right) {
    temp = await initiateCheck(temp, pivot, left, right, setElementsArray, speed);
    while (temp[left].props.height < temp[pivot].props.height) {
      left++;
      console.log('left increment')
      temp = await initiateCheck(temp, pivot, left, right, setElementsArray, speed);
    }
    while (temp[right].props.height > temp[pivot].props.height) {
      right--;
      console.log('right decrement')
      temp = await initiateCheck(temp, pivot, left, right, setElementsArray, speed);
    }

    if (left <= right) {
      console.log('initiate sort');
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
  temp = await initiateSort(temp, pivot, left, pivot, setElementsArray, speed);
  return temp;
}

// This will be responsible for highlighting the elements that are being checked
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
  // Need some code here to check if the two elements should be swapped; if so, call initiateSort
}


// THESE FUNCTIONS CAME FROM MERGE SORT; MIGHT NEED THEM FOR QUICK SORT
// Creates a promise that resolves after "speed" amount of time and then changes array state to rerender and show the two elements that are being compared
// Calls next func after all of that happens
const initiateSort = async (temp, pivot, indexOne, indexTwo, setElementsArray, speed) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, speed)
  }).then(async () => {
    temp = [...temp];
    temp[indexOne] = <Element key={uuid()} height={temp[indexOne].props.height} classList='element sorting' />;
    temp[indexTwo] = <Element key={uuid()} height={temp[indexTwo].props.height} classList='element sorting' />;
    temp[pivot] = <Element key={uuid()} height={temp[indexOne].props.height} classList='element pivot' />;
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