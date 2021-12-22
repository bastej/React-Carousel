import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { Carousel } from "./";

describe("<Carousel />", () => {
  it("should switch an element after passed interval", async () => {
    const exemplaryElements = ["one", 2, <span key="key">I'm span</span>];
    /**
     * time after which carousel will switch to the next element
     */
    const delay = 10;
    const carousel = render(<Carousel delay={delay}>{exemplaryElements}</Carousel>);

    expect(carousel.getByTestId("carouselActiveItem").textContent).toBe(exemplaryElements[0]);

    // wait until switch to next element
    await act(() => new Promise((r) => setTimeout(r, delay)));

    expect(carousel.getByTestId("carouselActiveItem").textContent).toBe(`${exemplaryElements[1]}`);
  });
});

// should switch to the first element if the Next button clicked on the last page

// should switch to the last element if the Prev button clicked on the first page

// should reset the delay interval which changing pages automatically if the control button clicked
