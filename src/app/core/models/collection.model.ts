enum WasteType {
  PLASTIC = 2,
   GLASS = 1, PAPER = 1 , METAL = 5
}
interface collection {
  type: WasteType,
  picture: string | null,
  weight: number,
  address:string,
  date:string,
  note: string | null,
  status: 'pending' | 'occuped' | 'inProgress' | 'validated' | 'cancelled';
}
