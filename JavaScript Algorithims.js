// JavaScript Algorithims Singly Linked Lists

// This is the class for our Singly Linked Node
class SLNode {
    // The constructor is built to take 1 parameter, being the value of the node we want
    // to create
    constructor(val) {
        // This is the node's actual value
        this.value = val;
        // And this indicates what is next after the current node.
        this.next = null;
    }
}


// This is the class for our Singly Linked List
class SLList {
    constructor() {
        // This is the beginning of the singly linked list
        this.head = null;
    }

    // Write a method that will remove duplicate values from a sorted singly linked list.

    // EXAMPLE: 1 -> 1 -> 2 -> 3 -> 3 -> 4 -> 5 -> would return 1 -> 2 -> 3 -> 4 -> 5 ->
    removeDupesSorted() {
        // Edge case: Check if empty or if the list is only 1 element long.
        if(this.isEmpty() || this.head.next == null){
            return this;
        }
        // Edge case: If it's not sorted, quit
        let runner = this.head;
        while(runner.next != null) {
            if(runner.next.value < runner.value){
                console.log("This list is not sorted.")
                return this;
            }
            runner = runner.next;
        }
        // To remove a node, we'll need to keep track of previous nodes.
        runner = this.head.next;
        let walker = this.head;
        while(runner != null) {
            // If our walker and runner have the same value, 
            // reassign walker.next to runner.next, and move runner.
            // We don't move walker also, because there's a possibility that
            // there are more than 2 consecutive nodes with the same value.
            if(walker.value == runner.value){
                walker.next = runner.next;
                runner = runner.next;
            } 
            // Otherwise, we move both walker and runner down 1.
            else {
                walker = runner;
                runner = runner.next;
            }
        }

        return this;
    }

    // Write a method that will remove all negative numbers from a singly linked list.
    // Pretty self explanatory.
    removeNegatives() {
        // Edge cases: If the list is empty 
        if(this.isEmpty()){
            return this;
        }
        // Edge case: If the list is only 1 element and it's not negative
        else if(this.head.next == null && this.head.value > 0) {
            return this;
        }
        
        // Edge case: List starts with a negative value

        // We simply want to move the head down the line until it's not a negative node.
        while(!this.isEmpty() && this.head.value < 0){
            this.head = this.head.next;
        }
        // If, after removing all negative values from the front, the list is empty,
        // we're done
        if(this.isEmpty()){
            console.log("Looks like there were ONLY negative values.");
            return this;
        }

        // Otherwise, let's start a walker and runner.
        let walker = this.head;
        let runner = this.head.next;
        // Until we finish touching every element of the list
        while(runner != null) {
            // If the runner's value is negative
            if(runner.value < 0) {
                // Reassign walker.next to runner.next, and move runner.
                // Similar to the previous method, we do not want to move walker in
                // case there are consecutive negative values.
                walker.next = runner.next;
                runner = runner.next;
            }
            // Otherwise, move them both down the line.
            else {
                walker.next = runner;
                runner = runner.next;
            }
        }
        
        return this;
    }

    // Write a method that will return a boolean based on whether
    // or not the singly linked list has a loop.
    
    // HINT: Captain America, The Winter Soldier
    // "On your left!"
    hasLoop() {
        // First, check to see if the list is empty, or only 1 element.
        if(this.isEmpty() || this.head.next == null){
            return false;
        }
        // Set our walker to the head node, and runner to the 2nd node
        let walker = this.head;
        let runner = walker.next;

        // We're going to move walker by 1 node, and runner by 2 node forever (???)
        while(runner != null && runner.next != null) {
            // Check to see if walker and runner have met
            if(walker == runner) {
                // If so, we have a loop!
                return true;
            }
            // Move walker by 1 node
            walker = walker.next;
            // Move runner by 2 nodes
            runner = runner.next.next;
        }
        // If we broke out of the while loop, we don't have 
        return false;
    }

    // Write a method that will reverse the singly linked list.
    // Note that this will entail reversing the pointers of each node to its
    // previous node, and setting what WAS the last node to be the new head.

