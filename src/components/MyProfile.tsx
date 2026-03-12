import { siGithub } from "simple-icons";
import { Mail } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"

export default function MyProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex">
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/MarkGuenzel"/>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight pl-2">
            <span className="truncate font-medium">Mark Günzel</span>
            <span className="truncate text-xs">mark.guenzel@gmail.com</span>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground/90 px-2 py-2">
            Socials
          </DropdownMenuLabel>
          
          <DropdownMenuItem asChild>
            <a href="https://github.com/MarkGuenzel" className="flex w-full items-center">
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d={siGithub.path} />
              </svg>
              <span>GitHub</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="https://linkedin.com/in/..." className="flex w-full items-center">
              <Mail/>
              <span className="pl-2">LinkedIn</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator/>

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground/90 px-2 py-2">
            Projects
          </DropdownMenuLabel>
          <DropdownMenuItem>ASCII Tree Generator</DropdownMenuItem>
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}