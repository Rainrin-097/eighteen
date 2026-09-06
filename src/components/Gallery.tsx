import { useState, useEffect } from 'react';
import { galleryData } from '@/data/gallery';
import RoomAccordion from './RoomAccordion';

export default function Gallery() {
  const [activeHallId, setActiveHallId] = useState(galleryData[0].id);
  const [openRoomId, setOpenRoomId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  // 展厅切换时重置滚动位置
  useEffect(() => {
    const section = document.getElementById('rooms-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeHallId]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121212' }}>
      {/* 顶部标题 */}
      <header className="px-6 sm:px-12 lg:px-24 pt-16 sm:pt-24 pb-12">
        <p className="text-xs font-light tracking-[0.3em] uppercase mb-6"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          2008 — 2026
        </p>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extralight tracking-wide leading-tight"
          style={{ color: 'rgba(255,255,255,0.95)' }}
        >
          我的18岁影像馆
        </h1>
        <div
          className="mt-8 w-16 h-px"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
        />
        <p className="mt-8 text-sm sm:text-base font-light leading-loose max-w-2xl"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          【待补充：影像馆整体前言，100-200字。描述这组影像作品的创作动机、时间跨度与情感脉络。Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.】
        </p>
      </header>

      {/* 展厅导航 */}
      <nav
        className="sticky top-0 z-50 px-6 sm:px-12 lg:px-24 py-4 sm:py-5"
        style={{
          backgroundColor: 'rgba(18,18,18,0.85)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
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
                  className="text-xs font-light tabular-nums transition-colors duration-300"
                  style={{ color: isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-sm sm:text-base font-light tracking-wide transition-all duration-300"
                  style={{
                    color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)',
                    transform: isActive ? 'translateX(2px)' : 'translateX(0)',
                  }}
                >
                  {hall.title}
                </span>
                <span
                  className="h-px transition-all duration-500"
                  style={{
                    width: isActive ? '32px' : '0px',
                    backgroundColor: 'rgba(255,255,255,0.4)',
                  }}
                />
              </button>
            );
          })}
        </div>
      </nav>

      {/* 展厅副标题 */}
      <div
        className={`px-6 sm:px-12 lg:px-24 pt-12 sm:pt-16 transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <h2 className="text-xl sm:text-3xl font-extralight tracking-wide mb-3"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          {activeHall.title}
        </h2>
        <p className="text-sm font-light leading-relaxed max-w-2xl"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          {activeHall.subtitle}
        </p>
      </div>

      {/* 房间列表 */}
      <section
        id="rooms-section"
        className={`px-6 sm:px-12 lg:px-24 pt-8 sm:pt-12 pb-20 transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className="border-t"
          style={{ borderColor: 'rgba(255,255,255,0.12)' }}
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
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <p className="text-xs font-light tracking-wider"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          【待补充：版权信息 / 摄影师署名 / 联系方式】
        </p>
      </footer>
    </div>
  );
}
