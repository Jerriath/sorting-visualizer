import {v4 as uuid} from 'uuid';
import Element from '../element-component/Element';

const bubbleSort = (array, stopSort, setElementsArray) => {
  for (let i = 0; i < array.length - 1; i++) {
    setTimeout(() => {
      let temp = [...array];
      let heightFirst = array[i].props.height;
      let heightSecond = array[i+1].props.height
      temp[i] = <Element key={uuid()} height={heightFirst} classList='element sorting' />;
      temp[i + 1] = <Element key={uuid()} height={heightSecond} classList='element sorting' />;
      setElementsArray(temp);
    }, 100 * i)
  }
  setTimeout(() => {
    stopSort();
    let temp = [...array];
    setElementsArray(temp);
  }, 100 * array.length)
  return;
}

export default bubbleSort;