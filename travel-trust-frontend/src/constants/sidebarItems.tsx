import type { MenuProps } from "antd";
import { TableOutlined, AppstoreOutlined } from "@ant-design/icons";
import { FcManager } from "react-icons/fc";
import Link from "next/link";
import { USER_ROLE } from "./role";
import {
  MdOutlineManageHistory,
  MdManageAccounts,
  MdAirplaneTicket,
} from "react-icons/md";

export const sidebarItems = (role: string) => {
  const DAHBOARD_URL = "/dashboard";

  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`${DAHBOARD_URL}/profile`}>Profile</Link>,
      key: 1,
      icon: <FcManager size={24} />,
      // children: [
      //   {
      //     label: <Link href={`${DAHBOARD_URL}/profile`}>Account Profile</Link>,
      //     key: `/profile`,
      //   },
      //   {
      //     label: (
      //       <Link href={`${DAHBOARD_URL}/profile/edit-profile`}>
      //         Edit Profile
      //       </Link>
      //     ),
      //     key: `/edit-profile`,
      //   },
      // ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`${DAHBOARD_URL}/manage-users`}>Manage Users</Link>,
      icon: <MdManageAccounts size={24} />,
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
      icon: <MdOutlineManageHistory size={24} />,
    },
    {
      label: (
        <Link href={`${DAHBOARD_URL}/${role}/manage-bookings`}>
          Manage Bookings
        </Link>
      ),
      key: "manage-bookings",
      icon: <MdAirplaneTicket size={24} />,
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
      icon: <MdManageAccounts size={24} />,
      key: `/${role}/admin`,
    },
  ];

  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`${DAHBOARD_URL}/${role}/bookings`}>Bookings</Link>,
      icon: <MdAirplaneTicket size={24} />,
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
