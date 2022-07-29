# Sorting Visualizer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The purpose of this project was to develop a better understanding for commonly used sorting algorithms as well as understanding their time complexities. This project essentially "animates" how these sorting algorithms perform. You can also check out the live demo [here](https://sorting-visualizer-five-rho.vercel.app/).

## Inspiration

The idea for this project came from Clement Mihailescu's sorting visualizer that he made. You can check out his repo [here](https://github.com/clementmihailescu/Sorting-Visualizer). I thought it would be cool to try and create what he made, but with my own logic and ideas. This was the result.

# Algorithms

This project includes common algorithms that are used. I chose these specically because I wanted to include both slow algorithms and faster ones to show the difference in speed. My animations, specifically, don't actually show a true speed comparison because they include a lot of timeouts to highlight each element a different color depending on what is happening, but it gives a rough idea. Additionally, all the algorithms are sorted in increasing order. Also, all the complexities will be talked about in terms of worst case unless mentioned otherwise.

## Bubble Sort

This was the first algorithm that was implemented simply because of how simple it was to understand. This algorithm runs in O(n^2) time and uses O(1) space. Essentially, all it does it iterate through the array and comparing two elements. If the first element is larger than the second, it will swap then and continue. After each pass, the algorithm checks to see if a swap was made. If it was it will rerun another pass. If there was no swap made, the algorithm is done and everything is sorted. Also, the reason for the constant space complexity is because the only variable we keep track of is the index that we are checking. 

## Insertion Sort

This algorithm also runs in O(n^2) time and also has O(1) space complexity. This algorithm works similar to how bubble sort works in that it bubbles the smallest element to the beginning of the array, however it does this by iterating through the entire array and checking each successive index with every element before it. Basically, there is a sorted portion and an unsorted portion. The algorithm checks each element in the unsorted portion with each element in the sorted portion and keeps swapping elements untill every element is in the correct position. The constant space complexity is due to only keeping track of the index that is being sorted.

## Selection Sort

Selection sort is a bit different in that it doesn't use successive swaps (bubbling) to get the element to the corrent position like bubble and insertion sort. Selection sort also has O(n^2) time complexity and O(1) space complexity. Similar to insertion sort, it also utilizes a sorted and unsorted portion of the array. This algorithm works by iterating through the array keeping track of the smallest element it sees. By the end of each pass, it will swap that smallest element into the correct index of the sorted portion. As it works down the array, eventually the entire array will be sorted.

### Note:

Bubble and Insertion sort both have a best case time of O(n) for the case if the array is already sorted, but selection sort will still run in O(n^2) time. Also, on average, bubble, insertion, and selection sort all run in O(n^2) time. This is important when talking about quick sort.

## Merge Sort

Merge sort was the first algorithm to have a different time and space complexity compared the the algorithms before. This algorithm runs in O(nlogn) time and has a space complexity of O(n). The time complexity is because each element is essentially checked logn times and there are n elements to be checked. The reason for each element being checked logn times is because merge sort works by breaking the array down into smaller and smaller arrays recursively until it has the size of 1. It then merges these smaller arrays back into a sorted array. The number of subarrays the main array is broken into is how many times each element gets checked. The algorithm splits the array in half recursively which happens logn times. The algorithm breaks the array down logn times, which causes each element to be checked logn times, and since there are n elements, that creates a O(nlogn) time complexity. The space complexity is due to the fact that, during the merging process, new subarrays are created and the values are copied over from the main array. The largest array that is created is the two subarrays that both make up half of the main array. Together, they cause the O(n) space complexity.

## Quick Sort

Quick sort is similar to merge sort in that it also uses recursion. This algorithm is interesting in that it's worst case time complexity is O(n^2) and has a space complexity of O(logn). This seems weird as the algorithm is called quick sort yet runs in exponential time, however, on average, this algorithm runs in O(nlogn) like merge sort. The reason for this is due to how it works. Essentially, quick sort works by choosing a pivot element (in my case, it just chooses the center element) and partially sorts the array into two halves. One half containing elements smaller than that pivot and the other half containing elements bigger than the pivot. My algorithm does this by having a left and right pointer, and when each pointer reaches an element that should be on the other side, they swap. This is done recursively to both sides until the entire array is sorted. The reason for the terrible worse case time complexity is that, if the smallest or largest element is chosen as the pivot every single time, the algorithm will essentially run like selection sort. The logarithmic space complexity is due to the fact that this is a recursive algorithm. At each call, a new stack frame is created, and since this algorithm will be called logn times, it will have logn space complexity.

