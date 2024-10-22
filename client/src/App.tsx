import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { legacy_createStore as createStore } from 'redux';
import { ThemeProvider } from '@mui/material';

import './App.css';
import { BlogPage, MainPage } from './page';
import { PageHeader } from './component';
import { customTheme } from './utils';
import rootReducer from './reducer';

const store = createStore(rootReducer);

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={customTheme}>
				<PageHeader title="Michael Reyes" />
				<Routes>
					<Route path="/" element={<MainPage/>} />
					<Route path="/blog" element={<BlogPage/>} />
				</Routes>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
