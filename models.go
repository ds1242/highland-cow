package main

import (
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
	ID        uuid.UUID	`json:"scan_id"`
	ProductID uuid.UUID	`json:"product_id"`
	UserID    uuid.UUID	`json:"user_id"`
	Quantity  int32		`json:"quantity"`
}

func dbProductScanToProductScanResponse(scan database.ProductScanned) productScanned {
	return productScanned{
		ID: scan.ID,
		ProductID: scan.ProductID,
		UserID: scan.UserID,
		Quantity: scan.Quantity,
	}
}