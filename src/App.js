import './App.css';
import ShoppingList from './ShoppingList'

function App() {
  return (
    <>
      <div className="App">
        <div className='container'>
          <div className='col2' id="center">
            <h1>SHOPPING LIST</h1>
          </div>
        </div>
      </div>
      <ShoppingList></ShoppingList>
    </>
  );
}

export default App;