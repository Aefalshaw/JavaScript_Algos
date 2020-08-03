
// Write a function that takes a string,
// and returns whether or not you can make a palindrome with that string.

// "cat coat" would return true because it can be rearranged to taco cat
// "go hang a lasagna im a salami hog" would return true because it can be rearranged to "go hang a salami im a lasagna hog"

// "taco tony" would return false, because you canot make that a palindrome no matter what

function canBecomePalindrome(string){
    let count = {};
    let odds = 0;
    let len = 0;

    for(let i = 0; i < string.length; i++){
        if(string[i] != " "){
            if(!count[string[i]]){
                count[string[i]] = 1;
            } else if(count[string[i]]) {
                count[string[i]]++;
            }
            len++;
        }
    }

    for(let kv in count){
        if(count[kv]%2 != 0){
            odds++;
        }

        // if(odds > 0 && len%2 == 0){
        //     return false;
        // }
        // else if(odds > 1 && len%2 == 1){
        //     return false;
        // }
    }

    if(odds > 1){
        return false;
    }

    return true;
}


console.log(canBecomePalindrome("the miami marlins are already screwing things up and had to cancel a game because there is a covid outbreak")); // abcdeedcba




// Write a function that takes a number, and prints the different ways
// you can represent the number as a sum of 2 or more consecutive numbers.

// Example: 
// 15 can be represented as:
// 1+2+3+4+5
// 4+5+6
// 7+8
function conSum(num){
    for(let i = 1; i < num/2; i++) {
        let pStr = i;
        let sum = i;
        let j = i+1;
        while(sum < num){
            sum += j;
            pStr += ` + ${j}`;
            j++;
        }
        if(sum == num) {
            console.log(pStr);
        }        
    }
}


conSum(9);

// function conSumAly(num){
//     let start = 1;
//     let end = 1;
//     let sum = 1;

//     while(start <= num/2){
//         if(sum < num) {
//             end++;
//             sum += end;
//         }
//         else if(sum > num) {
//             start++; 
//             sum = start;
//             end = start;
//         }
//         else{
//             let string = `${start} `;
//             for(let i = start+1; i <= end; i++) {
//                 string += `+ ${i} `
//             }
//             console.log(string);
//             start++;
//             end = start;
//             sum = start;
//         }
//         // console.log(`Sum: ${sum}\nStart: ${start}\nEnd: ${end}`)
//     }
// }

// conSumAly(15);





// Write a function that takes 2 sorted arrays and finds the intersection of those arrays.
// The intersection is just a fancy term for the elements that are in both arrays.

// EXAMPLE:
// arr1 = [1,3,4,6]
// arr2 = [3,5,6,7]
// return = [3,6]

function intersection(arr1, arr2) {
    let dict= {};
    let toReturn = [];
    for(let i = 0; i < arr1.length; i++) {
        dict[arr1[i]] = true;
    }

    for(let i = 0; i < arr2.length; i++) {
        if(dict[arr2[i]] == true){
            toReturn.push(arr2[i]);
            dict[arr2[i]] = false;
        }
    }

    return toReturn;
}

// Write a function that finds the union of 2 arrays.
// The union of 2 arrays is ALL elements that exist in the arrays, 
// with no duplicates. Think the total set of data in a venn diagram.

// EXAMPLE: 
// The union of:
// [1,3,3,4,7,9]
// [3,5,8,8,9,11]
// would be: [1,3,4,5,7,8,9,11]

function union(arr1, arr2) {
    let dict = {};
    let union = [];
    for(let i = 0; i < arr1.length; i++) {
        if(!dict[arr1[i]]){
            dict[arr1[i]] = true;
            union.push(arr1[i]);
        }
    }

    for(let i = 0; i < arr2.length; i++) {
        if(!dict[arr2[i]]){
            dict[arr2[i]] = true;
            union.push(arr2[i]);
        }
    }

    return union;
}


// Write a function that calculates the difference of
// diagonals of a 2D array.

// EXAMPLE:
// let arr = [[8,2,6],
//            [4,1,3],
//            [5,9,7]]

// Diagonal 1 sum: 8 + 1 + 7 = 16
// Diagonal 2 sum: 6 + 1 + 5 = 12

