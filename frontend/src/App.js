import Routess from './routes/routes';
import { AuthProvider } from './context/authContext';
import { FormProvider } from "./context/FormContext.tsx"
import history from './history';
function App() {

  return (
    <FormProvider>
      <AuthProvider>
        <div history={history} className="App">
          <Routess />
        </div>
      </AuthProvider>
    </FormProvider>

  );
}

export default App;