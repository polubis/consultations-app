import React, { useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
};

type CourseGalleryProps = {
  images: GalleryImage[];
};

function CourseGallery({ images }: CourseGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="mb-[48px] tbt:mb-[64px]">
      {/* Main image */}
      <div className="relative w-full aspect-video bg-[rgba(255,255,255,0.02)]   overflow-hidden mb-[16px]">
        <img
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          className="w-full h-full object-cover filter grayscale"
          loading="lazy"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-[8px] tbt:gap-[12px]">
        {images.map((image, index) => {
          const uniqueKey = `${image.src}-${index}`;
          return (
            <button
              key={uniqueKey}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-video bg-[rgba(255,255,255,0.02)] border  overflow-hidden transition-all ${
                activeIndex === index
                  ? "border-primary-500"
                  : "border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.2)]"
              }`}
              aria-label={`Pokaż zdjęcie ${index + 1}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover filter grayscale"
                loading="lazy"
              />
              {activeIndex === index && (
                <div className="absolute inset-0  border-primary-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { CourseGallery };
export type { CourseGalleryProps, GalleryImage };
