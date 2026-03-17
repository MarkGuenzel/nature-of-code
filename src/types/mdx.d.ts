declare module '@stefanprobst/rehype-extract-toc' {
  export interface TocItem {
    value: string;
    depth: number;
    id: string;
    children?: Array<TocItem>;
  }
  export type Toc = Array<TocItem>;
}

declare module '*.mdx' {
  import type { MDXProps } from 'mdx/types'
  import type { Toc } from '@stefanprobst/rehype-extract-toc'

  export const tableOfContents: Toc
  export default function MDXContent(props: MDXProps): JSX.Element
}