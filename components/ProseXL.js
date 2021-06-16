import ReactMarkdown from 'react-markdown'
import { MDXRemote } from 'next-mdx-remote'
import shortcodes from '@lib/shortcodes'

function ProseXL({children}) {
  console.log(children)
  return (
    <div className="prose prose-xl">
      {children.map(content => {
        return (content)
      })}
    </div>
  );
}

export default ProseXL;