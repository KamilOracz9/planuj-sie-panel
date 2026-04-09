"use client";

import { createContext, useContext } from "react";
import { User } from "@/features/users";

export const UserContext = createContext<Promise<User> | null>(null);

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within UserProvider");
    return ctx;
};