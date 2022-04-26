-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 26, 2022 at 09:58 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `work`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `ID` int(11) NOT NULL,
  `name` text COMMENT '客戶名稱',
  `bankID` varchar(50) DEFAULT NULL COMMENT '銀行帳戶',
  `Email` varchar(50) DEFAULT NULL,
  `agreementList` varchar(50) DEFAULT NULL COMMENT '客戶簽的協議清單，以,隔開',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='紀錄客戶的帳戶';

-- --------------------------------------------------------

--
-- Table structure for table `agreement`
--

CREATE TABLE `agreement` (
  `ID` int(11) NOT NULL,
  `info` varchar(50) DEFAULT NULL COMMENT '協議資訊',
  `name` varchar(50) DEFAULT NULL COMMENT '協議名稱',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='協議清單';

-- --------------------------------------------------------

--
-- Table structure for table `deal`
--

CREATE TABLE `deal` (
  `ID` int(11) NOT NULL,
  `orderID` int(11) DEFAULT NULL COMMENT '下單ID',
  `accountID` int(11) DEFAULT NULL COMMENT '客戶ID',
  `money` double DEFAULT NULL COMMENT '成交金額',
  `number` double DEFAULT NULL COMMENT '成交數量',
  `totolMoney` double DEFAULT NULL COMMENT '總金額',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='成交資訊';

-- --------------------------------------------------------

--
-- Table structure for table `fake_bank`
--

CREATE TABLE `fake_bank` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL COMMENT '客戶名稱',
  `money` double DEFAULT NULL COMMENT '金額',
  `currency` varchar(50) DEFAULT NULL COMMENT '幣別',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `fund`
--

CREATE TABLE `fund` (
  `ID` int(11) NOT NULL,
  `currency` varchar(50) DEFAULT NULL COMMENT '幣別',
  `name` varchar(50) DEFAULT NULL COMMENT '基金名稱',
  `info` varchar(50) DEFAULT NULL COMMENT '基金介紹',
  `tyep` varchar(50) DEFAULT NULL COMMENT '基金類型(A, B, C…',
  `NAV` double(22,0) DEFAULT NULL COMMENT '基金的NAV(淨值',
  `NAVUpdateTime` datetime DEFAULT NULL,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='基金清單';

-- --------------------------------------------------------

--
-- Table structure for table `maillist`
--

CREATE TABLE `maillist` (
  `ID` int(11) NOT NULL,
  `Email` varchar(50) DEFAULT NULL COMMENT '收件人email',
  `title` varchar(50) DEFAULT NULL COMMENT '標題',
  `msg` varchar(50) DEFAULT NULL COMMENT '內文',
  `sent` varchar(50) DEFAULT 'N' COMMENT '有無送出，N沒送 Y送',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `ID` int(11) NOT NULL,
  `fundNo` int(11) DEFAULT NULL COMMENT '基金編號',
  `accountID` int(11) DEFAULT NULL,
  `orderMoney` double DEFAULT NULL COMMENT '下單金額',
  `orderNumber` double DEFAULT NULL COMMENT '下單數量',
  `orderType` varchar(50) DEFAULT NULL COMMENT '下單類型(M代表用錢當作條件，N代表數量)',
  `type` varchar(50) DEFAULT NULL COMMENT '結果',
  `effectiveDate` date DEFAULT NULL COMMENT '下單生效日期(當下單時間超過銀行服務時間時變成隔日)',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '下單成功與否',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='客戶下單清單';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`ID`) USING BTREE;

--
-- Indexes for table `agreement`
--
ALTER TABLE `agreement`
  ADD PRIMARY KEY (`ID`) USING BTREE;

--
-- Indexes for table `deal`
--
ALTER TABLE `deal`
  ADD PRIMARY KEY (`ID`) USING BTREE;

--
-- Indexes for table `fake_bank`
--
ALTER TABLE `fake_bank`
  ADD PRIMARY KEY (`ID`) USING BTREE;

--
-- Indexes for table `fund`
--
ALTER TABLE `fund`
  ADD PRIMARY KEY (`ID`) USING BTREE;

--
-- Indexes for table `maillist`
--
ALTER TABLE `maillist`
  ADD PRIMARY KEY (`ID`) USING BTREE;

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`ID`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `agreement`
--
ALTER TABLE `agreement`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `deal`
--
ALTER TABLE `deal`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fake_bank`
--
ALTER TABLE `fake_bank`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fund`
--
ALTER TABLE `fund`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `maillist`
--
ALTER TABLE `maillist`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
