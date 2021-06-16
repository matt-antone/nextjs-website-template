const fs = require('fs')
import path from 'path'
import matter from 'gray-matter'
import glob from 'glob'


// CONTENT_PATH is useful when you want to get the path to a specific file
export const CONTENT_PATH = path.join(process.cwd(), '_content')

// postFilePaths is the list of all mdx files inside the CONTENT_PATH directory
export const postFilePaths = (globStr = '',page,limit) => {
  ////console.log(CONTENT_PATH+globStr)
  const paths = glob.sync(CONTENT_PATH+globStr)
  .filter((path) => /\.(md|mdx)$/.test(path))
  .filter((path) => { return !path.includes('index')})
  // paths.slice((page - 1) * limit, page * limit)
  //console.log(paths)
  return paths
}

export const getPosts = (globStr,page = 1,limit = 10) => {
  const posts = []
  postFilePaths(globStr,page,limit).forEach((filePath) => {
    const source = fs.readFileSync(filePath)
    const { content, data } = matter(source)
    const pagePath = `${filePath.replace(/\.(md|mdx)$/, '')}`.replace(CONTENT_PATH,'')
    const pDate = new Date(data.date)
    const now = new Date()

    !data.draft && pDate.getTime() < now.getTime() ? posts.push({
      content,
      data,
      pagePath: pagePath
    }) : null
  })
  // console.log(posts)
  return posts
}