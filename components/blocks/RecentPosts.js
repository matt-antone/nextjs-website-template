import CloudinaryImage from '../CloudinaryImage'
import Block from './Block';
import BlockContainer from './BlockContainer';
import ArticleCardLink from '../basic/ArticleCardLink'

export default function RecentPosts({posts}) {
  const sorted = posts.sort(function (a, b) {
    return new Date(a.data.date).getTime() - new Date(b.data.date).getTime();
  }).reverse();
  return (
    <Block>
      <BlockContainer>
        <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6">
          <BlockContainer landingPage={true}>
            <div className="text-center">
              <h2 className="text-3xl tracking-tight font-extrabold text-brand-blue sm:text-4xl">Updates</h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
              </p>
            </div>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {sorted.slice(0, 3).map((post,i) => (
                <div key={i}>
                  <ArticleCardLink post={post}/>
                </div>
              ))}
            </div>
          </BlockContainer>
        </div>
      </BlockContainer>
    </Block>
  )
}