    // I STRONGLY encourage attempting to use recursion for this method. If you 
    // choose not to, this task will require three pointers.
    reverse(){
        if(this.isEmpty()){
            console.log("Nothing to reverse");
            return this;
        }
        let walker = null;
        let runner = this.head;
        let next = runner.next;
        while(runner != null) {
            runner.next = walker;
            walker = runner;
            runner = next;
            if(runner != null)
                next = runner.next;
        }
        this.head = walker;
        return this;
    }


    // Recursive solution!
    rReverse(runner = this.head, prev = null){
        if(runner == null){
            this.head = prev;
            return;
        }
        this.rReverse(runner.next, runner);
        runner.next = prev;
        return;
    }

    // Write a method that will return the second to last node in the singly linked list.

    //EXAMPLE: myList = 7 -> 5 -> 3 -> 10 -> 1 -> 
    // calling myList.secondToLast() would return the 10 -> node
    secondToLast(){
        // First 2 things we want to do is check to see if the list
        // is empty or if it only has one element.

        // Empty check:
        if(this.isEmpty()) {
            console.log("List is empty.");
            return false;
        }
        // One element check:
        else if(this.head.next == null) {
            console.log("There is only one node in this list.");
            return false;
        }
        else {
            // Set a walker and a runner
            let walker = this.head;
            let runner = walker.next;
            // We want to move both down the line until the runner is at the last
            // node. If the runner is at the last node, the walker will be at the second
            // to last node!
            while(runner.next != null) {
                walker = runner;
                runner = runner.next;
            }
            
            return walker;
        }
    }


    // Write a method that takes a singly linked list as a parameter, and concatenates
    // it to the current list.

    // EXAMPLE: If myList = 7 -> 5 -> 3 -> and otherList is 10 -> 1 -> 8 ->
    // and you call myList.concat(otherList) the outcome would be that myList is
    // now 7 -> 5 -> 3 -> 10 -> 1 -> 8 ->
    concat(list){
        // We should first check to see if this list is empty.
        // If it is, we just set the head to the second list's head.
        if(this.isEmpty()) {
            this.head = list.head;
            // And let's clear the second list just cuz.
            list.head = null;
            return this;
        }
        // Let's start a runner
        let runner = this.head;
        // And move the runner to the end of the list
        while(runner.next != null){
            runner = runner.next;
        }
        // Once the runner is at the end of the list, set its .next
        // to the head of the second list.
        runner.next = list.head;
        // And now let's clear list 2.
        list.head = null;
        // And return our newly increased list!
        return this;

    }


    // Write a method that splits a singly linked list in 2 on a given value.

    // EXAMPLE: if myList = 10 -> 7 -> 5 -> 3 -> 1 -> and you call
    // myList.splitOnVal(5) myList will be 10 -> 7 -> and the method would return a new 
    // SLL of 5 -> 3 -> 1 -> 
    splitOnVal(value){
        // As usual, let's check to see if the list is empty.
        if(this.isEmpty()) {
            console.log("There's no list to split.");
            return false;
        }
        // Now we need to check if the head's value is the one we're trying to split from
        else if(this.head.value == value) {
            // If it is, then basically we clear the current list and return a new list
            // that contains everything that was in the current list.

            // Create the new list
            let newList = new SLList();
            // Set the new list's head to the current head (since it's the value we're looking for)
            newList.head = this.head;
            // Now, clear the current list
            this.head = null;
            // And return the new list.
            return newList;
        }
        else {

            // Let's start a runner
            let runner = this.head;
            // We want to keep moving the runner down the line 
            while(runner.next != null) {
                // Let's check to see if the next node's value is the one we're trying to
                // split at. If it is, we'll create our new list and call it a day!
                if(runner.next.value == value){
                    // Create the new list
                    let newList = new SLList();
                    // Set its head to the next node;
                    newList.head = runner.next;
                    // Set runner's .next to null to end the current list
                    runner.next = null;
                    // and return the new list!
                    return newList;
                }
                // Otherwise, move runner down the line.
                runner = runner.next;
            }
            // If we've gotten this far, the value isn't in the list.
            console.log("Could not find a node with that value.")
            return false;
        }
    }


    // Write a method that takes a value, and will remove the first instance of a 
    // node with that value in the singly linked list.

    // EXAMPLE: with a list of 10 -> 7 -> 3 -> 7 -> 6 -> 
    // If you call myList.removeNode(7) the list will become
    // 10 -> 3 -> 7 -> 6 ->

