import dynamic from 'next/dynamic'
import tw from 'twin.macro'

function dynamicComponents(module: string) {
  return dynamic(() => import('../components').then((mod: any) => mod[module]) as Promise<React.FC<any>>)
}

import { PostProps } from '../types'
const Avatar = dynamicComponents('Avatar')
const CoverImage = dynamicComponents('CoverImage')
const Date = dynamicComponents('Date')
const PostTitle = dynamicComponents('PostTitle')

export default function PostHeader(props: PostProps) {
  const AuthorWrapper = tw.div`hidden md:mb-12 md:block`
  const ImageWrapper = tw.div`mb-8 sm:mx-0 md:mb-16`
  const SecondaryWrapper = tw.div`max-w-2xl mx-auto`
  const SecondaryAuthorWrapper = tw.div`block mb-6 md:hidden`
  const DateWrapper = tw.div`mb-6 text-lg`

  const { title, coverImage, date, author, slug } = props
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <AuthorWrapper>
        {author && <Avatar name={author.name} picture={author.picture} />}
      </AuthorWrapper>
      <ImageWrapper>
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      </ImageWrapper>
      <SecondaryWrapper>
        <SecondaryAuthorWrapper>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </SecondaryAuthorWrapper>
        <DateWrapper>
          <Date dateString={date} />
        </DateWrapper>
      </SecondaryWrapper>
    </>
  )
}
