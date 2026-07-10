import { getPublishedShelfPosts } from "@/lib/bookshelf";
import { nowData } from "@/lib/now";
import { resources } from "@/lib/resources";
import { getAvailableTools, tools } from "@/lib/tools";

export type RoomZone = {
  id: "me" | "post" | "memory" | "drawer";
  title: string;
  label: string;
  href: string;
  description: string;
  iconName: string;
  objectName: string;
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
    id: "me",
    title: "Me",
    label: "identity card",
    href: "/about",
    description: "who sits here, what I am learning, and what I am building.",
    iconName: "me",
    objectName: "profile panel",
    accent: "blue",
    status: "online",
    countLabel: `${nowData.currentlyBuilding.length} now`,
    position: {
      desktop: { x: 52, y: 66 },
      tablet: { x: 54, y: 64 },
    },
  },
  {
    id: "post",
    title: "Post",
    label: "notes/logs",
    href: "/bookshelf",
    description: "longer notes, thoughts, and things worth keeping.",
    iconName: "post",
    objectName: "note stack",
    accent: "green",
    status: "writing",
    countLabel: `${getPublishedShelfPosts().length} notes`,
    position: {
      desktop: { x: 78, y: 35 },
      tablet: { x: 74, y: 42 },
    },
  },
  {
    id: "memory",
    title: "Memory",
    label: "saved cache",
    href: "/resources",
    description: "links, files, snippets, and things I do not want to search twice.",
    iconName: "memory",
    objectName: "memory blocks",
    accent: "warm",
    status: "saved",
    countLabel: `${resources.length} saved`,
    position: {
      desktop: { x: 23, y: 70 },
      tablet: { x: 25, y: 64 },
    },
  },
  {
    id: "drawer",
    title: "Drawer",
    label: "utility stash",
    href: "/tools",
    description: "small tools, experiments, and random utilities.",
    iconName: "drawer",
    objectName: "drawer slots",
    accent: "purple",
    status: "cooking",
    countLabel: `${getAvailableTools().length}/${tools.length} ready`,
    position: {
      desktop: { x: 62, y: 67 },
      tablet: { x: 65, y: 70 },
    },
  },
];
