-- MySQL dump 10.13  Distrib 5.7.17, for osx10.11 (x86_64)
--
-- Host: localhost    Database: chosen
-- ------------------------------------------------------
-- Server version	5.7.17

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
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_zh` varchar(200) DEFAULT NULL,
  `name_en` varchar(200) DEFAULT NULL,
  `intro_zh` varchar(6000) DEFAULT NULL,
  `intro_en` varchar(6000) DEFAULT NULL,
  `address_ch_en` varchar(200) DEFAULT NULL,
  `address_ch_zh` varchar(200) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `mail` varchar(45) DEFAULT NULL,
  `address_usa_en` varchar(200) DEFAULT NULL,
  `address_usa_zh` varchar(200) DEFAULT NULL,
  `logo` varchar(200) DEFAULT NULL,
  `wechat` varchar(200) DEFAULT NULL,
  `weibo` varchar(200) DEFAULT NULL,
  `linkin` varchar(200) DEFAULT NULL,
  `facebook` varchar(200) DEFAULT NULL,
  `slogan` varchar(200) DEFAULT NULL,
  `banner` varchar(200) DEFAULT NULL,
  `remark` varchar(200) DEFAULT NULL,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'盛圣传媒','CHOSEN','盛圣（香港）传媒文化有限公司于2016年成立。公司总部位于美国洛杉矶，另在香港和上海设立分公司。由美国、上海多位广告、影视行业资深监制创立，旨在为各领域品牌客户提供专业、优质、领先的广告、影视、节目制作服务。','We are more than just filmmakers! \nWe are storytellers, collaborators, and visual content creators. \nEstablished in 2015, Chosen Production is headquartered in Los Angeles, USA, and with branches in Hong Kong and Shanghai. Founded by a number of senior producers domestically and internationally, Chosen is aiming to serve as a visualizer to bring out the narratives and connect the curiosity within our audiences. \nWe represent directors from North America and Greater China Area. Besides the existing domestic video production services, we also provide facilitating production in North America. We are very proud of that people enjoy working with the Chosen family, which is a testament to the top-notch work we produce and service we provide.','6th FL Lane 189,Changshou Road,Shanghai - China','上海市普陀区长寿路189弄6层','+86 186 2137 2083','contact@chosenproduction.com','281 E Colorado Blvd. PO #611 . Pasadena CA，USA91101','281 E Colorado Blvd. PO #611 . Pasadena CA，USA91101',NULL,NULL,NULL,'https://www.linkedin.com/company-beta/13266773/',NULL,NULL,NULL,NULL,'2017-03-10 22:57:07','2017-03-10 22:57:42');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nav`
--

