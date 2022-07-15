import {v4 as uuid} from 'uuid';
import Element from '../element-component/Element';

const bubbleSort = (array, stopSort, setElementsArray) => {
  let temp = [...array];
  recursiveCheck(temp, 0, setElementsArray);
  setTimeout(() => {
    stopSort();
  }, 900 * array.length)
  return;
}

const recursiveSort = (temp, i, setElementsArray) => {
  // Need to figure out a way to change checking to sorting and then swap and then change everything to element IN THAT ORDER (like an animation)
}

const recursiveCheck = (temp, i, setElementsArray) => {
  setTimeout(() => {
    if (i !== temp.length - 1) {
      let heightFirst = temp[i].props.height;
      let heightSecond = temp[i+1].props.height
      temp = temp.map((el, i) => <Element key={uuid()} height={temp[i].props.height} classList='element' />)
      temp[i] = <Element key={uuid()} height={heightFirst} classList='element checking' />;
      temp[i + 1] = <Element key={uuid()} height={heightSecond} classList='element checking' />;
      setElementsArray(temp);
      if (heightSecond > heightFirst) {
        // recursiveSort(temp, i, setElementsArray);
      }
      if (i <= temp.length - 2) {
        recursiveCheck(temp, i+1, setElementsArray);
      }
    }
    else {
      temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />)
      setElementsArray(temp);
    }
  }, 200 )
}

export default bubbleSort;