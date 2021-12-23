import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { Carousel } from "./";

describe("<Carousel />", () => {
  const exemplaryElements = ["one", 2, 3];
  /**
   * time after which the carousel will switch by itself to the next element
   */
  const delay = 10;

  it("should switch an element after passed interval", async () => {
    const { getByTestId } = render(<Carousel delay={delay}>{exemplaryElements}</Carousel>);

    expect(getByTestId("carouselActiveItem").textContent).toBe(exemplaryElements[0]);

    // wait until switched to the next element
    await act(() => new Promise((r) => setTimeout(r, delay)));

    expect(getByTestId("carouselActiveItem").textContent).toBe(`${exemplaryElements[1]}`);
  });

  it("should switch to the first element if the last element is active and the Next button clicked", async () => {
    const { getByTestId } = render(<Carousel delay={delay}>{exemplaryElements}</Carousel>);

    // wait until switched to the last element
    await act(() => new Promise((r) => setTimeout(r, delay * 2.5)));

    // the last element selected
    expect(getByTestId("carouselActiveItem").textContent).toBe(`${exemplaryElements[2]}`);

    // click the Next button
    fireEvent.click(getByTestId("goNextButton"));

    // // carousel should back to the first element
    expect(getByTestId("carouselActiveItem").textContent).toBe(exemplaryElements[0]);
  });

  it("should switch to the last element if the first element is active and the Prev button clicked", async () => {
    const { getByTestId } = render(<Carousel delay={delay}>{exemplaryElements}</Carousel>);

    // the first element selected
    expect(getByTestId("carouselActiveItem").textContent).toBe(exemplaryElements[0]);

    // click the Next button
    fireEvent.click(getByTestId("goPrevButton"));

    // // carousel should back to the first element
    expect(getByTestId("carouselActiveItem").textContent).toBe(`${exemplaryElements[2]}`);
  });

  it("should reset the delay interval which changing an element automatically if any control button clicked", async () => {
    const { getByTestId } = render(<Carousel delay={delay}>{exemplaryElements}</Carousel>);

    // wait part of time that set as delay
    await act(() => new Promise((r) => setTimeout(r, delay * 0.6)));

    // still the first element is the selected one
    expect(getByTestId("carouselActiveItem").textContent).toBe(exemplaryElements[0]);

    // click the Prev button
    fireEvent.click(getByTestId("goPrevButton"));

    // after the prev btn clicked the next element will be switch after the set delay
    await act(() => new Promise((r) => setTimeout(r, delay)));

    // the first element is selected
    expect(getByTestId("carouselActiveItem").textContent).toBe(exemplaryElements[0]);
  });
});
