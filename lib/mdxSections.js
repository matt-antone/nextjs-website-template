import path from 'path'
import matter from 'gray-matter'


// CONTENT_PATH is useful when you want to get the path to a specific file
export const CONTENT_PATH = path.join(process.cwd(), '_content')

// postFilePaths is the list of all mdx files inside the CONTENT_PATH directory
export const postFilePaths = (path = '',fs) => {
  return fs
  .readdirSync(`${CONTENT_PATH}${path}`)
  // Only include md(x) files
  .filter((path) => /\.(md|mdx)$/.test(path))
  .filter((path) => { return !path.includes('index')})
}

export const getPosts = (pageDir,fs) => {
  return postFilePaths(pageDir,fs).map((filePath) => {
    const source = fs.readFileSync(path.join(`${CONTENT_PATH}${pageDir}`, filePath))
    const { content, data } = matter(source)
    return {
      content,
      data,
      pagePath: `${pageDir}${filePath.replace(/\.(md|mdx)$/, '')}`
    }
  })
}