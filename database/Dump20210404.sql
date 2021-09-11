-- MariaDB dump 10.19  Distrib 10.4.18-MariaDB, for osx10.10 (x86_64)
--
-- Host: localhost    Database: creaigwt_english_connect_valle
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
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `attendance_value` tinyint(1) DEFAULT NULL,
  `lesson` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `modified_on` timestamp NULL DEFAULT NULL,
  `status` varchar(45) DEFAULT 'active',
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (54,'2019-12-06',1,1,'2020-03-14 21:59:22',NULL,'active',20),(55,'2019-12-06',1,1,'2020-03-14 21:59:22',NULL,'active',21),(56,'2019-12-06',1,1,'2020-03-14 21:59:22',NULL,'active',22),(57,'2020-01-17',1,2,'2020-03-14 21:59:43',NULL,'active',20),(58,'2020-01-17',1,2,'2020-03-14 21:59:43',NULL,'active',21),(59,'2020-01-17',1,2,'2020-03-14 21:59:43',NULL,'active',22),(60,'2020-03-16',1,3,'2020-03-16 11:48:53',NULL,'active',20),(61,'2020-03-16',1,3,'2020-03-16 11:48:54',NULL,'active',21),(62,'2020-03-16',1,3,'2020-03-16 11:48:54',NULL,'active',22),(63,'2020-03-21',1,5,'2020-03-16 11:55:49',NULL,'active',20),(64,'2020-03-21',0,5,'2020-03-16 11:55:49',NULL,'active',21),(65,'2020-03-21',1,5,'2020-03-16 11:55:49',NULL,'active',22),(66,'2020-03-16',0,1,'2020-03-16 12:04:29',NULL,'active',20),(67,'2020-03-16',0,1,'2020-03-16 12:04:29',NULL,'active',21),(68,'2020-03-16',0,1,'2020-03-16 12:04:29',NULL,'active',22),(69,'2020-04-01',0,11,'2020-03-16 12:05:17',NULL,'active',20),(70,'2020-04-01',0,11,'2020-03-16 12:05:17',NULL,'active',21),(71,'2020-04-01',0,11,'2020-03-16 12:05:17',NULL,'active',22),(72,'2020-03-16',1,1,'2020-03-16 15:28:06',NULL,'active',20),(73,'2020-03-16',0,1,'2020-03-16 15:28:06',NULL,'active',21),(74,'2020-03-16',1,1,'2020-03-16 15:28:07',NULL,'active',22),(75,'2020-03-16',1,1,'2020-03-16 19:24:01',NULL,'active',23),(76,'2020-01-14',1,1,'2020-04-14 13:02:07',NULL,'active',26),(77,'2020-01-21',1,2,'2020-04-14 13:02:28',NULL,'active',26),(78,'2020-04-17',1,1,'2020-04-18 04:07:40',NULL,'active',23),(79,'2020-04-24',1,2,'2020-04-18 04:07:55',NULL,'active',23),(80,'2020-07-15',1,25,'2020-07-16 02:31:35',NULL,'active',21),(81,'2020-07-15',1,25,'2020-07-16 02:31:35',NULL,'active',20),(82,'2020-07-15',1,25,'2020-07-16 02:31:35',NULL,'active',22),(83,'2020-07-15',1,25,'2020-07-16 02:31:35',NULL,'active',25),(84,'2021-03-25',1,1,'2021-03-26 03:52:43',NULL,'active',23),(85,'2021-03-24',1,10,'2021-03-26 05:41:49',NULL,'active',22),(86,'2021-03-24',1,10,'2021-03-26 05:41:49',NULL,'active',25),(87,'2021-03-24',1,10,'2021-03-26 05:41:49',NULL,'active',21),(88,'2021-03-24',1,10,'2021-03-26 05:41:49',NULL,'active',20),(89,'2021-03-25',1,20,'2021-03-26 05:51:52',NULL,'active',22),(90,'2021-03-25',1,20,'2021-03-26 05:51:52',NULL,'active',25),(91,'2021-03-25',1,20,'2021-03-26 05:51:52',NULL,'active',21),(92,'2021-03-25',1,20,'2021-03-26 05:51:52',NULL,'active',20),(93,'2021-03-25',1,22,'2021-03-26 05:52:26',NULL,'active',20),(94,'2021-03-25',1,22,'2021-03-26 05:52:26',NULL,'active',21),(95,'2021-03-25',1,22,'2021-03-26 05:52:26',NULL,'active',25),(96,'2021-03-25',1,22,'2021-03-26 05:52:26',NULL,'active',22),(97,'2021-03-26',0,15,'2021-03-27 05:23:29',NULL,'active',21),(98,'2021-03-26',1,15,'2021-03-27 05:23:29',NULL,'active',22),(99,'2021-03-26',1,15,'2021-03-27 05:23:29',NULL,'active',25),(100,'2021-03-26',1,15,'2021-03-27 05:23:29',NULL,'active',20);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `day` varchar(45) DEFAULT NULL,
  `time` varchar(45) DEFAULT NULL,
  `year` varchar(45) DEFAULT NULL,
  `building` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `modified_on` timestamp NULL DEFAULT NULL,
  `status` varchar(45) DEFAULT 'active',
  `instructor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (27,'English Connect',1,'Friday','7:00 PM','2020','Fryle / San Bernabe 1 / San Bernanbe 2','2020-03-14 21:41:40',NULL,'active',8),(28,'English Connect',1,'Monday','7:00 PM','2020','Garcia','2020-03-14 21:47:07',NULL,'active',8),(29,'English Connect',1,'Wednesday','7:00 PM','2020','Hacienda / Nogal','2020-03-14 22:13:56',NULL,'active',9),(30,'Human Computer Interaction',3,'Wednesday','12:00 PM','2020','Libramiento / Lincoln','2020-03-16 19:21:01',NULL,'active',10),(31,'Human Computer Interaction ',1,'Monday','7:00 PM','2019','Garcia','2020-04-03 15:01:25',NULL,'active',10),(32,'English Connect',3,'Thursday','7:00 PM','2020','Hacienda / Nogal','2020-04-18 04:06:22',NULL,'active',9);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructor`
