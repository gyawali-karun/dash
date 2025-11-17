import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { describe, expect, test, vi } from "vitest";

// Optional: Mock the pages to keep tests simple
vi.mock("./pages/DataTablePage", () => ({
  default: () => <div>Mock DataTable</div>,
}));

vi.mock("./pages/HomPage", () => ({
  default: () => <div>Mock HomePage</div>,
}));

vi.mock("./pages/SettingsPage", () => ({
  default: () => <div>Mock SettingsPage</div>,
}));

// Optional: Mock Sidebar if it has complex logic
vi.mock("./components/SideBar", () => ({
  default: () => <div>Mock Sidebar</div>,
}));

describe("App Component", () => {
  test("renders Sidebar and Home page by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Mock Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Mock HomePage")).toBeInTheDocument();
  });

  test("renders DataTable page on /data route", () => {
    render(
      <MemoryRouter initialEntries={["/data"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Mock Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Mock DataTable")).toBeInTheDocument();
  });

  test("renders Settings page on /settings route", () => {
    render(
      <MemoryRouter initialEntries={["/settings"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Mock Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Mock SettingsPage")).toBeInTheDocument();
  });
});
