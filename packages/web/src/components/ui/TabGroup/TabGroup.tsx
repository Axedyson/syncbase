import { Tab } from "@headlessui/react";
import ctl from "@netlify/classnames-template-literals";
import type { FC } from "react";

interface TabGroupProps {
  [title: string]: JSX.Element;
}

const tabButtonClasses = ({ selected }: { selected: boolean }) =>
  ctl(`
  w-full
  border-b-2
  py-2
  font-semibold
  transition
  hover:opacity-80
  focus:outline-none
  ${selected ? "border-primary text-primary" : "border-gray-400 text-gray-400"}
  `);

export const TabGroup: FC<TabGroupProps> = (props) => {
  return (
    <Tab.Group>
      <Tab.List className="mb-3 flex">
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