// Difference => |16-12| = 4
function diagDiff(arr){
    let sum1 = 0;
    let sum2 = 0;
    for(let i = 0; i < arr.length; i++){
        sum1 += arr[i][i];
    }

    for(let i = arr.length-1; i >= 0; i--){
        sum2 += arr[arr.length-1-i][i];
    }

    return Math.abs(sum1-sum2);
}


// Write a function that finds the symmetric difference between
// two arrays. This means, looking back on our venn diagram explanation,
// the section of the venn diagrams EXCEPT FOR the intersection.

// EXAMPLE:
// [1,3,5,9]
// [1,2,5,8]

// difference -> [2,3,8,9]
function symDiff(arr1, arr2){
    let dict = {};
    let diff = [];
    for(let i = 0; i < arr1.length; i++) {
        if(!dict[arr1[i]]){
            dict[arr1[i]] = "arr1";
        }
    }

    for(let i = 0; i < arr2.length; i++) {
        if(!dict[arr2[i]]){
            dict[arr2[i]] = "arr2";
        }
        else if(dict[arr2[i]] != "arr2") {
            dict[arr2[i]] += "arr2";
        }
    }

    for(let key in dict){
        if(dict[key] == "arr1" || dict[key] == "arr2") {
            diff.push(parseInt(key));
        }
    }
    return diff;
}


// console.log(symDiff([1,3,3], [1,2,2]))



// This one is for when arr1 and arr2 are guaranteed to
// be sorted.
function sortSymDiff(arr1, arr2){
    let i = 0; 
    let j = 0;
    let diff = [];
    while(i < arr1.length && j < arr2.length){
        if(arr1[i] < arr2[j]){
            diff.push(arr1[i]);
            i++;
        }
        else if(arr2[j] < arr1[i]){
            diff.push(arr2[j]);
            j++;
        }
        else {
            i++;
            j++;
        }
    }


    if(i < arr1.length){
        for(i; i < arr1.length; i++) {
            diff.push(arr1[i]);
        }
    }
    else {
        for(j; j < arr2.length; j++) {
            diff.push(arr2[j]);
        }
    }

    return diff;
}

console.log(sortSymDiff([1,2,3,4,5,6,7,8,9,10], [1,3,6]));


/* Dictionaries are cool 
let dict = {};
let arr = [1,3,3,5,6,7,7,9];
for(let i = 0; i < arr.length; i++) {
    if(!dict[arr[i]]){
        dict[arr[i]] = 1;
    }
    else if(dict[arr[i]]){
        dict[arr[i]]++;
    }
}
console.log(dict);
*/





// Given an array of unsorted integers and a number, k, find the k most frequent elements in the array.

// EXAMPLE: kMostFreq([4,2,9,8,2,9,2,1,5], 2) would return [2,9] since 2 is
// found 3 times, 9 two times, and all other elements just once.
function kMostFreq(arr, k){
    let dict = {};
    for(let i = 0; i < arr.length; i++){
        if(!dict[arr[i]]){
            dict[arr[i]] = 1;
        } else {
            dict[arr[i]]++;
        }
    }

    let newArr = [];
    for(let key in dict){
        newArr.push([[key], dict[key]]);
    }

    newArr.sort((a,b) => a[1] > b[1]);

    let toReturn = [];
    for(let i = 0; i < k; i++){
        toReturn.push(parseInt(newArr[i][0]));
    }

    return toReturn;
}

console.log(kMostFreq([1,4,3,2,3,5,1,1,2], 2));



// Write a function that, given an object, creates a string that
// represents a query to create a new row in a SQL database.

// Don't worry about the specifics of connecting to a database or anything.

// Example: objToSql(object, "cool_people"), where object is:
// {
//      name: "Cody",
//      email: "sthaller@codingdojo.com",
//      password: "ih8mondays"
// }
// Would return a string:
// `INSERT INTO cool_people (name, email, password) VALUES ("Cody", "sthaller@codingdojo.com", "ih8mondays");`
function objToSql(object, table){
    let keys = Object.keys(object);

    let query = `INSERT INTO ${table} (`;
    for(let i = 0; i < keys.length; i++){
        if(i < keys.length-1){
            query += `${keys[i]}, `;
        } else {
            query+= `${keys[i]}) VALUES (`;
        }
    }

    // let query = `INSERT INTO ${table} (${keys}) VALUES(`

    for(let i = 0; i < keys.length; i++){
        if(i < keys.length-1){
            if(typeof(object[keys[i]]) == "string" || typeof(object[keys[i]]) == "datetime"){
                query+= `"${object[keys[i]]}", `;
            }
            else {
                query += `${object[keys[i]]}, `;
            }
        } else {
            if(typeof(object[keys[i]]) == "string" || typeof(object[keys[i]]) == "datetime"){
                query += `"${object[keys[i]]}");`;
            }
            else {
                query += `${object[keys[i]]});`
            }
        }
    }

    return query;
}


