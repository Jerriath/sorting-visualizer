// Importing node modules
import {v4 as uuid} from 'uuid';
import Element from '../../element-component/Element';

// Notes: 
  // Essentially, quick sort works by choosing a pivot and moving elements around that pivot
  // There are two pointers or indices that point are incremented or decremeneted from the left and right respectively
  // Once the two pointers are more than the pivot (from the left) and less than the pivot (from the right), their positions are swapped
  // This is repeated recursively for the left and right partitions (part of the array to the left of the pivot and to the right) until the entire array is sorted


const quickSort = async (array, stopSort, setElementsArray, speed) => {
  
  return;
}

// This will be responsible for highlighting the elements that are being checked
const initiateCheck = async (temp, indexOne, indexTwo, setElementsArray, speed) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, speed);
  }).then(async () => {
    temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
    temp[indexOne] = <Element key={uuid()} height={temp[indexOne].props.height} classList='element checking' />;
    temp[indexTwo] = <Element key={uuid()} height={temp[indexTwo].props.height} classList='element checking' />;
    await setElementsArray(temp);    
  })
  // Need some code here to check if the two elements should be swapped; if so, call initiateSort
}


// THESE FUNCTIONS CAME FROM MERGE SORT; MIGHT NEED THEN FOR QUICK SORT
// Creates a promise that resolves after "speed" amount of time and then changes array state to rerender and show the two elements that are being compared
// Calls next func after all of that happens
const initiateSort = async (temp, indexOne, indexTwo, setElementsArray, speed) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, speed)
  }).then(async () => {
    temp = [...temp];
    temp[indexOne] = <Element key={uuid()} height={temp[indexOne].props.height} classList='element sorting' />;
    temp[indexTwo] = <Element key={uuid()} height={temp[indexTwo].props.height} classList='element sorting' />;
    await setElementsArray(temp);
  }).then(async () => {
    return await initiateSwapping(temp, indexOne, indexTwo, setElementsArray, speed);
  })
}

// This function is in charge of actually "swapping" the two elements at the two indices
// This only runs if the element in the right index needs to come before the left index
// This doesn't actually swap anything; it splices out the right element and splices it back into the correct index
  // This pushes everything else in the array down 1 index value
const initiateSwapping = async (temp, indexOne, indexTwo, setElementsArray, speed) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, speed)
  }).then(async () => {
    temp = [...temp];
    let elementTwo = temp.splice(indexTwo, 1)[0];
    temp.splice(indexOne, 0, elementTwo);
    await setElementsArray(temp);
    return temp;
  })
}



// This is a helper function for choosing a good pivot; THis makes the algorithm a lot fast on average
const findPivot = (array) => {
  if (array.length < 3) {
    return 0;
  }
  let first = array[0];
  let middle = array[Math.floor(array.length / 2)];
  let last = array[array.length - 1];
  if (first.props.height < middle.props.height && first.props.height > last.props.height || first.props.height > middle.props.height && first.props.height < last.props.height) {
    return 0;
  }
  else if (middle.props.height < first.props.height && middle.props.height > last.props.height || middle.props.height < first.props.height && middle.props.height > last.props.height) {
    return Math.floor(array.length / 2);
  }
  else {
    return array.length - 1;
  }
}

export default quickSort;