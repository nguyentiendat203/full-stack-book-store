-- MySQL dump 10.13  Distrib 8.4.4, for macos15 (arm64)
--
-- Host: localhost    Database: books_store
-- ------------------------------------------------------
-- Server version	8.4.4

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
-- Table structure for table `Book`
--

DROP TABLE IF EXISTS `Book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `supplierId` int NOT NULL,
  `categoryId` int NOT NULL,
  `price` double NOT NULL,
  `discount` int DEFAULT NULL,
  `stock` int NOT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pageNumber` int NOT NULL,
  `publishingYear` int NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `totalRating` int DEFAULT NULL,
  `sold` int DEFAULT NULL,
  `ratingsAverage` double DEFAULT '3.5',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `discountedPrice` double DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Book`
--

LOCK TABLES `Book` WRITE;
/*!40000 ALTER TABLE `Book` DISABLE KEYS */;
INSERT INTO `Book` VALUES (1,'Lúc Biết Xuyên Không Thì Đã Muộn! - Tặng Kèm Card Bo Góc Random 1 Trong 3 Nhân Vật',1,1,239000,25,0,'Mật Tiễn',544,2024,'luc-biet-xuyen-khong-thi-a-muon-tang-kem-card-bo-goc-random-1-trong-3-nhan-vat','https://res.cloudinary.com/datdev/image/upload/v1722344652/yjamg9tnzzpku4jwvas3.png',NULL,5,3.5,'2024-08-13 05:47:56','2025-04-20 13:53:36',179250),(2,'Lén Nhặt Chuyện Đời',1,1,85000,50,0,'Mộc Trầm',213,2022,'len-nhat-chuyen-doi','https://res.cloudinary.com/datdev/image/upload/v1722344986/qpq2b0xdtxxfxsapcbrs.png',NULL,6,3.5,'2024-08-13 05:50:06','2025-04-20 13:53:36',42500),(3,'Nhà Giả Kim (Tái Bản 2020)',5,1,79000,20,16,'Paulo Coelho',227,2020,'nha-gia-kim-tai-ban-2020','https://res.cloudinary.com/datdev/image/upload/v1722345087/fww2gbmay4mrynsvxsyr.png',1,4,3,'2024-08-13 05:50:06','2025-04-20 13:53:36',63200),(4,'Cây Cam Ngọt Của Tôi',5,1,108000,20,16,'José Mauro de Vasconcelos',244,2020,'cay-cam-ngot-cua-toi','https://res.cloudinary.com/datdev/image/upload/v1722345226/wcdjuqd9ti98frq6qnqv.png',NULL,4,3.5,'2024-08-13 05:50:06','2025-04-20 13:53:36',86400),(5,'Trốn Lên Mái Nhà Để Khóc - Tặng Kèm Bookmark',3,2,95000,22,18,'Lam',208,2023,'tron-len-mai-nha-e-khoc-tang-kem-bookmark','https://res.cloudinary.com/datdev/image/upload/v1722345569/advoe0sjw4vu1drwc9zm.png',1,2,3,'2024-08-13 05:53:44','2025-04-20 13:53:36',74100),(38,'Nếu Biết Trăm Năm Là Hữu Hạn - Ấn Bản Kỉ Niệm 10 Năm Xuất Bản (Tái Bản 2024)',6,2,159000,15,17,'Phạm Lữ Ân',263,2024,'neu-biet-tram-nam-la-huu-han-an-ban-ki-niem-10-nam-xuat-ban-tai-ban-2024','https://res.cloudinary.com/datdev/image/upload/v1722345619/s1zfj7bszu7fcfe2bg4j.png',NULL,3,3.5,'2024-08-13 05:53:44','2025-04-20 13:53:36',135150),(39,'999 Lá Thư Gửi Cho Chính Mình - Những Lá Thư Ấn Tượng Nhất (Phiên Bản Song Ngữ Trung - Việt)',2,2,99000,20,17,'Miêu Công Tử',164,2023,'999-la-thu-gui-cho-chinh-minh-nhung-la-thu-an-tuong-nhat-phien-ban-song-ngu-trung-viet','https://res.cloudinary.com/datdev/image/upload/v1722345678/m6tkuovhj4rweec4xugx.png',1,3,3,'2024-08-13 05:53:44','2025-04-20 13:53:36',79200),(41,'Một Vụ Án Của Jane Marple - Thi Thể Trong Thư Viện',3,3,110000,18,16,'Agatha Christie',236,2024,'mot-vu-an-cua-jane-marple-thi-the-trong-thu-vien','https://res.cloudinary.com/datdev/image/upload/v1722346625/hjrqemt7wu4ezdabqyu1.png',1,4,4,'2024-08-13 05:57:54','2025-04-20 13:53:36',90200),(42,'Một Vụ Án Của Jane Marple - Vụ Án Mạng Được Báo Trước',3,3,15000,18,17,'Agatha Christie',256,2024,'mot-vu-an-cua-jane-marple-vu-an-mang-uoc-bao-truoc','https://res.cloudinary.com/datdev/image/upload/v1722346673/unbuzetq6gqsdf1oozgn.png',NULL,3,3.5,'2024-08-13 06:03:00','2025-04-20 13:53:36',12300),(43,'Ma Quỷ Dân Gian Ký',6,3,268000,22,17,'Duy Văn',260,2023,'ma-quy-dan-gian-ky','https://res.cloudinary.com/datdev/image/upload/v1722346766/tdzkhqjvterwj9lgcdqh.png',4,3,4.3,'2024-08-13 06:04:04','2025-04-20 13:53:36',209040),(44,'MBA Bằng Hình - The Usual MBA',5,4,189000,20,19,'Jason Barron , MBA',207,2023,'mba-bang-hinh-the-usual-mba','https://res.cloudinary.com/datdev/image/upload/v1722347123/gkbfngw65asiwmnqk6sf.png',NULL,1,3.5,'2024-08-13 06:05:14','2025-04-20 13:53:36',151200),(45,'Một Đời Quản Trị (Tái Bản 2019)',3,4,200000,18,20,'Phan Văn Trường',495,2022,'mot-oi-quan-tri-tai-ban-2019','https://res.cloudinary.com/datdev/image/upload/v1722347218/f0hptelsqh7t0ph5npfz.png',NULL,1,3.5,'2024-08-13 06:06:00','2025-04-20 13:53:36',164000),(46,'Dẫn Dắt Một Bầy Sói Hay Chăn Một Đàn Cừu',7,4,195000,25,20,'Tiffani Bova',358,2024,'dan-dat-mot-bay-soi-hay-chan-mot-an-cuu','https://res.cloudinary.com/datdev/image/upload/v1722347267/u1rebqtzfaokr0ctnwhj.png',NULL,1,3.5,'2024-08-13 06:06:38','2025-04-20 13:53:36',146250),(47,'Từ Tốt Đến Vĩ Đại - Jim Collins (Tái Bản 2021)',3,5,130000,18,20,'Jim Collins',484,2021,'tu-tot-en-vi-ai-jim-collins-tai-ban-2021','https://res.cloudinary.com/datdev/image/upload/v1722352823/xsxjw0xd7flymcs3bcln.png',NULL,1,3.5,'2024-08-13 06:07:19','2025-04-20 13:53:36',106600),(48,'48 Nguyên Tắc Chủ Chốt Của Quyền Lực (Tái Bản 2020)',3,5,200000,18,20,'Robert Greene',504,2020,'48-nguyen-tac-chu-chot-cua-quyen-luc-tai-ban-2020','https://res.cloudinary.com/datdev/image/upload/v1722352872/hptlac8cukyfisfgnti5.png',NULL,1,3.5,'2024-08-13 06:08:11','2025-04-20 13:53:36',164000),(49,'Nghệ Thuật Tư Duy Chiến Lược',2,5,239000,25,20,'Avinash K Dixit, Barry J Nalebuff',560,2019,'nghe-thuat-tu-duy-chien-luoc','https://res.cloudinary.com/datdev/image/upload/v1722352924/aysbfqgcpbczwxagvori.png',NULL,1,3.5,'2024-08-13 06:08:52','2025-04-20 13:53:36',179250),(50,'Nghệ Thuật Bán Hàng Bằng Câu Chuyện (Tái Bản 2023)',4,6,188000,33,20,'Paul Smith',350,2023,'nghe-thuat-ban-hang-bang-cau-chuyen-tai-ban-2023','https://res.cloudinary.com/datdev/image/upload/v1722409697/rgumbhyk662a3e8enyel.png',NULL,1,3.5,'2024-08-13 06:09:39','2025-04-20 13:53:36',125960),(51,'Cưa Đổ CRM - Nhắm Trúng Đích, Tương Tác Ngay, Bán Hàng Hay, Chăm Sóc Giỏi',2,6,199000,26,19,'Nam Nguyễn',214,2022,'cua-o-crm-nham-trung-ich-tuong-tac-ngay-ban-hang-hay-cham-soc-gioi','https://res.cloudinary.com/datdev/image/upload/v1722409817/rbkx62wjmlfyom6otfvd.png',NULL,1,3.5,'2024-08-13 06:10:24','2025-04-20 13:53:36',147260),(52,'Kỹ Năng Giao Tiếp Đỉnh Cao',2,7,96000,25,20,'Lý Tử Quyên',296,2020,'ky-nang-giao-tiep-inh-cao','https://res.cloudinary.com/datdev/image/upload/v1722433408/j3xhyjaegrr6lsygngna.png',NULL,0,3.5,'2024-08-13 06:11:09','2025-04-20 13:53:36',72000),(53,'Một Đời Như Kẻ Tìm Đường',3,7,175000,18,20,'Phan Văn Trường',414,2019,'mot-oi-nhu-ke-tim-uong','https://res.cloudinary.com/datdev/image/upload/v1722433466/whqexssofqpdilsx8tpi.png',NULL,0,3.5,'2024-08-13 06:11:50','2025-04-20 13:53:36',143500),(54,'Những Quy Luật Của Bản Chất Con Người',3,7,300000,18,14,'Robert Greene',892,2020,'nhung-quy-luat-cua-ban-chat-con-nguoi','https://res.cloudinary.com/datdev/image/upload/v1722433531/nilay62agpjzspceqkmo.jpg',NULL,6,3.5,'2024-08-13 06:12:35','2025-04-20 13:53:36',246000),(55,'How Psychology Works - Hiểu Hết Về Tâm Lý Học',5,8,300000,20,15,'Jo Hemmings',255,2022,'how-psychology-works-hieu-het-ve-tam-ly-hoc','https://res.cloudinary.com/datdev/image/upload/v1722433751/yzaitmn9rrvmgeoqsytt.png',1,5,4,'2024-08-13 06:14:03','2025-04-20 13:53:36',240000),(56,'Thiên Tài Bên Trái, Kẻ Điên Bên Phải (Tái Bản 2021)',6,8,179000,25,20,'Cao Minh',424,2021,'thien-tai-ben-trai-ke-ien-ben-phai-tai-ban-2021','https://res.cloudinary.com/datdev/image/upload/v1722433819/cj8q0z1bu5vih90tr2ns.png',NULL,0,3.5,'2024-08-13 06:14:44','2025-04-20 13:53:36',134250),(57,'Kiếp Nào Ta Cũng Tìm Thấy Nhau (Tái Bản 2022)',5,8,99000,22,20,'Brian L Weiss',290,2022,'kiep-nao-ta-cung-tim-thay-nhau-tai-ban-2022','https://res.cloudinary.com/datdev/image/upload/v1722433874/xbhkl8azk3uamvzwgscn.png',NULL,0,3.5,'2024-08-13 06:15:19','2025-04-20 13:53:36',77220),(58,'Tiểu Sử Các Quốc Gia Qua Góc Nhìn Lầy Lội',5,17,215000,20,20,'Sai Lei',280,2021,'tieu-su-cac-quoc-gia-qua-goc-nhin-lay-loi','https://res.cloudinary.com/datdev/image/upload/v1722434193/xz1g0gnclltn9jugdeq7.png',NULL,0,3.5,'2024-08-13 06:16:03','2025-04-20 13:53:36',172000),(59,'Geography Encyclopedia - Bách Khoa Toàn Thư Về Địa Lý',2,20,289000,28,20,'Nhiều Tác Giả',400,2019,'geography-encyclopedia-bach-khoa-toan-thu-ve-ia-ly','https://res.cloudinary.com/datdev/image/upload/v1722434250/fbi7gll4jvmq1hevormk.png',NULL,0,3.5,'2024-08-13 06:16:44','2025-04-20 13:53:36',208080),(60,'Nghèo Là Vốn Liếng',6,20,168000,25,20,'Nguyễn Phan Tú',270,2024,'ngheo-la-von-lieng','https://res.cloudinary.com/datdev/image/upload/v1724057655/godpvvflvhsfktpn5kxf.png',NULL,2,3.5,'2024-08-13 06:17:34','2025-04-20 13:53:36',126000),(83,'Tôi Thích Dáng Vẻ Nỗ Lực Của Chính Mình',6,1,100000,25,20,'Lily Trương',208,2024,'toi-thich-dang-ve-no-luc-cua-chinh-minh','https://res.cloudinary.com/datdev/image/upload/v1745420760/osfovv2jo0q6q6iyxlud.jpg',NULL,0,3.5,'2025-04-23 15:07:51','2025-04-23 15:42:33',75000),(84,'Nỗi Buồn Chiến Tranh (Tái Bản 2022)',3,1,130000,15,20,'Bảo Ninh',352,2022,'noi-buon-chien-tranh-tai-ban-2022','https://res.cloudinary.com/datdev/image/upload/v1745421314/ff5jo8pqeor9tjilpavd.jpg',NULL,0,3.5,'2025-04-23 15:16:52','2025-04-23 15:42:33',110500),(85,'Người Đàn Ông Mang Tên OVE (Tái Bản)',3,1,160000,15,20,'Fredrik Backman',452,2022,'nguoi-an-ong-mang-ten-ove-tai-ban','https://res.cloudinary.com/datdev/image/upload/v1745421544/rlq0m1jqpbhvsvlsfwhh.jpg',NULL,0,3.5,'2025-04-23 15:19:48','2025-04-23 15:42:33',136000),(86,'Thép Đã Tôi Thế Đấy (Tái Bản 2023)',7,1,139000,30,20,'Nikolai AOstrovsky',516,2023,'thep-a-toi-the-ay-tai-ban-2023','https://res.cloudinary.com/datdev/image/upload/v1745421598/u0za5znwvdyl74jlyinb.jpg',NULL,0,3.5,'2025-04-23 15:20:36','2025-04-23 15:42:33',97300),(87,'Điều Kỳ Diệu Của Tiệm Tạp Hóa Namiya (Tái Bản 2018)',2,2,105000,20,20,'Higashino Keigo',358,2023,'ieu-ky-dieu-cua-tiem-tap-hoa-namiya-tai-ban-2018','https://res.cloudinary.com/datdev/image/upload/v1745421645/rz3ytaa0lrcsodjzzn0o.jpg',NULL,0,3.5,'2025-04-23 15:21:23','2025-04-23 15:42:33',84000),(88,'Lớp Có Tang Sự Không Cần Điểm Danh',5,2,265000,25,20,'Doo Vandenis',488,2024,'lop-co-tang-su-khong-can-iem-danh','https://res.cloudinary.com/datdev/image/upload/v1745421693/q7iwt2xfay0wwjjedg9l.jpg',NULL,0,3.5,'2025-04-23 15:22:13','2025-04-23 15:42:33',198750),(89,'Hồ Điệp Và Kình Ngư',6,2,155000,28,28,'Tuế Kiến',272,2024,'ho-iep-va-kinh-ngu','https://res.cloudinary.com/datdev/image/upload/v1745421744/ifv4ygs1nggod3cj04dd.jpg',NULL,0,3.5,'2025-04-23 15:23:02','2025-04-23 15:42:33',111600),(90,'Hai Số Phận - Bìa Cứng (Tái Bản 2023)',4,3,235000,20,20,'Jeffrey Archer',768,2023,'hai-so-phan-bia-cung-tai-ban-2023','https://res.cloudinary.com/datdev/image/upload/v1745421792/e3sc9nuul7rlhuulcdlh.jpg',NULL,0,3.5,'2025-04-23 15:23:56','2025-04-23 15:42:33',188000),(91,'Trường Ca Achilles',1,3,156000,20,20,'Madeline Miller',444,2020,'truong-ca-achilles','https://res.cloudinary.com/datdev/image/upload/v1745421848/wnxpsfwgpm7orczoz17c.jpg',NULL,0,3.5,'2025-04-23 15:24:39','2025-04-23 15:42:33',124800),(92,'Mùa Hè Không Tên - Tặng Kèm Bookmark 2 Mặt + Poster Tranh',3,3,130000,20,20,'Nguyễn Nhật Ánh',292,2023,'mua-he-khong-ten-tang-kem-bookmark-2-mat-poster-tranh','https://res.cloudinary.com/datdev/image/upload/v1745421887/gyagp6hjfchxcfpxhfi7.jpg',NULL,0,3.5,'2025-04-23 15:25:19','2025-04-23 15:42:33',104000);
/*!40000 ALTER TABLE `Book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_cart`
--

DROP TABLE IF EXISTS `book_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookId` int NOT NULL,
  `cartId` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `unitPrice` double DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_cart`
