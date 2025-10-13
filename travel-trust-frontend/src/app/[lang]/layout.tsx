import UserInfo from '@/components/common/UserInfo'
import { getDictionary } from '@/utils/dictionaries'

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang }: any = await params
  const dict = await getDictionary(lang)

  return (
    <>
      <UserInfo dict={dict} lang={lang} />
      {children}
    </>
  )
}
