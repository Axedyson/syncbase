import { Listbox, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { i18n } from "../../../next-i18next.config";
import { Toast } from "./Toast";
import { Spinner } from "./icons/Spinner";
import type { FC } from "react";

interface LayoutProps {
  children: React.ReactElement;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;

  // TODO: This code needs to be cleaned up big time!
  return (
    <div className="flex min-h-screen font-medium">
      <div className="flex fixed inset-x-0 top-0 justify-center justify-items-center border-2 border-gray-600">
        <p className="mr-2">Locale Switcher Button:</p>
        <Listbox
          value={locale}
          onChange={(locale) => {
            document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${
              365 * 24 * 60 * 60 * 10
            }`;
            router.push({ pathname, query }, asPath, { locale });
          }}
        >
          <div className="relative mt-1">
            <Listbox.Button className="relative py-2 pr-10 pl-3 w-full text-left bg-white rounded-lg focus-visible:border-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 shadow-md cursor-default sm:text-sm">
              <span className="block">{locale}</span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="overflow-auto absolute py-1 mt-1 w-full max-h-60 text-base bg-white rounded-md focus:outline-none ring-1 ring-black/5 shadow-lg sm:text-sm">
                {i18n.locales.map((locale) => (
                  <Listbox.Option
                    key={locale}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={locale}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {locale}
                        </span>
                        {selected ? (
                          <span className="flex absolute inset-y-0 left-0 items-center pl-3 text-amber-600">
                            <Spinner />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <Toast />
      {children}
    </div>
  );
};
