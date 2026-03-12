import React, { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';

export default function ChapterViewer() {
  const { chapterId } = useParams();

  const Content = useMemo(() => {
      return React.lazy(() => import(`../chapters/${chapterId}.mdx`));
    }, [chapterId]);

  return (
    <Suspense fallback={<div>Loading chapter...</div>}>
      <article className="prose prose-slate lg:prose-xl dark:prose-invert text-left">
        <Content />
      </article>
    </Suspense>
  )
}