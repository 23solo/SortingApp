import React, {useState, useEffect} from 'react';
import './SortingVisualiser.css';
import { config } from '../../constants';

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
    
    let response = await fetch( config.url.API_URL + endpoint, requestOptions);
    let response_data = await response.json();
    this.state.array = response_data['sorted_array'];
    return response_data[endpoint] ;
  }

  sortArray() {
    this.getMergeSort();
    this.getBubbleSort();
  }
  
  async resetArray() {
    const array = await this.getApi('generate_array');
    this.setState({array});
    if(document.getElementsByClassName('array-bar').length == 0){
      setTimeout(() => {
        const array_bars = document.getElementsByClassName('array-bar');
        for(let i = 0; i < array_bars.length; i++){
          array_bars[i].style.backgroundColor = 'red';
        }
      }, 2000);
    }
    else{
      const array_bars = document.getElementsByClassName('array-bar');
      for(let i = 0; i < array_bars.length; i++){
        array_bars[i].style.backgroundColor = 'red';
      }
    }
    
  }
  async getBubbleSort() {
    
    const animation_pair_index = await this.getApi('bubble_sort', this.state.array);
    const array_bars = document.getElementsByClassName('array-bar-bubble');
    for(let i = 0; i< animation_pair_index.length; i++ ){

      setTimeout(() => {
        var index1 = animation_pair_index[i][0];
        var index2 = animation_pair_index[i][1];
        var temp_ht = array_bars[index1].style.height;
        array_bars[index1].style.height = array_bars[index2].style.height;
        array_bars[index2].style.height = temp_ht;
        array_bars[index2].style.backgroundColor = `red`;
        array_bars[index1].style.backgroundColor = `black`;
      }, i * 7);

    }
  }

  async getMergeSort() {
    
    const animation_pair_index = await this.getApi('merge_sort', this.state.array);
    const array_bars = document.getElementsByClassName('array-bar-merge');
    for(let i = 0; i< animation_pair_index.length; i++ ){
      const changeColor = i % 3 !== 2;
      if (changeColor){
        setTimeout(() => {
          var color = i % 3 == 0 ? `black` : `red`
          var index1 = animation_pair_index[i][0];
          var index2 = animation_pair_index[i][1];
          array_bars[index1].style.backgroundColor = color;
          array_bars[index2].style.backgroundColor = color;
        }, i * 3);
      }
      else{
        setTimeout(() => {
          var index = animation_pair_index[i][0];
          var height = animation_pair_index[i][1];
          array_bars[index].style.height = `${height}px`;
        }, i * 4);  
      }
     
    }
  }

  render() {
    const {array} = this.state;
    return (
      <div className=''>
        <div className="outer-container">
        <h3>Bubble Sort</h3>
          <div className='array-container'>
            {array.map((value, ids) => (
              <div 
                className="array-bar-bubble array-bar"
                key={ids}
                style={{height: `${value}px`}}>
              </div>
            ))}
          </div>
        </div>
        <div className='outer-container'>
          <h3>Merge Sort</h3>
          <div className='array-container'>
            {array.map((value, ids) => (
              <div 
                className="array-bar-merge array-bar"
                key={ids}
                style={{height: `${value}px`}}>
              </div>
            ))}
          </div>
        </div>
        <div class='container-button'>
          <button className='button' onClick={ ()=>this.sortArray()}>Sort Bars</button>
          <button className='button' onClick={ ()=>this.resetArray()}>Generate Bars</button>
        </div>
      </div>
    );
  }
}