--

DROP TABLE IF EXISTS `instructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instructor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `modified_on` timestamp NULL DEFAULT NULL,
  `status` varchar(45) DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor`
--

LOCK TABLES `instructor` WRITE;
/*!40000 ALTER TABLE `instructor` DISABLE KEYS */;
INSERT INTO `instructor` VALUES (8,'Jesus Arturo','Almaraz Gonzalez','test1@creatingux.com','3445454555',NULL,'2020-03-15 13:40:14','active'),(9,'Sandy','Garcia Cruz','maria.fernandez@gmail.com','3454544544',NULL,'2020-03-14 21:41:16','active'),(10,'Katherine','Hobbs','hobbsk@byui.edu','1234567890',NULL,'2020-03-16 19:18:31','active'),(11,'Jesus Arredondo','Arredondo Gonzalez','chuyarredondo@gmail.com','4492204816',NULL,'2020-11-22 18:25:50','active');
/*!40000 ALTER TABLE `instructor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `age` varchar(45) DEFAULT NULL,
  `member` varchar(30) NOT NULL,
  `ward` varchar(191) NOT NULL,
  `course_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `modified_on` timestamp NULL DEFAULT NULL,
  `status` varchar(45) DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (20,'Jesus Arturo','Fernandez Martinez','4565465466','chuyarredondo@gmail.com','Mayor de 18','Miembro de la Iglesia','Garcia',28,'2020-03-14 21:57:14',NULL,'active'),(21,'Sandy','Fernandez Martinez','4565465466','test@test.com','Mayor de 18','Miembro de la Iglesia','Hacienda',28,'2020-03-14 21:58:27',NULL,'active'),(22,'Sandy','Fernandez Martinez','4565465466','test123@test.com','Mayor de 18','Miembro de la Iglesia','Garcia',28,'2020-03-14 21:58:54',NULL,'active'),(23,'Jesus','Arredondo Ruiz','1357902468','ruiz@fakemail.com','Mayor de 18','Miembro de la Iglesia','Libramiento',30,'2020-03-16 19:23:46',NULL,'active'),(24,'marcia','buffett','2082009115','cici_470@yahoo.com','Mayor de 18','Member of the Church','Garcia',27,'2020-03-28 20:26:29',NULL,'active'),(25,'Nega Jeff','Both','0000000097','hereiam@error404.com','Mayor de 18','No miembro de la iglesia','Frayle',28,'2020-03-29 01:48:12',NULL,'active'),(26,'Jesus Arturo','Arredondo','4565465466','chuyarredondo@gmail.com','Mayor de 18','Miembro de la Iglesia','Garcia',31,'2020-04-03 15:03:53',NULL,'active'),(27,'Jesus Arturo','Arredondo Ruiz','4565465466','test@test.com','Over 18','Member of the Church','Libramiento',32,'2020-04-18 04:07:31',NULL,'active');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'creaigwt_english_connect_valle'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-04 14:27:30
