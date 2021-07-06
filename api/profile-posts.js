import {getPosts} from '../lib/pages'
import posts from '../cache/matters'

module.exports = async (req, res) => {
  const {route,page = 1, per = 5} = req.query
  const profiles = []

  //console.log(route)

  posts.sort((a,b) => {
    const aDate = new Date(a.data.date)
    const bDate = new Date(b.data.date)
    return aDate.getTime() < bDate.getTime() ? 1 : -1
  })

  let filtered = posts.filter( post => {
    return post.data.related_attorneys && post.data.related_attorneys.includes(route) ? true : false
  })

  //console.log(filtered)

  const pageList = filtered.slice((page - 1) * per, page * per)
  res.json({
    data: pageList,
    query: req.query,
    cookies: req.cookies,
  })
}