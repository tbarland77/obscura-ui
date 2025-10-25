import { cleanup, screen } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, vi } from "vitest";

beforeEach(() => {
  document.body.innerHTML = '<div id="root"></div>';
});

afterEach(() => {
  cleanup();
  vi.resetModules();
  document.body.innerHTML = "";
});

describe("entry-client", () => {
  it("mounts app into #root when present", async () => {
    await act(async () => {
      await import("./entry-client");
    });
    const heading = await screen.findByText(/Welcome to the Home Page/i);
    expect(heading).toBeInTheDocument();
  });

  it("throws when #root is missing", async () => {
    document.body.innerHTML = "";
    await expect(import("./entry-client")).rejects.toThrow(
      "Root element not found"
    );
  });
});
