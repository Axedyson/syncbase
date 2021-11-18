import "../src/global.css";

export const parameters = {
  backgrounds: {
    default: "light",
  },
};

export const decorators = [
  (Story) => (
    <div className="font-medium">
      <Story />
    </div>
  ),
];
