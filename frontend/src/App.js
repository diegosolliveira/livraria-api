import Routess from './routes/routes';
import history from './history';

function App() {
  return (
    <div history={history} className="App">
      <Routess />
    </div>
  );
}

export default App;
