import * as React from 'react'
import { 
  createRouter, 
  RouterProvider, 
  createRootRoute, 
  createRoute as createTanStackRoute, 
  createFileRoute,
  Outlet 
} from '@tanstack/react-router'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Game from "./pages/Game";
import LeaderboardPage from "./pages/Leaderboard";
import About from "./pages/About";

const queryClient = new QueryClient();

// Create root route with Layout
const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Layout>
          <Outlet />
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  ),
})

// Create routes
const indexRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
})

const playRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/play',
  component: Game,
})

const leaderboardRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/leaderboard',
  component: LeaderboardPage,
})

const aboutRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
})

// Catch-all route to prevent 404s (redirect to home)
const notFoundRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '$',
  component: Index, // Redirect to home on unknown routes
})

// Create route tree
const routeTree = rootRoute.addChildren([indexRoute, playRoute, leaderboardRoute, aboutRoute, notFoundRoute])

// Create router
const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent' as const,
  defaultPreloadStaleTime: 0,
})

// Register for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => <RouterProvider router={router} />

export default App;