import { IItem } from "./item/IItem";

export interface IOreProcessingState {
    isProcessing: boolean,
    item: IItem | undefined,
    startTime: number
}