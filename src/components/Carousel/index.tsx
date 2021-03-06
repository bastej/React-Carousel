import React, { ReactChild, useEffect, useRef, useState } from "react";

import { FIRST_INDEX } from "./constants";
import { GoBack, GoForward } from "./types";

import styles from "./styles.module.scss";

type Props = {
  delay: number;
  children: ReactChild[];
};

export const Carousel: React.FC<Props> = ({ children, delay }): JSX.Element | null => {
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [shouldClearInterval, setShouldClearInterval] = useState<boolean>(false);

  const autoPlayRef = useRef<GoForward>(null!);

  useEffect(() => {
    autoPlayRef.current = goForward;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };
    const interval = setInterval(play, delay);

    return () => {
      clearInterval(interval);
      setShouldClearInterval(false);
    };
  }, [shouldClearInterval, delay]);

  const goBack: GoBack = () => {
    setShouldClearInterval(true);

    if (activeItemIndex === FIRST_INDEX) {
      setActiveItemIndex(children.length - 1);
    } else {
      setActiveItemIndex(activeItemIndex - 1);
    }
  };

  const goForward: GoForward = () => {
    setShouldClearInterval(true);

    if (activeItemIndex === children.length - 1) {
      setActiveItemIndex(FIRST_INDEX);
    } else {
      setActiveItemIndex(activeItemIndex + 1);
    }
  };

  if (!children) return null;

  return (
    <div className={styles.Container}>
      <div data-testid="carouselActiveItem">{children[activeItemIndex]}</div>
      <div>
        <button onClick={() => goBack()} data-testid="goPrevButton">
          Prev
        </button>
        <button onClick={() => goForward()} data-testid="goNextButton">
          Next
        </button>
      </div>
    </div>
  );
};
