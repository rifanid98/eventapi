-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 18, 2020 at 09:25 AM
-- Server version: 8.0.21-0ubuntu0.20.04.4
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `event`
--
CREATE DATABASE IF NOT EXISTS `event`;
USE `event`;
-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `participant` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `note` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `location`, `participant`, `date`, `note`, `image`, `created_at`) VALUES
(12, 'Meeting with CEO', 'Pekan Baru, Jakarta', 'Adnin, Rifandi, Sutanto', '2020-09-17', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque nihil excepturi reprehenderit tempora itaque odio accusantium? Similique repellat, iusto vero atque, eius in fuga dolore ullam veniam pariatur eveniet. Ut.', '2020-09-18T01:50:08.448Zloker.jpg', '2020-09-18 01:50:08'),
(13, 'Meeting with new client', 'Bogor, Jawa Barat', 'Adnin, Rifandi', '2020-09-18', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, vitae. Aliquid dolor ex sapiente consectetur unde, nesciunt reiciendis incidunt quos eligendi ducimus adipisci numquam neque nobis veritatis. Doloremque, dolore quisquam.', '2020-09-18T02:11:14.030Zloker-aldi.jpg', '2020-09-18 02:11:14'),
(14, 'Meeting with collega', 'Tangerang, Jakarta', 'Adnin, Rifandi', '2020-09-18', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, commodi quibusdam eveniet magni quo dignissimos quis quisquam expedita maxime tempore vero atque incidunt facere voluptates repellat iure sed omnis ipsum!', '2020-09-18T02:12:53.970ZUIM-Night.jpg', '2020-09-18 02:12:53'),
(15, 'Walk in Interview', 'Monas, Jakarta', 'Adnin, Rifandi, Sutanto, Putra', '2020-09-18', 'Walk in interviewWalk in interviewWalk in interviewWalk in interviewWalk in interviewWalk in interviewWalk in interviewWalk in interviewWalk in interview', '2020-09-18T02:15:34.173ZUIM-Night.jpg', '2020-09-18 02:15:34'),
(16, 'Interview Kerja', 'Bogor, Jawa Barat', 'Rifandi', '2020-09-19', 'Diharapkan tidak datang terlambat, datang lebih cepat 15 menit sebelum waktu interview dimulai.\n\nDiharapkan membawa berkas-berkas yang dibutuhkan untuk melamar, sehingga semua berkas sudah siap.', '2020-09-18T02:16:49.521ZLoginlogo.png', '2020-09-18 02:16:49'),
(17, 'Test', 'Test', 'Test', '2020-09-18', 'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test ', '2020-09-18T02:17:27.416ZLoginlogo.png', '2020-09-18 02:17:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
