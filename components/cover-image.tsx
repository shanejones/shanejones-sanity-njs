import Image from 'next/image'
import Link from 'next/link'
import tw from 'twin.macro'

import { urlForImage } from '../lib/sanity'

interface CoverImageProps {
  title: string
  slug?: string
  image: any
  priority?: boolean
}

export default function CoverImage(props: CoverImageProps) {
  const Wrapper = tw.div`shadow-small transition-shadow duration-200 hover:shadow-medium`
  const Spacer = tw.div`pt-[50%] bg-gray-200`
  const LinkWrap = tw.div`sm:mx-0`

  const { title, slug, image: source, priority } = props
  const image = source?.asset?._ref ? (
    <Wrapper>
      <Image
        tw="w-full h-auto"
        width={2000}
        height={1000}
        alt={`Cover Image for ${title}`}
        src={urlForImage(source).height(1000).width(2000).url()}
        sizes="100vw"
        priority={priority}
      />
    </Wrapper>
  ) : (
    <Spacer />
  )

  return (
    <LinkWrap>
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </LinkWrap>
  )
}
