import dynamic from 'next/dynamic'
import { serialize } from 'next-mdx-remote/serialize'
import {useState,useEffect} from 'react'
// import { getPosts } from '@lib/pages'
import note from '../../_data/notification.json'
import BlockContainer from '@components/blocks/BlockContainer'

const ArticleCardLink = dynamic(() => import('../../components/basic/ArticleCardLink'))
const Head = dynamic(() => import('next/head'))
const Layout = dynamic(() => import('../../components/Layout'))
const PaginatedPosts = dynamic(() => import('../../components/basic/PaginatedPosts'))

const PAGE_DIR = '/blog'
const PER_PAGE = 10;


export default function Index({posts,source,data,heroSource}) {

  const [page, setPage] = useState(1);
  const [per,setPer] = useState(PER_PAGE)

  return (
    <Layout title={data.title} metaTitle={data.meta_title} description={data.page_description} hero={data.hero}>
      <Head>
        <title>Updates</title>
      </Head>
      <BlockContainer landingPage={true}>
        <PaginatedPosts
          // data={posts}
          // search={search}
          RenderComponent={ArticleCardLink}
          title="Posts"
          pageLimit={10}
          dataLimit={10}
          per={12}
          section={PAGE_DIR }
          />
      </BlockContainer>
    </Layout>
  )
}


export async function getStaticProps(context){
  note.processed = await serialize(note.content)
  // const res = await fetch(`${process.env.BASE_URL}/api/search?${`q=${search}`}`)
  // const data = await res.json()

  const { params } = context
  // Get Posts
  // const posts = getPosts(PAGE_DIR,1,12)

  // console.log('posts',data )

  return {
    props: {
      note: note,
      posts: [],
      data: {
        title: "Updates"
      }
    },
  }
}