import { useState, useEffect } from "react";
import api from "../services/api";

export interface Genre {
  id: number;
  name: string;
}

export function useGenres() {
    const URL = '/api/genres'  
    const [genre, setGenre] = useState<Genre[]>([]);
  
    useEffect(() => {
      const fetchGenre = async () => {
        try {
          const response = await api.get(URL);
          setGenre(response.data)
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
      fetchGenre();
    }, []);
    
    return { genre };
  }