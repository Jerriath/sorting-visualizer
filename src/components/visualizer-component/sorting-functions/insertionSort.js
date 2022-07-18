// Importing node modules
import {v4 as uuid} from 'uuid';
import Element from '../../element-component/Element';

const insertionSort = (array, stopSort, setElementsArray, speed) => {
  let temp = [...array];
  incrementCheck(temp, 1, stopSort, setElementsArray, speed);
  return;
}

// Function to check the next value in the array to be sorted
const incrementCheck = (temp, i, stopSort, setElementsArray, speed) => {
  setTimeout(() => {
    if (i < temp.length) {
      temp = [...temp];
      let currentHeight = temp[i].props.height;
      let checkingHeight = temp[i-1].props.height;
      temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
      temp[i] = <Element key={uuid()} height={currentHeight} classList='element checking' />;
      temp[i-1] = <Element key={uuid()} height={checkingHeight} classList='element checking' />;
      setElementsArray(temp);
      if (currentHeight < checkingHeight) {
        setTimeout(() => {
          swap(temp, i, i, stopSort, setElementsArray, speed);
        }, speed)
      }
      // Eventuallly will be an else if
      if (i < temp.length) {
        incrementCheck(temp, i+1, stopSort, setElementsArray, speed);
      }      
    }
    else {
      temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />)
      setElementsArray(temp);
      stopSort();
    }
  }, speed)
}

// Function initiates the swapping process between the workingIndex and previous by switching their color
// Stores currentIndex so that when the workingIndex is sorted, incrementCheck and work on currentIndex + 1
const swap = (temp, currentIndex, workingIndex, stopSort, setElementsArray, speed) => {
  temp = [...temp];
  temp[workingIndex] = <Element key={uuid()} height={temp[workingIndex].props.height} classList='element sorting' />;
  temp[workingIndex-1] = <Element key={uuid()} height={temp[workingIndex].props.height} classList='element sorting' />;
  setElementsArray(temp);
  setTimeout(() => {
    swapping(temp, currentIndex, workingIndex, stopSort, setElementsArray, speed);
  }, speed)
}

// Function takes care of actually swapping the workingIndex and previous
const swapping = (temp, currentIndex, workingIndex, stopSort, setElementsArray, speed) => {
  temp = [...temp];
  let currentElement = temp[workingIndex];
  temp[workingIndex] = temp[workingIndex-1];
  temp[workingIndex-1] = currentElement;
  setElementsArray(temp);
  setTimeout(() => {
    decrementCheck(temp, currentIndex, workingIndex, stopSort, setElementsArray, speed);
  }, speed)
}

// Checks to see if there needs to be another swap; if so repeat swap with workingIndex
const decrementCheck = (temp, currentIndex, workingIndex, stopSort, setElementsArray, speed) => {
  temp = temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
  setElementsArray(temp);
  if (temp[workingIndex - 1] > temp[workingIndex - 2]) {
    setTimeout(() => {
      swap(temp, currentIndex, workingIndex - 1, stopSort, setElementsArray, speed);
    }, speed)
  }
  else {
    incrementCheck(temp, currentIndex + 1, stopSort, setElementsArray, speed);
  }
}

export default insertionSort;