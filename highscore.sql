-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: 127.0.0.1
-- Čas generovania: Po 14.Dec 2020, 19:46
-- Verzia serveru: 10.4.16-MariaDB
-- Verzia PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáza: `highscore`
--

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `hs`
--

CREATE TABLE `hs` (
  `id` int(11) NOT NULL,
  `meno` varchar(3) NOT NULL,
  `score` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Sťahujem dáta pre tabuľku `hs`
--

INSERT INTO `hs` (`id`, `meno`, `score`) VALUES
(5, 'LUC', 7000),
(6, 'JOZ', 8000),
(7, 'MAR', 9000),
(8, 'MIR', 10000),
(11, 'SUP', 1337);

--
-- Kľúče pre exportované tabuľky
--

--
-- Indexy pre tabuľku `hs`
--
ALTER TABLE `hs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pre exportované tabuľky
--

--
-- AUTO_INCREMENT pre tabuľku `hs`
--
ALTER TABLE `hs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
