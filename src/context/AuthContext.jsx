"use client";

import { getAuthUser } from "@/utils/apiServices";
import { signOut, useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { data: session, status } = useSession();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (status === "loading") return;

                if (status === "unauthenticated") {
                    setUser(null);
                    setLoading(false);
                    return;
                }

                if (status === "authenticated" && !session?.user?.id) {
                    console.warn("Session exists but no user found. Signing out...");
                    await signOut({ callbackUrl: "/" });
                    setUser(null);
                    setLoading(false);
                    return;
                }

                const getUser = await getAuthUser();
                if (getUser?.success && getUser?.user) {
                    setUser(getUser.user);
                } else {
                    console.warn("User not found in database. Signing out...");
                    await signOut({ callbackUrl: "/" });
                    setUser(null);
                }
            } catch (error) {
                console.error("❌ AuthProvider error:", error.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [session, status]);

    return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
