import CloudinaryImage from '@components/CloudinaryImage'
import Summary from '@components/basic/Summary'
import ReactMarkdown from 'react-markdown'

function ArticleCard({post,summary = false}) {
  const {content,data,filePath} = post
  return (
    <div key={post.data.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0">
        <div className="aspect-w-16 aspect-h-9">
          <CloudinaryImage
            src={post.data.featured_image}
            alt={post.data.featured_alt}
            width={300}
            height={250}
            className="h-full w-full object-cover"
            transform="w_300,ar_16:9,c_fill,g_auto,f_auto"
            layout="responsive"
            ariaHidden={true}
          />
        </div>
        </div>
        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
          <div className="flex-1">
            {/* <p className="text-sm font-medium text-indigo-600">
              <a href={post.category.href} className="hover:underline">
                {post.category.name}
              </a>
            </p> */}
              <p className="text-xl font-semibold text-gray-900">{post.data.title}</p>
              {summary ? (
                <Summary>
                  <ReactMarkdown children={content}/>
                </Summary>
              ) : ''
              }
          </div>
          <div className="mt-6 flex items-center">
            <time dateTime={post.datetime}>{post.date}</time>
          </div>
        </div>
    </div>
  );
}

export default ArticleCard;