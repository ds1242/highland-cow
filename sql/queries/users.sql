-- name: CreateUser :one
INSERT INTO users (id, created_at, updated_at, name, email, password)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: GetUserByEmail :one
SELECT *
FROM users
WHERE email = $1;

-- name: GetUserByID :one
SELECT *
FROM users
WHERE id = $1;

-- name: UpdateUserByID :one
UPDATE users
SET
    name = COALESCE($1, name),
    email = COALESCE($2, email),
    password = COALESCE($3, password),
    updated_at = $4
WHERE id = $5
RETURNING *;

-- name: DeleteUserByID :exec
DELETE FROM users
WHERE id = $1;