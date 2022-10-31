import tw from 'twin.macro'

import { CMS_NAME, CMS_URL } from '../lib/constants'

export default function BlogHeader({ title }) {
  const Wrapper = tw.section`flex flex-col items-center mt-16 mb-10 md:mb-12 md:flex-row md:justify-between`
  const H1 = tw.h1`text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl`
  const H4 = tw.h1`mt-5 text-lg text-center md:pl-8 md:text-left`
  const Anchor = tw.a`underline transition-colors duration-200 hover:text-success`

  return (
    <Wrapper>
      <H1>
        {title}
      </H1>
      <H4>
        A statically generated blog example using{' '}
        <Anchor
          href="https://nextjs.org/"
        >
          Next.js
        </Anchor>{' '}
        and{' '}
        <Anchor
          href={CMS_URL}
        >
          {CMS_NAME}
        </Anchor>
        .
      </H4>
    </Wrapper>
  )
}
