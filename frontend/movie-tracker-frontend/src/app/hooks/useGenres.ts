import { useState, useEffect } from "react";
import axios from "axios";

export interface Genre {
  id: number;
  name: string;
}


export function useGenres() {
    const URL = 'http://localhost:8080/api/genres'  
    const [genre, setGenre] = useState<Genre[]>([]);
  
    useEffect(() => {
      const fetchGenre = async () => {
        try {
          const response = await axios.get(URL);
          setGenre(response.data)
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
      fetchGenre();
    }, []);
    
    return { genre };
  }