import "server-only";

const dictionaries: any = {
  en: () =>
    import("@/data/dictionaries/en.json").then((module) => module.default),
  bn: () =>
    import("@/data/dictionaries/bn.json").then((module) => module.default),
  hi: () =>
    import("@/data/dictionaries/hi.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => dictionaries[locale]();
