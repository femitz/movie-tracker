import React from 'react';
import styles from './MovieList.module.css';
import { FixedSizeList as List } from 'react-window';
import { ListChildComponentProps } from 'react-window';


interface Movie {
  id: number;
  title: string;
  genre: string;
  watched_date: string;
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className={styles['movie-list']}>
      <h2>Movie List</h2>
      <List
        height={400} // Altura da lista
        itemCount={movies.length} // Quantidade de itens
        itemSize={50} // Altura de cada item
        width="100%"
      >
        {/* @ts-ignore */}
        {({ index, style }: ListChildComponentProps) => { // Tipagem correta
          const movie = movies[index];
          return (
            <div style={style} key={movie.id}>
              <li className={styles['movie-list li']}>
                <strong>{movie.title}</strong> | {movie.genre} | {movie.watched_date}
              </li>
            </div>
          );
        }}
      </List>
    </div>
  );
};

export default MovieList;
