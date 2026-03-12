import { Outlet } from 'react-router-dom'
import './App.css'
import AppNavbar from './components/AppNavbar'
import AppSidebar from './components/AppSidebar'
import { SidebarProvider } from './components/ui/sidebar'

const chapters = import.meta.glob("/src/chapters/*.mdx")

export default function App() {
  return (
    <div className='flex'>
      <SidebarProvider>
        <AppSidebar chapters={Object.keys(chapters)}/>
        <main className='w-full'>
          <AppNavbar />
          <div className='flex justify-center p-8'>
            <Outlet /> 
          </div>
        </main>
      </SidebarProvider>
    </div>
  )
}