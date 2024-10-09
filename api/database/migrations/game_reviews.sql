CREATE TABLE gamingcenter.games_reviews (
	id BIGINT UNSIGNED auto_increment NOT NULL,
	title varchar(255) NOT NULL,
	description TEXT NOT NULL,
	rating varchar(255) NOT NULL,
	CONSTRAINT games_reviews_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;