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

ALTER TABLE gamingcenter.games_reviews ADD rating_id BIGINT UNSIGNED NOT NULL;
ALTER TABLE gamingcenter.games_reviews ADD CONSTRAINT games_reviews_games_reviews_ratings_FK FOREIGN KEY (rating_id) REFERENCES gamingcenter.games_reviews_ratings(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE gamingcenter.games_reviews DROP COLUMN rating;