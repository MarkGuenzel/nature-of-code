import { useParams } from 'react-router-dom';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import type { MdxModule } from '@/types/mdx';

const chaptersData = import.meta.glob<MdxModule>('../chapters/*.mdx', { eager: true });

export default function ChapterViewer() {
  const { chapterId } = useParams();
  useScrollToHash();

  const module = chaptersData[`../chapters/${chapterId}.mdx`];
  const Content = module?.default;

  return (
    <article className="prose prose-slate lg:prose-xl dark:prose-invert text-left">
      {!Content ? <div>Chapter not found</div> : <Content />}
    </article>
  )
}