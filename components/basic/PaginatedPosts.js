import {useEffect,useState} from 'react'
import Button from './Button'
import Pagination from './Pagination'

const getSearch = async (searchTerm, callback, page = 1, per = 10, filter) => {
  console.log(filter)
  return await fetch(`/api/search?${searchTerm ? `q=${searchTerm}` : ''}${ filter ? `&filter=${filter}` : '' }&section=updates&page=${page}&per=${per}`).then( (data) => {
    return data.json()
  }).then( data => {
    if(typeof(callback) === 'function') callback(data)
  })
}

function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

export default function PaginatedPosts({ per, data = [], RenderComponent, title, pageLimit, dataLimit }) {
  const [loading,setLoading] = useState(true)
  const [search,setSearch] = useState({pageList:[],categories:[]})
  const [page, setPage] = useState(1)
  const [filter,setFilter] = useState('')
  const [searchTerm,setSearchTerm] = useState('')

  // const [postList,setPostList] = useState(null)

  useEffect(()=>{
    if( loading ){
      updateSearch(1,filter)
    }
  })

  const updateSearch = (page,filter = filter) => {
    console.log('update search',page,filter)
    getSearch(searchTerm,(data)=>{
      console.log(data)
      setSearch(data)
      setFilter(filter)
      setLoading(false)
    },page,per,filter)
  }

  const updateTerm = e => {
    const val = e.target.value
    if(val.length > 2){
      setSearchTerm(e.target.value)
      //
      setLoading(true)
      setPage(1)
      updateSearch(1,filter)
    } else {
      setSearchTerm('')
      setPage(1)
      updateSearch(1,'')
    }
  }

  const updateFilter = cat => {
    updateSearch(1,cat)
  }

  const setCurrentPage = page => {
    console.log('setting current page',page)
    setPage(page)
    updateSearch(page,filter);
  }

  const showPosts = () => {
    return !loading ?
      search.pageList.map((post, idx) => { return (
        post ? (
          <div key={idx}>
            <RenderComponent post={post} summary={false}/>
          </div>
        ) : ''
      )})
     : (
       <p>Loading</p>
     )
  }

  return (
    <div className="grid grid-cols-12 gap-x-16 gap-y-0">
      <div className="col-span-12">
        <Pagination
          searchTerm={searchTerm}
          page={page}
          per={per}
          foundPosts={search.foundPosts}
          totalPosts={search.totalPosts}
          setCurrentPage={setCurrentPage}
          RenderComponent={RenderComponent}
          filter={filter ? filter : ''}/>
      </div>
      <main className="col-span-9">
      <div className="grid lg:grid-cols-3 gap-8">
        { showPosts() }
      </div>
      </main>
      <aside className="col-span-3">
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
      </aside>
      <div className="col-span-12">
      {/* <Pagination
          searchTerm={searchTerm}
          page={page}
          per={per}
          foundPosts={search.foundPosts}
          totalPosts={search.totalPosts}
          currentPage={currentPage}
          setCurrentPage={setPage}
          data={data}
          RenderComponent={RenderComponent}
          title={title}
          pageLimit={pageLimit}
          dataLimit={dataLimit}
          pages={pages}
          filter={filter ? filter : ''}/> */}
      </div>
    </div>
  )
}