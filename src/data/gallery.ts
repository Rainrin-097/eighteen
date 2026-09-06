// ============================================================
//  我的18岁影像馆 — 数据配置文件
//  修改此文件即可更新网页内容，无需改动其他代码。
//
//  图片路径拼接逻辑: `image/${room.folderPath}/${imageName}`
//  例如 folderPath = '展厅一/房间一', imageName = 'pic1.jpg'
//  最终路径 = image/展厅一/房间一/pic1.jpg
//
//  占位图片使用 Picsum 随机图:
//   https://picsum.photos/800/600?random=N
//  替换为真实图片时，将 imageBase 改为 'image' 并修改 imageNames 即可。
// ============================================================

export interface GalleryRoom {
  id: string;
  title: string;
  description: string;
  folderPath: string;
  imageNames: string[];
}

export interface GalleryHall {
  id: string;
  title: string;
  subtitle: string;
  rooms: GalleryRoom[];
}

// 占位图片基础路径 — 使用 Picsum 随机图服务
// 替换为真实项目时改为: const PLACEHOLDER_BASE = 'image';
const PLACEHOLDER_BASE = 'https://picsum.photos/seed';

/**
 * 工具函数：拼接房间内某张图片的完整 URL
 * @param room  房间对象
 * @param index 图片在 imageNames 中的索引
 * @returns 完整图片 URL 字符串
 */
export function getImageUrl(room: GalleryRoom, index: number): string {
  const name = room.imageNames[index];
  // 使用占位图：基于 folderPath + 文件名生成稳定的随机种子
  const seed = encodeURIComponent(`${room.folderPath}/${name}`);
  return `${PLACEHOLDER_BASE}/${seed}/800/600`;
}

/**
 * 工具函数：拼接真实物理路径（当 imageBase = 'image' 时使用）
 * @param room  房间对象
 * @param index 图片在 imageNames 中的索引
 * @returns 物理文件路径
 */
export function getRealImagePath(room: GalleryRoom, index: number): string {
  return `image/${room.folderPath}/${room.imageNames[index]}`;
}

// ============================================================
//  展厅与房间数据
//  所有标题和描述均为占位文字，请全局搜索 【待补充】 替换
// ============================================================

export const galleryData: GalleryHall[] = [
  {
    id: 'hall-migration',
    title: '迁徙',
    subtitle: '【待补充：展厅副标题，描述这一主题的基调与情绪】',
    rooms: [
      {
        id: 'room-dawn-departure',
        title: '【待补充：房间一标题，例如「黎明出发」】',
        description:
          '【待补充：50-100字描述，讲述这组照片的背景、时间、地点与情感。Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.】',
        folderPath: '展厅一/房间一',
        imageNames: ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg'],
      },
      {
        id: 'room-night-train',
        title: '【待补充：房间二标题，例如「夜车独白」】',
        description:
          '【待补充：50-100字描述，讲述这组照片的背景、时间、地点与情感。Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.】',
        folderPath: '展厅一/房间二',
        imageNames: ['pic1.jpg', 'pic2.jpg', 'pic3.jpg'],
      },
      {
        id: 'room-border-crossing',
        title: '【待补充：房间三标题，例如「边境线」】',
        description:
          '【待补充：50-100字描述，讲述这组照片的背景、时间、地点与情感。Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.】',
        folderPath: '展厅一/房间三',
        imageNames: ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'],
      },
    ],
  },
  {
    id: 'hall-carnival',
    title: '狂欢',
    subtitle: '【待补充：展厅副标题，描述这一主题的基调与情绪】',
    rooms: [
      {
        id: 'room-street-dance',
        title: '【待补充：房间一标题，例如「街角起舞」】',
        description:
          '【待补充：50-100字描述，讲述这组照片的背景、时间、地点与情感。Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.】',
        folderPath: '展厅二/房间一',
        imageNames: ['pic1.jpg', 'pic2.jpg', 'pic3.jpg'],
      },
      {
        id: 'room-midnight-feast',
        title: '【待补充：房间二标题，例如「午夜盛宴」】',
        description:
          '【待补充：50-100字描述，讲述这组照片的背景、时间、地点与情感。Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.】',
        folderPath: '展厅二/房间二',
        imageNames: ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg'],
      },
      {
        id: 'room-fireworks',
        title: '【待补充：房间三标题，例如「烟火尽头」】',
        description:
          '【待补充：50-100字描述，讲述这组照片的背景、时间、地点与情感。Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.】',
        folderPath: '展厅二/房间三',
        imageNames: ['pic1.jpg', 'pic2.jpg'],
      },
    ],
  },
  {
    id: 'hall-solitude',
    title: '独处',
    subtitle: '【待补充：展厅副标题，描述这一主题的基调与情绪】',
    rooms: [
      {
        id: 'room-empty-room',
        title: '【待补充：房间一标题，例如「空房间」】',
        description:
          '【待补充：50-100字描述，讲述这组照片的背景、时间、地点与情感。Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.】',
        folderPath: '展厅三/房间一',
        imageNames: ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg'],
      },
      {
        id: 'room-window-light',
        title: '【待补充：房间二标题，例如「窗光」】',
        description:
          '【待补充：50-100字描述，讲述这组照片的背景、时间、地点与情感。Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam.】',
        folderPath: '展厅三/房间二',
        imageNames: ['pic1.jpg', 'pic2.jpg', 'pic3.jpg'],
      },
    ],
  },
  {
    id: 'hall-coming-of-age',
    title: '成人礼',
    subtitle: '【待补充：展厅副标题，描述这一主题的基调与情绪】',
    rooms: [
      {
        id: 'room-birthday',
        title: '【待补充：房间一标题，例如「生日」】',
        description:
          '【待补充：50-100字描述，讲述这组照片的背景、时间、地点与情感。At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.】',
        folderPath: '展厅四/房间一',
        imageNames: ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'],
      },
      {
        id: 'room-farewell',
        title: '【待补充：房间二标题，例如「告别」】',
        description:
          '【待补充：50-100字描述，讲述这组照片的背景、时间、地点与情感。Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus.】',
        folderPath: '展厅四/房间二',
        imageNames: ['pic1.jpg', 'pic2.jpg', 'pic3.jpg'],
      },
      {
        id: 'room-first-solo',
        title: '【待补充：房间三标题，例如「第一次独自远行」】',
        description:
          '【待补充：50-100字描述，讲述这组照片的背景、时间、地点与情感。Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis.】',
        folderPath: '展厅四/房间三',
        imageNames: ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg'],
      },
    ],
  },
];
