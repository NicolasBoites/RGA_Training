import { Document } from "mongoose";

export interface IProject extends Document{

  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly budget: number;
  readonly active: boolean;

}