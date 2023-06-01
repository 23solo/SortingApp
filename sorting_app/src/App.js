import './App.css';
import Navbar from './Navbar';
import SdeSheet from './Pages/SdeSheet/SdeSheet';
import SortingVisualiser from './Pages/SortingVisualiser/SortingVisualiser';

function App() {
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <SortingVisualiser />;
      break
    case "/sorting_visualizer":
      component = <SortingVisualiser />
      break
    case "/sde_sheet":
      component = <SdeSheet />
      break
      
  }
  return (
    <>
      <div className='container'>
        < Navbar />
        <div className='container'>
          {component}
        </div>
      </div>

    </>
  );
}

export default App;