    // NOTE: Removing a node is as simple as redirecting the previous node's
    // .next to the removed node's .next
    removeNode(value){
        if(this.isEmpty()) {
            console.log("The list is empty.");
        }
        else if(this.head.value == value) {
            this.head = this.head.next;
        }
        else {
            let walker = this.head;
            let runner = this.head.next;
            while(runner != null) {
                if(runner.value == value) {
                    walker.next = runner.next;
                    return this;
                }
                walker = runner;
                runner = runner.next;
            }
            console.log("There was no node with that value.");
        }
        return this;

    }


    // Write a method that will return a boolean based on whether or not
    // the Singly Linked List contains a node with a given value.

    // EXAMPLE: If the singly linked list is 7 -> 5 -> 9 -> 2 ->
    // and I call myList.contains(9) it should return true.
    // If on the same list I call myList.contains(11) it should return false.
    contains(value) {
        // Check if the list is empty. Because an empty list would obviously not contain anything!
        if(this.isEmpty()) {
            return false;
        }
        // Let's start our runner at the head of the list
        let runner = this.head;

        // And move the runner down the list
        while(runner != null) {
            // At each node, check to see if the value matches the one being searched for
            if(runner.value == value) {
                // If they match, return true!
                return true;
            }
            // If you haven't found a match, move it on down.
            runner = runner.next;
        }
        // If we reached the end of the list and found no matches, the list must not
        // contain the value, so return false!
        return false;
    }


    // Write a method that will remove the last node in a SLL and return it.

    // EXAMPLE: If the singly linked list is 11 -> 2 -> 7 -> 6 -> 
    // and I call myList.removeFromBack() the list should now be
    // 11 -> 2 -> 7 -> 
    removeFromback() {
        // If the list is empty, there's nothing to remove!
        if(this.isEmpty()) {
            console.log("The list is already empty!")
            return this;
        }
        // Otherwise, let's check to see if the list has only 1 element!
        else if(this.head.next == null) {
            // If the list only has 1 element, let's hold onto the node
            let temp = this.head;
            // Set the head of the list to null (emptying the list)
            this.head = null;
            // and return what was previously the only node in the list
            return temp;
        }
        else {
            // If we made it here, the list must have multiple nodes

            // So let's set a runner and a walker, so we can keep track of the previous node.
            let runner = this.head.next;
            let walker = this.head;
            // We want to progress both walker and runner down the list until the runner is the LAST node
            while(runner.next != null) {
                // Setting walker to runner before moving runner to runner's next
                // makes it so once runner is the LAST node, walker will be the SECOND TO LAST node
                walker = runner;
                runner = runner.next;
            }
            // Now that walker is the SECOND TO LAST node, setting its .next to null will remove the LAST node
            // from the SLL
            walker.next = null;

            // and return the node we just chopped off!
            return runner;
        }

    }


    // Write a method that will create a new node, add it to the front of
    // the singly linked list, and reassign the head to the new node.
    addToFront(value) {
        // This one is pretty simple! The case for an empty list vs
        // a non-empty list is exactly the same!
        
        // Create the new node
        let newNode = new SLNode(value);
        // Then set the new node's .next to the current head.
        // IF THE LIST IS EMPTY! newNode.next will be null. Which is what it should be
        // anyway if there's nothing after it.
        // IF THE LIST IS NOT EMPTY! newNode.next will be the current head of the list,
        // which is exactly what we want!
        newNode.next = this.head;

        // Now, we just set the head of the list to be our new node and call it a day!
        this.head = newNode;
        return this;


    }



    // Write a method that will remove the head node from a singly linked list, 
    // and then reassign the head to the next node. Return the node that was removed
    removeFromFront() {
        // We should first check to see if the list is empty, because if it is,
        // there's nothing to remove!
        if(this.isEmpty()) {
            console.log("There's nothing to remove!");
            return false;
        }

        // Otherwise, let's hold on to the first node
        let removed = this.head;

        // now, we need to move the head to the second node
        this.head = removed.next;

        // And just for funsies, let's clear the previous head's .next so it's a truly standalone node
        removed.next = null;

        // Finally, let's return the removed node!
        return removed;

        // NOTE THAT WE DID NOT CHECK TO SEE IF THE NODE IS THE ONLY NODE IN THE LIST!
        // Similar to the previous algorithm (addToFront), if the original head's .next is null,
        // and you remove from the front, this.head is moved to null, which is fine! Because removing
        // from the front of an SLL with only one node is the same as emptying it!!
    }




