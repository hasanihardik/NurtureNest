import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Heart, 
  Star, 
  Clock, 
  User, 
  Calendar,
  Bookmark,
  Share2,
  Download,
  Eye,
  BookmarkPlus,
  TrendingUp,
  Award,
  Baby,
  Users,
  Brain
} from 'lucide-react';

const CATEGORIES = [
  { name: "Pregnancy", icon: Baby, color: "from-pink-500 to-rose-500" },
  { name: "Parenting", icon: Users, color: "from-blue-500 to-cyan-500" },
  { name: "Baby Care", icon: Heart, color: "from-green-500 to-emerald-500" },
  { name: "Childbirth", icon: Award, color: "from-purple-500 to-violet-500" },
  { name: "Nutrition", icon: Brain, color: "from-orange-500 to-red-500" },
  { name: "Mental Health", icon: Brain, color: "from-indigo-500 to-purple-500" }
];

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Pregnancy');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('relevance'); // relevance, title, author, rating
  const [favorites, setFavorites] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

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
      const googleRes = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${googleBooksQuery}&maxResults=20`);
      
      const googleBooks = googleRes.data.items?.map(book => ({
        name: book.volumeInfo.title,
        author: book.volumeInfo.authors?.join(', ') || 'Unknown Author',
        description: book.volumeInfo.description,
        coverimage: book.volumeInfo.imageLinks?.thumbnail || '/default-book.png',
        url: book.volumeInfo.infoLink,
        isExternal: true,
        rating: book.volumeInfo.averageRating || 4.0,
        publishedDate: book.volumeInfo.publishedDate,
        pageCount: book.volumeInfo.pageCount,
        categories: book.volumeInfo.categories || []
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

  const filteredAndSortedBooks = books
    .filter(book => 
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.name.localeCompare(b.name);
        case 'author':
          return (a.author || '').localeCompare(b.author || '');
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  const toggleFavorite = (bookName) => {
    setFavorites(prev => 
      prev.includes(bookName) 
        ? prev.filter(name => name !== bookName)
        : [...prev, bookName]
    );
  };

  const toggleReadingList = (bookName) => {
    setReadingList(prev => 
      prev.includes(bookName) 
        ? prev.filter(name => name !== bookName)
        : [...prev, bookName]
    );
  };

  const featuredBooks = books.slice(0, 3);

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pregnancy & Parenting Books
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover expert-curated books to guide you through every stage of your pregnancy journey
          </p>
        </motion.div>

        {/* Featured Books */}
        {featuredBooks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              Featured Books
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredBooks.map((book, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative">
                    <img
                      src={book.coverimage}
                      alt={`${book.name} cover`}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = '/default-book.png';
                      }}
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => toggleFavorite(book.name)}
                        className={`p-2 rounded-full ${favorites.includes(book.name) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600'} hover:scale-110 transition-all`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(book.name) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => toggleReadingList(book.name)}
                        className={`p-2 rounded-full ${readingList.includes(book.name) ? 'bg-purple-500 text-white' : 'bg-white/80 text-gray-600'} hover:scale-110 transition-all`}
                      >
                        <Bookmark className={`w-4 h-4 ${readingList.includes(book.name) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{book.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < (book.rating || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({book.rating || 4.0})</span>
                    </div>
                    <button
                      onClick={() => window.open(book.url, "_blank")}
                      className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      Read More
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 min-w-[300px] relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search books by title, author, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400'} hover:bg-purple-50 transition-colors`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-400'} hover:bg-purple-50 transition-colors`}
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="bg-current rounded-sm h-1"></div>
                  <div className="bg-current rounded-sm h-1"></div>
                  <div className="bg-current rounded-sm h-1"></div>
                </div>
              </button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="title">Sort by Title</option>
              <option value="author">Sort by Author</option>
              <option value="rating">Sort by Rating</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Category Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="flex flex-wrap gap-3">
                  {CATEGORIES.map(category => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.name
                          ? 'bg-gradient-to-r ' + category.color + ' text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <category.icon className="w-4 h-4" />
                      {category.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredAndSortedBooks.length} books found
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{favorites.length} favorites</span>
            <span>{readingList.length} in reading list</span>
          </div>
        </div>

        {/* Books Grid/List */}
        {loading ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
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
            <h3 className="text-lg font-medium text-gray-900 mb-4">{error}</h3>
            <button
              onClick={fetchBooks}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}
            >
              {filteredAndSortedBooks.map((book, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`relative ${viewMode === 'list' ? 'w-32 h-48' : 'w-full h-64'}`}>
                    <img
                      src={book.coverimage}
                      alt={`${book.name} cover`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/default-book.png';
                      }}
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        onClick={() => toggleFavorite(book.name)}
                        className={`p-1.5 rounded-full ${favorites.includes(book.name) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600'} hover:scale-110 transition-all`}
                      >
                        <Heart className={`w-3 h-3 ${favorites.includes(book.name) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => toggleReadingList(book.name)}
                        className={`p-1.5 rounded-full ${readingList.includes(book.name) ? 'bg-purple-500 text-white' : 'bg-white/80 text-gray-600'} hover:scale-110 transition-all`}
                      >
                        <Bookmark className={`w-3 h-3 ${readingList.includes(book.name) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <h3 className={`font-bold text-gray-900 mb-2 ${viewMode === 'list' ? 'text-lg' : 'text-base'} line-clamp-2`}>
                      {book.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
                    
                    {viewMode === 'list' && book.description && (
                      <p className="text-sm text-gray-500 mb-3 line-clamp-3">
                        {book.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < (book.rating || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({book.rating || 4.0})</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.open(book.url, "_blank")}
                        className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm flex items-center justify-center gap-1"
                      >
                        <BookOpen className="w-3 h-3" />
                        Read
                      </button>
                      <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                        <Share2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && !error && filteredAndSortedBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or browse different categories</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
