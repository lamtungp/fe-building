import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component: any) => (props: any) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Applications

const Services = Loader(lazy(() => import('src/views/applications/Services')));
const Building = Loader(lazy(() => import('src/views/applications/Building')));
const Employees = Loader(lazy(() => import('src/views/applications/Employees')));
const Staffs = Loader(lazy(() => import('src/views/applications/Staffs')));
const Companies = Loader(lazy(() => import('src/views/applications/Companies')));

const FormBuilding = Loader(lazy(() => import('src/views/applications/Building/FormBuilding')));
const FormCompany = Loader(lazy(() => import('src/views/applications/Companies/FormCompany')));
const FormStaff = Loader(lazy(() => import('src/views/applications/Staffs/FormStaff')));
const FormEmployee = Loader(lazy(() => import('src/views/applications/Employees/FormEmployee')));
const FormService = Loader(lazy(() => import('src/views/applications/Services/FormService')));


// const UserProfile = Loader(lazy(() => import('src/content/applications/Users/profile')));
// const UserSettings = Loader(lazy(() => import('src/content/applications/Users/settings')));

// Status

const Status404 = Loader(lazy(() => import('src/views/pages/Status404')));

const routes: PartialRouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/dashboard',
        element: <SidebarLayout />
      },
      {
        path: '/',
        element: (
          <Navigate
            to="/dashboard"
            replace
          />
        )
      },
     
      {
        path: '*',
        element: <Status404 />
      },
    ]
  },

  {
    path: 'building',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: 'edit-profile',
        element: <FormBuilding />
      }
    ]
  },
  
  {
    path: 'management',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/management/building-information"
            replace
          />
        )
      },
      {
        path: 'building-information',
        element: <Building />
      },
      {
        path: 'employees',
        element: <Employees />
      },
      {
        path: 'add-employee',
        element: <FormEmployee />
      },
      {
        path: 'staff-building',
        element: <Staffs />
      },
      {
        path: 'add-staff',
        element: <FormStaff />
      },
      {
        path: 'companies',
        element: <Companies />,
      },
      {
        path: 'add-company',
        element: <FormCompany />
      },
      {
        path: 'services',
        element: <Services />
      },
      {
        path: 'add-service',
        element: <FormService />
      },
    ]
  },
];

export default routes;
