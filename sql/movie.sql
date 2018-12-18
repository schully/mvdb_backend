SELECT
    movies.id,
    title,
    age_rated,
    runtime,
    imdb_score,
    plot,
    possessor,
    movie_genre.name AS genre
FROM movies
    JOIN movie_genre ON movie_genre.id = movies.genre_id
    WHERE movies.id = ?