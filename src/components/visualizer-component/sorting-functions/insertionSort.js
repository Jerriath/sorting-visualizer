// Importing node modules
import {v4 as uuid} from 'uuid';
import Element from '../../element-component/Element';

const insertionSort = (array, stopSort, setElementsArray, speed) => {
  let temp = [...array];
  incrementCheck(temp, 1, stopSort, setElementsArray, speed);
  return;
}

const incrementCheck = (temp, i, stopSort, setElementsArray, speed) => {
  setTimeout(() => {
    if (i < temp.length) {
      temp = [...temp];
      let currentHeight = temp[i].props.height;
      let checkingHeight = temp[i-1].props.height;
      temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />)
      temp[i] = <Element key={uuid()} height={currentHeight} classList='element checking' />;
      temp[i-1] = <Element key={uuid()} height={checkingHeight} classList='element checking' />;
      setElementsArray(temp);
      if (currentHeight < checkingHeight) {
        // This conditional happens if the two elements need to be swapped
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

const decrementCheck = () => {

}

const swapping = () => {

}

const swap = () => {

}

const next = () => {

}

export default insertionSort;