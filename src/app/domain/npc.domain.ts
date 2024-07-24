import { Item } from './item.domain';
import { Quest } from './quest.domain';

export interface Npc {
  id: string;
  name: string;
  keywords: string[];
  description: string;
  level?: number;
  script?: string;
  behaviors?: any[];
  metadata?: any;
  attributes?: any;
  items?: Item[];
  quests?: Quest[];
}
