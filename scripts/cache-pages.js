const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const glob = require('glob')
const Fuse = require('fuse.js')

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function getPosts(){
  const posts = []
  const postsDirectory = path.join(process.cwd(), '_content')
  const fileNames = glob.sync(postsDirectory+'/**/*')
  .filter((path) => /\.(md|mdx)$/.test(path))
  .filter((path) => { return !path.includes('index')})
  fileNames.forEach(fileName => {
    const id = fileName.replace(/\.md$/, '').replace(postsDirectory,'')
    const fullPath = fileName
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const {data,content} = matter(fileContents)
    const now = new Date().getTime()
    const publish = new Date(data.date).getTime()
    if(!data.draft && publish < now){
      posts.push({
        id,
        data,
        content,
      })
    }
  })
  return posts
}

function postData() {
  return `export const posts = ${JSON.stringify(posts)}`
}

const getCategories = () => {
  let cats = new Set()
  if(posts.length > 0){
    posts.forEach(element => {
      console.log(element)
      element.data.categories ? element.data.categories.forEach(cat => {
        cats.add(cat.toLowerCase().trim())
      }) : ''
    })
  }
  return `export const categories = ${JSON.stringify(cats ? [...cats].filter(onlyUnique).sort() : [])}`
}

const posts = getPosts()

try {
  fs.readdirSync('cache')
} catch (e) {
  fs.mkdirSync('cache')
}

fs.writeFile('cache/data.js', `${getCategories()}\n${postData()}`, function (err) {
  if (err) return console.log(err);
  console.log('Posts cached.');
})

// const options = { keys: ['data.title', 'content','data.hero.hero_text','data.content_blocks'] }
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