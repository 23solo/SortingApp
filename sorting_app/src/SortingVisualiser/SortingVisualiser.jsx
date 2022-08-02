import React from 'react';
import './SortingVisualiser.css';

export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            array: [],
        }; 
    }

    // When the component loads for the first time we use componentDidMount
    componentDidMount() {
        this.resetArray();
    }
    
    resetArray() {
        const array = [] ;
        for (let i = 0; i<170; i ++){
            array.push(randomIntFromInterval(5,800));
        }
        this.setState({array});
    }
    bubbleSort() {
        var sort_array = this.state.array;
        const animation_pair_index = [];
        for(let i = 0; i< sort_array.length-1; i++){
            for(let j = 0; j < sort_array.length -i -1; j++){
                if (sort_array[j] > sort_array[j+1]){
                    animation_pair_index.push([j, j+1]);
                    var temp = sort_array[j];
                    sort_array[j] = sort_array[j+1];
                    sort_array[j+1] = temp;
                }
            }
        }
        const array_bars = document.getElementsByClassName('array-bar');
        
        for(let i = 0; i< animation_pair_index.length; i++ ){

            setTimeout(() => {
                var index1 = animation_pair_index[i][0];
                var index2 = animation_pair_index[i][1]; 
                console.log(array_bars[index2].style.height, array_bars[index1].style.height);
                var temp_ht = array_bars[index1].style.height;
                array_bars[index1].style.height = array_bars[index2].style.height;
                array_bars[index2].style.height = temp_ht;
                array_bars[index2].style.backgroundColor = `black`;
                array_bars[index1].style.backgroundColor = `blue`;
              }, i * 200);
            
        }
    }

    render() {
        const {array} = this.state;
        return (
            <div className=''>
                <div className='array-container'>
                    {array.map((value, ids) => (
                        <div 
                            className="array-bar"
                            key={ids}
                            style={{height: `${value}px`, backgroundColor : 'red'}}>
                        </div>
                    ))}
                </div>
                <div>
                    <button className='button' onClick={ ()=>this.bubbleSort()}>Bubble sort</button>
                    <button className='button' onClick={ ()=>this.resetArray()}>Generate Array</button>
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}

