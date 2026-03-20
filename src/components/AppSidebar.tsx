import { Link, useParams } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "./ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronRight } from 'lucide-react';
import type { MdxModule, ChapterMetaData } from '@/types/mdx';

const chapterFiles = import.meta.glob<MdxModule>('../chapters/*.mdx', { eager: true });

const chapterMetaData: ChapterMetaData[] = Object.entries(chapterFiles).map(([path, mdxModule]) => {
  const fileName = path.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, "");
  const [root] = mdxModule.tableOfContents;

  const subChapters = root.children?.map((child) => ({
    title: child.value,
    link: `${fileName}#${child.value.toLowerCase().replaceAll(" ", "-")}`
  })) ?? [];

  return {
    chapterId: fileName,
    title: root.value,
    subChapters: subChapters
  };
});


export default function AppSidebar() {
  const { chapterId } = useParams();

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {chapterMetaData.map(chapter  => {
              return (
                <Collapsible key={chapter.chapterId} className="group/collapsible">
                  <SidebarMenuItem className='flex'>
                    <SidebarMenuButton isActive={chapterId === chapter.chapterId}>
                      <Link to={`/chapters/${chapter.chapterId}`} className='flex-auto'>
                        {chapter.title}
                      </Link>
                    </SidebarMenuButton>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className='w-fit'>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                        {chapter.subChapters.map(subChapter => {
                          return (
                            <SidebarMenuSubItem key={subChapter.link}>
                              <SidebarMenuSubButton asChild>
                                <Link to={`/chapters/${subChapter.link}`}>
                                  {subChapter.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}