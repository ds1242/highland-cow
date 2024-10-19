package main

import (
	"database/sql"
	"encoding/json"
	"time"

	"github.com/ds1242/highland-cow/internal/database"
	"github.com/google/uuid"
)

type User struct {
	ID        uuid.UUID `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Password  string    `json:"-"`
}

func databaseUserToUser(user database.User) User {
	return User{
		ID:        user.ID,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
		Name:      user.Name,
		Email:     user.Email,
		Password:  user.Password,
	}
}

type LoginResponse struct {
	ID    uuid.UUID `json:"user_id"`
	Token string    `json:"token"`
}

func createLoginResponse(user User, token string) LoginResponse {
	return LoginResponse{
		ID: user.ID,
		Token: token,
	}
}

type UserResponse struct {
	ID    uuid.UUID `json:"user_id"`
	Name  string    `json:"name"`
	Email string    `json:"email"`
	Token string    `json:"token"`
}

func createUserResponse(user User, token string) UserResponse {
	return UserResponse{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
		Token: token,
	}
}

type Product struct {
	ID          uuid.UUID `json:"ID"`
	Name        string    `json:"product_name"`
	Description string    `json:"description"`
}

type productScanned struct {
	ID        uuid.UUID `json:"scan_id"`
	ProductID uuid.UUID `json:"product_id"`
	UserID    uuid.UUID `json:"user_id"`
	Quantity  int32     `json:"quantity"`
}

func dbProductScanToProductScanResponse(scan database.ProductScanned) productScanned {
	return productScanned{
		ID:        scan.ID,
		ProductID: scan.ProductID,
		UserID:    scan.UserID,
		Quantity:  scan.Quantity,
	}
}

type userListResponse struct {
	ID          uuid.UUID `json:"scan_id"`
	ProductID   uuid.UUID `json:"product_id"`
	UserID      uuid.UUID `json:"user_id"`
	Quantity    int32     `json:"quantity"`
	ProductName string    `json:"product_name"`
	Description string    `json:"description,omitempty"`
	Brand       string    `json:"brand,omitempty"`
	ProductCode string    `json:"UPC"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type NullString sql.NullString

func (x *NullString) MarshalJSON() ([]byte, error) {
	if !x.Valid {
		return []byte("null"), nil
	}
	return json.Marshal(x.String)
}

func databaseUserListToUserList(row database.GetUserListRow) userListResponse {
	description := NullString(row.Description)
	brand := NullString(row.Brand)
	return userListResponse{
		ID:          row.ID,
		ProductID:   row.ProductID,
		UserID:      row.UserID,
		Quantity:    row.Quantity,
		ProductName: row.ProductName,
		Description: description.String,
		Brand:       brand.String,
		ProductCode: row.ProductCode,
		CreatedAt:   row.CreatedAt,
		UpdatedAt:   row.UpdatedAt,
	}
}
