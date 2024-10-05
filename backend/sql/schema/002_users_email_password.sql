-- +goose Up
ALTER TABLE users
ADD COLUMN email TEXT NOT NULL UNIQUE,
ADD COLUMN password TEXT NOT NULL;

-- +goose Down
ALTER TABLE users
DROP COLUMN email,
DROP COLUMN password;
