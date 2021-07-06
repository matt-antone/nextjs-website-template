const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const glob = require('glob')
const Fuse = require('fuse.js')

const contentSections = [
  'blog'
]

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function getPosts(section,all = true){
  const posts = []
  const postsDirectory = path.join(process.cwd(), '_content')
  const fileNames = glob.sync(`${postsDirectory}${ section ? `/${section}` : '' }/${ all ? '**/*' : '*'}`)
  .filter((path) => /\.(md|mdx)$/.test(path))
  // .filter((path) => { return !path.includes('index')})
  console.log('postsDirectory',postsDirectory)
  console.log('fileNames',fileNames)
  fileNames.forEach(fileName => {
    const id = fileName.replace(/\.md$/, '').replace(postsDirectory,'').replace('index','')
    const fullPath = fileName
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const {data,content} = matter(fileContents)
    const now = new Date().getTime()
    const publish = new Date(data.date).getTime()
    console.log(fileName,id,section,data,content)

    // console.log(content)

    if(!data.draft && publish < now){
      posts.push({
        id,
        data,
        content,
        section,
      })
    }
  })
  console.log(posts)
  return posts
}

function postData(posts,section = 'posts') {
  return `export const ${section} = ${JSON.stringify(posts)}`
}

const getCategories = () => {
  let cats = new Set()
  if(posts.length > 0){
    posts.forEach(element => {
      // console.log(element)
      element.data.categories ? element.data.categories.forEach(cat => {
        cats.add(cat.toLowerCase().trim())
      }) : ''
    })
  }
  return `export const categories = ${JSON.stringify(cats ? [...cats].filter(onlyUnique).sort() : [])}`
}

try {
  fs.readdirSync('cache')
} catch (e) {
  fs.mkdirSync('cache')
}

// GET ALL THE CONTENT
const posts = getPosts()
fs.writeFile('cache/data.json', JSON.stringify(posts), function (err) {
  if (err) return console.log(err);
  console.log('all content cached.');
})

// Filter Content Sections
contentSections.forEach( section => {
  const matters = posts.filter(post=>post.id.includes(`/${section}`))
  fs.writeFile(`cache/${section}.json`, JSON.stringify(matters), function (err) {
    if (err) return console.log(err);
    console.log(`${section} posts cached.`);
  })
} )

// Filter root pages
const root = getPosts(false,false).filter(post => {
  return post.id.length > 0 ? true : false
})
fs.writeFile('cache/root.json', JSON.stringify(root), function (err) {
  if (err) return console.log(err);
  console.log('Posts cached.');
})

// CREATE FUSE INDEX

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
  threshold: 0.3,
  distance: 100,
  useExtendedSearch: false,
  ignoreLocation: false,
  ignoreFieldNorm: false,
}
// Create the Fuse index
const myIndex = Fuse.createIndex(options.keys, posts)
// initialize Fuse with the index
fs.writeFile('cache/fuse-index.json', JSON.stringify(myIndex.toJSON()), function (err) {
  if (err) return console.log(err);
  console.log('Fuse Index cached.');
})