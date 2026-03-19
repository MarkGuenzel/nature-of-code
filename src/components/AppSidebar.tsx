import React from 'react'
import type { MDXProps } from 'mdx/types'
import type { Toc } from '@stefanprobst/rehype-extract-toc'

import { Link, useParams } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "./ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronRight } from 'lucide-react';

type MdxModule = {
  default: (props: MDXProps) => React.JSX.Element;
  tableOfContents: Toc;
};

const chaptersData = import.meta.glob<MdxModule>('../chapters/*.mdx', { eager: true });

export default function AppSidebar() {
  const { chapterId } = useParams();
  
  // Turn the glob object into a usable array
  const menuItems = Object.entries(chaptersData).map(([path, mdxModule]) => {
    const fileName = path.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, "");
    const subChapters = mdxModule.tableOfContents[0].children?.map(subChapter => {
      return {
        title: subChapter.value,
        link: `${fileName}#${subChapter.value.toLowerCase().replaceAll(" ", "-")}`
      }
    })

    return {
      chapterId: fileName,
      title: mdxModule.tableOfContents[0].value,
      subChapters: subChapters
    };
  });

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map(chapter  => {
              return (
                <Collapsible key={chapter.chapterId} className="group/collapsible">
                  <SidebarMenuItem className='flex'>
                    <SidebarMenuButton isActive={chapterId === chapter.chapterId}>
                      <Link to={`/nature-of-code/chapters/${chapter.chapterId}`} className='flex-auto'>
                        <span>{chapter.title}</span>
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
                        {chapter.subChapters?.map(subChapter => {
                          return (
                            <SidebarMenuSubItem key={subChapter.link}>
                              <SidebarMenuSubButton asChild>
                                <Link to={`/nature-of-code/chapters/${subChapter.link}`}>
                                  <span>{subChapter.title}</span>
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