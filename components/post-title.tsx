
import tw from 'twin.macro'

export default function PostTitle({ children }) {
  const H1 = tw.h1`mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl`

  return (
    <H1>
      {children}
    </H1>
  )
}
