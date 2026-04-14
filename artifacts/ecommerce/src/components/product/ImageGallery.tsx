import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export const ImageGallery = ({ images, name }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div className="flex gap-4">
      <div className="hidden md:flex flex-col gap-2 w-20 shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            data-testid={`img-thumb-${idx}`}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              'rounded-xl overflow-hidden border-2 transition-all duration-200',
              activeIndex === idx ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
            )}
          >
            <img src={img} alt={`${name} view ${idx + 1}`} className="w-full aspect-square object-cover" />
          </button>
        ))}
      </div>
      <div className="flex-1 relative">
        <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/5]">
          <img
            src={images[activeIndex]}
            alt={`${name} - image ${activeIndex + 1}`}
            data-testid="img-product-main"
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        </div>
        {images.length > 1 && (
          <>
            <button
              data-testid="btn-gallery-prev"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow hover:bg-white transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              data-testid="btn-gallery-next"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow hover:bg-white transition-colors"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    'rounded-full transition-all duration-200',
                    activeIndex === idx ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/60'
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
