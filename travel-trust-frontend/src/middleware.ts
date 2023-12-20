import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest } from "next/server";
import { getValueFromLocalStorage } from "./utils/local-storage";
import { langKey } from "./constants/storageKey";

let locales = ["en", "bn", "hi"];
let defaultLocale = "en";

function getLocale(request: NextRequest) {
  const lang = getValueFromLocalStorage(langKey);
  let headers = { "accept-language": lang || defaultLocale };
  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|assets|.*\\..*?!|_next).*)"],
};
