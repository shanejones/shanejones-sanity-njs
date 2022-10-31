import dynamic from 'next/dynamic'
import ErrorPage from 'next/error'
import Head from 'next/head'

function dynamicComponents(module: string) {
  return dynamic(() => import('../../components').then((mod: any) => mod[module]) as Promise<React.FC<any>>)
}

import { useRouter } from 'next/router'

const Container = dynamicComponents('Container')
const Header = dynamicComponents('Header')
const Layout = dynamicComponents('Layout')
const MoreStories = dynamicComponents('MoreStories')
const PostBody = dynamicComponents('PostBody')
const PostHeader = dynamicComponents('PostHeader')
const PostTitle = dynamicComponents('PostTitle')
const SectionSeparator = dynamicComponents('SectionSeparator')

import { postQuery, postSlugsQuery, settingsQuery } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { PostProps } from '../../types'

interface Props {
  data: { post: PostProps; morePosts: any }
  preview: any
  blogSettings: any
}

export default function Post(props: Props) {
  const { data: initialData, preview, blogSettings } = props
  const router = useRouter()

  const slug = initialData?.post?.slug
  const { data } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: initialData,
    enabled: preview && !!slug,
  })
  const { post, morePosts } = data || {}
  const { title = 'Blog.' } = blogSettings || {}

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header title={title} />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{`${post.title} | ${title}`}</title>
                {post.coverImage?.asset?._ref && (
                  <meta
                    key="ogImage"
                    property="og:image"
                    content={urlForImage(post.coverImage)
                      .width(1200)
                      .height(627)
                      .fit('crop')
                      .url()}
                  />
                )}
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const { post, morePosts } = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  })
  const blogSettings = await getClient(preview).fetch(settingsQuery)

  return {
    props: {
      preview,
      data: {
        post,
        morePosts: overlayDrafts(morePosts),
      },
      blogSettings,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export async function getStaticPaths() {
  const paths = await getClient(false).fetch(postSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}
