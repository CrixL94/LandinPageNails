import { PrimeReactProvider } from 'primereact/api';
import AppRouter from './Router/AppRouter';

function App() {

  return (
    <>
    <PrimeReactProvider>
      <AppRouter/>
    </PrimeReactProvider>
    </>
  )
}

export default App
