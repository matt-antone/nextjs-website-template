import {getPosts} from '../lib/pages'

module.exports = async (req, res) => {
  const {section,page = 1, per = 10} = req.query
  const profiles = []
  const posts = getPosts(`/${section ? `${section}/` : ''}/**/*`,page,per)

  // posts.sort((a,b) => {
  //   const aDate = new Date(a.data.date)
  //   const bDate = new Date(b.data.date)
  //   return aDate.getTime() < bDate.getTime() ? 1 : -1
  // })

  const pageList = posts.slice((page - 1) * per, page * per)
  res.json({
    data: pageList,
    query: req.query,
    cookies: req.cookies,
  })
}