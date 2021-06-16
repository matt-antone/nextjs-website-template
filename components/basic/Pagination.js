import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

function Pagination({searchTerm = '', page, per, foundPosts = 0, totalPosts = 0, posts = [],currentPage,setCurrentPage, data, RenderComponent, title, pageLimit, dataLimit, pages, filter}) {

  const hasCat = (cats,cat) => {
    let has = false
    cats.forEach( el => el.toLowerCase().trim() === cat.toLowerCase().trim() ? has = true : null)
    return has
  }

  function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

  function clamp(min, max, val) {
    return Math.min(Math.max(min, +val), max);
  }

  function goToNextPage() {
    console.log(page,Math.floor(totalPosts/per))
    setCurrentPage(page < (Math.floor(totalPosts/per)-1) ? page + 1 : page);
  }

  function goToPreviousPage() {
    setCurrentPage(page > 1 ? page - 1 : page);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedPostsGroup = () => {
    const start = Math.floor((page - 1)/per) * per;
    const remainingPosts = foundPosts - (start * per)
    const remainingPages = Math.floor(remainingPosts/per)+1
    const pageCount = remainingPages > pageLimit ? pageLimit : remainingPages
    return pageCount ?
    new Array(pageCount).fill().map((_, idx) => {
      return (start + idx + 1) < foundPosts ? start + idx + 1 : null
    }
    ) : [];
  };

  return (
    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between py-8">
      <p className="text-md text-gray-700">
        Showing articles <span className="font-medium">{page * per - per + 1 }</span> to <span className="font-medium">{foundPosts > (page * per) ? page * per : foundPosts }</span> of{' '}
        <span className="font-medium">{foundPosts}</span> results {filter ? `filtered by "${titleCase(filter)}"` : ''} {searchTerm ? `searched by "${searchTerm}"` : ''}
      </p>
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="PaginatedPosts">
        <a
          onClick={goToPreviousPage}
          href="#"
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </a>
        {/* show page numbers */}
        {getPaginatedPostsGroup().map((item, index) => (
          <a
            href="#"
            aria-current="page"
            className={
              page === index+1 ?
              "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            }
            key={index}
            onClick={changePage}
          >
            {index+1}
          </a>
        ))}
        <a
          onClick={goToNextPage}
          href="#"
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </a>
      </nav>
    </div>
  );
}

export default Pagination;