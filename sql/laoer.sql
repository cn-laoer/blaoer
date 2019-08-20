/*
SQLyog Ultimate v8.71 
MySQL - 5.0.51a-community-nt-log : Database - blaoer
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`blaoer` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `blaoer`;

/*Table structure for table `news` */

DROP TABLE IF EXISTS `news`;

CREATE TABLE `news` (
  `id` int(20) NOT NULL,
  `name` char(20) NOT NULL,
  `url` char(20) NOT NULL,
  `status` int(10) NOT NULL default '1',
  `avator_url` longtext NOT NULL,
  `create_time` timestamp NOT NULL default '0000-00-00 00:00:00',
  `update_time` timestamp NOT NULL default '0000-00-00 00:00:00'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `news` */

insert  into `news`(`id`,`name`,`url`,`status`,`avator_url`,`create_time`,`update_time`) values (2,'bbbbb','bb.com',1,'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2922170376,2371336021&fm=26&gp=0.jpg','2019-07-13 18:00:00','2019-08-12 13:46:01'),(3,'ccc','http://cc.com',1,'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=646848972,3723149798&fm=26&gp=0.jpg','2019-07-13 19:00:00','2019-08-08 18:00:52'),(4,'ddd','http://dadada.com',2,'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3295174058,1884872095&fm=26&gp=0.jpg','2019-07-14 04:00:00','2019-08-08 18:00:52'),(5,'eee','eee.com',2,'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=588638536,3679345156&fm=26&gp=0.jpg','2019-07-14 05:00:00','2019-08-08 18:00:52'),(6,'fff','ffff.com',2,'https://hbimg.huabanimg.com/2e7dde4b38993c386fc05a184080479551dc79922d4e4-zjEfU6_fw658','2019-07-14 06:00:00','2019-08-09 09:53:18'),(7,'ggg','ggggg.com',1,'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1043977011,2291928950&fm=26&gp=0.jpg','2019-07-13 23:00:00','2019-08-08 18:00:52'),(8,'hhhh','hhh.com',1,'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1675225930,3882737045&fm=26&gp=0.jpg','2019-07-13 08:00:00','2019-08-08 18:00:52'),(9,'iiiii','iii.cn',1,'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3472248998,1123861545&fm=26&gp=0.jpg','2019-07-14 01:00:00','2019-08-08 18:00:52'),(1,'aaaaa','a123.com',2,'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3754532811,4059018666&fm=26&gp=0.jpg','2019-08-04 14:33:09','2019-08-08 18:00:52');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
