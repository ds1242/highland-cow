-- +goose Up
CREATE TABLE products (
    id UUID PRIMARY KEY,
    product_name TEXT NOT NULL UNIQUE,
    description TEXT,
    brand TEXT,
    product_code TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- +goose Down
DROP TABLE products;
