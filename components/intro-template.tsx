import Image from 'next/image'
import { useEffect, useState } from 'react'
import tw from 'twin.macro'

import introTemplateImg from '../images/introTemplateImg.png'

export default function IntroTemplate() {
  const [studioURL, setStudioURL] = useState(null)
  const [createPostURL, setCreatePostURL] = useState(null)
  const [isLocalHost, setIsLocalhost] = useState(false)

  const hasEnvFile = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const hasRepoEnvVars =
    process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER &&
    process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER &&
    process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG
  const repoURL = `https://${process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER}.com/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}`
  const removeBlockURL = hasRepoEnvVars
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER}.com/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}/blob/main/README.md#how-can-i-remove-the-next-steps-block-from-my-blog`
    : `https://github.com/sanity-io/nextjs-blog-cms-sanity-v3#how-can-i-remove-the-next-steps-block-from-my-blog`

  const [hasUTMtags, setHasUTMtags] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setStudioURL(`${window.location.href}studio`)
      setCreatePostURL(
        `${window.location.href}/studio/intent/create/template=post;type=post/`
      )
      setIsLocalhost(window.location.hostname === 'localhost')
      setHasUTMtags(window.location.search.includes('utm'))
    }
  }, [])

  if (hasUTMtags) {
    return
  }


  const Wrapper = tw.div`flex justify-center border border-gray-200 bg-gray-50`
  const Inner = tw.div`grid grid-cols-1 mt-20 mb-8 max-w-screen-2xl gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32`
  const ImageWrapper = tw.div`self-center`
  const InnerMain = tw.div`mx-6 md:mx-0 md:mr-24`
  const H2 = tw.div`mb-8 text-xl font-bold tracking-wide md:text-5xl`
  const RemoveWrapper = tw.div`hidden mt-2 px-14 md:block`
  const TextWrapper = tw.div`text-xs text-gray-700`
  const Anchor = tw.a`mx-1 underline hover:text-blue-800`
  const AnchorInline = tw.a`inline-flex mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-800`
  const BoxTextWrapper = tw.div`col-span-2 mt-1 mb-2 font-semibold`
  const BoxPreWrap = tw.div`px-2 mt-2 w-full bg-gray-200`
  const BoxRemoveBlockWrap = tw.div`text-xs text-center text-gray-700 md:invisible`
  const BoxLi = tw.li`mb-2`
  const EnvAlert = tw.div`p-4 mb-6 text-sm text-yellow-700 bg-yellow-100 rounded-lg`
  const TopMargin = tw.div`mt-3`


  return (
    <Wrapper>
      <Inner>
        <ImageWrapper>
          <Image
            alt={'Cover Image IntroTemplate'}
            src={introTemplateImg}
            priority={true}
            quality={90}
            placeholder="blur"
          />
          <RemoveWrapper>
            <RemoveBlock url={removeBlockURL} />
          </RemoveWrapper>
        </ImageWrapper>

        <InnerMain>
          <H2>
            Next steps
          </H2>

          {!hasEnvFile && (
            <EnvAlert
              role="alert"
            >
              {`It looks like you haven't set up the local environment variables.`}
              <p>
                <Anchor
                  href={
                    'https://github.com/sanity-io/nextjs-blog-cms-sanity-v3#step-2-set-up-the-project-locally'
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {`Here's how to set them up locally`}
                </Anchor>
              </p>
            </EnvAlert>
          )}

          <ol>
            <Box
              circleTitle="1"
              element={
                <div>
                  <BoxTextWrapper>
                    Create content with Sanity Studio
                  </BoxTextWrapper>
                  <TextWrapper>
                    Your Sanity Studio is deployed at
                    <Anchor
                      target="_blank"
                      rel="noreferrer"
                      href={studioURL}
                    >
                      {studioURL}
                    </Anchor>
                  </TextWrapper>

                  <TopMargin>
                    <AnchorInline
                      href={createPostURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Go to Sanity Studio
                    </AnchorInline>
                  </TopMargin>
                </div>
              }
            />

            <Box
              circleTitle="2"
              element={
                <div>
                  <BoxTextWrapper>
                    Modify and deploy the project
                  </BoxTextWrapper>

                  {isLocalHost ? (
                    <TextWrapper>
                      Start editing your content structure by changing the post
                      schema in
                      <BoxPreWrap>
                        <pre>schemas/post.ts</pre>
                      </BoxPreWrap>
                    </TextWrapper>
                  ) : (
                    <>
                      <TextWrapper>
                        Your code can be found at
                        <Anchor
                          href={repoURL}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {repoURL}
                        </Anchor>
                      </TextWrapper>

                      <TopMargin>
                        <AnchorInline
                          href={repoURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Go to {getGitProvider()} repo
                        </AnchorInline>
                      </TopMargin>
                    </>
                  )}
                </div>
              }
            />

            <Box
              circleTitle="3"
              element={
                <div>
                  <BoxTextWrapper>
                    Learn more and get help
                  </BoxTextWrapper>
                  <ul>
                    <BoxLi>
                      <BlueLink
                        href="https://www.sanity.io/docs"
                        text="Documentation for Sanity"
                      />
                    </BoxLi>
                    <BoxLi>
                      <BlueLink
                        href="https://nextjs.org/docs"
                        text="Documentation for Next.js"
                      />
                    </BoxLi>
                    <BoxLi>
                      <BlueLink
                        href="https://slack.sanity.io/"
                        text="Join the Sanity Community"
                      />
                    </BoxLi>
                  </ul>
                </div>
              }
            />
          </ol>
          <BoxRemoveBlockWrap>
            <RemoveBlock url={removeBlockURL} />
          </BoxRemoveBlockWrap>
        </InnerMain>
      </Inner>
    </Wrapper>
  )
}

function Box({
  circleTitle,
  element,
}: {
  circleTitle: string
  element: JSX.Element
  }) {
  
  const Wrapper = tw.li`grid grid-flow-col grid-rows-1 gap-3 mt-2 place-content-start`
  const Inner = tw.div`row-span-3 select-none`
  const TitleWrapper = tw.div`relative flex items-center justify-center w-6 h-6 p-4 text-center bg-gray-200 rounded-full select-none`
  
  return (
    <Wrapper>
      <Inner>
        <TitleWrapper>
          {circleTitle}
        </TitleWrapper>
      </Inner>
      {element}
    </Wrapper>
  )
}

function BlueLink({ href, text }: { href: string; text: string }) {
  const Anchor = tw.a`text-blue-500 underline hover:text-blue-800`
  
  return (
    <Anchor
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {text}
    </Anchor>
  )
}

const RemoveBlock = ({ url }) => {
  const Anchor = tw.a`hover:text-blue-800`
  
  return (
  <Anchor
    href={url}
    target="_blank"
    rel="noreferrer"
  >
    How to remove this block?
  </Anchor>
)
}
function getGitProvider() {
  switch (process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER) {
    case 'gitlab':
      return 'GitLab'
    case 'bitbucket':
      return 'Bitbucket'
    default:
      return 'GitHub'
  }
}
