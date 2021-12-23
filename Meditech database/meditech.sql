-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 10, 2021 at 02:23 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `meditech`
--

-- --------------------------------------------------------

--
-- Table structure for table `assign`
--

CREATE TABLE `assign` (
  `Invoice_ID` varchar(30) NOT NULL,
  `NIC` varchar(12) NOT NULL,
  `Date` varchar(30) NOT NULL,
  `Porter_ID` varchar(30) NOT NULL,
  `Status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assign`
--

INSERT INTO `assign` (`Invoice_ID`, `NIC`, `Date`, `Porter_ID`, `Status`) VALUES
('856890', '200011502821', '8/30/2021', 'P002', 'assigned'),
('856891', '200011502825', '8/30/2021', 'P001', 'assigned'),
('856892', '200011502824', '8/30/2021', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `Invoice_ID` varchar(30) NOT NULL,
  `NIC` varchar(12) NOT NULL,
  `Date` varchar(30) NOT NULL,
  `Porter_ID` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `porter`
--

CREATE TABLE `porter` (
  `Porter_ID` varchar(30) NOT NULL,
  `First_Name` varchar(30) NOT NULL,
  `Last_Name` varchar(30) NOT NULL,
  `NIC` varchar(12) NOT NULL,
  `Phone` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `porter`
--

INSERT INTO `porter` (`Porter_ID`, `First_Name`, `Last_Name`, `NIC`, `Phone`) VALUES
('P001', 'Jane', 'Jolie', '187456321598', 112569789),
('P002', 'Sam', 'Jolie', '187456321599', 112569889),
('P003', 'Tom', 'Jolie', '187456321898', 112769789);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
