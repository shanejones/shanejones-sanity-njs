import Image from 'next/image'
import tw from 'twin.macro'

import { urlForImage } from '../lib/sanity'
import { AuthorProps } from '../types'

export default function Avatar(props: AuthorProps) {
  const { name, picture } = props

  const Wrapper = tw.div`flex items-center`
  const ImageWrapper = tw.div`relative w-12 h-12 mr-4`
  const Name = tw.div`text-xl font-bold`
  
  return (
    <Wrapper>
      <ImageWrapper>
        <Image
          src={
            picture?.asset?._ref
              ? urlForImage(picture).height(96).width(96).fit('crop').url()
              : 'https://source.unsplash.com/96x96/?face'
          }
          tw="rounded-full"
          height={96}
          width={96}
          alt={name}
        />
      </ImageWrapper>
      <Name>{name}</Name>
    </Wrapper>
  )
}
