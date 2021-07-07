CREATE DATABASE IF NOT EXISTS `beautyscheme` DEFAULT CHARSET = utf8mb4 DEFAULT COLLATE = utf8mb4_unicode_ci;
USE `beautyscheme`;

CREATE TABLE IF NOT EXISTS `processed_YouTube_links` (
  `link_id` VARCHAR(191) NOT NULL,
  `channel` VARCHAR(191) DEFAULT NULL,
  `channel_id` VARCHAR(191) DEFAULT NULL,
  `upload_date` VARCHAR(191) DEFAULT NULL,
  `title` VARCHAR(191) DEFAULT NULL,
  PRIMARY KEY (`link_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `product_description_beginning` (
  `starts_with` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`starts_with`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `product_description_ending` (
  `ends_with` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`ends_with`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789';