    // Write a method that will return a boolean depending on whether or not the singly
    // linked list is empty or not.
    isEmpty() {
        // An empty list in its most simplified form is a list
        // with a head that is null.

        // So what this does, it it grabs the boolean for head == null, and returns that.
        return this.head == null;

        // Alternative:
        if (this.head==null) {
            return true;
        }
        return false;
    }

    // Write a method that is given a value, and adds a new node to the end of a SLL
    // where that new node has that value.
    addToBack(value) {
        // First we need to check if the list is empty
        if(this.isEmpty()){
            // If it is, just set the head to a new node,
            // because adding to the back of an empty list
            // is the same as just setting the head to a node
            this.head = new SLNode(value);
            return this;
        }
        // OTHERWISE
        else {
            // Let's designate a runner to start at the head node
            let runner = this.head;
            // And move it down the list until it reaches the last node
            while(runner.next != null) {
                runner = runner.next;
            }

            // Once the runner is at the end of the list, we set its .next
            // to be a new node
            runner.next = new SLNode(value);
            return this;
        }
    }


    // Write a method that prints the contents of a Singly Linked List.
    printList() {
        // First, let's check if the list is empty
        if(this.isEmpty()) {
            console.log("The list is empty!")
            return;
        }
        // Let's start a runner at the beginning of the singly linked list itself
        var runner = this.head;
        // This string will be added to as we traverse along the SLL
        var string = "";


        // Now we need a way to traverse through the SLL

        // If the runner is not null, we're still looking at a node, so we have things to do!
        while(runner != null) {
            // We want to add the node's value to our string, and a fancy little arrow for looks
            string += runner.value + " -> ";
            // Then, we want to progress the runner to the NEXT node in the SLL
            runner = runner.next;
        }
        
        // Once we've finished moving through the entire list, we want to print the string
        console.log(string);
        return this;
    }
}

// This is the class for a Stack where everything is built using methods
// from the SLL class we've been working with
class Stack {
    constructor() {
        this.data = new SLList();
    }

    // Write a method to push a value into our stack using the methods we've built
    // in our singly linked list class
    push(value) {
        this.data.addToFront(value);
        return this;
    }

    // Write a method that will pop a value out of our stack using the methods
    // we've built in our singly linked list class
    pop() {
        return this.data.removeFromFront();
    }

    // Write a method that will return the value of the node on the top of the stack
    peek() {
        if(this.data.isEmpty()) {
            console.log("This stack is empty");
            return null;
        }
        return this.data.head;
    }

    // Write a method that will return a boolean based on whether or not the stack
    // is empty using the methods from our singly linked list class
    isEmpty() {
        return this.data.isEmpty();
    }

    // Write a method that will return how many elements are in our stack.
    size() {
        let runner = this.data.head;
        let count = 0;
        while(runner != null) {
            runner = runner.next;
            count++;
        }
        return count;
    }
}


// This is the class for a Queue where everything is built using methods 
// from the SLL class we've been working with
class Queue {
    constructor(){
        this.data = new SLList();
    }

    // Write a method that adds to the queue using the methods built already
    // in the SLList class
    enqueue(value) {
        return this.data.addToBack(value);
    }


    // Write a method that removes from the queue using the methods built already 
    // in the SLList class
    dequeue() {
        return this.data.removeFromFront();
    }

    // Write a method that returns the node at the front of the queue using 
    // what we know about Singly Linked Lists
    front() {
        if(this.isEmpty()){
            console.log("Queue is empty");
            return null;
        }
        return this.head;
    }

    // This one should be self explanatory
    isEmpty() {
        return this.data.isEmpty();
    }

    // Write a method that returns the number of items in our queue
    size() {
        let count = 0;
        let runner = this.data.head;
        while(runner != null) {
            runner = runner.next;
            count++;
        }
        return count;
    }
}


// This is the class for a Queue from two stacks.
class QueueStack {
    constructor(){
        // Basically, stack 1 is going to be where all the data actually resides
        this.stack1 = new Stack();
        // Stack 2 is just going to be used when we need it to shift things around.
        this.stack2 = new Stack();
    }

