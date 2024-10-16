CREATE TABLE `games_reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `rating_id` bigint unsigned NOT NULL,
  `image_url` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `games_reviews_games_reviews_ratings_FK` (`rating_id`),
  CONSTRAINT `games_reviews_games_reviews_ratings_FK` FOREIGN KEY (`rating_id`) REFERENCES `games_reviews_ratings` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;