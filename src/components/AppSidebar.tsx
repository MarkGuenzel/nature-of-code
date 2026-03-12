import { Link, useParams } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

type SidebarProps = {
  chapters: string[]
}

export default function AppSidebar({ chapters }: SidebarProps) {
  const { chapterId } = useParams();

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          {chapters.map((filePath) => {
            const fileName = filePath.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, "");

            return (
              <SidebarMenuItem key={fileName}>
                <SidebarMenuButton asChild isActive={chapterId == fileName}>
                  <Link to={`/chapters/${fileName}`}>
                    <span>{fileName}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}