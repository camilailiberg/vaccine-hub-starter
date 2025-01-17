CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    location TEXT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE CHECK(POSITION('@' IN email) > 1),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);