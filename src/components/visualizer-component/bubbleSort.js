// Importing node modules
import {v4 as uuid} from 'uuid';
import Element from '../element-component/Element';

// There is a ton of inputs in all the functions because, since I'm using timeouts, the state of the variable needs to persist
// Also ,I destructured the props from App.js which adds to this. For the next sorting function, I will not destructure to make it look nicer
const bubbleSort = (array, stopSort, setElementsArray, speed) => {
  let temp = [...array];
  let altered = false;
  recursiveCheck(temp, 0, speed, setElementsArray, altered, stopSort);

  return;
}

const recursiveSort = (temp, i, speed, setElementsArray, altered, stopSort) => {
  temp = [...temp];
  temp[i] = <Element key={uuid()} height={temp[i].props.height} classList='element sorting' />;
  temp[i+1] = <Element key={uuid()} height={temp[i+1].props.height} classList='element sorting' />;
  setElementsArray(temp);
  setTimeout(() => {
    recursiveSorting(temp, i, speed, setElementsArray, altered, stopSort);
  }, speed)
}

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

const recursiveNext = (temp, i, speed, setElementsArray, altered, stopSort) => {
  temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />)
  setElementsArray(temp);
  setTimeout(() => {
    recursiveCheck(temp, i+1, speed, setElementsArray, altered, stopSort);
  }, 0)
}

const recursiveCheck = (temp, i, speed, setElementsArray, altered, stopSort) => {
  setTimeout(() => {
    if (i !== temp.length - 1) {
      let heightFirst = temp[i].props.height;
      let heightSecond = temp[i+1].props.height
      temp = temp.map((el, i) => <Element key={uuid()} height={temp[i].props.height} classList='element' />)
      temp[i] = <Element key={uuid()} height={heightFirst} classList='element checking' />;
      temp[i + 1] = <Element key={uuid()} height={heightSecond} classList='element checking' />;
      setElementsArray(temp);
      if (heightSecond < heightFirst) {
        altered = true;
        setTimeout(() => {
          recursiveSort(temp, i, speed, setElementsArray, altered, stopSort);
        }, speed)
      }
      // Eventually will be an else if
      else if (i <= temp.length - 2) {
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