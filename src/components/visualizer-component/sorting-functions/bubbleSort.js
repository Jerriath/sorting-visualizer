// Importing node modules
import {v4 as uuid} from 'uuid';
import Element from '../../element-component/Element';

// There is a ton of inputs in all the functions because, since I'm using timeouts, the state of the variable needs to persist
// Also, I destructured the props from App.js which adds to this. For the next sorting function, I will not destructure to make it look nicer
const bubbleSort = (array, stopSort, setElementsArray, speed) => {
  let temp = [...array];
  let altered = false;
  recursiveCheck(temp, 0, speed, setElementsArray, altered, stopSort);
  return;
}

// This function just sets the current index and the next index to a different color to show that they are being checked
const recursiveSort = (temp, i, speed, setElementsArray, altered, stopSort) => {
  temp = [...temp];
  temp[i] = <Element key={uuid()} height={temp[i].props.height} classList='element sorting' />;
  temp[i+1] = <Element key={uuid()} height={temp[i+1].props.height} classList='element sorting' />;
  setElementsArray(temp);
  setTimeout(() => {
    recursiveSorting(temp, i, speed, setElementsArray, altered, stopSort);
  }, speed)
}

// This function is in charge of actually swapping the current with the next index
const recursiveSorting = (temp, i, speed, setElementsArray, altered, stopSort) => {
  temp = [...temp];
  let firstElement = temp[i]
  temp[i] = temp[i+1];
  temp[i+1] = firstElement;
  setElementsArray(temp);
  setTimeout(() => {
    recursiveNext(temp, i, speed, setElementsArray, altered, stopSort);
  }, speed);
}

// This function sets the colors back to normal and then calls the next check on the next two indices
const recursiveNext = (temp, i, speed, setElementsArray, altered, stopSort) => {
  temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />)
  setElementsArray(temp);
  setTimeout(() => {
    recursiveCheck(temp, i+1, speed, setElementsArray, altered, stopSort);
  }, 0)
}

// This function does more of the heavy lifting; it looks at the current and next index to see what should be done
// If the two need to be swapped, it will initiate the sorting functions above, if not then it will move on
// If the current index is at the last element, the function will check to see if anything was swapped by looking at 'altered'
  // If altered is true, the whole process will start again with another pass and keep going until altered remains false for an entire pass
  // If altered remained false, the sort will stop.
const recursiveCheck = (temp, i, speed, setElementsArray, altered, stopSort) => {
  setTimeout(() => {
    if (i !== temp.length - 1) {
      let heightFirst = temp[i].props.height;
      let heightSecond = temp[i+1].props.height
      temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />)
      temp[i] = <Element key={uuid()} height={heightFirst} classList='element checking' />;
      temp[i + 1] = <Element key={uuid()} height={heightSecond} classList='element checking' />;
      setElementsArray(temp);
      if (heightSecond < heightFirst) {
        altered = true;
        setTimeout(() => {
          recursiveSort(temp, i, speed, setElementsArray, altered, stopSort);
        }, speed)
      }
      else if (i < temp.length - 1) {
        recursiveCheck(temp, i+1, speed, setElementsArray, altered, stopSort);
      }
    }
    else {
      temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />)
      setElementsArray(temp);
      if (altered){
        bubbleSort(temp, stopSort, setElementsArray, speed);
      } 
      else {
        stopSort();
      }
    }
  }, speed )
}

export default bubbleSort;