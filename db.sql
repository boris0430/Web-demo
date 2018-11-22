# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 192.168.0.254 (MySQL 5.6.28-log)
# Database: test_gc1
# Generation Time: 2018-11-22 15:25:16 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table tb_county
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_county`;

CREATE TABLE `tb_county` (
  `county_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `county_name` varchar(64) NOT NULL DEFAULT '' COMMENT '县',
  PRIMARY KEY (`county_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `tb_county` WRITE;
/*!40000 ALTER TABLE `tb_county` DISABLE KEYS */;

INSERT INTO `tb_county` (`county_id`, `county_name`)
VALUES
	(1,'兴平集控');

/*!40000 ALTER TABLE `tb_county` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tb_device
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_device`;

CREATE TABLE `tb_device` (
  `device_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `device_pos` int(11) NOT NULL,
  `device_name` varchar(100) NOT NULL,
  `V_level` int(11) NOT NULL,
  `village_id` int(10) unsigned NOT NULL,
  `county_id` int(10) unsigned NOT NULL,
  `pos_x` int(3) unsigned NOT NULL DEFAULT '0' COMMENT '行',
  `pos_y` int(3) unsigned NOT NULL DEFAULT '0' COMMENT '列',
  PRIMARY KEY (`device_id`),
  KEY `village_id` (`village_id`),
  KEY `county_id` (`county_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `tb_device` WRITE;
/*!40000 ALTER TABLE `tb_device` DISABLE KEYS */;

INSERT INTO `tb_device` (`device_id`, `device_pos`, `device_name`, `V_level`, `village_id`, `county_id`, `pos_x`, `pos_y`)
VALUES
	(1,101,'1号主变PST626A变压器保护装置屏 ',110,1,1,1,6),
	(2,102,'2号主变PST626A变压器保护装置屏 ',350,1,1,1,3),
	(3,103,'1246 彬王Ⅰ线PSL621D保护屏',10,1,1,1,8),
	(4,1,'35kV线路保护测控屏',110,1,1,2,8),
	(5,1,'远动屏',110,1,1,2,3),
	(6,1,'数据网接入屏',110,1,1,3,4),
	(7,1,'1号直流充电屏',110,1,1,4,1),
	(8,101,'1251 彬监Ⅰ线PSL621C保护屏',110,1,1,1,1);

/*!40000 ALTER TABLE `tb_device` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tb_module
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_module`;

CREATE TABLE `tb_module` (
  `module_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `module_name` varchar(100) NOT NULL,
  `module_type` varchar(100) NOT NULL,
  `module_pos` int(10) unsigned NOT NULL DEFAULT '0',
  `producer` varchar(100) NOT NULL,
  `running_date` date NOT NULL,
  `verify_date` date NOT NULL,
  `version` int(10) unsigned NOT NULL,
  `verify_code` int(10) unsigned NOT NULL,
  `net_address` varchar(100) DEFAULT NULL,
  `bianbi` varchar(100) DEFAULT NULL,
  `dingzhidanhao` varchar(100) DEFAULT NULL,
  `device_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`module_id`),
  KEY `device_id` (`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `tb_module` WRITE;
/*!40000 ALTER TABLE `tb_module` DISABLE KEYS */;

INSERT INTO `tb_module` (`module_id`, `module_name`, `module_type`, `module_pos`, `producer`, `running_date`, `verify_date`, `version`, `verify_code`, `net_address`, `bianbi`, `dingzhidanhao`, `device_id`)
VALUES
	(1,'差动：PST621 ','保护装置1',0,'国电南自','2009-04-13','2017-03-17',11,123,'192.168.0.0','G:200/5','调继字10-323；\n调继字10-324',1),
	(2,'高后备：PST626A ','保护装置2',0,'国电南自','2009-04-13','2017-03-17',1,2,'192.168.0.0','G:200/5','调继字10-323；\n调继字10-324',1),
	(3,'中后备：PST626 ','保护装置3',0,'国电南自','2009-04-13','2017-03-17',1,2,'192.168.0.0','G:200/5','调继字10-323；\n调继字10-324',1),
	(4,'低后备：PST626 ','保护装置3',0,'国电南自','2009-04-13','2017-03-17',1,2,'192.168.0.0','G:200/5','调继字10-323；\n调继字10-324',1),
	(5,'调压器：GZK-100B','保护装置3',0,'国电南自','2009-04-13','2017-03-17',1,2,'192.168.0.0','G:200/5','调继字10-323；\n调继字10-324',1),
	(6,'1','1',0,'1','2016-11-11','2016-11-11',1,1,'1',NULL,NULL,1),
	(7,'123','1',0,'1','2018-11-11','2018-11-11',1,1,'1',NULL,NULL,1);

/*!40000 ALTER TABLE `tb_module` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tb_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_user`;

CREATE TABLE `tb_user` (
  `userid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;

INSERT INTO `tb_user` (`userid`, `username`, `password`)
VALUES
	(2,'test','test123'),
	(3,'sss','ddd'),
	(4,'admin','admin'),
	(5,'admin','admin'),
	(6,'admin','admin'),
	(7,'admin','admin'),
	(8,'admin','admin'),
	(9,'','');

/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tb_village
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_village`;

CREATE TABLE `tb_village` (
  `village_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `village_name` varchar(50) NOT NULL,
  `county_id` int(11) NOT NULL,
  `V_level` int(11) NOT NULL COMMENT '电压等级',
  PRIMARY KEY (`village_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `tb_village` WRITE;
/*!40000 ALTER TABLE `tb_village` DISABLE KEYS */;

INSERT INTO `tb_village` (`village_id`, `village_name`, `county_id`, `V_level`)
VALUES
	(1,'西吴变',1,110),
	(2,'兴平变',1,110),
	(4,'兴城变',1,110),
	(5,'丰仪变',1,110),
	(6,'宋村变',1,110),
	(7,'南市变',1,35),
	(8,'晶海开闭所',1,10);

/*!40000 ALTER TABLE `tb_village` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
