/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import { PortableText } from '@portabletext/react'
import tw from 'twin.macro'

// import portableTextStyles from './portable-text-styles.module.css'

export default function PostBody({ content }) {
const PortableTextWrapper = tw.div`mx-auto max-w-2xl`

  return (
    <PortableTextWrapper>
      <PortableText value={content} />
    </PortableTextWrapper>
  )
}
