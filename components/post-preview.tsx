import dynamic from 'next/dynamic'
import Link from 'next/link'
import tw from 'twin.macro'

function dynamicComponents(module: string) {
  return dynamic(() => import('../components').then((mod: any) => mod[module]) as Promise<React.FC<any>>)
}

import { PostProps } from '../types'
const Avatar = dynamicComponents('Avatar')
const CoverImage = dynamicComponents('CoverImage')
const Date = dynamicComponents('Date')

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: PostProps) {
  const ImageWrapper = tw.div`mb-5`
  const H3 = tw.h3`mb-3 text-3xl leading-snug`
  const DateWrapper = tw.div`mb-4 text-lg`
  const P = tw.p`mb-4 text-lg leading-relaxed`

  return (
    <div>
      <ImageWrapper>
        <CoverImage
          slug={slug}
          title={title}
          image={coverImage}
          priority={false}
        />
      </ImageWrapper>
      <H3>
        <Link href={`/posts/${slug}`} tw="hover:underline">
          {title}
        </Link>
      </H3>
      <DateWrapper>
        <Date dateString={date} />
      </DateWrapper>
      <P>{excerpt}</P>
      {author && <Avatar name={author.name} picture={author.picture} />}
    </div>
  )
}
