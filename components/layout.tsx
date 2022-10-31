import dynamic from 'next/dynamic'
import tw from 'twin.macro'

function dynamicComponents(module: string) {
  return dynamic(() => import('../components').then((mod: any) => mod[module]) as Promise<React.FC<any>>)
}

const Alert = dynamicComponents('Alert')
const Meta = dynamicComponents('Meta')


export default function Layout({ preview, children }) {
const LayoutInner = tw.div`min-h-screen`

  return (
    <>
      <Meta />
      <LayoutInner>
        {preview && <Alert preview={preview} />}
        <main>{children}</main>
      </LayoutInner>
    </>
  )
}
