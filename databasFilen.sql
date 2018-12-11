-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 11 dec 2018 kl 10:16
-- Serverversion: 10.1.35-MariaDB
-- PHP-version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `snacksis`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `movies`
--

CREATE TABLE `movies` (
  `id` int(128) NOT NULL,
  `title` varchar(256) NOT NULL,
  `age_rated` int(128) NOT NULL,
  `runtime` int(128) NOT NULL,
  `imdb_score` int(128) NOT NULL,
  `genre_id` int(20) UNSIGNED NOT NULL,
  `plot` text NOT NULL,
  `possessor` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `movies`
--

INSERT INTO `movies` (`id`, `title`, `age_rated`, `runtime`, `imdb_score`, `genre_id`, `plot`, `possessor`) VALUES
(23, 'nein', 13, 99, 8, 14, 'neinnnn', 'ninen'),
(25, 'Forrest Gump', 13, 142, 9, 1, 'The presidencies of Kennedy and Johnson, Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.', 'meme'),
(26, 'residente evile', 15, 111, 7, 14, 'Dis is based on gme', 'notme'),
(27, 'Resident Evil', 15, 100, 7, 14, 'A special military unit fights a powerful, out-of-control supercomputer and hundreds of scientists who have mutated into flesh-eating creatures after a laboratory accident.', 'laforest'),
(28, 'The Godfather', 15, 175, 9, 2, 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'Alfred');

-- --------------------------------------------------------

--
-- Tabellstruktur `movie_genre`
--

CREATE TABLE `movie_genre` (
  `id` int(20) UNSIGNED NOT NULL,
  `name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `movie_genre`
--

INSERT INTO `movie_genre` (`id`, `name`) VALUES
(14, 'Action'),
(4, 'Adventure'),
(3, 'Biography'),
(2, 'Crime'),
(1, 'Drama'),
(7, 'Thriller');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT för tabell `movie_genre`
--
ALTER TABLE `movie_genre`
  MODIFY `id` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
