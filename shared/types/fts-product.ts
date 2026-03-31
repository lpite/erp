import { FileNameString } from "../../app/pocketbase-types";
import {FTSDocument} from "../../fts/index"

export type FtsProduct = FTSDocument & {places:string[];price:number;stock:number,photos:FileNameString[],suppliers:string[]} 