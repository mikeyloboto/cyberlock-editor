import { Item } from './item.domain';

export interface Room {
  id: string;
  title: string;
  description: string;
  coordinates?: [number, number, number];
  npcs?: string[];
  items?: Item[];
  script?: string;
  behaviors?: string[];
  metadata?: { [key: string]: any };
  exits?: { direction: string; roomId: string; leaveMessage?: string }[];
  doors?: {
    [key: string]: { locked: boolean; closed: boolean; lockedBy: string };
  }[];
}
