-- +goose Up
CREATE TABLE product_scanned (
    id UUID PRIMARY KEY,
    product_id UUID NOT NULL,
    user_id UUID NOT NULL,
    quantity INTEGER NOT NULL,
    UNIQUE(user_id, product_id),
    CONSTRAINT fk_user_id
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- +goose Down
DROP TABLE product_scanned;