    // Using the methods we built into the stack class, write a method that
    // adds a new node to the queue with the passed in value
    enqueue(value){
        // Basically, the goal here is to, one node at a time,
        // emtpy stack 1 into stack 2.
        while(!this.stack1.isEmpty())
            this.stack2.push(this.stack1.pop().value)

        // Then, push the new value into stack 1, putting it at the bottom
        // (i.e. adding it to the back of the queue)
        this.stack1.push(value);
        
        // Then empty stack 2 back into stack 1 node by node
        while(!this.stack2.isEmpty())
            this.stack1.push(this.stack2.pop().value);
            
        // Finally, return our frankenstack
        return this;
    }

    // Using the methods we built into the stack class, write a method that
    // will remove a node from the queue
    dequeue(){
        // Dequeue is super simple. Removing from a queue is functionally the same
        // as removing from a stack.
        return this.stack1.pop();
    }
}


let myList = new SLList();

myList.addToBack(-1).addToBack(1).addToBack(1).addToBack(2).addToBack(4).addToBack(4).addToBack(7).addToBack(7);

myList.printList();
myList.removeDupesSorted().printList();

myList.removeNegatives().printList();


let nonolist = new SLList();
nonolist.addToBack(-1).addToBack(-3).addToBack(-8);
nonolist.printList();
nonolist.removeNegatives();










// JavaScript Algorithims Doubly Linked Lists

// myList.printList();

