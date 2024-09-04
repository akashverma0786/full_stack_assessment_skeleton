import { Provider } from 'react-redux';
import { store } from './redux/store';
import HomesPage from './pages/HomesPage';

import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient'; 
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <HomesPage />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
