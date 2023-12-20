import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { IUser } from "@/types";
import { Button, MenuProps } from "antd";
import Link from "next/link";

interface IHeaderItemsProps {
  user: IUser;
  signOut: () => void;
}

export const headerItems = ({ user, signOut }: IHeaderItemsProps) => {
  const items: MenuProps["items"] = [
    {
      key: 1,
      label: <Link href="/dashboard/profile">Profile</Link>,
    },
    {
      key: 2,
      label: (
        <Link className="md:hidden" href="/message">
          Message
        </Link>
      ),
    },
    {
      key: 3,
      label: (
        <Link className="md:hidden" href="/dashboard/profile">
          Dashboard
        </Link>
      ),
    },
    {
      key: 4,
      label: (
        <div className="block md:hidden">
          <LanguageSwitcher />
        </div>
      ),
    },
    {
      key: 5,
      label: (
        <>
          {user?.id ? (
            <Button
              onClick={() => signOut()}
              type="primary"
              className="bg-primary text-xs md:text-sm"
            >
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button type="primary" className="bg-primary text-xs md:text-sm">
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

export const StripeElementsStyles = {
  style: {
    base: {
      iconColor: "black",
      color: "black",
      fontWeight: 300,
      fontFamily: "'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "lightgrey",
      },
    },
    invalid: {
      iconColor: "red",
      color: "red",
    },
  },
};
