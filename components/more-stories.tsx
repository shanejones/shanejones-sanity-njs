import dynamic from 'next/dynamic'
import tw from 'twin.macro'

function dynamicComponents(module: string) {
  return dynamic(() => import('../components').then((mod: any) => mod[module]) as Promise<React.FC<any>>)
}


import { PostProps } from '../types'
const PostPreview = dynamicComponents('PostPreview')

export default function MoreStories({ posts }: { posts: PostProps[] }) {
  const H2 = tw.h2`mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl`
  const PostsWrapper = tw.h2`grid grid-cols-1 mb-32 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32`

  return (
    <section>
      <H2>
        More Stories
      </H2>
      <PostsWrapper>
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </PostsWrapper>
    </section>
  )
}
