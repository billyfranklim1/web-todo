import React from "react";
import { render } from "@testing-library/react";
import Header from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("../LanguageSwitcher", () => {
  const LanguageSwitcherMock = () => <div>LanguageSwitcherMock</div>;
  LanguageSwitcherMock.displayName = "LanguageSwitcherMock";
  return LanguageSwitcherMock;
});

jest.mock("../DarkModeSwitcher", () => {
  const DarkModeSwitcherMock = () => <div>DarkModeSwitcherMock</div>;
  DarkModeSwitcherMock.displayName = "DarkModeSwitcherMock";
  return DarkModeSwitcherMock;
});

describe("Header", () => {
  it("renders the header with language and dark mode switchers", () => {
    const { getByText } = render(<Header />);
    expect(getByText("LanguageSwitcherMock")).toBeInTheDocument();
    expect(getByText("DarkModeSwitcherMock")).toBeInTheDocument();
  });

  it("renders the correct h1 content", () => {
    const { getByText } = render(<Header />);
    expect(getByText("todo_list")).toBeInTheDocument();
  });
});
