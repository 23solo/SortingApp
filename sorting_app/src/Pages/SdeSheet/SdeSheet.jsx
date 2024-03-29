import React, {useState, useEffect} from 'react';
import './SdeSheet.css';
import { config } from '../../constants';

const sleep_secs = 1;

export default class SdeSheet extends React.Component {
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
    let response = await fetch(config.url.API_URL + endpoint, requestOptions);
    let response_data = await response.json();
    this.state.array = response_data['set_matrix_data'];
    return response_data[endpoint] ;
  }

  
  async resetArray() {
    const array = await this.getApi('generate_2darray');
    this.setState({array});
  }

  setMatrixAnimation(animation_pair_index){
    for(let i = 0; i < animation_pair_index.length; i++ ){
      const changeColor = i % 3 !== 2;
      if (changeColor){
        setTimeout(() => {
          var color = i % 3 == 0 ? `grey` : `white`
          var all_array = document.getElementsByClassName("" + animation_pair_index[i][0][0] + animation_pair_index[i][0][1]);
          if (all_array[0].innerHTML == '-1' && color == 'white')
          {
            color = 'pink'
          }
          all_array[0].style.backgroundColor = color;
        }, i * 300);
      }
      else {
        setTimeout(() => {
          var all_array = document.getElementsByClassName("" + animation_pair_index[i][0][0] + animation_pair_index[i][0][1]);
          if(animation_pair_index[i][1] == -1){
            all_array[0].innerHTML = -1;
            all_array[0].style.backgroundColor = 'pink';
          }
          if(animation_pair_index[i][1] === true){
            all_array[0].style.backgroundColor = 'pink';
          }
        }, i * 300);
      }

    }
  }

  setMatrixBase(animation_pair_index){
    console.log("Inside here");
    for(let i = 0; i < animation_pair_index.length; i++ ){
      // console.log(document.getElementsByClassName("" + animation_pair_index[i][0][0] + animation_pair_index[i][0][1]));
      document.getElementsByClassName("" + animation_pair_index[i][0][0] + animation_pair_index[i][0][1])[0].style.backgroundColor = 'white';
    }
  }


  async getSetMatrixZero() {
    const animation_pair_index = await this.getApi('set_matrix_zero', this.state.array);
    this.setMatrixAnimation(animation_pair_index);
    this.setMatrixBase(animation_pair_index);
  }


  render() {
    const {array} = this.state;
    return (
      <div>
        <div>
        <table className="table">
          <tbody>
            {array.map((items, idx) => {
              return (
                <tr className={idx} key={idx}>
                  {items.map((item, id) => {
                    return (
                      <td key = {id} className={"" + idx + id}>{item}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      <div></div>  
      
        <div>
          <button className='button' onClick={ ()=>this.getSetMatrixZero()}>Set Matrix Zero</button>
          <button className='button' onClick={ ()=>this.resetArray()}>Generate Array</button>
        </div>
      </div>

    );
  }
}

