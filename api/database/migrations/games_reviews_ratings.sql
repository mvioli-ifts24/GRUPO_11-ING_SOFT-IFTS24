CREATE TABLE gamingcenter.games_reviews_ratings (
	id BIGINT UNSIGNED auto_increment NOT NULL,
	description varchar(100) NOT NULL,
	CONSTRAINT games_reviews_ratings_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
