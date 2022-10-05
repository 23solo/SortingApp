import React, {useState, useEffect} from 'react';
import './SortingVisualiser.css';

const sleep_secs = 1;

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

  async getApi(endpoint, data){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data })
    };
    let response = await fetch('/api/'+endpoint, requestOptions)
    let response_data = await response.json();
    if(endpoint == 'bubble_sort'){
      this.state.array = response_data['sorted_array'];
    }
    return response_data[endpoint] ;
  }

  
  async resetArray() {
    const array = await this.getApi('generate_array');
    console.log(array);
    this.setState({array});
    const array_bars = document.getElementsByClassName('array-bar');
    for(let i =0; i < array_bars.length; i++){
      array_bars[i].style.backgroundColor = 'red';
    }
  }
  async getBubbleSort() {
    
    const animation_pair_index = await this.getApi('bubble_sort', this.state.array);
    console.log(animation_pair_index);
    const array_bars = document.getElementsByClassName('array-bar');
    for(let i = 0; i< animation_pair_index.length; i++ ){

      setTimeout(() => {
        var index1 = animation_pair_index[i][0];
        var index2 = animation_pair_index[i][1];
        var temp_ht = array_bars[index1].style.height;
        array_bars[index1].style.height = array_bars[index2].style.height;
        array_bars[index2].style.height = temp_ht;
        array_bars[index2].style.backgroundColor = `black`;
        array_bars[index1].style.backgroundColor = `blue`;
      }, i * sleep_secs);

    }
  }

  async getMergeSort() {
    
    const animation_pair_index = await this.getApi('merge_sort', this.state.array);
    const array_bars = document.getElementsByClassName('array-bar');
    for(let i = 0; i< animation_pair_index.length; i++ ){

      setTimeout(() => {
        var index = animation_pair_index[i][0];
        var height = animation_pair_index[i][1];
        console.log("height is", array_bars[index].style.height, height);
        array_bars[index].style.height = `${height}px`;
        array_bars[index].style.backgroundColor = `black`;
      }, i * sleep_secs);

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
          <button className='button' onClick={ ()=>this.getMergeSort()}>Merge Sort</button>
          <button className='button' onClick={ ()=>this.getBubbleSort()}>Bubble sort</button>
          <button className='button' onClick={ ()=>this.resetArray()}>Generate Array</button>
        </div>
      </div>
    );
  }
}

