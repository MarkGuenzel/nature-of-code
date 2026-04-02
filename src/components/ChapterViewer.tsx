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
    <div className='max-w-4xl mx-auto px-4'>
      <article className="prose prose-slate lg:prose-xl dark:prose-invert text-left max-w-none">
        {!Content ? <div>Chapter not found</div> : <Content />}
      </article>
    </div>

  )
}