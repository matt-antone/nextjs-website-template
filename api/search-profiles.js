import Fuse from 'fuse.js'
import profiles from '../cache/profiles'
import areas from '../cache/areas'
import fuseIndex from '../cache/fuse-index'
import { titleCase } from 'title-case'

const posts = profiles.filter(p => p.data.draft ? false : true)

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const isPlainObject = function (obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
};

const hasCat = (cats,cat) => {
  let has = false
  console.log('hasCat',cats,cat)
  cats.forEach( el => el.toLowerCase().trim() === cat.toLowerCase().trim() ? has = true : null)
  return has
}

export const getMeta = (posts,metaKey = 'categories') => {
  let meta = new Set()
  if(posts.length > 0){
    posts.forEach(element => {
      Array.isArray(element.data[metaKey]) ? element.data[metaKey].forEach(metaItem => {
        //console.log(metaItem)
        switch(true){
          case Array.isArray(metaItem) && metaItem.length:
            metaItem.forEach(item => {return item.length ? meta.add(item.toLowerCase().trim()) : ''})
            break;
          case metaKey === 'education':
            meta.add(metaItem.toLowerCase().trim())
            break;
          case metaKey === 'position':
            meta.add({key: metaItem.toLowerCase().trim(), value: metaItem.toLowerCase().trim()})
          default:
            meta.add({key: metaItem.toLowerCase().trim(), value: metaItem.toLowerCase().trim()})
        }
      }) : element.data[metaKey] ? meta.add(element.data[metaKey].toLowerCase().trim()) : ''
    })
  }else{
    //console.log('posts is not an array')
  }
  return meta ? [...meta].filter(onlyUnique).sort() : []
}

const getAreas = (posts) => {
  let Areas = new Set()
  areas.forEach(area => {
    const areaArray = area.id.split('/').filter(Boolean)
    const areaSlug = areaArray[areaArray.length-1]
    posts.forEach(element => {
      element.data.practice_areas ? element.data.practice_areas.forEach(cat => {
        if(cat.includes(area.id)){
          Areas.add(JSON.stringify({ key: 'practice_areas', value: area.id, label: area.data.title, }))
        }
      }) : ''
    })
  })
  const AreaList = []
  Areas.forEach(area => AreaList.push(JSON.parse(area)))
  return AreaList ? AreaList.sort((a,b) => a.id < b.id ? -1 : 1) : []
}

const getPositions = (posts) => {
  let Positions = new Set()
  posts.forEach(element => {
    element.data.position ? Positions.add(element.data.position) : null
  })
  const PositionList = []
  Positions.forEach(p => PositionList.push({key: "position", value: p.toLowerCase().trim(), label: titleCase(p.toLowerCase().trim()) }))
  return PositionList ? PositionList.sort((a,b) => a.id < b.id ? -1 : 1) : []
}


export default (req, res) => {
  const {page,per,q,section,filter,metaFilters} = req.query

  // filter out drafts JIC
  posts.filter( post => {
    return post.data.draft !== true ? true : false
  })

  let filtered = posts

  // Get section posts
  filtered = filtered.filter(post => {
    return post.id.includes('professionals') ? true : false
  })

  //console.log(posts.length)


  const filterArray = (meta,filter) => {
    let has = false
    meta.forEach( el => el.replace('.md','') === filter ? has = true : null)
    return has
  }

  const filterString = (meta,filter) => {
    //console.log(meta.toLowerCase(),filter.toLowerCase())
    return meta.toLowerCase() === filter.toLowerCase() ? true : false
  }


  const filterPosts = filter => {
    //console.log(`Filtering ${filter.key} by ${filter.value}`)
    if(filter.value !== 'All'){
      filtered = filtered.filter(post => {
        //console.log(`meta: ${post.data[filter.key]}`)
        const meta = post.data[filter.key]

        console.log(filter,meta,typeof(meta))
        switch (true) {
          case typeof(meta) === 'undefined':
            //console.log(`meta is undefined`)
            return true
          case Array.isArray(meta):
            console.log(`meta is an array`)
            return filterArray(meta,filter.value)
          case typeof(meta) == 'string':
            //console.log(`filtering string`)
            return filterString(meta,filter.value)
          default:
            //console.log('default')
            return false
        }
      })
    }
  }

  if(typeof(metaFilters) !== 'undefined'){
    const filters = JSON.parse(metaFilters)
    filterPosts(filters)
  }

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
        name: 'data.education',
        // weight: 0.25,
      },
      {
        name: 'data.admissions',
        // weight: 0.05,
      },
      {name: 'data.practice_areas'}
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
    education: getMeta(result,'education'),
    admissions: getMeta(result,'admissions'),
    practiceAreas: getAreas(posts),
    positions: getPositions(posts,'position'),
    term: q,
  }



  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data))
}