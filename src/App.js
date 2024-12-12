import './App.css';
import LegoWishList from './LegoWishList';
import StandardWishList from './StandardWishList';

const App = () => {
  return (
    <div className="App">
      <h1>Vince Wish List</h1>
      <LegoWishList />
      <StandardWishList/>
    </div>
  );
}

export default App;
