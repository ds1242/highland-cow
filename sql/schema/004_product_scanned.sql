-- +goose Up
CREATE TABLE product_scanned (
    id UUID PRIMARY KEY,
    product_id UUID NOT NULL,
    user_id UUID NOT NULL,
    quantity INTEGER NOT NULL,
    UNIQUE(user_id, product_id)
);

-- +goose Down
DROP TABLE product_scanned;