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

export default function HeroPost(props: PostProps) {
  const ImageWrap = tw.div`mb-8 md:mb-16`
  const SectonInner = tw.div`mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8`
  const LinkWrap = tw.h3`mb-4 text-4xl leading-tight lg:text-6xl`
  const DateWrap = tw.div`mb-4 text-lg md:mb-0`
  const P = tw.div`mb-4 text-lg leading-relaxed`

  const { title, coverImage, date, excerpt, author, slug } = props
  return (
    <section>
      <ImageWrap>
        <CoverImage slug={slug} title={title} image={coverImage} priority />
      </ImageWrap>
      <SectonInner>
        <div>
          <LinkWrap>
            <Link href={`/posts/${slug}`} tw="hover:underline">
              {title}
            </Link>
          </LinkWrap>
          <DateWrap>
            <Date dateString={date} />
          </DateWrap>
        </div>
        <div>
          <P>{excerpt}</P>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </SectonInner>
    </section>
  )
}
