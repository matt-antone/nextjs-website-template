import Fuse from 'fuse.js'
import posts from '../cache/data.json'
import areas from '../cache/areas'
import fuseIndex from '../cache/fuse-index'

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const hasCat = (cats,cat) => {
  let has = false
  cats.forEach( el => el.toLowerCase().trim() === cat.toLowerCase().trim() ? has = true : null)
  return has
}

// const getCategories = (posts) => {
//   let cats = new Set()
//   if(posts.length > 0){
//     posts.forEach(element => {
//       // //console.log(element)
//       element.data.categories ? element.data.categories.forEach(cat => {
//         cats.add(cat.toLowerCase().trim())
//       }) : ''
//     })
//   }
//   return cats ? [...cats].filter(onlyUnique).sort() : []
// }

const getCategories = (posts) => {
  let Areas = new Set()
  areas.forEach(area => {
    const areaArray = area.id.split('/').filter(Boolean)
    const areaSlug = areaArray[areaArray.length-1]
    posts.forEach(element => {
      // //console.log(element)
      element.data.categories ? element.data.categories.forEach(cat => {
        if(area.data.title === cat){
          //console.log(area.data.title,cat)
          Areas.add(area)
        }
      }) : ''
    })
})
  return Areas ? [...Areas].filter(onlyUnique) : []
}

export default (req, res) => {
  const {page,per,q,section,filter,metaFilter} = req.query


  posts.filter( post => {
    return post.data.draft !== true ? true : false
  })
  posts.sort((a,b) => {
    const aDate = new Date(a.data.date)
    const bDate = new Date(b.data.date)
    return aDate.getTime() < bDate.getTime() ? 1 : -1
  })

  let filtered = posts


  if(typeof(filter) !== 'undefined' && filter.length > 0){
    //console.log('filtering',filter)
    filtered = filtered.filter( post => {
      const include = post.data.categories ? (hasCat(post.data.categories,filter) ? true : false) : false
      return include
    })
  }

  if(typeof(metaFilter) !== 'undefined'){
    //console.log('filtering meta',filter)
    filtered = filtered.filter( post => {
      const include = post.data[metaFilter.metaKey] ? (hasCat(post.data[metaFilter.metaKey],metaFilter.value) ? true : false) : false
      return include
    })
  }

  //console.log(posts.length)




  if(typeof(section) !== 'undefined'){
    filtered = filtered
    .filter((post)=>{
      return post.id.includes(section) ? true : false
    })
  }

  // const myIndex = Fuse.parseIndex(fuseIndex)
  const options = {
    keys: [
      {
        name: 'data.title',
        // weight: 0.1
      },
      {
        name: 'content',
        // weight: 0.25
      },
      {
        name: 'data.hero.hero_text',
        // weight: 0.25,
      },
      {
        name: 'data.content_blocks',
        // weight: 0.05,
      },
    ],
    includeScore: true,
    shouldSort: true,
    includeMatches: true,
    findAllMatches: true,
    minMatchCharLength: 3,
    location: 0,
    threshold: 0.4,
    distance: 100,
    useExtendedSearch: false,
    ignoreLocation: false,
    ignoreFieldNorm: false,
  }

  //console.log(filtered.length)
  // // initialize Fuse with the index
  const fuse = new Fuse(filtered, options)


  const result = q ? fuse.search( q ).map( res => {

    return res.item
  }) : filtered

  //console.log('items found',result.length)

  result.filter(item => {
    // //console.log(item.data.title);
    item ?
     true : false
  })

  // get categories


  const data = {
    section: section,
    totalPosts: posts.length,
    foundPosts: result.length,
    pageList: result.slice((page - 1) * per, page * per),
    categories: getCategories(result),
    term: q,
  }



  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data))
}