// Importing node modules
import {v4 as uuid} from 'uuid';
import Element from '../../element-component/Element';

const selectionSort = (array, stopSort, setElementsArray, speed) => {
  let temp = [...array];
  checkForLowest(temp, 0, stopSort, setElementsArray, speed);
  return;
}

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

const initiateNext = (temp, currentIndex, currentLowest, stopSort, setElementsArray, speed) => {
  temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
  setElementsArray(temp);
  checkForLowest(temp, currentIndex + 1, stopSort, setElementsArray, speed);
}

export default selectionSort;