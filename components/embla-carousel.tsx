import React, { ReactNode } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./embla-carousel-dot";
import useEmblaCarousel from "embla-carousel-react";

type PropType = {
  children: ReactNode[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ options, children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <section className="embla max-w-full">
      <div className="embla__viewport " ref={emblaRef}>
        <div className="embla__container">
          {children.map((slide, index) => (
            <div className="embla__slide" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls p-4">
        <div className="embla__dots w-full flex justify-center">
          {scrollSnaps.map((_, index) => (
            <DotButton key={index} onClick={() => onDotButtonClick(index)} className={"embla__dot".concat(index === selectedIndex ? " embla__dot--selected after:bg-[#433878]" : "")} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { EmblaCarousel };
