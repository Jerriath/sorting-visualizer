import {v4 as uuid} from 'uuid';
import Element from '../element-component/Element';

const bubbleSort = (array, stopSort, setElementsArray) => {
  let temp = [...array];
  recursiveCheck(temp, 0, setElementsArray);
  setTimeout(() => {
    stopSort();
    let temp = [...array];
    setElementsArray(temp);
  }, 500 * array.length)
  return;
}

const recursiveCheck = (temp, i, setElementsArray) => {
  setTimeout(() => {
    console.log(i); 
    let heightFirst = temp[i].props.height;
    let heightSecond = temp[i+1].props.height
    temp = temp.map((el, i) => <Element key={uuid()} height={temp[i].props.height} classList='element' />)
    temp[i] = <Element key={uuid()} height={heightFirst} classList='element checking' />;
    temp[i + 1] = <Element key={uuid()} height={heightSecond} classList='element checking' />;
    if (heightSecond > heightFirst) {
      // switching(array, i, setElementsArray)
    }
    setElementsArray(temp);
    if (i < temp.length - 2) {
      recursiveCheck(temp, i+1, setElementsArray);
    }
    else {
      return;
    }
  }, 500 )
}

export default bubbleSort;