class DLNode {
    constructor(value){
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DLList {
    constructor(){
        this.head = null;
    }

    // Write a method that will return whether or not the 
    // doubly linked list is empty.
    isEmpty(){
        return this.head === null;
    }

    // Write a method that will add a new node to the end of our
    // doubly linked list.
    append(value) {
        if(this.isEmpty()){
            this.head = new DLNode(value);
            return this;
        }
        let runner = this.head;
        while(runner.next != null){
            runner = runner.next;
        }
        let newNode = new DLNode(value);
        runner.next = newNode;
        newNode.prev = runner;
        return this;
    }

    // Write a method that will add a new node to the beginning of
    // our doubly linked list.
    prepend(value) {
        let newNode = new DLNode(value);
        newNode.next = this.head;
        if(this.head != null){
            this.head.prev = newNode;
        }
        this.head = newNode;
        return this;
    }

    // Write a method that will add a new node at a given "index" of our
    // doubly linked list

    // NOTE! Test for if the index given is out of range!
    push(value, index){
        if(index < 0) {
            console.log("C'mon, that's not an index.");
            return this;
        }
        if(this.isEmpty()) {
            if(index > 0){
                console.log("No can do grizzly bear.");
                return this;
            }
            else {
                this.head = new DLNode(value);
                return this;
            }
        }
        if(index == 0){
            this.prepend(value);
            return this;
        }
        
        let runner = this.head;
        let newNode = new DLNode(value);
        for(var i = 1; i < index; i++){
            if(runner == null){
                console.log("No");
                return this;
            }
            runner = runner.next;
        }
        newNode.next = runner.next;
        newNode.prev = runner;
        runner.next = newNode;
        newNode.next.prev = newNode;
        return this;
    }

    printList(){
        if(this.isEmpty()){
            console.log("List is empty.")
            return this;
        }
        let toPrint = "<- ";
        let runner = this.head;
        while(runner.next != null) {
            toPrint += `${runner.value} <-> `;
            runner = runner.next;
        }
        toPrint += `${runner.value} ->`;
        console.log(toPrint);
        return this;
    }
}


class BSNode {
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BSTree {
    constructor(){
        this.root = null;
    }

    // Write a method that will return a boolean based on whether
    // or not the tree contains a node with the given value

    // Try this both with and without recursion if you can.
    contains(value) {

    }

    // I don't think I need to say anything for this one lol
    isEmpty(){
        return this.root == null;
    }

    // Write a method that will insert a new node into the BST
    insert(value, runner = this.root){
        if(runner == null){
            this.root = new BSNode(value);
            return this;
        }

        if(value >= runner.value) {
            if(runner.right == null){
                runner.right = new BSNode(value);
                return this;
            }
            return this.insert(value, runner.right);
        }
        else {
            if(runner.left == null) {
                runner.left = new BSNode(value);
                return this;
            }
            return this.insert(value, runner.left);
        }
    }

    // Write a method that will return the largest element in the BST
    max(){
        if(this.isEmpty()){
            console.log("Tree is empty!");
            return null;
        }
        let runner = this.root;
        while(runner.right != null){
            runner = runner.right;
        }
        return runner.value;
    }

    // Write a method that will return the smallest element in the BST
    min(){
        if(this.isEmpty()){
            console.log("Tree is empty!");
            return null;
        }

        let runner = this.root;
        while(runner.left != null){
            runner = runner.left;
        }
        return runner.value;
    }

    printTree(){
        if(this.root == null) {
            console.log("This tree is empty.");
            return this;
        }

        this.printHelper();
    }

    printHelper(toPrint = "", runner = this.root) {
        if(runner == null) {
            return this;
        }

        toPrint += "\t";
        this.printHelper(toPrint, runner.right);
        console.log(`${toPrint}${runner.value}`);
        this.printHelper(toPrint, runner.left);
    }
}









/* THE GOOGLE ROBOT INTERVIEW QUESTION!!

Scientists have opened a portal to another dimension.
In that dimension, the plane of existence is just an infinite line.
Scientists want to send two robots through to do something. Idk what.
But when they are sent through this portal, they don't enter that plane of existence
in the same place. In fact, they land in entirely different places. 
Because this is a weird place, the robots actually land on top of the parachutes they 
used to float down (??? I know) 
For some reason, these scientists forgot to put any significant amount of money towards
the software development side of this experiment.
So here's the deal. Two robots, land on top of their parachutes, and have exactly the same code on them.
The code can comprise of a combination of our basic tool kit (setting variables, for loops, while
loops, if/else if/else checks, etc.), and a handful of predefined methods, which are as follows:
moveLeft(){} -> Moves the robot to the left one unit of distance in one unit of time.
moveRight(){} -> Moves the robot to the right one unit of distance in one unit of time.
wait(){} -> The robot stays in place for one unit of time.
parachuteCheck(){} -> Returns a boolean for whether or not the robot is currently on top of a parachute. Takes 
.                     one unit of time.
robotCheck(){} -> Returns a boolean for whether or not the robot has found another robot. Takes one unit 
.                 of time.
A piece of clarification!!
When I say the same code is on both robots, what I mean is that the program runs on both robots.
So if the program is just
moveLeft();
Both robots will move left.
SO!!! The goal is to write a program that GUARANTEES (this assumes the robots have an infinite power source)
that they will find each other.
*/
function moveLeft(){
    //Move left 1 unit of distance in 1 unit of time.
}

function moveRight(){
    //Move right 1 unit of distance in 1 unit of time.
}

function wait(){
    //Stay in place for 1 unit of time.
}

function parachuteCheck(){
    //Check if on a parachute and return boolean based on results
    return true;
}

function robotCheck(){
    //Check if you've met the other robot and return boolean based on results.
}

function robotOscillate(){
    moveLeft();
    let steps = 2;
    let stop = false;
    let chutes = 0;
    while(true){
        chutes = 0;
        for(let i = 0; i < steps; i++){
            moveRight();
            if(robotCheck())
                return true;
            if(parachuteCheck())
                chutes++;
            if(chutes > 1){
                stop=true;
                break;
            }
        }
        if(stop)
            break;
        setps++;
        chutes = 0;
        for(let i = 0; i < steps; i++){
            moveLeft();
            if(robotCheck())
                return true;
            if(parachuteCheck())
                chutes++;
            if(chutes > 1){
                stop = true;
                break;
            }
        }
    }
    while(!robotCheck())
        wait();
    return true;
}

function robotCatchup(){
    moveLeft();
    while(!parachuteCheck()){
        moveLeft();             // -> This whole chunk of code takes 3 units of time and moves a robot to the left 1 unit of distance
        wait();
    }

    //If we've gotten out here, the robot has found another parachute!
    // So we want to move left twice as fast!
    while(!robotCheck()){
        moveLeft();             // -> This whole chunk of code takes 3 units of time and moves a robot to the left 2 units of distance
        moveLeft();
    }

    return "Sweet, sweet, victory";
}