CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY,
	username text NOT NULL,
	password text NOT NULL,
	email text NOT NULL
);

CREATE TABLE todos (
	id BIGSERIAL PRIMARY KEY,
	user_id BIGSERIAL REFERENCES users(id),
	todo TEXT,
	done BOOLEAN DEFAULT FALSE
);

CREATE UNIQUE INDEX user_todo on todos(user_id, id);