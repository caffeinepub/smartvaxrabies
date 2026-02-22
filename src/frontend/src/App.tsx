import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import StrayDogSubmission from './pages/StrayDogSubmission';
import StrayDogGallery from './pages/StrayDogGallery';
import Shop from './pages/Shop';
import Events from './pages/Events';
import Community from './pages/Community';
import About from './pages/About';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
});

const strayDogSubmissionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/stray-dogs/submit',
  component: StrayDogSubmission,
});

const strayDogGalleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/stray-dogs/gallery',
  component: StrayDogGallery,
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/shop',
  component: Shop,
});

const eventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/events',
  component: Events,
});

const communityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/community',
  component: Community,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  registerRoute,
  strayDogSubmissionRoute,
  strayDogGalleryRoute,
  shopRoute,
  eventsRoute,
  communityRoute,
  aboutRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
