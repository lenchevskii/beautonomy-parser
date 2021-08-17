CREATE DATABASE IF NOT EXISTS `beautyscheme` DEFAULT CHARSET = utf8mb4 DEFAULT COLLATE = utf8mb4_unicode_ci; USE `beautyscheme`;

CREATE TABLE IF NOT EXISTS `processed_youtube_links` ( `link_id` VARCHAR(191) NOT NULL, `channel` VARCHAR(191) DEFAULT NULL, `channel_id` VARCHAR(191) DEFAULT NULL, `upload_date` VARCHAR(191) DEFAULT NULL, `title` VARCHAR(191) DEFAULT NULL, PRIMARY KEY (`link_id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `product_description_beginning` ( `starts_with` VARCHAR(191) NOT NULL, PRIMARY KEY (`starts_with`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `product_description_ending` ( `ends_with` VARCHAR(191) NOT NULL, PRIMARY KEY (`ends_with`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci; ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789';

INSERT INTO `product_description_beginning` (`starts_with`) VALUES ( 'Ardell'), ( 'Auric '), ( 'bareMinerals ' ), ( 'Becca Cosmetics ' ), ( 'Benefit ' ), ( 'Bobbi ' ), ( 'Catrice ' ), ( 'Chanel ' ), ( 'Charlotte ' ), ( 'Coty ' ), ( 'Covergirl ' ), ( 'Danessa ' ), ( 'Dior ' ), ( 'Dose of Colors ' ), ( 'Embryolisse ' ), ( 'Essence ' ), ( 'Fenty ' ), ( 'Glossier ' ), ( 'Hourglass ' ), ( 'Kash Beauty ' ), ( 'Kiko ' ), ( 'KKW ' ), ( 'KVD ' ), ( 'Kylie ' ), ( 'L’Oreal ' ), ( 'Lancome ' ), ( 'Laura ' ), ( 'MAC ' ), ( 'Mario ' ), ( 'Maybelline ' ), ( 'Melt Cosmetics ' ), ( 'Merit ' ), ( 'Milani ' ), ( 'Moroccanoil ' ), ( 'Morphe ' ), ( 'MUFE ' ), ( 'NARS ' ), ( 'Neutrogena ' ), ( 'Nudestix ' ), ( 'NYX ' ), ( 'Pat ' ), ( 'Patrick Ta ' ), ( 'Physicians ' ), ( 'Pixi + Louise Roe' ), ( 'Powder Blush ' ), ( 'Refy ' ), ( 'Revlon ' ), ( 'Revolution ' ), ( 'Sephora ' ), ( 'Sigma ' ), ( 'Sleek ' ), ( 'Smashbox ' ), ( 'Sun Bum ' ), ( 'Tarte ' ), ( 'Tatcha ' ), ( 'theBalm ' ), ( 'Tinkle ' ), ( 'UD ' ), ( 'Urban Decay ' ), ( 'Wet n’ Wild' );

INSERT INTO `product_description_ending` (`ends_with`) VALUES ( 'Balm '), ( 'Blush IN Pink '), ( 'Bronzer '), ( 'Brush Set '), ( 'Concealer '), ( 'Corrector '), ( 'Foundation '), ( 'Gel '), ( 'Glue '), ( 'Hairspray '), ( 'Highlighter '), ( 'Liner '), ( 'Lipstick '), ( 'Luminizer '), ( 'Lust '), ( 'Mascara '), ( 'Palette '), ( 'Powder '), ( 'Primer '), ( 'Serum '), ( 'Set '), ( 'Setter '), ( 'Shadow '), ( 'Shadowstick '), ( 'Stick '), ( 'Stripdown '), ( 'Wispies ');

CREATE TABLE IF NOT EXISTS `processed_instagram_links` ( `shortcode` VARCHAR(191) NOT NULL, `username` VARCHAR(191) NOT NULL, `owner_id` VARCHAR(191) DEFAULT NULL, `post_id` VARCHAR(191) DEFAULT NULL, PRIMARY KEY (`shortcode`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `processed_reddit_links` ( `post_id` VARCHAR(191) NOT NULL, `author` VARCHAR(191) NOT NULL, PRIMARY KEY (`post_id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;
