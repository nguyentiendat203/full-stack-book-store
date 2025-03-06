-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 02, 2025 at 05:28 AM
-- Server version: 8.0.31
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `books_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `supplierId` int NOT NULL,
  `categoryId` int NOT NULL,
  `price` double NOT NULL,
  `discount` int DEFAULT NULL,
  `stock` int NOT NULL,
  `author` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pageNumber` int NOT NULL,
  `publishingYear` int NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `totalRating` int DEFAULT NULL,
  `sold` int DEFAULT NULL,
  `ratingsAverage` double DEFAULT '3.5',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `name`, `supplierId`, `categoryId`, `price`, `discount`, `stock`, `author`, `pageNumber`, `publishingYear`, `slug`, `image`, `totalRating`, `sold`, `ratingsAverage`, `createdAt`, `updatedAt`) VALUES
(1, 'Lúc Biết Xuyên Không Thì Đã Muộn! - Tặng Kèm Card Bo Góc Random 1 Trong 3 Nhân Vật', 1, 1, 239000, 25, 0, 'Mật Tiễn', 544, 2024, 'luc-biet-xuyen-khong-thi-a-muon-tang-kem-card-bo-goc-random-1-trong-3-nhan-vat', 'https://res.cloudinary.com/datdev/image/upload/v1722344652/yjamg9tnzzpku4jwvas3.png', NULL, 5, 3.5, '2024-08-13 05:47:56', '2024-08-13 05:47:56'),
(2, 'Lén Nhặt Chuyện Đời', 1, 1, 85000, 50, 0, 'Mộc Trầm', 213, 2022, 'len-nhat-chuyen-doi', 'https://res.cloudinary.com/datdev/image/upload/v1722344986/qpq2b0xdtxxfxsapcbrs.png', NULL, 6, 3.5, '2024-08-13 05:50:06', '2024-09-29 09:18:21'),
(3, 'Nhà Giả Kim (Tái Bản 2020)', 5, 1, 79000, 20, 16, 'Paulo Coelho', 227, 2020, 'nha-gia-kim-tai-ban-2020', 'https://res.cloudinary.com/datdev/image/upload/v1722345087/fww2gbmay4mrynsvxsyr.png', 1, 4, 3, '2024-08-13 05:50:06', '2024-09-29 09:21:39'),
(4, 'Cây Cam Ngọt Của Tôi', 5, 1, 108000, 20, 16, 'José Mauro de Vasconcelos', 244, 2020, 'cay-cam-ngot-cua-toi', 'https://res.cloudinary.com/datdev/image/upload/v1722345226/wcdjuqd9ti98frq6qnqv.png', NULL, 4, 3.5, '2024-08-13 05:50:06', '2024-10-01 14:51:40'),
(5, 'Trốn Lên Mái Nhà Để Khóc - Tặng Kèm Bookmark', 3, 2, 95000, 22, 18, 'Lam', 208, 2023, 'tron-len-mai-nha-e-khoc-tang-kem-bookmark', 'https://res.cloudinary.com/datdev/image/upload/v1722345569/advoe0sjw4vu1drwc9zm.png', 1, 2, 3, '2024-08-13 05:53:44', '2024-10-01 04:44:12'),
(38, 'Nếu Biết Trăm Năm Là Hữu Hạn - Ấn Bản Kỉ Niệm 10 Năm Xuất Bản (Tái Bản 2024)', 6, 2, 159000, 15, 17, 'Phạm Lữ Ân', 263, 2024, 'neu-biet-tram-nam-la-huu-han-an-ban-ki-niem-10-nam-xuat-ban-tai-ban-2024', 'https://res.cloudinary.com/datdev/image/upload/v1722345619/s1zfj7bszu7fcfe2bg4j.png', NULL, 3, 3.5, '2024-08-13 05:53:44', '2024-08-13 05:53:44'),
(39, '999 Lá Thư Gửi Cho Chính Mình - Những Lá Thư Ấn Tượng Nhất (Phiên Bản Song Ngữ Trung - Việt)', 2, 2, 99000, 20, 17, 'Miêu Công Tử', 164, 2023, '999-la-thu-gui-cho-chinh-minh-nhung-la-thu-an-tuong-nhat-phien-ban-song-ngu-trung-viet', 'https://res.cloudinary.com/datdev/image/upload/v1722345678/m6tkuovhj4rweec4xugx.png', 1, 3, 3, '2024-08-13 05:53:44', '2024-08-22 14:38:37'),
(41, 'Một Vụ Án Của Jane Marple - Thi Thể Trong Thư Viện', 3, 3, 110000, 18, 16, 'Agatha Christie', 236, 2024, 'mot-vu-an-cua-jane-marple-thi-the-trong-thu-vien', 'https://res.cloudinary.com/datdev/image/upload/v1722346625/hjrqemt7wu4ezdabqyu1.png', 1, 4, 4, '2024-08-13 05:57:54', '2024-11-22 03:39:36'),
(42, 'Một Vụ Án Của Jane Marple - Vụ Án Mạng Được Báo Trước', 3, 3, 15000, 18, 17, 'Agatha Christie', 256, 2024, 'mot-vu-an-cua-jane-marple-vu-an-mang-uoc-bao-truoc', 'https://res.cloudinary.com/datdev/image/upload/v1722346673/unbuzetq6gqsdf1oozgn.png', NULL, 3, 3.5, '2024-08-13 06:03:00', '2024-10-12 04:37:16'),
(43, 'Ma Quỷ Dân Gian Ký', 6, 3, 268000, 22, 17, 'Duy Văn', 260, 2023, 'ma-quy-dan-gian-ky', 'https://res.cloudinary.com/datdev/image/upload/v1722346766/tdzkhqjvterwj9lgcdqh.png', 4, 3, 4.3, '2024-08-13 06:04:04', '2024-09-29 09:22:02'),
(44, 'MBA Bằng Hình - The Usual MBA', 5, 4, 189000, 20, 19, 'Jason Barron , MBA', 207, 2023, 'mba-bang-hinh-the-usual-mba', 'https://res.cloudinary.com/datdev/image/upload/v1722347123/gkbfngw65asiwmnqk6sf.png', NULL, 1, 3.5, '2024-08-13 06:05:14', '2024-08-13 06:05:14'),
(45, 'Một Đời Quản Trị (Tái Bản 2019)', 3, 4, 200000, 18, 20, 'Phan Văn Trường', 495, 2022, 'mot-oi-quan-tri-tai-ban-2019', 'https://res.cloudinary.com/datdev/image/upload/v1722347218/f0hptelsqh7t0ph5npfz.png', NULL, 1, 3.5, '2024-08-13 06:06:00', '2024-08-13 06:06:00'),
(46, 'Dẫn Dắt Một Bầy Sói Hay Chăn Một Đàn Cừu', 7, 4, 195000, 25, 20, 'Tiffani Bova', 358, 2024, 'dan-dat-mot-bay-soi-hay-chan-mot-an-cuu', 'https://res.cloudinary.com/datdev/image/upload/v1722347267/u1rebqtzfaokr0ctnwhj.png', NULL, 1, 3.5, '2024-08-13 06:06:38', '2024-08-13 06:06:38'),
(47, 'Từ Tốt Đến Vĩ Đại - Jim Collins (Tái Bản 2021)', 3, 5, 130000, 18, 20, 'Jim Collins', 484, 2021, 'tu-tot-en-vi-ai-jim-collins-tai-ban-2021', 'https://res.cloudinary.com/datdev/image/upload/v1722352823/xsxjw0xd7flymcs3bcln.png', NULL, 1, 3.5, '2024-08-13 06:07:19', '2024-08-13 06:07:19'),
(48, '48 Nguyên Tắc Chủ Chốt Của Quyền Lực (Tái Bản 2020)', 3, 5, 200000, 18, 20, 'Robert Greene', 504, 2020, '48-nguyen-tac-chu-chot-cua-quyen-luc-tai-ban-2020', 'https://res.cloudinary.com/datdev/image/upload/v1722352872/hptlac8cukyfisfgnti5.png', NULL, 1, 3.5, '2024-08-13 06:08:11', '2024-08-13 06:08:11'),
(49, 'Nghệ Thuật Tư Duy Chiến Lược', 2, 5, 239000, 25, 20, 'Avinash K Dixit, Barry J Nalebuff', 560, 2019, 'nghe-thuat-tu-duy-chien-luoc', 'https://res.cloudinary.com/datdev/image/upload/v1722352924/aysbfqgcpbczwxagvori.png', NULL, 1, 3.5, '2024-08-13 06:08:52', '2024-08-13 06:08:52'),
(50, 'Nghệ Thuật Bán Hàng Bằng Câu Chuyện (Tái Bản 2023)', 4, 6, 188000, 33, 20, 'Paul Smith', 350, 2023, 'nghe-thuat-ban-hang-bang-cau-chuyen-tai-ban-2023', 'https://res.cloudinary.com/datdev/image/upload/v1722409697/rgumbhyk662a3e8enyel.png', NULL, 1, 3.5, '2024-08-13 06:09:39', '2024-08-13 06:09:39'),
(51, 'Cưa Đổ CRM - Nhắm Trúng Đích, Tương Tác Ngay, Bán Hàng Hay, Chăm Sóc Giỏi', 2, 6, 199000, 26, 19, 'Nam Nguyễn', 214, 2022, 'cua-o-crm-nham-trung-ich-tuong-tac-ngay-ban-hang-hay-cham-soc-gioi', 'https://res.cloudinary.com/datdev/image/upload/v1722409817/rbkx62wjmlfyom6otfvd.png', NULL, 1, 3.5, '2024-08-13 06:10:24', '2024-10-12 04:41:11'),
(52, 'Kỹ Năng Giao Tiếp Đỉnh Cao', 2, 7, 96000, 25, 20, 'Lý Tử Quyên', 296, 2020, 'ky-nang-giao-tiep-inh-cao', 'https://res.cloudinary.com/datdev/image/upload/v1722433408/j3xhyjaegrr6lsygngna.png', NULL, 0, 3.5, '2024-08-13 06:11:09', '2024-08-13 06:11:09'),
(53, 'Một Đời Như Kẻ Tìm Đường', 3, 7, 175000, 18, 20, 'Phan Văn Trường', 414, 2019, 'mot-oi-nhu-ke-tim-uong', 'https://res.cloudinary.com/datdev/image/upload/v1722433466/whqexssofqpdilsx8tpi.png', NULL, 0, 3.5, '2024-08-13 06:11:50', '2024-08-13 06:11:50'),
(54, 'Những Quy Luật Của Bản Chất Con Người', 3, 7, 300000, 18, 14, 'Robert Greene', 892, 2020, 'nhung-quy-luat-cua-ban-chat-con-nguoi', 'https://res.cloudinary.com/datdev/image/upload/v1722433531/nilay62agpjzspceqkmo.jpg', NULL, 6, 3.5, '2024-08-13 06:12:35', '2024-10-12 04:37:16'),
(55, 'How Psychology Works - Hiểu Hết Về Tâm Lý Học', 5, 8, 300000, 20, 15, 'Jo Hemmings', 255, 2022, 'how-psychology-works-hieu-het-ve-tam-ly-hoc', 'https://res.cloudinary.com/datdev/image/upload/v1722433751/yzaitmn9rrvmgeoqsytt.png', 1, 5, 4, '2024-08-13 06:14:03', '2024-11-12 12:42:36'),
(56, 'Thiên Tài Bên Trái, Kẻ Điên Bên Phải (Tái Bản 2021)', 6, 8, 179000, 25, 20, 'Cao Minh', 424, 2021, 'thien-tai-ben-trai-ke-ien-ben-phai-tai-ban-2021', 'https://res.cloudinary.com/datdev/image/upload/v1722433819/cj8q0z1bu5vih90tr2ns.png', NULL, 0, 3.5, '2024-08-13 06:14:44', '2024-08-13 06:14:44'),
(57, 'Kiếp Nào Ta Cũng Tìm Thấy Nhau (Tái Bản 2022)', 5, 8, 99000, 22, 20, 'Brian L Weiss', 290, 2022, 'kiep-nao-ta-cung-tim-thay-nhau-tai-ban-2022', 'https://res.cloudinary.com/datdev/image/upload/v1722433874/xbhkl8azk3uamvzwgscn.png', NULL, 0, 3.5, '2024-08-13 06:15:19', '2024-08-19 09:10:30'),
(58, 'Tiểu Sử Các Quốc Gia Qua Góc Nhìn Lầy Lội', 5, 17, 215000, 20, 20, 'Sai Lei', 280, 2021, 'tieu-su-cac-quoc-gia-qua-goc-nhin-lay-loi', 'https://res.cloudinary.com/datdev/image/upload/v1722434193/xz1g0gnclltn9jugdeq7.png', NULL, 0, 3.5, '2024-08-13 06:16:03', '2024-08-13 06:16:03'),
(59, 'Geography Encyclopedia - Bách Khoa Toàn Thư Về Địa Lý', 2, 20, 289000, 28, 20, 'Nhiều Tác Giả', 400, 2019, 'geography-encyclopedia-bach-khoa-toan-thu-ve-ia-ly', 'https://res.cloudinary.com/datdev/image/upload/v1722434250/fbi7gll4jvmq1hevormk.png', NULL, 0, 3.5, '2024-08-13 06:16:44', '2024-08-13 06:16:44'),
(60, 'Nghèo Là Vốn Liếng', 6, 20, 168000, 25, 18, 'Nguyễn Phan Tú', 270, 2024, 'ngheo-la-von-lieng', 'https://res.cloudinary.com/datdev/image/upload/v1724057655/godpvvflvhsfktpn5kxf.png', NULL, 2, 3.5, '2024-08-13 06:17:34', '2024-10-12 04:31:03');

