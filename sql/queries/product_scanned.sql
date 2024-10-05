-- name: AddProductScan :one
INSERT INTO product_scanned (id, product_id, user_id, quantity)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetUserList :many
SELECT *
FROM product_scanned
JOIN products
ON product_scanned.product_id = products.id
WHERE product_scanned.user_id = $1;

-- name: GetScanByUserAndProductID :one
SELECT *
FROM product_scanned
WHERE user_id = $1
AND product_id = $2;

-- name: UpdateScanQuantity :one
UPDATE product_scanned
SET quantity = $1
WHERE id = $2
RETURNING *;

-- name: GetScanById :one
SELECT *
FROM product_scanned
WHERE id = $1;

-- name: DeleteScanById :exec
DELETE FROM product_scanned
WHERE id = $1;