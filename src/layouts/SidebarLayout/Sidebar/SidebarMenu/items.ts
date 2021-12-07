import { ReactNode } from 'react';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import PeopleIcon from '@mui/icons-material/People';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeIcon from '@mui/icons-material/Home';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import SettingsOverscanIcon from '@mui/icons-material/SettingsOverscan';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: 'Dashboard',
    items: [
      {
        name: 'Dashboard',
        icon: HomeIcon,
        link: '/dashboard'
      }
    ]
  },
  {
    heading: 'Management',
    items: [
      {
        name: 'Building information',
        icon: HomeWorkIcon,
        link: '/management/building-information'
      },
      {
        name: 'Floors',
        icon: RoomPreferencesIcon,
        link: '/management/floors'
      },
      {
        name: 'Employees',
        icon: PeopleIcon,
        link: '/management/employees'
      },
      {
        name: 'Staff building',
        icon: PeopleOutlineIcon,
        link: '/management/staff-building'
      },
      {
        name: 'Companies',
        icon: ApartmentIcon,
        link: '/management/companies'
      },
      {
        name: 'Services',
        icon: MiscellaneousServicesIcon,
        link: '/management/services'
      }
    ]
  },
  {
    heading: 'Statistics',
    items: [
      {
        name: 'Used Services',
        icon: PermDataSettingIcon,
        link: '/statistics/used-services'
      },
      {
        name: 'Used Areas',
        icon: SettingsOverscanIcon,
        link: '/statistics/used-areas'
      }
    ]
  }
];

export default menuItems;
