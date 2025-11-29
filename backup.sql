-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: portfolio
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `project_images`
--

DROP TABLE IF EXISTS `project_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `project_images_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_images`
--

LOCK TABLES `project_images` WRITE;
/*!40000 ALTER TABLE `project_images` DISABLE KEYS */;
INSERT INTO `project_images` VALUES (1,1,'/images/projects/1764388793606-529297129.jpg'),(2,1,'/images/projects/1764388793609-31373489.jpg'),(3,1,'/images/projects/1764388793608-413854382.jpg'),(4,1,'/images/projects/1764388793609-177153742.jpg'),(5,2,'/images/projects/1764392885179-28472934.jpg'),(6,2,'/images/projects/1764392885184-748394653.jpg');
/*!40000 ALTER TABLE `project_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `description` text,
  `tech_stack` text,
  `github_url` varchar(255) DEFAULT NULL,
  `deploy_url` varchar(255) DEFAULT NULL,
  `is_ready` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'GUI 커뮤니티 게시판','GUI를 활용하여 만든 첫 프로젝트','Java Swing 기반 GUI를 활용하여 만든 첫 번째 데스크톱 커뮤니티 프로젝트입니다.\r\n이메일 API를 연동하여 실제 이메일 인증을 수행하고, 인증 완료 시 회원가입이 가능하도록 구현하였습니다.\r\n\r\nGUI 이벤트 기반으로 화면 크기에 따라 유동적으로 재배치되는 반응형 UI를 적용하였으며,\r\n게시판 기능(게시글 생성·수정·삭제·조회), 마이페이지 프로필 관리, 관리자 전용 사용자 관리 기능 등을 포함한\r\n데스크톱 환경의 풀스택 구조를 직접 설계하고 구현한 프로젝트입니다.','GUI, MySQL','https://github.com/jaesung123132/JavaProject.git','http://youtube.com/watch?si=wY0gr0dPi1DY_iI2&v=Q-UgGwUgHFA&feature=youtu.be',1,'2025-11-29 12:59:53','2025-11-29 14:41:46'),(2,'Node.js와 소켓통신을 활용한 Music Playlist','감정 기반 플레이리스트 공유 및 소셜 커뮤니티 플랫폼','기존 뮤직 앱들은 청취 기록에 의존한 알고리즘 추천이 주를 이루어, 사용자가 늘 듣던 음악만 반복해서 듣게 되는 \'매너리즘\'이 존재했습니다. 이러한 한계를 해결하고, 사용자에게 새로운 음악을 발견하는 설렘을 되찾아주고자 기획했습니다. 단순히 장르가 아닌, 사용자의 현재 기분과 감정에 맞춰 음악을 선택할 수 있도록 설계했습니다. 회원가입 시스템을 구축하여 유저 간 친구 맺기 기능을 구현했습니다. 나만의 리스트를 만들고, 친구들과 서로의 음악 취향을 공유하며 소통할 수 있는 커뮤니티 기능을 제공합니다.','Node.js, Express, MySQL, WebSocket, JavaScript','https://github.com/jaesung123132/TCP-IP_Project.git','http://localhost:3001',0,'2025-11-29 14:08:05','2025-11-29 14:19:05');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-29 15:12:03