DROP TABLE IF EXISTS `nav`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nav` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nav_en` varchar(45) NOT NULL,
  `nav_zh` varchar(45) NOT NULL,
  `href` varchar(45) NOT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nav`
--

LOCK TABLES `nav` WRITE;
/*!40000 ALTER TABLE `nav` DISABLE KEYS */;
INSERT INTO `nav` VALUES (1,'WORK','作品','work','2017-03-10 22:46:38','2017-03-10 23:31:53'),(2,'NEWS','新闻','news','2017-03-10 22:46:38','2017-03-10 23:31:53'),(3,'STORY','故事','story','2017-03-10 22:46:38','2017-03-10 23:31:53'),(4,'CONTACT US','联系我们','contact','2017-03-10 22:46:38','2017-03-10 23:53:31');
/*!40000 ALTER TABLE `nav` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `image` varchar(45) DEFAULT NULL,
  `title_zh` varchar(45) DEFAULT NULL,
  `title_en` varchar(45) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `content_zh` varchar(45) DEFAULT NULL,
  `content_en` varchar(45) DEFAULT NULL,
  `video` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `story`
--

DROP TABLE IF EXISTS `story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `story` (
  `id` int(11) NOT NULL,
  `title_zh` varchar(45) DEFAULT NULL,
  `title_en` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `content_zh` varchar(45) DEFAULT NULL,
  `content_en` varchar(45) DEFAULT NULL,
  `remark_zh` varchar(45) DEFAULT NULL,
  `remark_en` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `story`
--

LOCK TABLES `story` WRITE;
/*!40000 ALTER TABLE `story` DISABLE KEYS */;
/*!40000 ALTER TABLE `story` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work`
--

DROP TABLE IF EXISTS `work`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `work` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title_zh` varchar(200) NOT NULL,
  `title_en` varchar(200) NOT NULL,
  `image` varchar(1000) NOT NULL,
  `video` varchar(1000) NOT NULL,
  `brand_id` int(11) NOT NULL DEFAULT '1',
  `type_id` int(11) NOT NULL DEFAULT '1',
  `intro_zh` varchar(6000) DEFAULT NULL,
  `intro_en` varchar(6000) DEFAULT NULL,
  `remark_zh` varchar(45) DEFAULT NULL,
  `remark_en` varchar(45) DEFAULT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `brand_idx` (`brand_id`),
  KEY `type_idx` (`type_id`),
  CONSTRAINT `brand_id` FOREIGN KEY (`brand_id`) REFERENCES `work_brand` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `type_id` FOREIGN KEY (`type_id`) REFERENCES `work_type` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work`
--

LOCK TABLES `work` WRITE;
/*!40000 ALTER TABLE `work` DISABLE KEYS */;
INSERT INTO `work` VALUES (12,'敢变','Dare to Change','http://chosen.ufile.ucloud.com.cn/image/ACUVUE Dare to Change.png','http://chosen.ufile.ucloud.com.cn/video/Change.mp4',7,1,NULL,'In collaboration with McCann and ACUVUE Johnson & Johnson Vision Care, Chosen Production produced the video for ACUVUE to kick off their Dare to Change campaign. This video tells a story of two millenniums who find their confidence and discover the beauty in their eyes.',NULL,NULL,'2017-03-10 08:41:18','2017-03-10 22:39:02'),(13,'面馆匠心','Noodle Shop','http://chosen.ufile.ucloud.com.cn/image/倩碧访谈-面馆老板-acopy.png','http://chosen.ufile.ucloud.com.cn/video/倩碧访谈-面馆老板-acopy.mp4',1,1,NULL,NULL,NULL,NULL,'2017-03-10 08:41:18','2017-03-10 08:41:18'),(14,'梦想篇','Little dream','http://chosen.ufile.ucloud.com.cn/image/Holiday Inn - little dream.png','http://chosen.ufile.ucloud.com.cn/video/Holiday Inn - little dream.mov',2,1,NULL,NULL,NULL,NULL,'2017-03-10 08:41:18','2017-03-10 22:41:13'),(15,'真男人－男士篇','FOR MEN-Men Interview','http://chosen.ufile.ucloud.com.cn/image/video.png','http://chosen.ufile.ucloud.com.cn/video.mp4',1,1,NULL,NULL,NULL,NULL,'2017-03-10 08:41:18','2017-03-10 22:37:05'),(16,'王珞丹微电影','Wang Luodan short film','http://chosen.ufile.ucloud.com.cn/image/Intel 王珞丹微电影.png','http://chosen.ufile.ucloud.com.cn/video//Intel 王珞丹微电影.mp4',3,1,'性格、爱好不同的情侣如何生活在一起？功能、用途不同的pc和平板如何结合在一起？不同的事物结合，创造出更为优秀的产品','How to introduce the new Intel product which combine the traditional PC and pad in a more emotional way ? There is nothing better than telling a story of a couple with different charactors. This video tells a story of two millenniums who find their confidence and discover the beauty in their eyes.',NULL,NULL,'2017-03-10 08:41:18','2017-03-10 22:41:13'),(17,'真男人－女士篇','FOR MEN-Women Interview','http://chosen.ufile.ucloud.com.cn/image/10-16-女士篇.png','http://chosen.ufile.ucloud.com.cn/video//10-16-女士篇.mp4',1,1,NULL,NULL,NULL,NULL,'2017-03-10 08:41:18','2017-03-10 22:24:41'),(18,'马岩松','Ma Yansong','http://chosen.ufile.ucloud.com.cn/image/JohnnieWalker - MA YANSONG.png','http://chosen.ufile.ucloud.com.cn/video//JohnnieWalker - MA YANSONG.mov',4,1,NULL,NULL,NULL,NULL,'2017-03-10 08:41:18','2017-03-10 22:41:13'),(19,'原创','Originals x Beijing Fixies','http://chosen.ufile.ucloud.com.cn/image/adidas Originals x Beijing Fixies.png','http://chosen.ufile.ucloud.com.cn/video//adidas Originals x Beijing Fixies.mov',5,1,NULL,NULL,NULL,NULL,'2017-03-10 08:41:18','2017-03-10 22:41:13'),(20,'男士护理','FOR MEN','http://chosen.ufile.ucloud.com.cn/image/Dovemen China 65s V01 20150623_1080.png','http://chosen.ufile.ucloud.com.cn/video//Dovemen China 65s V01 20150623_1080.mp4',1,1,NULL,NULL,NULL,NULL,'2017-03-10 08:41:18','2017-03-10 22:26:27');
/*!40000 ALTER TABLE `work` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_brand`
--

DROP TABLE IF EXISTS `work_brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `work_brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brand_en` varchar(200) NOT NULL,
  `brand_zh` varchar(200) NOT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_brand`
--

LOCK TABLES `work_brand` WRITE;
/*!40000 ALTER TABLE `work_brand` DISABLE KEYS */;
INSERT INTO `work_brand` VALUES (1,'CLINIQUE','倩碧','2017-03-10 16:37:17','2017-03-10 16:37:17'),(2,'HOLIDAY INN','假日酒店','2017-03-10 16:37:17','2017-03-10 16:37:17'),(3,'INTEL','因特尔','2017-03-10 16:37:17','2017-03-10 16:37:17'),(4,'JohnnieWalker','尊尼获加','2017-03-10 16:37:17','2017-03-10 16:37:17'),(5,'Adidas','阿迪达斯','2017-03-10 16:37:17','2017-03-10 16:37:17'),(6,'DOVE','多芬','2017-03-10 16:37:17','2017-03-10 16:37:17'),(7,'Johnson & Johnson','强生','2017-03-10 16:37:17','2017-03-10 16:37:17');
/*!40000 ALTER TABLE `work_brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_type`
--

DROP TABLE IF EXISTS `work_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `work_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_zh` varchar(200) NOT NULL,
  `type_en` varchar(200) NOT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_type`
--

LOCK TABLES `work_type` WRITE;
/*!40000 ALTER TABLE `work_type` DISABLE KEYS */;
INSERT INTO `work_type` VALUES (1,'广告','advertisement','2017-03-10 16:25:02','2017-03-10 16:25:02');
/*!40000 ALTER TABLE `work_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-11 23:38:53
