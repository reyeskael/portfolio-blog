import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { legacy_createStore as createStore } from 'redux';
import { ThemeProvider } from '@mui/material';

import './App.css';
import { BlogPage, MainPage } from './page';
import { Footer, Header } from './component';
import { customTheme } from './utils';
import rootReducer from './reducer';

const store = createStore(rootReducer);

const menuItems = [
	{ text: 'Home', link: '/', sectionId: 'home' },
	{ text: 'Blog', link: '/blog', sectionId: 'blog' },
	{ text: 'Work', link: '/work', sectionId: 'work' },
	{ text: 'Contact', link: '/contact', sectionId: 'contact' }
];

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={customTheme}>
				<Header title="Michael Reyes" menuItems={menuItems} />
				<Routes>
					<Route path="/" element={<MainPage/>} />
					<Route path="/blog/:id" element={<BlogPage/>} />
				</Routes>
				<Footer />
			</ThemeProvider>
		</Provider>
	);
}

export default App;
