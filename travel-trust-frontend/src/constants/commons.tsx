import { IUser } from "@/types";
import { Button, MenuProps } from "antd";
import Link from "next/link";

interface IHeaderItemsProps {
  userData: IUser;
  isLoading: boolean;
  signOut: () => void;
}

export const headerItems = ({
  userData,
  isLoading,
  signOut,
}: IHeaderItemsProps) => {
  const items: MenuProps["items"] = [
    {
      key: 1,
      label: <Link href="/dashboard/profile">Dashboard</Link>,
    },
    {
      key: 2,
      label: <Link href="/message">Message</Link>,
    },
    {
      key: 3,
      label: <Link href="/dashboard/profile">Profile</Link>,
    },
    {
      key: 4,
      label: (
        <>
          {userData?.id ? (
            <Button
              onClick={() => signOut()}
              type="primary"
              className="bg-primary text-xs md:text-sm"
              loading={isLoading}
            >
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button
                type="primary"
                className="bg-primary text-xs md:text-sm"
                loading={isLoading}
              >
                Signin
              </Button>
            </Link>
          )}
        </>
      ),
    },
  ];

  return items;
};

export const ChartOptionsData = {
  responsive: true,
  maintainAspectRatio: false,
  fill: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
