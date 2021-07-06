import {getPosts} from '../lib/pages'

module.exports = async (req, res) => {
  const {section,filter,page = 1, per = 10} = req.query
  const profiles = []
  // //console.log(`/matters${section ? `${section}/` : ''}**/*`)
  const posts = getPosts(`/matters/**/*`,page,per).filter(post => {
    // //console.log(filter,post.data.related_practice_areas,post.data.related_practice_areas.includes(filter))
    let include = false
    if(typeof(post.data.related_practice_areas) !== 'undefined'){
      post.data.related_practice_areas.forEach( area => {
        // //console.log(area,area.includes(filter))
        if( area.includes(filter)){
          include = true
        }
      })

    }
    return include
  }).sort((a,b) => {
    const aDate = new Date(a.data.date)
    const bDate = new Date(b.data.date)
    return aDate.getTime() < bDate.getTime() ? 1 : -1
  })
  // //console.log(posts)
  const sticky = posts.filter(post => post.data.sticky ? true : false ).sort( (a,b) => {
    return a.data.weight < b.data.weight ? -1 : 1
  })
  const remainingPosts = posts.filter(post=> post.data.sticky ? false : true )
  // //console.log(sticky,remainingPosts)
  const allPosts = sticky.concat(remainingPosts)

  const pageList = allPosts.slice((page - 1) * per, page * per)
  res.json({
    data: pageList,
    query: req.query,
    cookies: req.cookies,
  })
}