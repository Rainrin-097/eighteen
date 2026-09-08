import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryRoom } from '@/data/gallery';
import { getImageUrl } from '@/data/gallery';

interface PhotoOverviewProps {
    room: GalleryRoom;
    onClose: () => void;
}

export default function PhotoOverview({ room, onClose }: PhotoOverviewProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [carouselPosition, setCarouselPosition] = useState(1);
    const [isSliding, setIsSliding] = useState(false);
    const total = room.imageNames.length;

    const closeLightbox = () => setSelectedIndex(null);
    const showPrevious = () => {
        if (isSliding) return;
        setIsSliding(true);
        setCarouselPosition((position) => position - 1);
    };
    const showNext = () => {
        if (isSliding) return;
        setIsSliding(true);
        setCarouselPosition((position) => position + 1);
    };

    const handleSlideEnd = () => {
        const position = carouselPosition;

        if (position === 0) {
            setIsSliding(false);
            setCarouselPosition(total);
            setSelectedIndex(total - 1);
            return;
        }

        if (position === total + 1) {
            setIsSliding(false);
            setCarouselPosition(1);
            setSelectedIndex(0);
            return;
        }

        setIsSliding(false);
        setSelectedIndex(position - 1);
    };

    const currentIndex = selectedIndex ?? 0;
    const trackImages = [total - 1, ...room.imageNames.map((_, index) => index), 0];

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (selectedIndex === null) onClose();
                else closeLightbox();
            }
            if (selectedIndex === null) return;
            if (event.key === 'ArrowLeft') {
                if (!isSliding) setIsSliding(true);
                if (!isSliding) setCarouselPosition((position) => position - 1);
            }
            if (event.key === 'ArrowRight') {
                if (!isSliding) setIsSliding(true);
                if (!isSliding) setCarouselPosition((position) => position + 1);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, isSliding, selectedIndex, total]);

    return (
        <div
            className="lightbox-overlay fixed inset-0 z-[90] flex items-center justify-center bg-black/20 p-3 backdrop-blur-sm sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${room.title}所有照片`}
            onClick={onClose}
        >
            <section
                className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden bg-[#f4f0e8] shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <header className="flex flex-shrink-0 items-center justify-between border-b px-5 py-4 sm:px-8" style={{ borderColor: 'rgba(23,23,23,0.2)' }}>
                    <div>
                        <p className="text-xs tracking-[0.2em] text-black/50">所有照片</p>
                        <h2 className="mt-1 text-lg font-light text-black/85">{room.title}</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 text-black/60 transition hover:text-black"
                        aria-label="关闭所有照片"
                    >
                        <X size={24} strokeWidth={1.2} />
                    </button>
                </header>

                <div className="overflow-y-auto px-3 py-3 sm:px-8 sm:py-6">
                    <div className="columns-1 gap-2 sm:columns-2 lg:columns-3">
                        {room.imageNames.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => {
                                    setIsSliding(false);
                                    setCarouselPosition(index + 1);
                                    setSelectedIndex(index);
                                }}
                                className="group mb-2 block w-full break-inside-avoid text-left"
                                aria-label={`查看${room.title}第 ${index + 1} 张照片`}
                            >
                                <img
                                    src={getImageUrl(room, index)}
                                    alt={`${room.title} - ${index + 1}`}
                                    className="block h-auto w-full transition duration-300 group-hover:brightness-105 group-hover:outline group-hover:outline-1 group-hover:outline-white/70"
                                    loading="lazy"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {selectedIndex !== null && (
                <div
                    className="lightbox-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 sm:p-8"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${room.title}照片预览`}
                    onClick={(event) => {
                        event.stopPropagation();
                        closeLightbox();
                    }}
                >
                    <button
                        type="button"
                        onClick={closeLightbox}
                        className="absolute right-4 top-4 z-10 p-2 text-white/80 transition hover:text-white"
                        aria-label="关闭大图"
                    >
                        <X size={28} strokeWidth={1.2} />
                    </button>

                    {total > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    showPrevious();
                                }}
                                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 p-3 text-white/80 transition hover:text-white sm:left-6"
                                aria-label="上一张照片"
                            >
                                <ChevronLeft size={34} strokeWidth={1.2} />
                            </button>
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    showNext();
                                }}
                                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 p-3 text-white/80 transition hover:text-white sm:right-6"
                                aria-label="下一张照片"
                            >
                                <ChevronRight size={34} strokeWidth={1.2} />
                            </button>
                        </>
                    )}

                    <div
                        className="relative h-[min(78vh,720px)] w-[min(84vw,1100px)] overflow-hidden"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div
                            className={`flex h-full ${isSliding ? 'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]' : ''}`}
                            style={{
                                width: `${(total + 2) * 100}%`,
                                transform: `translateX(-${carouselPosition * (100 / (total + 2))}%)`,
                            }}
                            onTransitionEnd={handleSlideEnd}
                        >
                            {trackImages.map((imageIndex, trackIndex) => (
                                <div key={`${trackIndex}-${imageIndex}`} className="flex h-full flex-shrink-0 items-center justify-center px-5 sm:px-12" style={{ width: `${100 / (total + 2)}%` }}>
                                    <img
                                        src={getImageUrl(room, imageIndex)}
                                        alt={`${room.title} - ${imageIndex + 1}`}
                                        className="lightbox-image max-h-full max-w-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs tabular-nums text-white/75">
                            {currentIndex + 1} / {total}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
