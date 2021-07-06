import {getPosts} from '../lib/pages'

module.exports = async (req, res) => {
  const {section,page = 1, per = 10} = req.query
  const profiles = []
  const posts = getPosts(`/${section ? `${section}/` : ''}/**/*`,page,per)


  const pageList = posts.slice((page - 1) * per, page * per)
  res.json({
    data: pageList,
    query: req.query,
    cookies: req.cookies,
  })
}