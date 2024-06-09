-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2024 at 04:35 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `taskdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `list`
--

CREATE TABLE `list` (
  `lid` tinyint(100) NOT NULL,
  `uid` tinyint(100) NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `list`
--

INSERT INTO `list` (`lid`, `uid`, `title`) VALUES
(5, 5, 'study'),
(6, 5, 'friday'),
(8, 5, 'tyesdrfg'),
(26, 55, 'درس خواندن'),
(29, 53, 'amirpc1391 table list'),
(30, 53, 'aaaaaqqqq'),
(31, 55, 'dsfsd'),
(39, 63, 'sdfds'),
(40, 63, 'ddddd'),
(41, 63, 'ffff'),
(44, 63, 'ffff');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `rid` tinyint(100) NOT NULL,
  `description` text NOT NULL,
  `tid` tinyint(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`rid`, `description`, `tid`) VALUES
(3, 'matn testi', 1),
(4, 'matn testi', 10),
(6, 'ffffffddddd', 10);

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `tid` tinyint(100) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `status` enum('open','in-progress','close','') NOT NULL,
  `lid` tinyint(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`tid`, `title`, `description`, `status`, `lid`) VALUES
(1, 'reading AI book', 'i should read a modaresane sharif for final term test', 'open', 6),
(9, 'reading AIwwwwwww', 'i should read a modaresane sharif for final', 'in-progress', 26),
(10, 'my info', 'amir is good boy\n', 'close', 26);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` tinyint(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `role` enum('normal','admin') NOT NULL DEFAULT 'normal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `username`, `email`, `password`, `fullname`, `role`) VALUES
(3, 'amir', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(5, 'amir1', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(7, 'amir2', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(11, 'amir4', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(13, 'amir5', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(15, 'amir7', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(16, 'amir8', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(18, 'amir9', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(20, 'amir10x10', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(25, 'amir12', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(29, 'amir13', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(32, 'amir14', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(34, 'amir15', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(40, 'amir17', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(42, 'amir18', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(44, 'amir19', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(45, 'amir20', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(46, 'amir21', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(50, 'amir221', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(51, 'amir176', 'amir@gmail.com', '456546455', 'amir heidari', 'normal'),
(53, 'amirpc1391', 'amirpc1391@gmail.com', '24688642', 'amirpc1391', 'normal'),
(54, 'sajad', 'sajadmoosavi@gmail.com', '1234', 'sajad moosavi', 'normal'),
(55, 'alireza1', 'alireza@gmail.com', '24688642', 'alireza', 'normal'),
(56, 'ali1234', 'aaaaaa@gmail.com', '1234', 'ali1234', 'normal'),
(57, 'awda', 'wdawd@d.wsada', 'ada', 'dawdawd', 'normal'),
(58, 'dwdd', 'wd@gmail.cju', 'waddad', 'dwdw', 'normal'),
(59, 'awdawd', 'adaw@ff.dg', 'dawdawdawfesf', 'alireza', 'normal'),
(60, 'dad', 'amir@dgvdr.cv', 'fcds', 'alireza', 'normal'),
(61, 'wwwwwwww', 'wwwwwww@gmail.com', 'wwww', 'wwwwwww', 'normal'),
(62, 'qqqqqq', 'qqqq@wada.awf', 'efs', 'qqqq', 'normal'),
(63, 'amirpc', 'amirpc1380@gmail.com', '24688642', 'amirpc', 'normal'),
(64, 'amirpcf', 'sedfsed@dsfv.sefse', 'sedfsed', 'safsedf', 'normal');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `list`
--
ALTER TABLE `list`
  ADD PRIMARY KEY (`lid`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`rid`),
  ADD KEY `report_ibfk_1` (`tid`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`tid`),
  ADD KEY `task_ibfk_1` (`lid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `list`
--
ALTER TABLE `list`
  MODIFY `lid` tinyint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `rid` tinyint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `tid` tinyint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` tinyint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `list`
--
ALTER TABLE `list`
  ADD CONSTRAINT `list_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`);

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `task` (`tid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`lid`) REFERENCES `list` (`lid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
