import React from 'react';
import styles from './MovieList.module.css';
import { FixedSizeList as List } from 'react-window';
import { ListChildComponentProps } from 'react-window';
import moment from 'moment';

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

  const formatDate = (dateString: string) => {
    const date = moment(dateString);
    return date.format('DD/MM/YYYY');
  };

  return (
    <div className={styles['movie-list']}>
      <h2>Movie List</h2>
      <List
        height={400} 
        itemCount={movies.length} 
        itemSize={50} 
        width="100%"
      >
        {/* @ts-ignore */}
        {({ index, style }: ListChildComponentProps) => { 
          const movie = movies[index];
          return (
            <div style={style} key={movie.id}>
              <li className={styles['movie-list li']}>
                <strong>{movie.title}</strong> | {movie.genre} | {formatDate(movie.watched_date)}
              </li>
            </div>
          );
        }}
      </List>
    </div>
  );
};

export default MovieList;
