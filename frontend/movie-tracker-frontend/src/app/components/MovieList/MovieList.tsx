import React from 'react';
import styles from './MovieList.module.css';
import { FixedSizeList as List } from 'react-window';
import { ListChildComponentProps } from 'react-window';
import moment from 'moment';
import { MdDelete } from "react-icons/md";

interface Movie {
  id: number;
  title: string;
  genre: string;
  watched_date: string;
}

interface MovieListProps {
  movies: Movie[];
  removeById: (id: number) => void; 
}

const MovieList: React.FC<MovieListProps> = ({ movies, removeById }) => {

  const formatDate = (dateString: string) => {
    const date = moment(dateString);
    return date.format('DD/MM/YYYY');
  };

  const removeItem = async (id: number) => {
    const confirmed = window.confirm("Tem certeza que deseja remover este filme?");
    if (!confirmed) return;
    removeById(id)
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
        {/* @ts-expect-error ListChildComponentProps: provavelmente erro de tipagem?*/}
        {({ index, style }: ListChildComponentProps) => { 
          const movie = movies[index];
          return (
            <div style={style} key={movie.id}>
              <li className={styles['movie-list li']}>
                 <span>
                    <strong>{movie.title}</strong> | {movie.genre} | {formatDate(movie.watched_date)}
                  </span>
                <button
                  className={styles['remove-button']}
                  onClick={() => removeItem(movie.id)}
                  style={{ marginLeft: '1rem' }}
                >
                  <MdDelete color="#d32f2f" size={20} title='delete'/>
                </button>
              </li>
            </div>
          );
        }}
      </List>
    </div>
  );
};

export default MovieList;
