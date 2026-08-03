import { createContext, useState, useEffect, ReactNode } from "react";
import { initDatabase, fetchFavorites, dbToggleFavorite as toggleFavoriteInDb } from "@/db/SQLite";
import React from "react";

interface FavoriteContextData {
    favorites: string[],
    toggleFavorite: (id: string) => void,
    isFavorite: (id: string) => boolean
}

export const FavoritesContext = createContext<FavoriteContextData | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        initDatabase();
        setFavorites(fetchFavorites());
    }, []);

    const toggleFavorite = (id: string) => {
        toggleFavoriteInDb(id);
        setFavorites(fetchFavorites());
    }

    const isFavorite = (id: string) => favorites.includes(id);
    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
};

export function useFavorites() {
    const context = React.useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites debe usarse dentro de un FavoritesProvider');
    }
    return context;
}