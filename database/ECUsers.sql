-- MariaDB dump 10.19  Distrib 10.4.18-MariaDB, for osx10.10 (x86_64)
--
-- Host: localhost    Database: creaigwt_users_db_valle
-- ------------------------------------------------------
-- Server version	10.3.28-MariaDB-log-cll-lve

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `section` varchar(100) NOT NULL,
  `link` varchar(200) NOT NULL,
  `access` tinyint(1) NOT NULL DEFAULT 1,
  `role` int(4) NOT NULL,
  `group` varchar(50) NOT NULL,
  `place` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'Courses','/courses',1,1,'courses',1),(2,'Instructors','/instructors',1,1,'instructors',3),(3,'Students','/students',1,1,'students',5),(4,'Add Course','/course/add',1,1,'courses',2),(5,'Add Instructor','/instructors/add',1,1,'instructors',4),(6,'Create Users','/users/add',1,1,'users',6),(7,'Users','/users',1,1,'users',7),(8,'Courses','/courses',1,2,'courses',1),(9,'Instructors','/instructors',0,2,'instructors',3),(10,'Students','/students',0,2,'students',5),(11,'Add Course','/course/add',0,2,'courses',2),(12,'Add Instructor','/instructors/add',0,2,'instructors',4),(13,'Create Users','/users/add',0,2,'users',6),(14,'Users','/users',0,2,'users',7),(15,'Statistics','students/graphs/stats',1,1,'statistics',8),(16,'Statistics','students/graphs/stats',0,2,'statistics',8),(17,'Attendance per Student','students/reports/attendance',1,1,'statistics',9),(18,'Attendance per Student','students/reports/attendance',0,2,'statistics',9);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin'),(2,'instructor');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `uid` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `role` int(4) NOT NULL,
  `number_login` int(11) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `first_login` datetime NOT NULL,
  `last_login` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`uid`),
  UNIQUE KEY `id` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('7AYH3QGT8VRX0NEYNwxckq50AfI3','test123@test.com',2,0,'active','0000-00-00 00:00:00','0000-00-00 00:00:00','2020-03-16 12:50:42'),('gyr1AGvqiPQ0sfH6pucu3cQ9VM12','test@creatingux.com',1,0,'active','2020-01-10 00:00:00','0000-00-00 00:00:00','2020-01-11 02:37:45'),('K5NPA06pDwZpoiCci6TY5cFmwNp1','jesus.m@creatingux.com',2,0,'active','0000-00-00 00:00:00','0000-00-00 00:00:00','2020-03-16 15:35:32'),('nXEVOghptLOm7q3u49Il8Xgsru72','test2@creatingux.com',2,0,'active','0000-00-00 00:00:00','0000-00-00 00:00:00','2021-03-20 21:57:21'),('puzMvGlZ3hPt62k9X0DhWcgNI7j2','test1@creatingux.com',1,0,'active','0000-00-00 00:00:00','0000-00-00 00:00:00','2020-07-16 02:34:00');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'creaigwt_users_db_valle'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-04 14:41:06
