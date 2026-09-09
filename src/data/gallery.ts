// ============================================================
//  我的18岁影像馆 — 数据配置文件
//  修改此文件即可更新网页内容，无需改动其他代码。
//
//  图片路径拼接逻辑: `image/${room.folderPath}/${imageName}`
//  例如 folderPath = '足迹/眉山', imageName = '1.jpg'
//  最终路径 = image/足迹/眉山/1.jpg
//
//  所有展厅副标题与房间描述均为占位文字，请全局搜索 【待补充】 替换。
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

/**
 * 工具函数：生成 1.jpg ~ N.jpg 的图片名数组
 * @param count 图片数量
 * @returns 图片文件名数组
 */
function genImageNames(count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${i + 1}.jpg`);
}

/**
 * 工具函数：拼接房间内某张图片的完整 URL
 * @param room  房间对象
 * @param index 图片在 imageNames 中的索引
 * @returns 完整图片 URL 字符串
 */
export function getImageUrl(room: GalleryRoom, index: number): string {
  return `/${getRealImagePath(room, index)}`;
}

/**
 * 工具函数：拼接真实物理路径
 * @param room  房间对象
 * @param index 图片在 imageNames 中的索引
 * @returns 物理文件路径
 */
export function getRealImagePath(room: GalleryRoom, index: number): string {
  return `image/${room.folderPath}/${room.imageNames[index]}`;
}

// ============================================================
//  展厅与房间数据
//  所有标题为实际名称，副标题与描述均为占位文字，请全局搜索 【待补充】 替换
// ============================================================

export const galleryData: GalleryHall[] = [
  // ----------------------------------------------------------
  //  1) 足迹
  // ----------------------------------------------------------
  {
    id: 'hall-zuji',
    title: '足迹',
    subtitle: '“踏遍万水千山总有一地故乡”\u00A0\u00A0\u00A0\u00A0--《历历万乡》',
    rooms: [
      {
        id: 'room-meishan',
        title: '眉山',
        description:
          '一城山水韵，千载诗书城',
        folderPath: '足迹/眉山',
        imageNames: genImageNames(24),
      },
      {
        id: 'room-wuhan',
        title: '武汉',
        description:
          '楚韵千年，江城烟火',
        folderPath: '足迹/武汉',
        imageNames: genImageNames(50),
      },
      {
        id: 'room-changsha',
        title: '长沙',
        description:
          '湘江北去，茶颜满城',
        folderPath: '足迹/长沙',
        imageNames: genImageNames(16),
      },
      {
        id: 'room-nanchang',
        title: '南昌',
        description:
          '豫章故郡，洪都新府',
        folderPath: '足迹/南昌',
        imageNames: genImageNames(34),
      },
      {
        id: 'room-shanghai',
        title: '上海',
        description:
          '十里洋场旧，一城梧桐新',
        folderPath: '足迹/上海',
        imageNames: genImageNames(42),
      },
    ],
  },
  // ----------------------------------------------------------
  //  2) 现场
  // ----------------------------------------------------------
  {
    id: 'hall-xianchang',
    title: '现场',
    subtitle: '无数身临其境的现场，构成了最真实的当下',
    rooms: [
      {
        id: 'room-wuhanbolindianyingzhou',
        title: '武汉柏林电影周',
        description:
          '“电影发明以后，人类的生命，比起以前至少延长了三倍”\u00A0\u00A0\u00A0\u00A0——《一一》',
        folderPath: '现场/武汉柏林电影周',
        imageNames: genImageNames(3),
      },
      {
        id: 'room-yili-wuhan-kuanian',
        title: '一粒 武汉跨年',
        description:
          '“游千百遍 千万遍快乐人间”\u00A0\u00A0\u00A0\u00A0——《果实》',
        folderPath: '现场/一粒 武汉跨年',
        imageNames: genImageNames(23),
      },
      {
        id: 'room-hongxiayingju-changsha',
        title: '红霞影剧院 长沙',
        description:
          '“狂热和沮丧都留在 回声里”\u00A0\u00A0\u00A0\u00A0——《晕船记》',
        folderPath: '现场/红霞影剧院 长沙',
        imageNames: genImageNames(22),
      },
      {
        id: 'room-fjaka-festival',
        title: 'Fjaka Festival',
        description:
          '春天的事 上岛说',
        folderPath: '现场/Fjaka Festival',
        imageNames: genImageNames(11),
      },
      {
        id: 'room-xiaogoudegutou',
        title: '小狗的骨头',
        description:
          '“噢天使 来到我身边 或让我飞向你”\u00A0\u00A0\u00A0\u00A0——《噢！天使》',
        folderPath: '现场/小狗的骨头',
        imageNames: genImageNames(11),
      },
      {
        id: 'room-ezhouyinhezuoan',
        title: '鄂州银河左岸',
        description:
          '做志愿者去了',
        folderPath: '现场/鄂州银河左岸',
        imageNames: genImageNames(1),
      },
    ],
  },
  // ----------------------------------------------------------
  //  3) 在学校
  // ----------------------------------------------------------
  {
    id: 'hall-zaixuexiao',
    title: '在学校',
    subtitle: '永是珞珈一少年',
    rooms: [
      {
        id: 'room-yinghuaji',
        title: '樱花季',
        description:
          '珞樱缤纷',
        folderPath: '在学校/樱花季',
        imageNames: genImageNames(36),
      },
      {
        id: 'room-meiyuan',
        title: '梅园',
        description:
          '疏影横斜处，暗香浮动时',
        folderPath: '在学校/梅园',
        imageNames: genImageNames(11),
      },
      {
        id: 'room-luojiashan',
        title: '珞珈山',
        description:
          '东湖之滨 珞珈山下',
        folderPath: '在学校/珞珈山',
        imageNames: genImageNames(17),
      },
      {
        id: 'room-suibianpaipai',
        title: '随便拍拍',
        description:
          '',
        folderPath: '在学校/随便拍拍',
        imageNames: genImageNames(18),
      },
    ],
  },
  // ----------------------------------------------------------
  //  4) 逛馆
  // ----------------------------------------------------------
  {
    id: 'hall-guangguan',
    title: '逛馆',
    subtitle: '每一件馆藏背后都是一段历史',
    rooms: [
      {
        id: 'room-sansuci',
        title: '三苏祠',
        description:
          '眉山有祠，父子文章',
        folderPath: '逛馆/三苏祠',
        imageNames: genImageNames(6),
      },
      {
        id: 'room-hubeishengbowuguan',
        title: '湖北省博物馆',
        description:
          '剑藏寒霜，钟鸣千古',
        folderPath: '逛馆/湖北省博物馆',
        imageNames: genImageNames(31),
      },
      {
        id: 'room-wanlinbowuguan',
        title: '万林博物馆',
        description:
          '飞来石下，千年云冈',
        folderPath: '逛馆/万林博物馆',
        imageNames: genImageNames(15),
      },
      {
        id: 'room-hunanshengbowuguan',
        title: '湖南省博物馆',
        description:
          '辛追一梦，楚地千秋',
        folderPath: '逛馆/湖南省博物馆',
        imageNames: genImageNames(15),
      },
      {
        id: 'room-jiangxishengbowuguan',
        title: '江西省博物馆',
        description:
          '青铜鉴今，釉里红妆',
        folderPath: '逛馆/江西省博物馆',
        imageNames: genImageNames(40),
      },
      {
        id: 'room-bayijinianguan',
        title: '八一纪念馆',
        description:
          '军旗升起的地方',
        folderPath: '逛馆/八一纪念馆',
        imageNames: genImageNames(15),
      },
      {
        id: 'room-badashanrenjinianguan',
        title: '八大山人纪念馆',
        description:
          '一鸟一石，皆是山河',
        folderPath: '逛馆/八大山人纪念馆',
        imageNames: genImageNames(10),
      },
      {
        id: 'room-shanghaibowuguan',
        title: '上海博物馆',
        description:
          '一馆尽江南，半壁见中国',
        folderPath: '逛馆/上海博物馆',
        imageNames: genImageNames(17),
      },
      {
        id: 'room-shanghailishibowuguan',
        title: '上海历史博物馆',
        description:
          '一河穿城过，千年水岸新 （“从元代水闸到外白渡桥——苏州河历史文化展”）',
        folderPath: '逛馆/上海历史博物馆',
        imageNames: genImageNames(9),
      },
      {
        id: 'room-shanghaidianyingbowuguan',
        title: '上海电影博物馆',
        description:
          '百工同在 电影万岁',
        folderPath: '逛馆/上海电影博物馆',
        imageNames: genImageNames(13),
      },
      {
        id: 'room-zhongguotengjiaowenhuabowuguan',
        title: '中国藤椒文化博物馆',
        description:
          '止戈镇里，麻香千年',
        folderPath: '逛馆/中国藤椒文化博物馆',
        imageNames: genImageNames(10),
      },
    ],
  },
  // ----------------------------------------------------------
  //  5) 我的天
  // ----------------------------------------------------------
  {
    id: 'hall-wodetian',
    title: '我的天',
    subtitle: '“漂流在世界的另一边”\u00A0\u00A0\u00A0\u00A0——《天空》',
    rooms: [
      {
        id: 'room-yun',
        title: '云',
        description:
          '“看着我坠啊坠啊坠落到云里”\u00A0\u00A0\u00A0\u00A0——《虚拟》',
        folderPath: '我的天/云',
        imageNames: genImageNames(6),
      },
      {
        id: 'room-xia',
        title: '霞',
        description:
          '“摘下夹在光影的回答 飞驰过盛夏”\u00A0\u00A0\u00A0\u00A0——《红霞剧场》',
        folderPath: '我的天/霞',
        imageNames: genImageNames(18),
      },
    ],
  },
  // ----------------------------------------------------------
  //  6) 小动物们
  // ----------------------------------------------------------
  {
    id: 'hall-xiaodongwumen',
    title: '小动物们',
    subtitle: '万物有灵',
    rooms: [
      {
        id: 'room-meimei',
        title: '美美',
        description:
          '美美与共 天下大同（bushi',
        folderPath: '小动物们/美美',
        imageNames: genImageNames(35),
      },
      {
        id: 'room-mao',
        title: '猫',
        description:
          '哈基咪图鉴',
        folderPath: '小动物们/猫',
        imageNames: genImageNames(21),
      },
      {
        id: 'room-lukedao',
        title: '麓客岛',
        description:
          '岛上的小动物们',
        folderPath: '小动物们/麓客岛',
        imageNames: genImageNames(17),
      },
    ],
  },
  // ----------------------------------------------------------
  //  7) 植物
  // ----------------------------------------------------------
  {
    id: 'hall-zhiwu',
    title: '植物',
    subtitle: '一草一木 宿鸟飞花',
    rooms: [
      {
        id: 'room-hua',
        title: '花',
        description:
          '“吻著花香 枕著幻想 放肆地夢一場”\u00A0\u00A0\u00A0\u00A0——《如梦》',
        folderPath: '植物/花',
        imageNames: genImageNames(38),
      },
      {
        id: 'room-cao',
        title: '草',
        description:
          '“在安静的芳草地”\u00A0\u00A0\u00A0\u00A0——《芳草地》',
        folderPath: '植物/草',
        imageNames: genImageNames(9),
      },
    ],
  },
];
