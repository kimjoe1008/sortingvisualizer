import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../SortingAlgorithms.js';

//change this to change the speed of the animations
const ANIMATION_SPEED_MS = 3;

//change this to change the number of bars
const NUMBER_OF_ARRAY_BARS = 300;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        //the main array
        this.state = {array: [],};
    }

    //this is what loads when the component runs/loads for the first time
    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        //creates an array
        //pushes 100 values that range from 5-1000 into the array
        //sets the main array to the new array
        const array = [];
        for(let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
            //5 used as a value of 1 does not show up on the screen in the bars
            array.push(randIntFromInterval(5,500));
        }
        this.setState({array});
    }

    //iterates through every value of the main array and then maps it onto a div
    render() {
        const {array} = this.state;

        return (
            <div>
                <div className="arrayContainer">
                    {array.map((value, idx) => (
                        <div
                        className = "arrayBar"
                        key = {idx}
                        style = {{height: `${value}px`}}>
                        </div>
                    ))}
                </div>
                <div className="buttons">
                    <button className='button' onClick={() => this.resetArray()}>Generate New Array</button>
                    <button className='button' onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button className='button' onClick={() => this.quickSort()}>Quick Sort WIP</button>
                    <button className='button' onClick={() => this.heapSort()}>Heap Sort WIP</button>
                    <button className='button' onClick={() => this.bubbleSort()}>Bubble Sort WIP</button>
                </div>
            </div>
        )
    }

    mergeSort() {
        //get animations by calling mergesort on the array
        const animations = getMergeSortAnimations(this.state.array);
        //go through the animations and grabs comparison and swap
        for(let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('arrayBar');
            //will change colors for the first 2 values of every 3 animations
            if((i % 3) !== 2){
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                const color = (i % 3) === 0 ? 'red': 'turquoise';
                //standard timeout function
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else{
                setTimeout(() => {
                    const [barOneIndex, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
            
        }
    }

    quickSort(){
        console.log('NOT READY YET');
    }

    heapSort(){
        console.log('NOT READY YET');
    }

    bubbleSort(){
        console.log('NOT READY YET');
    }

}

//function used to generate a random number in a set interval
function randIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}