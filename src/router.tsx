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
const Floors = Loader(lazy(() => import('src/views/applications/Floors')));
const Building = Loader(lazy(() => import('src/views/applications/Building')));
const Employees = Loader(lazy(() => import('src/views/applications/Employees')));
const Staffs = Loader(lazy(() => import('src/views/applications/Staffs')));
const Companies = Loader(lazy(() => import('src/views/applications/Companies')));
const UsedServices = Loader(lazy(() => import('src/views/applications/UsedServices')));
const UsedAreas = Loader(lazy(() => import('src/views/applications/UsedAreas')));
const Positions = Loader(lazy(() => import('src/views/applications/Positions')));
const WorkedTimes = Loader(lazy(() => import('src/views/applications/WorkedTimes')));
const SalaryStaffs = Loader(lazy(() => import('src/views/applications/SalaryStaffs')));
const CompanyStatistics = Loader(lazy(() => import('src/views/applications/CompanyStatistics')));

const FormBuilding = Loader(lazy(() => import('src/views/applications/Building/FormBuilding')));
const FormCompany = Loader(lazy(() => import('src/views/applications/Companies/FormCompany')));
const FormStaff = Loader(lazy(() => import('src/views/applications/Staffs/FormStaff')));
const FormEmployee = Loader(lazy(() => import('src/views/applications/Employees/FormEmployee')));
const FormService = Loader(lazy(() => import('src/views/applications/Services/FormService')));
const FormFloor = Loader(lazy(() => import('src/views/applications/Floors/FormFloor')));
const FormUsedService = Loader(lazy(() => import('src/views/applications/UsedServices/FormUsedService')));
const FormUsedArea = Loader(lazy(() => import('src/views/applications/UsedAreas/FormUsedArea')));
const FormPosition = Loader(lazy(() => import('src/views/applications/Positions/FormPosition')));
const FormWorkedTime = Loader(lazy(() => import('src/views/applications/WorkedTimes/FormWorkedTime')));

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
            to="building-information"
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
        path: 'edit-employee/:id',
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
        path: 'edit-staff/:id',
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
        path: 'edit-company/:id',
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
      {
        path: 'edit-service/:id',
        element: <FormService />
      },
      {
        path: 'floors',
        element: <Floors />
      },
      {
        path: 'add-floor',
        element: <FormFloor />
      },
      {
        path: 'edit-floor/:id',
        element: <FormFloor />
      },
      {
        path: 'positions',
        element: <Positions />
      },
      {
        path: 'add-position',
        element: <FormPosition />
      },
      {
        path: 'edit-position/:id',
        element: <FormPosition />
      }
    ]
  },

  {
    path: 'statistics',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="used-services"
            replace
          />
        )
      },
      {
        path: 'used-services',
        element: <UsedServices />
      },
      {
        path: 'edit-used-service/:id',
        element: <FormUsedService />
      },
      {
        path: 'add-used-service',
        element: <FormUsedService />
      },
      {
        path: 'used-areas',
        element: <UsedAreas />
      },
      {
        path: 'edit-used-area/:id',
        element: <FormUsedArea />
      },
      {
        path: 'add-used-area',
        element: <FormUsedArea />
      },
      {
        path: 'worked-times',
        element: <WorkedTimes />
      },
      {
        path: 'edit-worked-time/:id',
        element: <FormWorkedTime />
      },
      {
        path: 'add-worked-time',
        element: <FormWorkedTime />
      },
    ]
  },
  {
    path: 'report',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="salary-staff"
            replace
          />
        )
      },
      {
        path: 'salary-staff',
        element: <SalaryStaffs />
      },
      {
        path: 'company-statistics',
        element: <CompanyStatistics />
      },
    ]
  }
];

export default routes;
