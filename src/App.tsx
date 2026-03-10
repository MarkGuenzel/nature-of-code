import './App.css'
import AppNavbar from './components/AppNavbar'
import AppSidebar from './components/AppSidebar'
import { SidebarProvider } from './components/ui/sidebar'
import { ThemeProvider } from './components/ui/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='flex'>
        <SidebarProvider>
          <AppSidebar />
          <main className='w-full'>
            <AppNavbar />
            <h1>Introduction</h1>
            <h2>Perlin Noise</h2>
          </main>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}

export default App
