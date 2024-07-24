import { Npc } from './npc.domain';
import { Room } from './room.domain';

export interface Area {
  rooms?: Room[];
  npcs?: Npc[];
  areaName?: string;
  areaDirectory?: string;
}
