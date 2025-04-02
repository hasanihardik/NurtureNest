import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  "Pregnancy",
  "Parenting",
  "Baby Care",
  "Childbirth",
  "Nutrition"
];

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Pregnancy');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBooks();
  }, [selectedCategory]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      // First try to get books from our backend
      const localRes = await axios.get('/book/fetchBooks');
      const localBooks = localRes.data.data || [];

      // Then fetch additional books from Google Books API
      const googleBooksQuery = `${selectedCategory}+pregnancy+books`;
      const googleRes = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${googleBooksQuery}&maxResults=12`);
      
      const googleBooks = googleRes.data.items?.map(book => ({
        name: book.volumeInfo.title,
        author: book.volumeInfo.authors?.join(', ') || 'Unknown Author',
        description: book.volumeInfo.description,
        coverimage: book.volumeInfo.imageLinks?.thumbnail || '/default-book.png',
        url: book.volumeInfo.infoLink,
        isExternal: true
      })) || [];

      // Combine and deduplicate books
      const allBooks = [...localBooks, ...googleBooks];
      const uniqueBooks = allBooks.filter((book, index, self) =>
        index === self.findIndex((b) => b.name === book.name)
      );

      setBooks(uniqueBooks);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch books. Please try again later.');
      setLoading(false);
    }
  };

  const filteredBooks = books.filter(book => 
    book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Pregnancy and Parenting Books
        </h1>

        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                    ${selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } transition-colors duration-200`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="animate-pulse">
                  <div className="bg-gray-200 h-64 w-full"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">{error}</h3>
            <button
              onClick={fetchBooks}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => window.open(book.url, "_blank")}
                className="group bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative">
                  <img
                    src={book.coverimage}
                    alt={`${book.name} cover`}
                    className="w-full h-64 object-cover transition-transform duration-200 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = '/default-book.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200" />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {book.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">by {book.author}</p>
                  {book.isExternal && (
                    <span className="inline-flex items-center mt-2 text-xs text-purple-600">
                      View on Google Books →
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && !error && filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No books found</h3>
            <p className="mt-2 text-sm text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