-- --------------------------------------------------------

--
-- Table structure for table `book_cart`
--

CREATE TABLE `book_cart` (
  `id` int NOT NULL,
  `bookId` int NOT NULL,
  `cartId` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `unitPrice` double DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book_cart`
--

INSERT INTO `book_cart` (`id`, `bookId`, `cartId`, `quantity`, `unitPrice`, `createdAt`, `updatedAt`) VALUES
(24, 3, 6, 1, 63200, '2024-08-22 02:20:22', '2024-08-22 02:20:22');

-- --------------------------------------------------------

--
-- Table structure for table `book_order`
--

CREATE TABLE `book_order` (
  `id` int NOT NULL,
  `bookId` int NOT NULL,
  `orderId` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `unitPrice` double DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book_order`
--

INSERT INTO `book_order` (`id`, `bookId`, `orderId`, `quantity`, `unitPrice`, `createdAt`, `updatedAt`) VALUES
(1, 55, 1, 1, 240000, '2024-08-13 06:46:34', '2024-08-13 06:46:34'),
(2, 60, 2, 2, 252000, '2024-08-13 06:46:34', '2024-08-13 06:46:34'),
(3, 43, 2, 2, 418080, '2024-08-13 06:46:34', '2024-08-13 06:46:34'),
(4, 41, 3, 1, 90200, '2024-08-13 06:46:34', '2024-08-13 06:46:34'),
(7, 39, 32, 3, 237600, '2024-08-13 07:58:10', '2024-08-13 07:58:10'),
(8, 3, 33, 2, 126400, '2024-09-19 06:21:26', '2024-09-19 06:21:26'),
(9, 2, 34, 3, 127500, '2024-09-29 09:18:21', '2024-09-29 09:18:21'),
(10, 3, 34, 2, 126400, '2024-09-29 09:18:21', '2024-09-29 09:18:21'),
(11, 4, 35, 2, 172800, '2024-10-01 02:40:45', '2024-10-01 02:40:45'),
(12, 5, 36, 1, 74100, '2024-10-01 04:44:12', '2024-10-01 04:44:12'),
(13, 42, 37, 1, 12300, '2024-10-01 13:31:10', '2024-10-01 13:31:10'),
(14, 4, 38, 2, 172800, '2024-10-01 14:51:40', '2024-10-01 14:51:40'),
(15, 41, 38, 1, 90200, '2024-10-01 14:51:40', '2024-10-01 14:51:40'),
(16, 54, 39, 2, 492000, '2024-10-12 04:37:16', '2024-10-12 04:37:16'),
(17, 42, 39, 1, 12300, '2024-10-12 04:37:16', '2024-10-12 04:37:16'),
(18, 55, 40, 2, 480000, '2024-10-12 04:40:52', '2024-10-12 04:40:52'),
(19, 51, 41, 1, 147260, '2024-10-12 04:41:11', '2024-10-12 04:41:11'),
(20, 55, 42, 2, 480000, '2024-11-12 12:42:36', '2024-11-12 12:42:36'),
(21, 41, 43, 2, 180400, '2024-11-22 03:39:36', '2024-11-22 03:39:36');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `totalQuantity` int DEFAULT '0',
  `totalCartPrice` double DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `userId`, `totalQuantity`, `totalCartPrice`, `createdAt`, `updatedAt`) VALUES