console.log(objToSql({name: "Cody", email: "sthaller@codingdojo.com", password: "ih8mondays", age: 29}, "cool_peepz"));




// Write a function to perform bubble sort.

// The basic idea for bubble sort is that you want to iterate through
// the entire array, looking at 2 elements, and swapping them if the left
// one is greater than the right one. Basically, we're having each element
// "bubble up" until the array is sorted.


// [2, 5, 9, 10, 16, 18, 22]

function bubbleSort(arr) {
    // let sorted = false;
    // while(!sorted){
    //     sorted = true;
    //     for(let i = 1; i < arr.length; i++) {
    //         if(arr[i-1] > arr[i]){
    //             let temp = arr[i-1];
    //             arr[i-1] = arr[i];
    //             arr[i] = temp;
    //             sorted = false;
    //         }
    //     }
    // }
    let sorted;
    do {
        sorted = true;
        for(let i = 1; i < arr.length; i++) {
            if(arr[i-1] > arr[i]){
                let temp = arr[i-1];
                arr[i-1] = arr[i];
                arr[i] = temp;
                sorted = false;
            }
        }
    }
    while(!sorted)


    return arr;
}


// Write a function to perform selection sort:
// arr[] = [ 64, 25, 12, 22, 11 ]

// Find the minimum element in arr[0...4]
// and place it at beginning
// 11 25 12 22 64

// Find the minimum element in arr[1...4]
// and place it at beginning of arr[1...4]
// 11 12 25 22 64

// Find the minimum element in arr[2...4]
// and place it at beginning of arr[2...4]
// 11 12 22 25 64

// Find the minimum element in arr[3...4]
// and place it at beginning of arr[3...4]
// 11 12 22 25 64 

function selectionSort(arr) {
    for(let i = 0; i < arr.length; i++) {
        let min = i;
        for(let j = i+1; j < arr.length; j++) {
            if(arr[j] < arr[min]){
                min = j;
            }
        }
        let temp = arr[min];
        arr[min] = arr[i];
        arr[i] = temp;
    }
    return arr;
}


// Write a function that performs an insertion sort.
// The way insertion sort works is you loop through each index i 
// and at each i, we should have arr[0] through arr[i-1] be sorted.
// Then at i, we "insert" that element wherever it belongs in [0, ..., i-1].

function insertionSort(arr) {
    // First we want to loop through the entire array
    for(let i = 1; i < arr.length; i++) {
        // Starting at i, we want to swap the element to the left until it's in place.
        let index = i;
        // Until the element is in place or at the beginning of the array:
        while(index > 0 && arr[index] < arr[index-1]) {
            // Swap the element with the one to its left
            let temp = arr[index];
            arr[index] = arr[index-1];
            arr[index-1] = temp;
            // And decrement index so we can do it again!
            index--;
        }
    }
    return arr;
}

// Write a function that will merge 2 sorted arrays
function mergeArrays(arr1, arr2) {
    // We basically need 2 iterators: one for arr1 and one for arr2
    let i = 0; 
    let j = 0;
    // And a new empty array for us to squish everything into.
    let newArr = [];

    // This first while loop will run until either i or j reach the end of their
    // respective arrays
    while(i < arr1.length && j < arr2.length) {
        // If the element in array 1 at index i is less than the element
        // in array 2 at index j, push it into the new array and increment i
        if(arr1[i] < arr2[j]) {
            newArr.push(arr1[i]);
            i++;
        }
        // Otherwise, push the element in array 2 at index j into the new array
        // and increment j
        else {
            newArr.push(arr2[j]);
            j++;
        }
    }

    // Now it's possible that we finished iterating through 1 array,
    // and haven't looked at any of the elements in the other,
    // so these while loops will make sure the rest of the elements get put in there.
    while(i < arr1.length) {
        newArr.push(arr1[i]);
        i++;
    }
    while(j < arr2.length) {
        newArr.push(arr2[j]);
        j++;
    }
    // And finally, return the new array!
    return newArr;
}

