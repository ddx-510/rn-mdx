import React, { ComponentType, useMemo } from 'react'
import markdownComponents from './markdownComponents'
import MDX from '@mdx-js/runtime'
import { MarkdownStyles, styles } from './style/styles'

const defaultScope = {}

type RenderMdxProps = {
  children?: string
  scope?: Record<string, unknown>
  components?: Record<string, ComponentType>
  componentStyle?: MarkdownStyles
  remarkPlugins?: any[]
  rehypePlugins?: any[]
}

export function RenderMdx({
  children,
  components = {},
  scope = {},
  componentStyle = {},
  remarkPlugins = [],
  rehypePlugins = []
}: RenderMdxProps) {
  const defaultComponents = useMemo(
    () => markdownComponents(styles(componentStyle)),
    [componentStyle]
  )

  const defaultRemarkPlugins = useMemo(() => [], [])
  const defaultRehypePlugins = useMemo(() => [], [])

  const contentScope = { ...defaultScope, ...scope }

  const mdxComponents = useMemo(
    () => ({ ...defaultComponents, ...components }),
    [components, defaultComponents]
  )

  const remarkPluginsArray = useMemo(() => [...defaultRemarkPlugins, ...remarkPlugins], [remarkPlugins])
  const rehypePluginsArray = useMemo(() => [...defaultRehypePlugins, ...rehypePlugins], [rehypePlugins])

  return (
    <MDX components={mdxComponents} scope={contentScope} remarkPlugins={remarkPluginsArray} rehypePlugins={rehypePluginsArray}>
      {children}
    </MDX>
  )
}
