// Importing node modules
import {v4 as uuid} from 'uuid';
import Element from '../../element-component/Element';

const selectionSort = (array, stopSort, setElementsArray, speed) => {
  let temp = [...array];
  checkForLowest(temp, 0, stopSort, setElementsArray, speed);
  return;
}

// Essentially starts the process to check for the next lowest value to be swapped with the currentIndex
// First checks to see if we are before the last element in the array
  // If we are before, then it will set the element after currentIndex to currentChecking and see if it is less than currentIndex
    // If it is less than it, currentLowest will be set to currentChecking
    // If not, currentLowest is set to currentIndex
  // If we are at the last element, we will set everything back to normal colors and stop sort as there is nothing to compare with the last element
const checkForLowest = (temp, currentIndex, stopSort, setElementsArray, speed) => {
  setTimeout(() => {
    if (currentIndex < temp.length - 1) {
      temp = [...temp];
      let currentChecking = currentIndex + 1;
      let currentLowest = temp[currentChecking].props.height < temp[currentIndex].props.height ? currentChecking : currentIndex;
      temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
      temp[currentIndex] = <Element key={uuid()} height={temp[currentIndex].props.height} classList='element sorting' />;
      temp[currentChecking] = <Element key={uuid()} height={temp[currentChecking].props.height} classList='element checking' />;
      setElementsArray(temp);
      setTimeout(() => {
        incrementCheck(temp, currentIndex, currentChecking, currentLowest, stopSort, setElementsArray, speed)
      }, speed);
    }
    else {
      temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
      setElementsArray(temp);
      stopSort();
    }
  }, speed)
}

// This will recursively check every element after currentIndex (via currentChecking) and see if it is less than the currentLowest
  // If it is, currentLowest will be set to currentChecking and repeated
  // Once we get to the last element to be checked, the swapping between currentLowest and currentIndex will be initiated
const incrementCheck = (temp, currentIndex, currentChecking, currentLowest, stopSort, setElementsArray, speed) => {
  temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
  currentChecking++;
  if (currentChecking < temp.length) {
    temp[currentIndex] = <Element key={uuid()} height={temp[currentIndex].props.height} classList='element sorting' />;
    temp[currentChecking] = <Element key={uuid()} height={temp[currentChecking].props.height} classList='element checking' />;
    if (temp[currentChecking].props.height < temp[currentLowest].props.height) {
      currentLowest = currentChecking;
    }
    setElementsArray(temp);
    setTimeout(() => {
      incrementCheck(temp, currentIndex, currentChecking, currentLowest, stopSort, setElementsArray, speed);
    }, speed);
  }
  else {
    initiateSwap(temp, currentIndex, currentLowest, stopSort, setElementsArray, speed);
  }
}

// Sets currentIndex and currentLowest to sorting colors for visualization purpose and will call initiateSwapping after a timeout
// If currentLowest remained the same as currentIndex the entire time, initiateNext will run
const initiateSwap = (temp, currentIndex, currentLowest, stopSort, setElementsArray, speed) => {
  temp = [...temp];
  if (currentIndex !== currentLowest) {
    temp[currentIndex] = <Element key={uuid()} height={temp[currentIndex].props.height} classList='element sorting' />;
    temp[currentLowest] = <Element key={uuid()} height={temp[currentLowest].props.height} classList='element sorting' />;
    setElementsArray(temp);
    setTimeout(() => {
      initiateSwapping(temp, currentIndex, currentLowest, stopSort, setElementsArray, speed);
    }, speed);    
  }
  else {
    temp[currentIndex] = <Element key={uuid()} height={temp[currentIndex].props.height} classList='element sorting' />;
    setElementsArray(temp);
    setTimeout(() => {
      initiateNext(temp, currentIndex, currentLowest, stopSort, setElementsArray, speed);
    }, speed)
  }
}

// Responsible for actually swapping the currentIndex with currentLowest
// Afterwards, initiateNext will run
const initiateSwapping = (temp, currentIndex, currentLowest, stopSort, setElementsArray, speed) => {
  temp = [...temp];
  let currentElement = temp[currentIndex];
  temp[currentIndex] = temp[currentLowest];
  temp[currentLowest] = currentElement;
  setElementsArray(temp);
  setTimeout(() => {
    initiateNext(temp, currentIndex, currentLowest, stopSort, setElementsArray, speed);
  }, speed)
}

// Simply cleans up everything and runs the next checkForLowest on currentIndex++
const initiateNext = (temp, currentIndex, currentLowest, stopSort, setElementsArray, speed) => {
  temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
  setElementsArray(temp);
  checkForLowest(temp, currentIndex + 1, stopSort, setElementsArray, speed);
}

export default selectionSort;