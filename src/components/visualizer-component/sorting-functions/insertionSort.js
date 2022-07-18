// Importing node modules
import {v4 as uuid} from 'uuid';
import Element from '../../element-component/Element';

const insertionSort = (array, stopSort, setElementsArray, speed) => {
  let temp = [...array];
  incrementCheck(temp, 1, stopSort, setElementsArray, speed);
  return;
}

// Function to check the next value in the array to be sorted
// If there needs to be a swap, the swapping will be initiated by the functions below
// If there does not need to be a swap, func will check the next two values
// If we are at the end of the array, sorting will be stopped
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
          initiateSwap(temp, i, i, stopSort, setElementsArray, speed);
        }, speed)
      }
      else {
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
// Stores currentIndex so that, when the workingIndex is being sorted, the currentIndex value is being stored
// THis is os that, when the workingIndex is in its final position, incrementCheck can resume from the original index + 1
const initiateSwap = (temp, currentIndex, workingIndex, stopSort, setElementsArray, speed) => {
  if (workingIndex == 0) {
    incrementCheck(temp, currentIndex + 1, stopSort, setElementsArray, speed);
  }
  else {
    temp = [...temp];
    temp[workingIndex] = <Element key={uuid()} height={temp[workingIndex].props.height} classList='element sorting' />;
    temp[workingIndex-1] = <Element key={uuid()} height={temp[workingIndex - 1].props.height} classList='element sorting' />;
    setElementsArray(temp);
    setTimeout(() => {
      initiateSwapping(temp, currentIndex, workingIndex, stopSort, setElementsArray, speed);
    }, speed)
  }
}

// Function takes care of actually swapping the workingIndex and previous values
const initiateSwapping = (temp, currentIndex, workingIndex, stopSort, setElementsArray, speed) => {
  temp = [...temp];
  let currentElement = temp[workingIndex];
  temp[workingIndex] = temp[workingIndex - 1];
  temp[workingIndex-1] = currentElement;
  setElementsArray(temp);
  setTimeout(() => {
    // Repeats a check with the workingIndex value (now in the new position of workingIndex - 1 bc of swap) and its new previous
    decrementCheck(temp, currentIndex, workingIndex - 1, stopSort, setElementsArray, speed);
  }, speed)
}

// Checks to see if there needs to be another swap; if so repeat swap with workingIndex
// The workingIndex value that is passed on the line that is calling this function in initiateSwapping
// Again, you can see currentIndex is being persisted so that this func can call incrementCheck with currentIndex + 1
const decrementCheck = (temp, currentIndex, workingIndex, stopSort, setElementsArray, speed) => {
  temp = temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
  if (workingIndex > 0) {
    temp[workingIndex] = <Element key={uuid()} height={temp[workingIndex].props.height} classList='element checking' />;
    temp[workingIndex - 1] = <Element key={uuid()} height={temp[workingIndex - 1].props.height} classList='element checking' />;
    setElementsArray(temp);
    if (temp[workingIndex].props.height < temp[workingIndex - 1].props.height) {
      setTimeout(() => {
        initiateSwap(temp, currentIndex, workingIndex, stopSort, setElementsArray, speed);
      }, speed)
    }
    else {
      incrementCheck(temp, currentIndex + 1, stopSort, setElementsArray, speed);
    }
  }
  else {
    setElementsArray(temp);
    incrementCheck(temp, currentIndex + 1, stopSort, setElementsArray, speed);
  }
  
}

export default insertionSort;