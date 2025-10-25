import { act, cleanup, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, it } from "vitest";
import { mountApp } from "./main";

beforeEach(() => {
  document.body.innerHTML = '<div id="root"></div>';
});

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

describe("mountApp", () => {
  it("mountApp renders the App into the container", async () => {
    const container = getRoot();
    // no manual act; RTL async queries wrap updates
    await act(() => {
      mountApp(container);
    });
    const heading = await screen.findByText(/Welcome to the Home Page/i);
    expect(heading).toBeInTheDocument();
  });

  it("mountApp renders into the provided container (scoped query)", async () => {
    const container = getRoot();
    await act(() => {
      mountApp(container);
    });
    const heading = await within(container).findByText(
      /Welcome to the Home Page/i
    );
    expect(heading).toBeInTheDocument();
  });

  it("can mount into multiple containers independently", async () => {
    document.body.innerHTML = '<div id="root1"></div><div id="root2"></div>';

    const c1 = document.getElementById("root1");
    const c2 = document.getElementById("root2");
    if (!c1 || !c2) throw new Error("Missing test containers");

    await act(() => {
      mountApp(c1);
      mountApp(c2);
    });

    const h1 = await within(c1).findByText(/Welcome to the Home Page/i);
    const h2 = await within(c2).findByText(/Welcome to the Home Page/i);

    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
  });
});

function getRoot(): HTMLElement {
  const el = document.getElementById("root");
  if (!el) throw new Error("Missing #root element");
  return el;
}
