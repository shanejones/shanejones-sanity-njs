import dynamic from 'next/dynamic'
import Link from 'next/link'
import tw from 'twin.macro'

function dynamicComponents(module: string) {
  return dynamic(() => import('../components').then((mod: any) => mod[module]) as Promise<React.FC<any>>)
}


const Container = dynamicComponents('Container')

export default function Alert({ preview }) {

  const Wrapper = tw.div`border-b border-accent-7 bg-accent-7 text-white`
  const Inner = tw.div`py-2 text-sm text-center`

  return (
    <Wrapper>
      <Container>
        <Inner>
          {preview && (
            <>
              This page is a preview.{' '}
              <Link
                href="/api/exit-preview"
                tw="underline transition-colors duration-200 hover:text-cyan"
              >
                Click here
              </Link>{' '}
              to exit preview mode.
            </>
          )}
        </Inner>
      </Container>
    </Wrapper>
  )
}