(6, 41, 1, 63200, '2024-08-22 02:20:22', '2024-08-22 02:20:22'),
(14, 1, 0, 0, '2024-10-18 16:40:02', '2024-11-30 14:46:28');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `listCateId` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `listCateId`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 18, 'Tiểu thuyết', '2024-08-18 06:23:09', '2024-08-18 06:23:09'),
(2, 18, 'Truyện ngắn - Tản Văn', '2024-08-18 06:23:09', '2024-08-18 06:23:09'),
(3, 18, 'Truyện Trinh Thám - Kiếm Hiệp', '2024-08-18 06:23:09', '2024-08-18 06:23:09'),
(4, 19, 'Quản Trị - Lãnh Đạo', '2024-08-18 06:23:09', '2024-08-18 06:23:09'),
(5, 19, 'Nhân vật - Bài Học Kinh doanh', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(6, 19, 'Marketing - Bán Hàng', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(7, 20, 'Kỹ năng sống', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(8, 20, 'Tâm lý', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(9, 20, 'Sách cho tuổi mới lớn', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(10, 21, 'Cẩm Nang Làm Cha Mẹ', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(11, 21, 'Phát Triển Kỹ Năng - Trí Tuệ Cho Trẻ', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(12, 21, 'Giáo Dục Trẻ Tuổi Teen', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(13, 22, 'Truyện Thiếu Nhi', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(14, 22, 'Kiến thức bách khoa', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(15, 22, 'Kiến Thức - Kỹ Năng Sống Cho Trẻ', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(16, 23, 'Câu Chuyện Cuộc Đời', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(17, 23, 'Lịch Sử', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(18, 23, 'Nghệ Thuật - Giải Trí', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(19, 24, 'Sách Tham Khảo', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(20, 24, 'Sách Giáo Khoa', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(21, 24, 'Mẫu Giáo', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(22, 25, 'Tiếng Anh', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(23, 25, 'Tiếng Hoa', '2024-08-18 06:24:04', '2024-08-18 06:24:04'),
(24, 25, 'Tiếng Nhật', '2024-08-18 06:24:04', '2024-08-18 06:24:04');

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE `group` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Customer', NULL, '2024-08-13 09:01:46', '2024-08-13 09:01:46'),
(2, 'Admin', NULL, '2024-08-13 09:01:46', '2024-08-13 09:01:46'),
(3, 'Dev', NULL, '2024-08-13 09:01:46', '2024-08-13 09:01:46'),
(4, 'Manager', NULL, '2024-08-13 09:01:46', '2024-08-13 09:01:46');

-- --------------------------------------------------------

--
-- Table structure for table `group_role`
--

CREATE TABLE `group_role` (
  `id` int NOT NULL,
  `groupId` int NOT NULL,
  `roleId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group_role`
--

INSERT INTO `group_role` (`id`, `groupId`, `roleId`, `createdAt`, `updatedAt`) VALUES
(492, 2, 1, '2024-09-29 16:21:42', '2024-09-29 16:21:42'),
(493, 2, 2, '2024-09-29 16:21:42', '2024-09-29 16:21:42'),
(494, 2, 3, '2024-09-29 16:21:42', '2024-09-29 16:21:42'),
(495, 2, 4, '2024-09-29 16:21:42', '2024-09-29 16:21:42'),
(496, 2, 13, '2024-09-29 16:21:42', '2024-09-29 16:21:42'),
(497, 2, 14, '2024-09-29 16:21:42', '2024-09-29 16:21:42'),
(498, 2, 15, '2024-09-29 16:21:42', '2024-09-29 16:21:42'),
(499, 2, 16, '2024-09-29 16:21:42', '2024-09-29 16:21:42'),
(500, 2, 17, '2024-09-29 16:21:42', '2024-09-29 16:21:42'),
(501, 2, 18, '2024-09-29 16:21:42', '2024-09-29 16:21:42'),
(502, 2, 19, '2024-09-29 16:21:42', '2024-09-29 16:21:42'),
(503, 2, 20, '2024-09-29 16:21:42', '2024-09-29 16:21:42'),
(504, 2, 24, '2024-09-29 16:21:42', '2024-09-29 16:21:42'),
(505, 2, 25, '2024-09-29 16:21:42', '2024-09-29 16:21:42'),
(506, 2, 30, '2024-09-29 16:21:42', '2024-09-29 16:21:42'),
(507, 2, 33, '2024-09-29 16:21:42', '2024-09-29 16:21:42'),
(522, 3, 1, '2024-11-12 13:39:13', '2024-11-12 13:39:13'),
(523, 3, 2, '2024-11-12 13:39:13', '2024-11-12 13:39:13'),
(524, 3, 3, '2024-11-12 13:39:13', '2024-11-12 13:39:13'),
(525, 3, 4, '2024-11-12 13:39:13', '2024-11-12 13:39:13'),
(526, 3, 13, '2024-11-12 13:39:13', '2024-11-12 13:39:13'),
(527, 3, 14, '2024-11-12 13:39:13', '2024-11-12 13:39:13'),
(528, 3, 16, '2024-11-12 13:39:13', '2024-11-12 13:39:13'),
(529, 3, 17, '2024-11-12 13:39:13', '2024-11-12 13:39:13'),
(530, 3, 18, '2024-11-12 13:39:13', '2024-11-12 13:39:13'),
(531, 3, 24, '2024-11-12 13:39:13', '2024-11-12 13:39:13'),
(532, 3, 25, '2024-11-12 13:39:13', '2024-11-12 13:39:13'),
(533, 3, 30, '2024-11-12 13:39:13', '2024-11-12 13:39:13'),
(541, 4, 1, '2024-11-21 15:59:40', '2024-11-21 15:59:40'),
(542, 4, 2, '2024-11-21 15:59:40', '2024-11-21 15:59:40'),
(543, 4, 3, '2024-11-21 15:59:40', '2024-11-21 15:59:40'),
(544, 4, 4, '2024-11-21 15:59:40', '2024-11-21 15:59:40'),
(545, 4, 13, '2024-11-21 15:59:40', '2024-11-21 15:59:40'),
(546, 4, 24, '2024-11-21 15:59:40', '2024-11-21 15:59:40'),
(547, 4, 25, '2024-11-21 15:59:40', '2024-11-21 15:59:40'),
(548, 4, 30, '2024-11-21 15:59:40', '2024-11-21 15:59:40');

-- --------------------------------------------------------

--
-- Table structure for table `listcate`
--

CREATE TABLE `listcate` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `listcate`
--

INSERT INTO `listcate` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(18, 'VĂN HỌC', '2024-08-13 05:32:33', '2024-08-13 05:32:33'),
(19, 'KINH TẾ', '2024-08-13 05:32:33', '2024-08-13 05:32:33'),
(20, 'TÂM LÝ - KĨ NĂNG SỐNG', '2024-08-13 05:33:14', '2024-08-13 05:33:14'),
(21, 'NUÔI DẠY CON', '2024-08-13 05:33:14', '2024-08-13 05:33:14'),
(22, 'SÁCH THIẾU NHI', '2024-08-13 05:33:14', '2024-08-13 05:33:14'),
(23, 'TIỂU SỬ - HỒI KÝ', '2024-08-13 05:33:14', '2024-08-13 05:33:14'),
(24, 'GIÁO KHOA - THAM KHẢO', '2024-08-13 05:33:14', '2024-08-13 05:33:14'),
(25, 'SÁCH NGOẠI NGỮ', '2024-08-13 05:33:14', '2024-08-13 05:33:14');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `fullName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `totalOrderPrice` double DEFAULT '0',
  `note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `userId`, `fullName`, `phone`, `address`, `totalOrderPrice`, `note`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Nguyễn Tiến Đạt', '0937909253', 'LA', 240000, NULL, 5, '2024-08-13 06:44:34', '2024-10-01 11:08:27'),
(2, 2, 'Nguyễn Trọng Lượng', '0965644704', 'DT 824 ấp mới 1', 670080, NULL, 4, '2024-08-13 06:44:34', '2024-08-13 06:44:34'),
(3, 3, 'Lại Ngọc Yến Vy', '0937909253', 'khu phố 3 Lê Trọng Tấn', 646850, NULL, 4, '2024-08-13 06:44:34', '2024-08-13 06:44:34'),
(32, 1, 'Nguyen Tien Dat', '0937909253', '140 Le Trong Tan', 237600, NULL, 4, '2024-08-13 07:58:10', '2024-10-01 11:05:24'),
(33, 43, 'Mai Thị Kim Phụng', '0937469153', '525 DT 824', 126400, NULL, 4, '2024-09-19 06:21:26', '2024-09-19 06:21:26'),
(34, 2, 'Nguyen Luong', '0937909253', '140 Le Trong Tan', 253900, NULL, 4, '2024-09-29 09:18:21', '2024-09-29 09:18:21'),
(35, 1, 'Nguyen Tien Dat', '0937909253', '140 Le Trong Tan', 172800, NULL, 4, '2024-10-01 02:40:45', '2024-10-01 11:09:52'),
(36, 1, 'Nguyen Tien Dat', '0937909253', '140 Le Trong Tan', 74100, NULL, 4, '2024-10-01 04:44:12', '2024-10-01 10:44:45'),
(37, 1, 'Nguyen Tien Dat', '0937909253', '140 Le Trong Tan', 12300, NULL, 4, '2024-10-01 13:31:10', '2024-10-01 14:50:31'),
(38, 2, 'Nguyễn Trọng Lượng', '0965644704', 'San Jose', 263000, NULL, 4, '2024-10-01 14:51:40', '2024-10-02 01:55:59'),
(39, 40, 'Nguyen Test', '123123', 'le trong tan', 504300, NULL, 4, '2024-10-12 04:37:16', '2024-10-12 04:39:44'),
(40, 40, 'Nguyen Test', '0937909253', 'le trong tan', 480000, NULL, 4, '2024-10-12 04:40:51', '2024-10-12 04:42:33'),
(41, 40, 'Nguyen Test', '0937909253', 'le trong tan', 147260, NULL, 5, '2024-10-12 04:41:11', '2024-10-12 04:41:40'),
(42, 13, 'Nguyễn Bảo Thiện', '0938335512', 'LA', 480000, NULL, 5, '2024-11-12 12:42:36', '2024-11-12 15:18:33'),
(43, 13, 'Nguyễn Bảo Thiện', '0938335512', 'LA', 180400, NULL, 4, '2024-11-22 03:39:36', '2024-11-22 03:41:46');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int NOT NULL,
  `review` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `rate` int NOT NULL,
  `bookId` int NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `review`, `rate`, `bookId`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'sach hay', 4, 43, 2, '2024-08-22 12:25:53', '2024-08-22 12:25:53'),
(2, 'sách này đọc rất cuốn, sẽ mua lại lần sau', 5, 43, 1, '2024-08-22 12:36:56', '2024-08-22 12:36:56'),
(6, 'test 3333', 5, 43, 14, '2024-08-22 14:03:17', '2024-08-22 14:03:17'),
(7, 'Sách đọc rất hay', 4, 55, 1, '2024-08-22 14:24:53', '2024-08-22 14:24:53'),
(8, 'không có gì hay', 3, 39, 1, '2024-08-22 14:38:37', '2024-08-22 14:38:37'),
(11, 'test ok', 3, 5, 40, '2024-08-22 14:50:16', '2024-08-22 14:50:16'),
(12, 'sach tot', 4, 41, 2, '2024-08-23 02:51:50', '2024-08-23 02:51:50'),
(13, 'Sach tốt', 3, 3, 2, '2024-09-29 09:21:39', '2024-09-29 09:21:39'),
(14, 'test comment', 3, 43, 2, '2024-09-29 09:22:02', '2024-09-29 09:22:02');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `url`, `description`, `createdAt`, `updatedAt`) VALUES
(1, '/api/user/read', 'Hiển thị tất cả users', '2024-08-15 03:46:06', '2024-09-29 16:20:45'),
(2, '/api/user/detail', 'Xem chi tiết user', '2024-08-15 03:46:06', '2024-11-12 07:33:11'),
(3, '/api/user/create', 'Tạo mới user', '2024-08-15 03:46:06', '2024-09-29 16:21:03'),
(4, '/api/user/update', 'Cập nhật user', '2024-08-15 07:37:50', '2024-09-29 16:21:10'),
(13, '/api/group/read', 'get all group', '2024-08-18 03:15:06', '2024-08-18 03:15:06'),
(14, '/api/role/by-group', NULL, '2024-08-18 03:21:16', '2024-08-18 03:21:16'),
(15, '/api/role/read', '', '2024-08-18 03:23:48', '2024-08-18 03:23:48'),
(16, '/api/role/create', '', '2024-08-18 03:23:48', '2024-08-18 03:23:48'),
(17, '/api/role/by-group/:groupId', '', '2024-08-18 03:24:41', '2024-08-18 03:24:41'),
(18, '/api/role/assign-role-group', 'assig roles to group', '2024-08-18 03:24:41', '2024-08-18 03:43:16'),
(19, '/api/role/delete', 'delete a role', '2024-08-18 03:34:08', '2024-08-18 03:43:05'),
(20, '/api/role/update', 'update a role', '2024-08-18 03:38:43', '2024-08-18 03:42:59'),
(24, '/api/book/update', 'Sửa thông tin sách', '2024-08-19 09:12:38', '2024-09-29 15:19:21'),
(25, '/api/book/delete', 'delete a book', '2024-08-19 09:12:38', '2024-09-29 10:04:54'),
(30, '/api/book/create', 'tạo người dùng', '2024-09-29 15:20:58', '2024-09-29 15:31:53'),
(33, '/api/user/delete', 'Xóa user', '2024-09-29 16:21:29', '2024-09-29 16:21:29');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('migrate-book_cart.js'),
('migrate-book_order.js'),
('migrate-book.js'),
('migrate-cart.js'),
('migrate-category.js'),
('migrate-group_role.js'),
('migrate-group.js'),
('migrate-listCate.js'),
('migrate-order.js'),
('migrate-role.js'),
('migrate-supplier.js'),
('migrate-user.js');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `name`, `phone`, `address`, `createdAt`, `updatedAt`) VALUES
(1, 'Nhà Xuất Bản Kim Đồng', '', '', '2024-08-13 05:20:54', '2024-08-13 05:20:54'),
(2, 'Đinh Tị', '09887283', NULL, '2024-08-13 05:21:46', '2024-08-13 05:21:46'),
(3, 'NXB Trẻ', '90879789', NULL, '2024-08-13 05:22:24', '2024-08-13 05:22:24'),
(4, 'Tân Việt', '2323', NULL, '2024-08-13 05:23:10', '2024-08-13 05:23:10'),
(5, 'Nhã Nam', '000898', NULL, '2024-08-13 05:23:27', '2024-08-13 05:23:27'),
(6, 'Cty Nhân Trí Việt', '', NULL, '2024-08-13 05:30:36', '2024-08-13 05:30:36'),
(7, 'Cty Sách VN', '', NULL, '2024-08-13 05:30:36', '2024-08-13 05:30:36');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `sex` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `groupId` int DEFAULT NULL,
  `codeId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `phone`, `email`, `password`, `sex`, `avatar`, `groupId`, `codeId`, `createdAt`, `updatedAt`) VALUES
(1, 'Nguyễn Tiến', 'Dat', '0987742553', 'dat@gmail.com', '$2a$12$OPPkv8HM6wUd5Fdxq4YxKegdjk9qCS05S6eeNC1flQyRNORVY109W', 'Nam', 'https://res.cloudinary.com/datdev/image/upload/v1728228782/yqgmulwk2momq35nnib2.jpg', 2, NULL, '2024-08-13 05:16:02', '2024-11-12 07:01:26'),
(2, 'Nguyễn Trọng', 'Lượng', '098897', 'luong@gmail.com', '$2a$12$v90MkA5KS7BKzKm2cAaj2Ojr1LIrU2lhM/HxFYqnNuY0Oa0.2im8O', 'Nam', 'https://res.cloudinary.com/datdev/image/upload/v1727795405/cebmjfv4zliroofmhtjb.jpg', 1, NULL, '2024-08-13 05:16:42', '2024-10-01 15:10:03'),
(13, 'Nguyen Bao', 'Thien', '0938335512', 'thien@gmail.com', '$2a$12$s.AJdmqCIo0ExxOTY4RyweBggjkZFhAPI.T7d1m2wJIWToFZKHNYa', 'Nam', '/no-user.png', 4, 'a6f99348-4b2b-4533-823e-1e75a7f00bb5', '2024-08-14 09:40:03', '2024-11-19 07:12:17'),
(14, 'Tran Van', 'Cuong ', '012345600', 'cuong@gmail.com', '$2a$12$z/K.buIBNhdadVj8DkczQOlvYVii4rhECjM8jQhc55gNCZcILXfR6', 'Nam', '/no-user.png', 1, NULL, '2024-08-14 09:45:16', '2024-08-15 09:14:37'),
(40, 'Nguyen', 'Test', '0909032', 'test@gmail.com', '$2a$12$3WSTL1hDzYVSFFOei.OxeuhYTuUe4YR.DM.MgqY0ENlCVJfx6pe5m', 'Khác', '/no-user.png', 3, '235a8a59-1861-40e6-98b3-29cae888d8e6', '2024-08-15 09:21:33', '2024-11-14 05:29:55'),
(41, 'Le', 'Thuy', '098378232', 'thuy@gmail.com', '$2a$12$QQdAREdKuWmIpxb3NqNEZeJundM6NaV9TVCsa6rHT/.hhXgd95/zW', 'Nữ', '/no-user.png', 3, NULL, '2024-08-20 04:33:38', '2024-08-23 02:53:12'),
(43, 'Mai Thị', 'Kim Phụng', '0937469153', 'phung@gmail.com', '$2a$12$zfInpjXUcrFt9OIPv9B0cOETvJyDaD0BaS.DJJWann2PsZshj2M8O', 'Nữ', '/no-user.png', 1, NULL, '2024-09-19 04:14:17', '2024-11-21 15:16:57'),
(46, 'Ngyuyen', 'admin', NULL, 'admin@gmail.com', '$2a$12$E0I6ZsLyg6rNheROoCx5COpHBQiCMtAZcA8G4RSpdbmfCQytwRQGe', NULL, '/no-user.png', NULL, '095d1f72-d6ba-4b65-8570-e94aaac1820c', '2024-11-14 04:04:53', '2024-11-14 05:09:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `book_cart`
--
ALTER TABLE `book_cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `book_order`
--
ALTER TABLE `book_order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_role`
--
ALTER TABLE `group_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listcate`
--
ALTER TABLE `listcate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `book_cart`
--
ALTER TABLE `book_cart`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `book_order`
--
ALTER TABLE `book_order`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `group_role`
--
ALTER TABLE `group_role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=549;

--
-- AUTO_INCREMENT for table `listcate`
--
ALTER TABLE `listcate`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
