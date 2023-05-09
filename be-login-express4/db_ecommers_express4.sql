-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 09 Bulan Mei 2023 pada 06.20
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_ecommers_express4`
--
CREATE DATABASE IF NOT EXISTS `db_ecommers_express4` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_ecommers_express4`;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230501062700-create-tb-user.js'),
('20230502133803-create-tb-product.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbproducts`
--

CREATE TABLE `tbproducts` (
  `id` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `productBrand` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbproducts`
--

INSERT INTO `tbproducts` (`id`, `category`, `productName`, `productBrand`, `createdAt`, `updatedAt`) VALUES
('7cd69ae9-4fbf-46d4-aa77-fdf5c5cef53e', 'Motor', 'Mio', 'Yamaha', '2023-05-03 16:12:14', '2023-05-03 16:12:14'),
('eb65e625-1ed4-4f79-a00b-d4c6d1d84bf8', 'Motor', 'Beat', 'Honda', '2023-05-03 16:12:33', '2023-05-03 16:12:33');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbusers`
--

CREATE TABLE `tbusers` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `noKtp` varchar(255) DEFAULT NULL,
  `photoProfile` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `refreshToken` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbusers`
--

INSERT INTO `tbusers` (`id`, `email`, `username`, `password`, `fullname`, `noKtp`, `photoProfile`, `level`, `refreshToken`, `createdAt`, `updatedAt`) VALUES
('701f8935-6bbe-43f7-adf2-fe1676596307', 'admin@gmail.com', 'jonheri', '$2b$10$v84Qj0hq5vEGOYAf.pk4ZuYK7W4MPPNn5C2w4WaXBD76YTuNA7wCO', 'Jon Doe', NULL, NULL, NULL, '', '2023-05-09 02:41:17', '2023-05-09 02:41:17'),
('b2a847b7-d7df-49b8-abc7-878dc60ef813', 'admin@email.com', 'Jon Heri', '$2b$10$OrbCZnO/2YYG2/D3DBXml.5Zj/H0pTrSUXqCPJAkYgWOKjPJbr.u6', 'admin', NULL, NULL, 'student', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyYTg0N2I3LWQ3ZGYtNDliOC1hYmM3LTg3OGRjNjBlZjgxMyIsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwidXNlcm5hbWUiOiJKb24gSGVyaSIsImZ1bGxuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODM2MDUzNDQsImV4cCI6MTY4MzY5MTc0NH0.pFkKyNb4G-Uosh1Qq2iBhonCqPfnQoTuLDGdg92uFPw', '2023-05-07 13:37:58', '2023-05-09 04:09:04');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `tbproducts`
--
ALTER TABLE `tbproducts`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tbusers`
--
ALTER TABLE `tbusers`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
