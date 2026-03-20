// types/mdx.d.ts
import type { MDXProps } from 'mdx/types'

export interface TocItem {
  value: string;
  depth: number;
  id: string;
  children?: Array<TocItem>;
}

export type Toc = Array<TocItem>;

declare module '@stefanprobst/rehype-extract-toc' {
  export type { TocItem, Toc };
}

declare module '*.mdx' {
  export const tableOfContents: Toc
  export default function MDXContent(props: MDXProps): JSX.Element
}

export type MdxModule = {
  default: (props: MDXProps) => JSX.Element;
  tableOfContents: Toc;
};

export type ChapterMetaData = {
  chapterId: string,
  title: string,
  subChapters: {
    title: string,
    link: string
  }[]
}