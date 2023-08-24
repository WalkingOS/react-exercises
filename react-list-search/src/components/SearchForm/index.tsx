import { useState, ChangeEvent } from 'react';

import { IArticle } from '@/types';

type SearchFormProps = {
  articles: IArticle[];
  onSearch: (filteredArticles: IArticle[]) => void;
};

enum SortBy {
  OLD = 'oldest',
  NEW = 'newest',
}

const SearchForm = ({ articles, onSearch }: SearchFormProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.NEW);

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      filterArticles(searchTerm, sortBy);
    }
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = event.target.value as SortBy;
    setSortBy(newSortBy);
    filterArticles(searchTerm, newSortBy);
  };

  const filterArticles = (searchTerm: string, sortBy: SortBy) => {
    const filteredArticles = articles.filter((article) => {
      return searchTerm.length
        ? article.title.toLowerCase().includes(searchTerm.toLowerCase())
        : articles;
    });

    filteredArticles.sort((a, b) =>
      sortBy === SortBy.OLD
        ? new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        : new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );
    onSearch(filteredArticles);
  };

  return (
    <form className="bg-white min-h-12 rounded-md shadow-md">
      <div className="flex justify-between flex-row px-8 py-3">
        <div className="md:w-1/2">
          <label className="inline-block">
            <input
              placeholder="Search for a title"
              className="w-full"
              type="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
              onKeyDown={handleKeyPress}
            />
          </label>
          <button
            className="bg-blue-700 rounded px-2 text-white ml-2 md:inline-block hidden"
            type="button"
            onClick={() => {
              filterArticles(searchTerm, sortBy);
            }}
          >
            Go!
          </button>
        </div>

        <label>
          <select value={sortBy} onChange={handleSortChange}>
            <option value={SortBy.NEW}>newest</option>
            <option value={SortBy.OLD}>oldest</option>
          </select>
        </label>
      </div>
    </form>
  );
};

export default SearchForm;
