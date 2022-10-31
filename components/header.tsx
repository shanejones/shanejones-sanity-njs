import Link from 'next/link'
import tw from 'twin.macro'

export default function Header({ title }) {
  const H2 = tw.h2`mt-8 mb-20 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter`

  return (
    <H2>
      <Link href="/" tw="hover:underline">
        {title}
      </Link>
    </H2>
  )
}
