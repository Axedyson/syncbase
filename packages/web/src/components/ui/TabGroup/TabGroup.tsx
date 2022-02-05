import { Tab } from "@headlessui/react";
import ctl from "@netlify/classnames-template-literals";
import type { FC } from "react";

interface TabGroupProps {
  [title: string]: JSX.Element;
}

const tabButtonClasses = ({ selected }: { selected: boolean }) =>
  ctl(`
  py-2
  w-full
  font-semibold
  border-b-2
  focus:outline-none
  hover:opacity-80
  transition
  ${selected ? "text-primary border-primary" : "text-gray-400 border-gray-400"}
  `);

export const TabGroup: FC<TabGroupProps> = (props) => {
  return (
    <Tab.Group>
      <Tab.List className="flex mb-3">
        {Object.keys(props).map((title, idx) => (
          <Tab key={idx} className={tabButtonClasses}>
            {title}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {Object.values(props).map((element, idx) => (
          <Tab.Panel key={idx} className="focus:outline-none">
            {element}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
