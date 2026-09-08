import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GalleryRoom } from '@/data/gallery';
import Carousel from './Carousel';
import PhotoOverview from './PhotoOverview';

interface RoomAccordionProps {
  room: GalleryRoom;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

export default function RoomAccordion({ room, isOpen, onToggle, index }: RoomAccordionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const updateHeight = () => setHeight(isOpen ? content.scrollHeight : 0);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(content);

    return () => observer.disconnect();
  }, [isOpen, isOverviewOpen]);

  useEffect(() => {
    if (!isOpen) setIsOverviewOpen(false);
  }, [isOpen]);

  return (
    <div
      className="border-b transition-colors duration-300"
      style={{ borderColor: 'rgba(23,23,23,0.3)' }}
    >
      {/* 标题区域 */}
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 py-8 sm:py-12 text-left group"
      >
        <div className="flex items-start gap-4 sm:gap-8 flex-1 min-w-0">
          <span className="text-xs font-light tabular-nums pt-1 transition-colors duration-300"
            style={{ color: isOpen ? 'rgba(23,23,23,0.7)' : 'rgba(23,23,23,0.4)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex-1 min-w-0">
            <h3
              className="text-xl sm:text-2xl font-light tracking-wide transition-all duration-300"
              style={{
                color: isOpen ? '#171717' : 'rgba(23,23,23,0.7)',
                transform: isOpen ? 'translateX(2px)' : 'translateX(0)',
              }}
            >
              {room.title}
            </h3>
            <p className="mt-3 text-sm font-light leading-relaxed line-clamp-2"
              style={{ color: 'rgba(23,23,23,0.65)' }}
            >
              {room.description}
            </p>
          </div>
        </div>
        <div className="pt-1 flex-shrink-0">
          <div
            className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
              opacity: isOpen ? 0.6 : 1,
            }}
          >
            <Plus size={20} strokeWidth={1} style={{ color: 'rgba(23,23,23,0.7)' }} />
          </div>
        </div>
      </button>

      {/* 展开内容 */}
      <div
        className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={contentRef} className="pb-8 sm:pb-12 pl-8 sm:pl-16 pr-0">
          <button
            type="button"
            onClick={() => setIsOverviewOpen(true)}
            className="mb-5 border-b pb-1 text-xs tracking-[0.2em] transition-colors hover:text-black/60"
            style={{ borderColor: 'rgba(23,23,23,0.45)', color: 'rgba(23,23,23,0.8)' }}
          >
            所有照片
          </button>

          <div className="group relative">
            <Carousel room={room} />
          </div>
        </div>
      </div>

      {isOverviewOpen && <PhotoOverview room={room} onClose={() => setIsOverviewOpen(false)} />}
    </div>
  );
}
