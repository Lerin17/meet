"use client"

import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";



type User = {
    id: string;
    name: string;
    email: string;
    token?: string;
};

type Credentials = {
    email: string;
    password: string;
};

type LoginContextType = {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    login: (creds: Credentials) => Promise<void>;
    logout: () => void;


};

const STORAGE_KEY = "login_user";

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

 

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                setUser(JSON.parse(raw));
            } catch {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    }, []);

    useEffect(() => {
        if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        else localStorage.removeItem(STORAGE_KEY);
    }, [user]);

    const login = async ({ email, password }: Credentials) => {
        setLoading(true);
        setError(null);
        try {
            // Placeholder: replace with real API request
            // Example:
            // const res = await fetch("/api/login", { method: "POST", body: JSON.stringify({ email, password }) });
            // const data = await res.json();
            await new Promise((r) => setTimeout(r, 700)); // simulate network
            if (!email || !password) throw new Error("Missing credentials");

            const fakeUser: User = {
                id: "user-1",
                name: "Demo User",
                email,
                token: "fake-jwt-token",
            };

            setUser(fakeUser)
         
         

        } catch (err: any) {
            setError(err?.message ?? "Login failed");
            setUser(null);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setError(null);
        setLoading(false);
    };

    const value: LoginContextType = {
        user,
        isAuthenticated: !!user,
        loading,
        error,
        login,
        logout,
    };

    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};

export const useLogin = (): LoginContextType => {
    const ctx = useContext(LoginContext);
    if (!ctx) {
        throw new Error("useLogin must be used within a LoginProvider");
    }
    return ctx;
};