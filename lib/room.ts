import { getPublishedShelfPosts } from "@/lib/bookshelf";
import { resources } from "@/lib/resources";
import { tools } from "@/lib/tools";

export type RoomZone = {
  id: "room" | "resources" | "bookshelf" | "tools";
  title: string;
  label: string;
  href: string;
  description: string;
  iconName: string;
  accent: "warm" | "blue" | "green" | "purple";
  status?: string;
  countLabel?: string;
  position: {
    desktop: { x: number; y: number };
    tablet?: { x: number; y: number };
    mobile?: { x: number; y: number };
  };
};

export const roomZones: RoomZone[] = [
  {
    id: "room",
    title: "Room",
    label: "Core",
    href: "/",
    description: "Cửa vào căn phòng số.",
    iconName: "room",
    accent: "blue",
    status: "home",
    countLabel: "4 khu vực",
    position: {
      desktop: { x: 48, y: 52 },
      tablet: { x: 50, y: 58 },
    },
  },
  {
    id: "resources",
    title: "Rương đồ",
    label: "Inventory",
    href: "/resources",
    description: "Link, checklist và tài nguyên lưu lại.",
    iconName: "archive",
    accent: "warm",
    status: "saved",
    countLabel: `${resources.length} món`,
    position: {
      desktop: { x: 23, y: 70 },
      tablet: { x: 25, y: 64 },
    },
  },
  {
    id: "bookshelf",
    title: "Giá sách",
    label: "Notes",
    href: "/bookshelf",
    description: "Bài viết và ghi chép dài hơn.",
    iconName: "bookshelf",
    accent: "green",
    status: "writing",
    countLabel: `${getPublishedShelfPosts().length} bài`,
    position: {
      desktop: { x: 78, y: 35 },
      tablet: { x: 74, y: 42 },
    },
  },
  {
    id: "tools",
    title: "Công cụ",
    label: "Workshop",
    href: "/tools",
    description: "Tiện ích nhỏ tôi đang xây.",
    iconName: "toolbox",
    accent: "purple",
    status: "building",
    countLabel: `${tools.length} tools`,
    position: {
      desktop: { x: 62, y: 67 },
      tablet: { x: 65, y: 70 },
    },
  },
];
