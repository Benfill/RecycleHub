import { User } from "./user.model";

export enum WasteType {
  PLASTIC = 'PLASTIC',
  GLASS = 'GLASS',
  PAPER = 'PAPER',
  METAL = 'METAL'
}

export const WasteTypePoints: Record<WasteType, number> = {
  [WasteType.PLASTIC]: 2,
  [WasteType.GLASS]: 1,
  [WasteType.PAPER]: 1,
  [WasteType.METAL]: 5
};
export interface Collection {
  id:string,
  type: WasteType,
  picture: string | null,
  weight: number,
  address:string,
  city:string,
  date:string,
  timeSlot:string
  note: string | null,
  status: 'pending' | 'occupied' | 'inProgress' | 'validated' | 'cancelled',
  user:User
}

