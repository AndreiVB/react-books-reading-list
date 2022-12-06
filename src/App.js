import { useEffect, useContext } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import BooksContext from './context/books';

function App () {
	const { fetchBooks } = useContext(BooksContext);

	//useEffect() calls posibilities; second parameter ->
	//1) empty array -> getting called at first render & never gets called again
	//2) no second argument -> getting called at first render & gets called at every rerender
	//3) second argument is a variable ->getting called at first render & gets called at every change of the given variable
	//4) second argument array with multiple variables -> getting called at first render & gets called at every change of a variable from the array
	useEffect(() => {
		fetchBooks();
	}, [fetchBooks]);

	return (
		<div className="app">
			<h1>Reading list</h1>
			<BookList />
			<BookCreate />
		</div>
	);
};

export default App;