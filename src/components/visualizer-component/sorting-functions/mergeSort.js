// Importing node modules
import {v4 as uuid} from 'uuid';
import Element from '../../element-component/Element';

const mergeSort = async (array, stopSort, setElementsArray, speed) => {
  let temp = [...array];
  let l = 0;
  let r = array.length - 1;
  await recursiveSplit(temp, l, r, setElementsArray, speed)
  stopSort();
}

const recursiveSplit = async (temp, l, r, setElementsArray, speed) => {
  if (l >= r) return;
  let m = Math.floor((l+r) / 2);
  await recursiveSplit(temp, l, m, setElementsArray, speed);
  await recursiveSplit(temp, m + 1, r), setElementsArray, speed;
  await merge(temp, l, m, r, setElementsArray, speed);
}

const merge = async (temp, l, m, r, setElementsArray, speed) => {
  // Defining the ranges of the left and right arrays
  let leftRange = m - 1 + 1;
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
}

const initiateSort = (temp, indexOne, indexTwo, setElementsArray, speed) => {
  
}


// This function just sets the current index and the next index to a different color to show that they are being checked
const initiateSort = (temp, i, speed, setElementsArray, altered, stopSort) => {
  temp = [...temp];
  temp[i] = <Element key={uuid()} height={temp[i].props.height} classList='element sorting' />;
  temp[i+1] = <Element key={uuid()} height={temp[i+1].props.height} classList='element sorting' />;
  setElementsArray(temp);
  setTimeout(() => {
    initiateSwapping(temp, i, speed, setElementsArray, altered, stopSort);
  }, speed)
}

// This function is in charge of actually swapping the current with the next index
const initiateSwapping = (temp, i, speed, setElementsArray, altered, stopSort) => {
  temp = [...temp];
  let firstElement = temp[i]
  temp[i] = temp[i+1];
  temp[i+1] = firstElement;
  setElementsArray(temp);
  setTimeout(() => {
    initiateNext(temp, i, speed, setElementsArray, altered, stopSort);
  }, speed);
}

// This function sets the colors back to normal and then calls the next check on the next two indices
const initiateNext = (temp, i, speed, setElementsArray, altered, stopSort) => {
  temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />)
  setElementsArray(temp);
  setTimeout(() => {
    incrementCheck(temp, i+1, speed, setElementsArray, altered, stopSort);
  }, 0)
}



export default mergeSort;