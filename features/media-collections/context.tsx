"use client";

import { createContext, use, useContext } from "react";
import { MediaCollection } from "./types";

export const MediaCollectionContext = createContext<{
    mediaCollectionPromise: Promise<MediaCollection> | undefined,
} | undefined>(undefined);

export const useMediaCollection = () => {
    const ctx = useContext(MediaCollectionContext);
    const mediaCollection = ctx?.mediaCollectionPromise ? use(ctx.mediaCollectionPromise) : {} as MediaCollection;

    return {
        ...ctx,
        mediaCollection,
    };
};
