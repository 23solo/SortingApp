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
        for (let i = 0; i<100; i ++){
            array.push(randomIntFromInterval(5,1000));
        }
        this.setState({array});
    }

    render() {
        const {array} = this.state;
        return (
            <div className='array-container'>
                {array.map((value, ids) => (
                    <div 
                        className="array-bar"
                        key={ids}
                        style={{height: `${value}px`, backgroundColor : 'black'}}>
                    </div>
                ))}
            </div>
        );
    }
}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}

