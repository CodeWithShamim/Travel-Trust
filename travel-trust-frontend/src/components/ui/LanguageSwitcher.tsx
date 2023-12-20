import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLanguage } from "@/redux/slices/i18nSlice";
import { ILanguage } from "@/types";
import { Select } from "antd";
import { usePathname, useRouter } from "next/navigation";

const options = [
  { value: "en", label: "English" },
  { value: "bn", label: "Bangla" },
  { value: "hi", label: "Hindi" },
];

const LanguageSwitcher = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { lang } = useAppSelector((state) => state.i18n);
  const pathname = usePathname();

  const path = pathname.substring(4);

  const handleSwither = (value: ILanguage) => {
    dispatch(setLanguage(value));
    router.push(`/${value}/${path}`);
  };

  return (
    <Select
      value={lang}
      onChange={(v: ILanguage) => handleSwither(v)}
      //   className="w-28"
      options={options}
    />
  );
};

export default LanguageSwitcher;
