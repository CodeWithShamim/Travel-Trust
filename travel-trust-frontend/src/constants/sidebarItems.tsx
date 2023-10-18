import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
  const DAHBOARD_URL = "/dashboard";

  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`${DAHBOARD_URL}/profile`}>Account Profile</Link>,
          key: `/profile`,
        },
        {
          label: (
            <Link href={`${DAHBOARD_URL}/profile/edit-profile`}>
              Edit Profile
            </Link>
          ),
          key: `/edit-profile`,
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`${DAHBOARD_URL}/manage-users`}>Manage Users</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-users`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: (
        <Link href={`${DAHBOARD_URL}/${role}/manage-services`}>
          Manage Services
        </Link>
      ),
      key: "manage-services",
      icon: <TableOutlined />,
    },
    {
      label: (
        <Link href={`${DAHBOARD_URL}/${role}/manage-bookings`}>
          Manage Bookings
        </Link>
      ),
      key: "manage-bookings",
      icon: <AppstoreOutlined />,
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: (
        <Link href={`${DAHBOARD_URL}/${role}/manage-admins`}>
          Manage Admins
        </Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
  ];

  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`${DAHBOARD_URL}/${role}/bookings`}>Bookings</Link>,
      icon: <TableOutlined />,
      key: `/${role}/bookings`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
