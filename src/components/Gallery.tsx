import { useState, useEffect, useRef } from 'react';
import { galleryData } from '@/data/gallery';
import RoomAccordion from './RoomAccordion';

export default function Gallery() {
  const [activeHallId, setActiveHallId] = useState(galleryData[0].id);
  const [openRoomId, setOpenRoomId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hasMounted = useRef(false);

  const activeHall = galleryData.find((h) => h.id === activeHallId) ?? galleryData[0];

  const handleHallChange = (hallId: string) => {
    if (hallId === activeHallId) return;
    setIsTransitioning(true);
    setOpenRoomId(null);
    setTimeout(() => {
      setActiveHallId(hallId);
      setIsTransitioning(false);
    }, 300);
  };

  const toggleRoom = (roomId: string) => {
    setOpenRoomId((prev) => (prev === roomId ? null : roomId));
  };

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const navigation = document.getElementById('hall-navigation');
    if (navigation) {
      navigation.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeHallId]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f4f0e8' }}>
      {/* 顶部标题 */}
      <header className="px-6 sm:px-12 lg:px-24 pt-16 sm:pt-24 pb-12">
        <p className="text-xs font-light tracking-[0.3em] uppercase mb-6"
          style={{ color: 'rgba(23,23,23,0.5)' }}
        >
          2025.9 — 2026.9
        </p>
        <h1 className="text-6xl sm:text-5xl lg:text-6xl font-light tracking-wide leading-tight"
          style={{ color: '#171717' }}
        >
          我的18岁影像馆
        </h1>
        <div
          className="mt-8 w-16 h-px"
          style={{ backgroundColor: 'rgba(23,23,23,0.35)' }}
        />
        <p className="mt-8 text-sm sm:text-base font-light leading-loose max-w-2xl"
          style={{ color: 'rgba(23,23,23,0.65)' }}
        >
          收录了我18岁这一年拍摄的一些照片<br />
          想过写小作文写岁末总结，后来觉得都不如照片来的直接<br />
          个人纪念用，也供大家欣赏
        </p>
      </header>

      {/* 展厅导航 */}
      <nav
        id="hall-navigation"
        className="sticky top-0 z-50 px-6 sm:px-12 lg:px-24 py-4 sm:py-5"
        style={{
          backgroundColor: 'rgba(244,240,232,0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(23,23,23,0.2)',
        }}
      >
        <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto scrollbar-hide">
          {galleryData.map((hall, index) => {
            const isActive = hall.id === activeHallId;
            return (
              <button
                key={hall.id}
                onClick={() => handleHallChange(hall.id)}
                className="flex items-center gap-3 whitespace-nowrap transition-all duration-300 group flex-shrink-0"
              >
                <span
                  className="text-xs font-normal tabular-nums transition-colors duration-300"
                  style={{ color: isActive ? 'rgba(23,23,23,0.7)' : 'rgba(23,23,23,0.35)' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-sm sm:text-base font-light tracking-wide transition-all duration-300"
                  style={{
                    color: isActive ? '#171717' : 'rgba(23,23,23,0.55)',
                    transform: isActive ? 'translateX(2px)' : 'translateX(0)',
                  }}
                >
                  {hall.title}
                </span>
                <span
                  className="h-px transition-all duration-500"
                  style={{
                    width: isActive ? '32px' : '0px',
                    backgroundColor: 'rgba(23,23,23,0.55)',
                  }}
                />
              </button>
            );
          })}
        </div>
      </nav>

      {/* 展厅副标题 */}
      <div
        className={`px-6 sm:px-12 lg:px-24 pt-12 sm:pt-16 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
      >
        <h2 className="text-xl sm:text-3xl font-light tracking-wide mb-3"
          style={{ color: '#171717' }}
        >
          {activeHall.title}
        </h2>
        <p className="text-sm font-light leading-relaxed max-w-2xl"
          style={{ color: 'rgba(23,23,23,0.65)' }}
        >
          {activeHall.subtitle}
        </p>
      </div>

      {/* 房间列表 */}
      <section
        id="rooms-section"
        className={`px-6 sm:px-12 lg:px-24 pt-8 sm:pt-12 pb-20 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
      >
        <div
          className="border-t"
          style={{ borderColor: 'rgba(23,23,23,0.3)' }}
        >
          {activeHall.rooms.map((room, index) => (
            <RoomAccordion
              key={room.id}
              room={room}
              index={index}
              isOpen={openRoomId === room.id}
              onToggle={() => toggleRoom(room.id)}
            />
          ))}
        </div>
      </section>

      {/* 底部 */}
      <footer className="px-6 sm:px-12 lg:px-24 py-12 border-t"
        style={{ borderColor: 'rgba(23,23,23,0.2)' }}
      >
        <p className="text-xs font-light tracking-wider"
          style={{ color: 'rgba(23,23,23,0.5)' }}
        >
          -图片均由本人拍摄，未经允许请勿转载或用于商业用途 <br />
          -署名：Rainrin <br />
          -联系方式：rain_u_u_rin@163.com <br />
          -GitHub仓库：
          <a
            href="https://github.com/Rainrin-097/eighteen"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-opacity hover:opacity-60"
            style={{ color: 'rgba(23,23,23,0.5)' }}
          >
            Rainrin-097/eighteen
          </a>
        </p>
      </footer>
    </div>
  );
}
