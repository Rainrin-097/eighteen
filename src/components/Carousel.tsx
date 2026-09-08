import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryRoom } from '@/data/gallery';
import { getImageUrl } from '@/data/gallery';

interface CarouselProps {
  room: GalleryRoom;
  autoPlayInterval?: number;
}

export default function Carousel({ room, autoPlayInterval = 3500 }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = room.imageNames.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    if (isHovered || total <= 1) return;
    timerRef.current = setInterval(
      () => setCurrent((prev) => (prev + 1) % total),
      autoPlayInterval,
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, total, autoPlayInterval]);

  useEffect(() => {
    setCurrent(0);
  }, [room.id]);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 图片轨道 */}
      <div className="mx-auto aspect-[4/3] w-full max-w-3xl overflow-hidden bg-black/[0.04]">
        <div
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {room.imageNames.map((_, index) => (
            <div key={index} className="flex h-full w-full flex-shrink-0 items-center justify-center">
              <img
                src={getImageUrl(room, index)}
                alt={`${room.title} - ${index + 1}`}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 左右箭头 */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-0 top-0 bottom-0 flex items-center px-3 sm:px-5 text-black/70 hover:text-black transition-all duration-300 hover:opacity-100 opacity-0 group-hover:opacity-100"
            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.3), transparent)' }}
            aria-label="上一张"
          >
            <ChevronLeft size={28} strokeWidth={1.2} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-0 bottom-0 flex items-center px-3 sm:px-5 text-black/70 hover:text-black transition-all duration-300 hover:opacity-100 opacity-0 group-hover:opacity-100"
            style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.3), transparent)' }}
            aria-label="下一张"
          >
            <ChevronRight size={28} strokeWidth={1.2} />
          </button>
        </>
      )}

      {/* 圆点指示器 */}
      {total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {room.imageNames.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className="transition-all duration-300"
              style={{
                width: index === current ? '24px' : '6px',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: index === current ? 'rgba(23,23,23,0.9)' : 'rgba(23,23,23,0.3)',
              }}
              aria-label={`第 ${index + 1} 张`}
            />
          ))}
        </div>
      )}

      {/* 计数 */}
      <div className="absolute bottom-4 right-4 text-xs font-light text-black/60 tabular-nums">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </div>
  );
}
