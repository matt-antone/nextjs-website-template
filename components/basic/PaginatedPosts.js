import { useEffect, useState } from 'react'
import Button from './Button'
import Pagination from './Pagination'
import Sidebarlayout from '@components/SidebarLayout'
import MainSidebar from '@components/MainSidebar'
import Aside from '@components/Aside'

const getSearch = async (searchTerm, callback, page = 1, per = 10, filter, section) => {
  //console.log(filter)
  return await fetch(`/api/search?${searchTerm ? `q=${searchTerm}` : ''}${filter ? `&filter=${encodeURIComponent(filter)}` : ''}${section ? `&section=${section}` : ''}&page=${page}&per=${per}`).then((data) => {
    return data.json()
  }).then(data => {
    if (typeof (callback) === 'function') callback(data)
  })
}

function titleCase(str) {
  return str.toLowerCase().split(' ').map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

export default function PaginatedPosts({ per, data = [], RenderComponent, title, pageLimit, dataLimit, section }) {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState({ pageList: [], categories: [] })
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // const [postList,setPostList] = useState(null)

  useEffect(() => {
    if (loading) {
      updateSearch(1, filter)
    }
  })

  const updateSearch = (page, filter = filter) => {
    //console.log('update search',page,filter)
    getSearch(searchTerm, (data) => {
      //console.log(data)
      setSearch(data)
      setFilter(filter)
      setLoading(false)
    }, page, per, filter, section)
  }

  const updateTerm = e => {
    const val = e.target.value
    if (val.length > 2) {
      setSearchTerm(e.target.value)
      //
      setLoading(true)
      setPage(1)
      updateSearch(1, filter)
    } else {
      setSearchTerm('')
      setPage(1)
      updateSearch(1, '')
    }
  }

  const updateFilter = cat => {
    updateSearch(1, cat.data.title)
  }

  const setCurrentPage = page => {
    //console.log('setting current page',page)
    setPage(page)
    updateSearch(page, filter);
  }

  const showPosts = () => {
    return !loading ?
      search.pageList.map((post, idx) => {
        return (
          post ? (
            <div key={idx}>
              <RenderComponent post={post} summary={false} />
            </div>
          ) : ''
        )
      })
      : (
        <p>Loading</p>
      )
  }

  return (
    <Sidebarlayout>
      <div className="col-span-12">
        <Pagination
          searchTerm={searchTerm}
          page={page}
          per={per}
          foundPosts={search.foundPosts}
          totalPosts={search.totalPosts}
          setCurrentPage={setCurrentPage}
          RenderComponent={RenderComponent}
          pageLimit={10}
          filter={filter ? filter : ''} />
      </div>
      <MainSidebar>
        <div className="grid lg:grid-cols-1 gap-8">
          {showPosts()}
        </div>
      </MainSidebar>
      <Aside>
      <h2>Search Updates</h2>
        <input
          className="input"
          type="text"

          onKeyUp={updateTerm}
          />
        <h2>Filter by category</h2>
        <button
          onClick={ e => {setFilter(null);updateSearch(1)}}
          style={ {display: filter ? 'block' : 'none'} }
          className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-secondary"
        >
            Clear Filter
        </button>
        {search.categories.map( (cat,i) => {
          return (
            <div key={i}>
            <Button
              onClick={ e => {updateFilter(cat)}}
              selected={filter === cat ? true : false}
              className="w-full"
            >
              {titleCase(cat)}
            </Button>
            </div>
          )
        })}
      </Aside>
    </Sidebarlayout>
  )
}