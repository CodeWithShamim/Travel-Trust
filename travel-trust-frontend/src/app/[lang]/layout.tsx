import UserInfo from "@/components/common/UserInfo";
import { getDictionary } from "@/utils/dictionaries";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = params?.lang;
  const dict = await getDictionary(lang);

  return (
    <>
      <UserInfo dict={dict} />
      {children}
    </>
  );
}
