import { createSelector } from "@reduxjs/toolkit";
import { Attribute } from "../types";

export const attributeSelectItemsSelector = createSelector(
    state => state.attribute.attributesSelect,
    (attributesSelect) => attributesSelect.map((a: Attribute) => ({ id: String(a.id), name: a.name }))
);