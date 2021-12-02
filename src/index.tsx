import App from './App';
import ReactDOM from 'react-dom';
import 'src/common/utils/chart';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import { SidebarProvider } from './contexts/SidebarContext';
import { createStore } from 'redux';
import { combinedReducer } from './common/redux';

const store = createStore(combinedReducer);

ReactDOM.render(
  <Provider store={store}>
  <HelmetProvider>
    <SidebarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SidebarProvider>
  </HelmetProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
