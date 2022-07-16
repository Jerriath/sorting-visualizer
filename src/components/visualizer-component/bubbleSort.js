import {v4 as uuid} from 'uuid';
import Element from '../element-component/Element';

const bubbleSort = (array, stopSort, setElementsArray) => {
  let temp = [...array];
  recursiveCheck(temp, 0, setElementsArray);
  setTimeout(() => {
    stopSort();
  }, 200 * array.length)
  return;
}

const recursiveSort = (temp, i, setElementsArray) => {
  // Need to figure out a way to change checking to sorting and then swap and then change everything to element IN THAT ORDER (like an animation)
  // setTimeout(() => {
  //   temp[i] = <Element key={uuid()} height={temp[i].props.height} classList='element sorting' />;
  //   temp[i+1] = <Element key={uuid()} height={temp[i+1].props.height} classList='element sorting' />;
  //   setElementsArray(temp);
  //   recursiveSorting(temp, i, setElementsArray);
  // }, 200)
  temp = [...temp];
  temp[i] = <Element key={uuid()} height={temp[i].props.height} classList='element sorting' />;
  temp[i+1] = <Element key={uuid()} height={temp[i+1].props.height} classList='element sorting' />;
  setElementsArray(temp);
  setTimeout(() => {
    recursiveSorting(temp, i, setElementsArray);
  }, 200)
}

const recursiveSorting = (temp, i, setElementsArray) => {
  // Need to figure out a way to change checking to sorting and then swap and then change everything to element IN THAT ORDER (like an animation)
  // setTimeout(() => {
  //   let firstElement = temp[i]
  //   temp[i] = temp[i+1];
  //   temp[i+1] = firstElement;
  //   setElementsArray(temp);
  //   recursiveNext(temp, i, setElementsArray);
  // }, 200)
  temp = [...temp];
  let firstElement = temp[i]
  temp[i] = temp[i+1];
  temp[i+1] = firstElement;
  setElementsArray(temp);
  setTimeout(() => {
    recursiveNext(temp, i, setElementsArray);
  }, 200);
}

const recursiveNext = (temp, i, setElementsArray) => {
  // Need to figure out a way to change checking to sorting and then swap and then change everything to element IN THAT ORDER (like an animation)
  // setTimeout(() => {
  //   temp = temp.map((el, i) => <Element key={uuid()} height={temp[i].props.height} classList='element' />)
  //   setElementsArray(temp);
  //   recursiveCheck(temp, i+1, setElementsArray);
  // }, 200)
  temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />)
  setElementsArray(temp);
  setTimeout(() => {
    recursiveCheck(temp, i+1, setElementsArray);
  }, 200)
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
        setTimeout(() => {
          recursiveSort(temp, i, setElementsArray);
        }, 200)
      }
      // Eventually will be an else if
      else if (i <= temp.length - 2) {
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