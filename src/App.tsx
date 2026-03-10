import './App.css'
import AppNavbar from './components/AppNavbar'
import AppSidebar from './components/AppSidebar'
import { SidebarProvider } from './components/ui/sidebar'
import { ThemeProvider } from './components/ui/theme-provider'
import Introduction from './chapters/0-introduction.mdx'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='flex'>
        <SidebarProvider>
          <AppSidebar />
          <main className='w-full'>
            <AppNavbar />

            <div className='flex justify-center p-8'>
              <article className="prose prose-slate lg:prose-xl dark:prose-invert text-left">
                <Introduction />
              </article>
            </div>
          </main>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}

export default App
