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
    this.state.array = response_data['sorted_array'];
    return response_data[endpoint] ;
  }

  
  async resetArray() {
    const array = await this.getApi('generate_array');
    this.setState({array});
    const array_bars = document.getElementsByClassName('array-bar');
    for(let i = 0; i < array_bars.length; i++){
      array_bars[i].style.backgroundColor = 'red';
    }
  }
  async getBubbleSort() {
    
    const animation_pair_index = await this.getApi('bubble_sort', this.state.array);
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
      const changeColor = i % 3 !== 2;
      if (changeColor){
        setTimeout(() => {
          var color = i % 3 == 0 ? `black` : `red`
          var index1 = animation_pair_index[i][0];
          var index2 = animation_pair_index[i][1];
          array_bars[index1].style.backgroundColor = color;
          array_bars[index2].style.backgroundColor = color;
        }, i * 5);
      }
      else{
        setTimeout(() => {
          var index = animation_pair_index[i][0];
          var height = animation_pair_index[i][1];
          array_bars[index].style.height = `${height}px`;
        }, i * 5);  
      }
     
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
              style={{height: `${value}px`}}>
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