// Write a function that will perform merge sort.
function mergeSort(arr) {
    // If the array has a length of 1, it's obviously already sorted.
    if(arr.length == 1)
        return arr;
    
    // otherwise, let's go ahead and split the array in 2: left and right
    let left = arr.slice(0, Math.floor(arr.length/2));
    let right = arr.slice(Math.floor(arr.length/2), arr.length);

    // Now, we want to make our recursive calls for both the left side. This
    // is the divide part, constantly splitting the array in half until it's 1 element long
    left = mergeSort(left);
    right = mergeSort(right);
    
    // Now for the conquer. We'll use that merge function we wrote, and merge what is
    // returned as the left and right side of our recursive calls.
    return mergeArrays(left, right);
}



// Write an algorithm for the partition portion of Quick Sort

// It should take an array, and potentially a left index, and a right index. But left and right will
// have default values of 0 and the last index of the array. In return, it should
// rearrange so that the elements greater than (or equal to) the element at your initial pivot index
// (for simplicity's sake let's just choose the rightmost element) are to its right,
// and those less than that element are to its left.

// It should return the pivot element's new index
function partition(arr, left=0, right=arr.length-1) {
    if(left >= right) {
        return left;
    }
    // This partition method functions with the rightmost element being
    // our pivot element.

    // Let's keep track of our new pivot index
    let nP = left;
    

    // BIG PICTURE FOR THIS FOR LOOP: We want to shift things around
    // so that when we move our pivot element into its place, everything to the left
    // is less than it, and everything to the right is greater than it.
    
    // Now, we want to loop from the left-most element
    // to the element before our pivot element
    for(let i = left; i < right; i++) {
        // If the element we're looking at is less than our pivot
        if(arr[i] < arr[right]){
            // We want to swap the current element with the element at our
            // new Pivot index
            let temp = arr[i];
            arr[i] = arr[nP];
            arr[nP] = temp;
            // and increment the new pivot index by 1.
            nP++;
        }
    }


    // Finally, to actually move our pivot element into the place it belongs, we'll swap our pivot element
    // with the element at our new pivot index.
    let temp = arr[nP];
    arr[nP] = arr[right];
    arr[right] = temp;

    // And return the new pivot index.
    return nP;
}


// Write an algorithm that performs quick sort. It will take an array, and potentially a left
// index and right index. The left and right will have a default of 0 and the last index of the
// array.

// HINT: This will consist of a break case, 2 recursive calls, and a call
// to the partition function (not necessarily in that order!!!!);
function quickSort(arr, left=0, right=arr.length-1){
    if(left >= right)
        return arr;
        
    let i = partition(arr, left, right);
    // Run quicksort for the portion of the array to the left of our partition index
    quickSort(arr, left, i-1);
    // Run quicksort for the portion of the array to the right of our partition index
    return quickSort(arr, i+1, right);
}


let arr = [10,2,28,23,12,8,35];

console.log(quickSort(arr));




// CHALLENGE ALGO TIME!!!!!

// There are n number of stairs. A person at the bottom of the stairs wants to 
// reach the top, and can climb either 1, 2, or 3 stairs at a time. 

// Write an algorithm that will find the number of ways the person can reach the top.

// HINT: RECURSION
function stairs(num){
    if(num < 0) {
        return 0;
    }
    if(num == 0) {
        return 1;
    }
    if(num == 1 || num == 2){
        return num;
    }

    return stairs(num - 1) + stairs(num - 2) + stairs(num - 3);
}

// Super fancy memoization solution
function climbStairs(n, count=0, memo=[]) {
    if(count > n) {
        return 0;
    }
    if(count === n){
        return 1;
    }
    if(memo[count] > 0) {
        return memo[count];
    }

    memo[count] = climbStairs(n, count+1, memo) + climbStairs(n, count+2, memo) + climbStairs(n, count+3, memo);
    return memo[count];
}