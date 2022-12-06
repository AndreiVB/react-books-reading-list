import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App () {
	const [books, setBooks] = useState([]);

	const fetchBooks = async () => {
		const response = await axios.get("http://localhost:3001/books");

		setBooks(response.data);
	};
	//useEffect() calls posibilities; second parameter ->
	//1) empty array -> getting called at first render & never gets called again
	//2) no second argument -> gets called at every rerender
	//3) second argument is a variable -> gets called at every change of the given variable
	//4) second argument array with multiple variables -> gets called at every change of a variable from the array
	useEffect(() => {
		fetchBooks();
	}, []);

	const editBookById = async (id, newTitle) => {
		const response = await axios.put(`http://localhost:3001/books/${id}`, {
			title: newTitle
		});

		const updatedBooks = books.map((book) => {
			if (book.id === id) {
				//updates all data that have been changed
				return { ...book, ...response.data };
			}

			return book;
		});

		setBooks(updatedBooks);
	};

	const deleteBookbyId = async (id) => {
		await axios.delete(`http://localhost:3001/books/${id}`);
		//filter doesn't modify the array but gives a new one
		const updatedBooks = books.filter((book) => {
			return book.id !== id;
		});

		setBooks(updatedBooks);
	};

	const createBook = async (title) => {
		const response = await axios.post("http://localhost:3001/books", {
			title,
		});

		const updatedBooks = [...books, response.data];
		setBooks(updatedBooks);
	};

	return (
		<div className="app">
			<h1>Reading list</h1>
			<BookList books={books} onEdit={editBookById} onDelete={deleteBookbyId} />
			<BookCreate onCreate={createBook} />
		</div>
	);
};

export default App;