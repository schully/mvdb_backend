SELECT movies.id, movie_genre.name AS genre, title FROM movies JOIN movie_genre ON movie_genre.id = movies.genre_id