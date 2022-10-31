import tw from 'twin.macro'

export default function Container({ children }) {
  const Wrapper = tw.div`container px-5 mx-auto`

  return <Wrapper>{children}</Wrapper>
}