--

LOCK TABLES `book_cart` WRITE;
/*!40000 ALTER TABLE `book_cart` DISABLE KEYS */;
INSERT INTO `book_cart` VALUES (24,3,6,1,63200,'2024-08-22 02:20:22','2024-08-22 02:20:22');
/*!40000 ALTER TABLE `book_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_order`
--

DROP TABLE IF EXISTS `book_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookId` int NOT NULL,
  `orderId` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `unitPrice` double DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_order`
--

LOCK TABLES `book_order` WRITE;
/*!40000 ALTER TABLE `book_order` DISABLE KEYS */;
INSERT INTO `book_order` VALUES (1,55,1,1,240000,'2024-08-13 06:46:34','2024-08-13 06:46:34'),(2,60,2,2,252000,'2024-08-13 06:46:34','2024-08-13 06:46:34'),(3,43,2,2,418080,'2024-08-13 06:46:34','2024-08-13 06:46:34'),(4,41,3,1,90200,'2024-08-13 06:46:34','2024-08-13 06:46:34'),(7,39,32,3,237600,'2024-08-13 07:58:10','2024-08-13 07:58:10'),(8,3,33,2,126400,'2024-09-19 06:21:26','2024-09-19 06:21:26'),(9,2,34,3,127500,'2024-09-29 09:18:21','2024-09-29 09:18:21'),(10,3,34,2,126400,'2024-09-29 09:18:21','2024-09-29 09:18:21'),(11,4,35,2,172800,'2024-10-01 02:40:45','2024-10-01 02:40:45'),(12,5,36,1,74100,'2024-10-01 04:44:12','2024-10-01 04:44:12'),(13,42,37,1,12300,'2024-10-01 13:31:10','2024-10-01 13:31:10'),(14,4,38,2,172800,'2024-10-01 14:51:40','2024-10-01 14:51:40'),(15,41,38,1,90200,'2024-10-01 14:51:40','2024-10-01 14:51:40'),(16,54,39,2,492000,'2024-10-12 04:37:16','2024-10-12 04:37:16'),(17,42,39,1,12300,'2024-10-12 04:37:16','2024-10-12 04:37:16'),(18,55,40,2,480000,'2024-10-12 04:40:52','2024-10-12 04:40:52'),(19,51,41,1,147260,'2024-10-12 04:41:11','2024-10-12 04:41:11'),(20,55,42,2,480000,'2024-11-12 12:42:36','2024-11-12 12:42:36'),(21,41,43,2,180400,'2024-11-22 03:39:36','2024-11-22 03:39:36');
/*!40000 ALTER TABLE `book_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `totalQuantity` int DEFAULT '0',
  `totalCartPrice` double DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (6,41,1,63200,'2024-08-22 02:20:22','2024-08-22 02:20:22'),(14,1,0,0,'2024-10-18 16:40:02','2025-04-17 14:09:11');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listCateId` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,18,'Tiểu thuyết','2024-08-18 06:23:09','2024-08-18 06:23:09'),(2,18,'Truyện ngắn - Tản Văn','2024-08-18 06:23:09','2024-08-18 06:23:09'),(3,18,'Truyện Trinh Thám - Kiếm Hiệp','2024-08-18 06:23:09','2024-08-18 06:23:09'),(4,19,'Quản Trị - Lãnh Đạo','2024-08-18 06:23:09','2024-08-18 06:23:09'),(5,19,'Nhân vật - Bài Học Kinh doanh','2024-08-18 06:24:04','2024-08-18 06:24:04'),(6,19,'Marketing - Bán Hàng','2024-08-18 06:24:04','2024-08-18 06:24:04'),(7,20,'Kỹ năng sống','2024-08-18 06:24:04','2024-08-18 06:24:04'),(8,20,'Tâm lý','2024-08-18 06:24:04','2024-08-18 06:24:04'),(9,20,'Sách cho tuổi mới lớn','2024-08-18 06:24:04','2024-08-18 06:24:04'),(10,21,'Cẩm Nang Làm Cha Mẹ','2024-08-18 06:24:04','2024-08-18 06:24:04'),(11,21,'Phát Triển Kỹ Năng - Trí Tuệ Cho Trẻ','2024-08-18 06:24:04','2024-08-18 06:24:04'),(12,21,'Giáo Dục Trẻ Tuổi Teen','2024-08-18 06:24:04','2024-08-18 06:24:04'),(13,22,'Truyện Thiếu Nhi','2024-08-18 06:24:04','2024-08-18 06:24:04'),(14,22,'Kiến thức bách khoa','2024-08-18 06:24:04','2024-08-18 06:24:04'),(15,22,'Kiến Thức - Kỹ Năng Sống Cho Trẻ','2024-08-18 06:24:04','2024-08-18 06:24:04'),(16,23,'Câu Chuyện Cuộc Đời','2024-08-18 06:24:04','2024-08-18 06:24:04'),(17,23,'Lịch Sử','2024-08-18 06:24:04','2024-08-18 06:24:04'),(18,23,'Nghệ Thuật - Giải Trí','2024-08-18 06:24:04','2024-08-18 06:24:04'),(19,24,'Sách Tham Khảo','2024-08-18 06:24:04','2024-08-18 06:24:04'),(20,24,'Sách Giáo Khoa','2024-08-18 06:24:04','2024-08-18 06:24:04'),(21,24,'Mẫu Giáo','2024-08-18 06:24:04','2024-08-18 06:24:04'),(22,25,'Tiếng Anh','2024-08-18 06:24:04','2024-08-18 06:24:04'),(23,25,'Tiếng Hoa','2024-08-18 06:24:04','2024-08-18 06:24:04'),(24,25,'Tiếng Nhật','2024-08-18 06:24:04','2024-08-18 06:24:04');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (1,'Customer',NULL,'2024-08-13 09:01:46','2024-08-13 09:01:46'),(2,'Admin',NULL,'2024-08-13 09:01:46','2024-08-13 09:01:46'),(3,'Dev',NULL,'2024-08-13 09:01:46','2024-08-13 09:01:46'),(4,'Manager',NULL,'2024-08-13 09:01:46','2024-08-13 09:01:46');
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_role`
--

DROP TABLE IF EXISTS `group_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `groupId` int NOT NULL,
  `roleId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=549 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_role`
--

LOCK TABLES `group_role` WRITE;
/*!40000 ALTER TABLE `group_role` DISABLE KEYS */;
INSERT INTO `group_role` VALUES (492,2,1,'2024-09-29 16:21:42','2024-09-29 16:21:42'),(493,2,2,'2024-09-29 16:21:42','2024-09-29 16:21:42'),(494,2,3,'2024-09-29 16:21:42','2024-09-29 16:21:42'),(495,2,4,'2024-09-29 16:21:42','2024-09-29 16:21:42'),(496,2,13,'2024-09-29 16:21:42','2024-09-29 16:21:42'),(497,2,14,'2024-09-29 16:21:42','2024-09-29 16:21:42'),(498,2,15,'2024-09-29 16:21:42','2024-09-29 16:21:42'),(499,2,16,'2024-09-29 16:21:42','2024-09-29 16:21:42'),(500,2,17,'2024-09-29 16:21:42','2024-09-29 16:21:42'),(501,2,18,'2024-09-29 16:21:42','2024-09-29 16:21:42'),(502,2,19,'2024-09-29 16:21:42','2024-09-29 16:21:42'),(503,2,20,'2024-09-29 16:21:42','2024-09-29 16:21:42'),(504,2,24,'2024-09-29 16:21:42','2024-09-29 16:21:42'),(505,2,25,'2024-09-29 16:21:42','2024-09-29 16:21:42'),(506,2,30,'2024-09-29 16:21:42','2024-09-29 16:21:42'),(507,2,33,'2024-09-29 16:21:42','2024-09-29 16:21:42'),(522,3,1,'2024-11-12 13:39:13','2024-11-12 13:39:13'),(523,3,2,'2024-11-12 13:39:13','2024-11-12 13:39:13'),(524,3,3,'2024-11-12 13:39:13','2024-11-12 13:39:13'),(525,3,4,'2024-11-12 13:39:13','2024-11-12 13:39:13'),(526,3,13,'2024-11-12 13:39:13','2024-11-12 13:39:13'),(527,3,14,'2024-11-12 13:39:13','2024-11-12 13:39:13'),(528,3,16,'2024-11-12 13:39:13','2024-11-12 13:39:13'),(529,3,17,'2024-11-12 13:39:13','2024-11-12 13:39:13'),(530,3,18,'2024-11-12 13:39:13','2024-11-12 13:39:13'),(531,3,24,'2024-11-12 13:39:13','2024-11-12 13:39:13'),(532,3,25,'2024-11-12 13:39:13','2024-11-12 13:39:13'),(533,3,30,'2024-11-12 13:39:13','2024-11-12 13:39:13'),(541,4,1,'2024-11-21 15:59:40','2024-11-21 15:59:40'),(542,4,2,'2024-11-21 15:59:40','2024-11-21 15:59:40'),(543,4,3,'2024-11-21 15:59:40','2024-11-21 15:59:40'),(544,4,4,'2024-11-21 15:59:40','2024-11-21 15:59:40'),(545,4,13,'2024-11-21 15:59:40','2024-11-21 15:59:40'),(546,4,24,'2024-11-21 15:59:40','2024-11-21 15:59:40'),(547,4,25,'2024-11-21 15:59:40','2024-11-21 15:59:40'),(548,4,30,'2024-11-21 15:59:40','2024-11-21 15:59:40');
/*!40000 ALTER TABLE `group_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listcate`
--

DROP TABLE IF EXISTS `listcate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listcate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listcate`
--

LOCK TABLES `listcate` WRITE;
/*!40000 ALTER TABLE `listcate` DISABLE KEYS */;
INSERT INTO `listcate` VALUES (18,'VĂN HỌC','2024-08-13 05:32:33','2024-08-13 05:32:33'),(19,'KINH TẾ','2024-08-13 05:32:33','2024-08-13 05:32:33'),(20,'TÂM LÝ - KĨ NĂNG SỐNG','2024-08-13 05:33:14','2024-08-13 05:33:14'),(21,'NUÔI DẠY CON','2024-08-13 05:33:14','2024-08-13 05:33:14'),(22,'SÁCH THIẾU NHI','2024-08-13 05:33:14','2024-08-13 05:33:14'),(23,'TIỂU SỬ - HỒI KÝ','2024-08-13 05:33:14','2024-08-13 05:33:14'),(24,'GIÁO KHOA - THAM KHẢO','2024-08-13 05:33:14','2024-08-13 05:33:14'),(25,'SÁCH NGOẠI NGỮ','2024-08-13 05:33:14','2024-08-13 05:33:14');
/*!40000 ALTER TABLE `listcate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `fullName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `totalOrderPrice` double DEFAULT '0',
  `note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,1,'Nguyễn Tiến Đạt','0937909253','LA',240000,NULL,5,'2024-08-13 06:44:34','2024-10-01 11:08:27'),(2,2,'Nguyễn Trọng Lượng','0965644704','DT 824 ấp mới 1',670080,NULL,4,'2024-08-13 06:44:34','2024-08-13 06:44:34'),(3,3,'Lại Ngọc Yến Vy','0937909253','khu phố 3 Lê Trọng Tấn',646850,NULL,4,'2024-08-13 06:44:34','2024-08-13 06:44:34'),(32,1,'Nguyen Tien Dat','0937909253','140 Le Trong Tan',237600,NULL,4,'2024-08-13 07:58:10','2024-10-01 11:05:24'),(33,43,'Mai Thị Kim Phụng','0937469153','525 DT 824',126400,NULL,4,'2024-09-19 06:21:26','2024-09-19 06:21:26'),(34,2,'Nguyen Luong','0937909253','140 Le Trong Tan',253900,NULL,4,'2024-09-29 09:18:21','2024-09-29 09:18:21'),(35,1,'Nguyen Tien Dat','0937909253','140 Le Trong Tan',172800,NULL,4,'2024-10-01 02:40:45','2024-10-01 11:09:52'),(36,1,'Nguyen Tien Dat','0937909253','140 Le Trong Tan',74100,NULL,4,'2024-10-01 04:44:12','2024-10-01 10:44:45'),(37,1,'Nguyen Tien Dat','0937909253','140 Le Trong Tan',12300,NULL,4,'2024-10-01 13:31:10','2024-10-01 14:50:31'),(38,2,'Nguyễn Trọng Lượng','0965644704','San Jose',263000,NULL,4,'2024-10-01 14:51:40','2024-10-02 01:55:59'),(39,40,'Nguyen Test','123123','le trong tan',504300,NULL,4,'2024-10-12 04:37:16','2024-10-12 04:39:44'),(40,40,'Nguyen Test','0937909253','le trong tan',480000,NULL,4,'2024-10-12 04:40:51','2024-10-12 04:42:33'),(41,40,'Nguyen Test','0937909253','le trong tan',147260,NULL,5,'2024-10-12 04:41:11','2024-10-12 04:41:40'),(42,13,'Nguyễn Bảo Thiện','0938335512','LA',480000,NULL,5,'2024-11-12 12:42:36','2024-11-12 15:18:33'),(43,13,'Nguyễn Bảo Thiện','0938335512','LA',180400,NULL,4,'2024-11-22 03:39:36','2024-11-22 03:41:46');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `review` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rate` int NOT NULL,
  `bookId` int NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,'sach hay',4,43,2,'2024-08-22 12:25:53','2024-08-22 12:25:53'),(2,'sách này đọc rất cuốn, sẽ mua lại lần sau',5,43,1,'2024-08-22 12:36:56','2024-08-22 12:36:56'),(6,'test 3333',5,43,14,'2024-08-22 14:03:17','2024-08-22 14:03:17'),(7,'Sách đọc rất hay',4,55,1,'2024-08-22 14:24:53','2024-08-22 14:24:53'),(8,'không có gì hay',3,39,1,'2024-08-22 14:38:37','2024-08-22 14:38:37'),(11,'test ok',3,5,40,'2024-08-22 14:50:16','2024-08-22 14:50:16'),(12,'sach tot',4,41,2,'2024-08-23 02:51:50','2024-08-23 02:51:50'),(13,'Sach tốt',3,3,2,'2024-09-29 09:21:39','2024-09-29 09:21:39'),(14,'test comment',3,43,2,'2024-09-29 09:22:02','2024-09-29 09:22:02');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'/api/user/read','Hiển thị tất cả users','2024-08-15 03:46:06','2024-09-29 16:20:45'),(2,'/api/user/detail','Xem chi tiết user','2024-08-15 03:46:06','2024-11-12 07:33:11'),(3,'/api/user/create','Tạo mới user','2024-08-15 03:46:06','2024-09-29 16:21:03'),(4,'/api/user/update','Cập nhật user','2024-08-15 07:37:50','2024-09-29 16:21:10'),(13,'/api/group/read','get all group','2024-08-18 03:15:06','2024-08-18 03:15:06'),(14,'/api/role/by-group',NULL,'2024-08-18 03:21:16','2024-08-18 03:21:16'),(15,'/api/role/read','','2024-08-18 03:23:48','2024-08-18 03:23:48'),(16,'/api/role/create','','2024-08-18 03:23:48','2024-08-18 03:23:48'),(17,'/api/role/by-group/:groupId','','2024-08-18 03:24:41','2024-08-18 03:24:41'),(18,'/api/role/assign-role-group','assig roles to group','2024-08-18 03:24:41','2024-08-18 03:43:16'),(19,'/api/role/delete','delete a role','2024-08-18 03:34:08','2024-08-18 03:43:05'),(20,'/api/role/update','update a role','2024-08-18 03:38:43','2024-08-18 03:42:59'),(24,'/api/book/update','Sửa thông tin sách','2024-08-19 09:12:38','2024-09-29 15:19:21'),(25,'/api/book/delete','delete a book','2024-08-19 09:12:38','2024-09-29 10:04:54'),(30,'/api/book/create','tạo người dùng','2024-09-29 15:20:58','2024-09-29 15:31:53'),(33,'/api/user/delete','Xóa user','2024-09-29 16:21:29','2024-09-29 16:21:29');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20250420135110-add-discounted-price-to-books.js'),('migrate-book_cart.js'),('migrate-book_order.js'),('migrate-book.js'),('migrate-cart.js'),('migrate-category.js'),('migrate-group_role.js'),('migrate-group.js'),('migrate-listCate.js'),('migrate-order.js'),('migrate-review.js'),('migrate-role.js'),('migrate-supplier.js'),('migrate-user.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'Nhà Xuất Bản Kim Đồng','','','2024-08-13 05:20:54','2024-08-13 05:20:54'),(2,'Đinh Tị','09887283',NULL,'2024-08-13 05:21:46','2024-08-13 05:21:46'),(3,'NXB Trẻ','90879789',NULL,'2024-08-13 05:22:24','2024-08-13 05:22:24'),(4,'Tân Việt','2323',NULL,'2024-08-13 05:23:10','2024-08-13 05:23:10'),(5,'Nhã Nam','000898',NULL,'2024-08-13 05:23:27','2024-08-13 05:23:27'),(6,'Cty Nhân Trí Việt','',NULL,'2024-08-13 05:30:36','2024-08-13 05:30:36'),(7,'Cty Sách VN','',NULL,'2024-08-13 05:30:36','2024-08-13 05:30:36');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sex` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `groupId` int DEFAULT NULL,
  `codeId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Nguyễn Tiến','Đạt','0987742553','dat@gmail.com','$2a$12$OPPkv8HM6wUd5Fdxq4YxKegdjk9qCS05S6eeNC1flQyRNORVY109W','Nam','https://res.cloudinary.com/datdev/image/upload/v1728228782/yqgmulwk2momq35nnib2.jpg',2,NULL,'2024-08-13 05:16:02','2025-04-14 05:04:48'),(2,'Nguyễn Trọng','Lượng','098897','luong@gmail.com','$2a$12$v90MkA5KS7BKzKm2cAaj2Ojr1LIrU2lhM/HxFYqnNuY0Oa0.2im8O','Nam','https://res.cloudinary.com/datdev/image/upload/v1727795405/cebmjfv4zliroofmhtjb.jpg',1,NULL,'2024-08-13 05:16:42','2024-10-01 15:10:03'),(13,'Nguyen Bao','Thien','0938335512','thien@gmail.com','$2a$12$jzwWvdEYmCyFDv1pAFxugeBcp1u8cXg0/I6ViIhResYUe.4Gy2ZMO','Nam','/no-user.png',4,'81b2d203-40a0-4747-a901-2d26e1ea2fca','2024-08-14 09:40:03','2025-04-14 16:09:56'),(14,'Tran Van','Cuong ','012345600','cuong@gmail.com','$2a$12$z/K.buIBNhdadVj8DkczQOlvYVii4rhECjM8jQhc55gNCZcILXfR6','Nam','/no-user.png',1,NULL,'2024-08-14 09:45:16','2024-08-15 09:14:37'),(40,'Nguyen','Test','0909032','test@gmail.com','$2a$12$3WSTL1hDzYVSFFOei.OxeuhYTuUe4YR.DM.MgqY0ENlCVJfx6pe5m','Khác','/no-user.png',3,'235a8a59-1861-40e6-98b3-29cae888d8e6','2024-08-15 09:21:33','2024-11-14 05:29:55'),(41,'Le','Thuy','098378232','thuy@gmail.com','$2a$12$QQdAREdKuWmIpxb3NqNEZeJundM6NaV9TVCsa6rHT/.hhXgd95/zW','Nữ','/no-user.png',3,NULL,'2024-08-20 04:33:38','2024-08-23 02:53:12'),(43,'Mai Thị','Kim Phụng','0937469153','phung@gmail.com','$2a$12$zfInpjXUcrFt9OIPv9B0cOETvJyDaD0BaS.DJJWann2PsZshj2M8O','Nữ','/no-user.png',1,NULL,'2024-09-19 04:14:17','2025-04-14 05:04:28');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'books_store'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-25  9:19:39
