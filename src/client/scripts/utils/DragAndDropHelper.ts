import { IItem } from "../../../shared/data/item/IItem";

export module DragAndDropHelper {

    export interface DragAndDropObject {
        item: IItem,
        index: number,
        //Origin enum (ship cargo etc..)
    }

    let currentSelection: DragAndDropObject | undefined;

    export function getSelection(): DragAndDropObject | undefined {
        return currentSelection;
    }

    export function setSelection(selection: DragAndDropObject | undefined) {
        currentSelection = selection;
    }
}