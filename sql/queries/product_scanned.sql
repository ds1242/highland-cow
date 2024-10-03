-- name: AddProductScan :one
INSERT INTO product_scanned (id, product_id, user_id, quantity)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetUserList :many
SELECT *
FROM product_scanned
RIGHT JOIN products ON product_scanned.product_id = product.id;