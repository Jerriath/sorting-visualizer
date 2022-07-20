// Importing node modules
import {v4 as uuid} from 'uuid';
import Element from '../../element-component/Element';

const mergeSort = async (array, stopSort, setElementsArray, speed) => {
  let temp = [...array];
  let l = 0;
  let r = array.length - 1;
  await recursiveSplit(temp, l, r, setElementsArray, speed);
  stopSort();
}

const recursiveSplit = async (temp, l, r, setElementsArray, speed) => {
  if (l >= r) return;
  let m = Math.floor((l+r) / 2);
  await recursiveSplit(temp, l, m, setElementsArray, speed);
  await recursiveSplit(temp, m + 1, r, setElementsArray, speed);
  await merge(temp, l, m, r, setElementsArray, speed);
}

const merge = async (temp, l, m, r, setElementsArray, speed) => {
  temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
  // Defining the ranges of the left and right arrays
  let leftRange = m - l + 1;
  let rightRange = r - m;

  // Creating temp left and right arrays
  let leftArray = new Array(leftRange);
  let rightArray = new Array(rightRange);

  // Copy data over from input temp to the temporary left and right arrays
  for (let i = 0; i < leftRange; i++) {
    leftArray[i] = temp[l + i];
  }
  for (let i = 0; i < rightRange; i++) {
    rightArray[i] = temp[m + i + 1];
  }

  // Merge the two temporary arrays back into the input temp
  let leftIndex = 0;
  let rightIndex = 0;
  let tempIndex = l;

  // While there are elements in both temporary arrays left
  // To find the element at leftIndex in the original temp, add leftIndex + l + rightIndex
  // TO find the element at rightIndex in the original temp, add rightIndex + leftArray.length + l
  while (leftIndex < leftRange && rightIndex < rightRange) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, speed);
    }).then(async () => {
      console.log('merge');
      temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
      temp[leftIndex + l + rightIndex] = <Element key={uuid()} height={temp[leftIndex + l + rightIndex].props.height} classList='element checking' />;
      temp[rightIndex + leftArray.length + l] = <Element key={uuid()} height={temp[rightIndex + leftArray.length + l].props.height} classList='element checking' />;
      await setElementsArray(temp);
      return temp;
    });
    if (leftArray[leftIndex].props.height < rightArray[rightIndex].props.height) {
      leftIndex++;
    }
    else {
      temp = await initiateSort(temp, tempIndex, rightIndex + l + leftArray.length, setElementsArray, speed);
      console.log(temp);
      rightIndex++;
    }
    tempIndex++;
  }
  // await new Promise((resolve, reject) => {
  //   setTimeout(async () => {
  //     temp = temp.map((el, index) => <Element key={uuid()} height={temp[index].props.height} classList='element' />);
  //     await setElementsArray(temp);
  //     resolve();
  //   }, speed)
  // })
}

// Creates a promise that resolves after "speed" amount of time and then changes array state to rerender 
// Calls next func after all of that happens
const initiateSort = async (temp, indexOne, indexTwo, setElementsArray, speed) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, speed)
  }).then(async () => {
    console.log('initiate-sort')
    temp = [...temp];
    temp[indexOne] = <Element key={uuid()} height={temp[indexOne].props.height} classList='element sorting' />;
    temp[indexTwo] = <Element key={uuid()} height={temp[indexTwo].props.height} classList='element sorting' />;
    await setElementsArray(temp);
  }).then(async () => {
    return await initiateSwapping(temp, indexOne, indexTwo, setElementsArray, speed);
  })
}

// This function is in charge of actually swapping the current with the next index
const initiateSwapping = async (temp, indexOne, indexTwo, setElementsArray, speed) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, speed)
  }).then(async () => {
    console.log('initiate-swapping')
    temp = [...temp];
    let elementTwo = temp.splice(indexTwo, 1)[0];
    temp.splice(indexOne, 0, elementTwo);
    await setElementsArray(temp);
    return temp;
  })
}

export default mergeSort;