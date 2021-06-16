import {getPosts} from '@lib/pages'

module.exports = async (req, res) => {
  const profiles = []
  const posts = getPosts('/updates/**/*')



  const {page,per} = req.query
  const pageList = posts.slice((page - 1) * per, page * per)
  res.json({
    data: pageList,
    query: req.query,
    cookies: req.cookies,
  })
}