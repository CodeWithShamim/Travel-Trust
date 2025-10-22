import type { MenuProps } from 'antd';
import { FcManager } from 'react-icons/fc';
import Link from 'next/link';
import { USER_ROLE } from './role';
import { MdOutlineManageHistory, MdManageAccounts, MdAirplaneTicket } from 'react-icons/md';

export const sidebarItems = (role: string = 'admin') => {
  const DAHBOARD_URL = '/dashboard';

  const profilePath = `${DAHBOARD_URL}/profile`;
  const changePassPath = `${DAHBOARD_URL}/profile/change-password`;
  const manageUserPath = `${DAHBOARD_URL}/manage-users`;
  const manageServicePath = `${DAHBOARD_URL}/${role}/manage-services`;
  const manageBookingsPath = `${DAHBOARD_URL}/${role}/manage-bookings`;
  const manageAdminsPath = `${DAHBOARD_URL}/${role}/manage-admins`;
  const bookingPath = `${DAHBOARD_URL}/${role}/bookings`;

  const defaultSidebarItems: MenuProps['items'] = [
    {
      label: <Link href={profilePath}>Profile</Link>,
      key: profilePath,
      icon: <FcManager size={24} />,
      // children: [
      //   {
      //     label: <Link href={changePassPath}>Change Password</Link>,
      //     key: changePassPath,
      //   },
      // ],
    },
  ];

  const commonAdminSidebarItems: MenuProps['items'] = [
    {
      label: <Link href={manageUserPath}>Manage Users</Link>,
      icon: <MdManageAccounts size={24} />,
      key: manageUserPath,
    },
  ];

  const adminSidebarItems: MenuProps['items'] = [
    ...defaultSidebarItems,
    // ...commonAdminSidebarItems,
    {
      label: <Link href={manageServicePath}>Manage Services</Link>,
      key: manageServicePath,
      icon: <MdOutlineManageHistory size={24} />,
    },
    {
      label: <Link href={manageBookingsPath}>Manage Bookings</Link>,
      key: manageBookingsPath,
      icon: <MdAirplaneTicket size={24} />,
    },

    // new add
    {
      label: <Link href={manageUserPath}>Manage Reviews</Link>,
      icon: <MdManageAccounts size={24} />,
      key: manageUserPath,
    },
  ];

  const superAdminSidebarItems: MenuProps['items'] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: <Link href={manageAdminsPath}>Manage Admins</Link>,
      icon: <MdManageAccounts size={24} />,
      key: manageAdminsPath,
    },
  ];

  const userSidebarItems: MenuProps['items'] = [
    ...defaultSidebarItems,
    {
      label: <Link href={bookingPath}>Bookings</Link>,
      icon: <MdAirplaneTicket size={24} />,
      key: bookingPath,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.USER) return userSidebarItems;
  // else {
  //   return defaultSidebarItems;
  // }
  else {
    return adminSidebarItems;
  }
};
