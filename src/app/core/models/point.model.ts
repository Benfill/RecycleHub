import { User } from "./user.model";

export interface Point {
  id: string
  user:User
  balance:number
  convertedPoints:number
  equivalentVoucher:number
}
