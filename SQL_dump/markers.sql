-- phpMyAdmin SQL Dump
-- version 3.5.3
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Час створення: Лип 06 2018 р., 12:05
-- Версія сервера: 5.5.28-log
-- Версія PHP: 5.4.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- БД: `store_locator`
--

-- --------------------------------------------------------

--
-- Структура таблиці `markers`
--

CREATE TABLE IF NOT EXISTS `markers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `address` varchar(80) NOT NULL,
  `lat` float(10,6) NOT NULL,
  `lng` float(10,6) NOT NULL,
  `hours` varchar(80) NOT NULL,
  `description` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Дамп даних таблиці `markers`
--

INSERT INTO `markers` (`id`, `name`, `address`, `lat`, `lng`, `hours`, `description`) VALUES
(1, 'ул. Бандеры', '', 50.262707, 28.661707, '8AM to 10PM', 'Great place to go'),
(2, 'Львівська майстерня шоколаду', '', 50.258003, 28.659492, '9AM to 9PM', 'Затишне місце'),
(3, 'Магазин Природа', '', 50.258095, 28.663448, 'круглосуточно', ''),
(4, 'McDonald"s', '', 50.265907, 28.683786, 'Київська 77, Житомир, 10000', 'McDrive'),
(5, 'Замковая Гора', '', 50.253628, 50.253628, 'Парк', 'Кафедральна, 10002'),
(6, 'Парк Гагарина', '', 50.247574, 28.665838, 'Атракционы', 'Старий Бульвар 34'),
(8, 'Ботанический сад', '', 50.251278, 28.696526, '09:00–18:00', 'Корольова 39, Житомир'),
(9, 'Корбутовский гидропарк', '', 50.237732, 28.606245, 'Открыто 24 часа', 'Пляжна алея, Житомир'),
(10, 'Школа 36', '', 50.267841, 28.655947, 'Муниципальная школа', 'Домбровського, 21');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
