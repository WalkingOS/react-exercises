import React, { useEffect, useState } from 'react';

import { articles } from './api';
import { Card } from './components/Card';
import SearchForm from './components/SearchForm';
import { Main } from './layout';
import { IArticle } from './types';

function App() {
  const [filteredArticles, setFilteredArticles] = useState<IArticle[]>(articles);

  useEffect(() => {
    const response = fetch('https://api.jsonserve.com/nKrJ8Z');
    console.log(response);
  }, []);

  const handleSearch = (filteredArticles: IArticle[]) => {
    setFilteredArticles(filteredArticles);
  };

  return (
    <Main title="Articles">
      <>
        <SearchForm articles={articles} onSearch={handleSearch} />
        <div className="mt-12 md:-mx-2">
          {filteredArticles.length ? (
            <ul className="flex w-full flex-wrap justify-start">
              {filteredArticles.map((article: IArticle) => {
                return (
                  <li
                    className="w-full inline-block md:w-1/2 lg:w-1/3 mb-4 md:px-2"
                    key={article.id}
                  >
                    <Card
                      image={{
                        src: `${article.image.url
                          .replace('{width}', '400')
                          .replace('{height}', '200')}`,
                        alt: '',
                      }}
                    >
                      <>
                        <div className="flex">
                          <span className="text-white rounded-full bg-blue-600 font-bold h-10 w-10 p-2 inline-block self-center">
                            {article.author[0] + article.author[1].toUpperCase()}
                          </span>
                          <div className="inline-block ml-3">
                            <p className="text-md">{article.author}</p>
                            <time className="text-gray-600 text-sm">{article.dateAdded}</time>
                          </div>
                        </div>
                        <h3 className="font-bold mt-2">{article.title}</h3>
                      </>
                    </Card>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="w-full h-[25vh] bg-gray-200 rounded-md text-center">
              <p className="relative top-1/2"> Sorry, nothing found o.o</p>
            </div>
          )}
        </div>
      </>
    </Main>
  );
}

export default App;
