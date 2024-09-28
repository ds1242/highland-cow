package main

import (
	"net/http"
	"strings"
	"encoding/json"
	"time"
	"fmt"

	"github.com/google/uuid"
	"github.com/golang-jwt/jwt/v5"
	"github.com/ds1242/highland-cow/internal/auth"
	"github.com/ds1242/highland-cow/internal/database"
)

func (cfg *apiConfig) handlerUserUpdate(w http.ResponseWriter, r *http.Request) {
	type Params struct {
		Name     string `json:"name,omitempty"`
		Email    string `json:"email,omitempty"`
		Password string `json:"password,omitempty"`
	}

	decoder := json.NewDecoder(r.Body)
	params := Params{}

	err := decoder.Decode(&params)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	authHeader := r.Header.Get("Authorization")
	if !strings.HasPrefix(authHeader, "Bearer ") {
		RespondWithError(w, http.StatusUnauthorized, "not authorized")
		return
	}

	// trim out Bearer from token
	tokenString := strings.TrimPrefix(authHeader, "Bearer ")
	claims := auth.UserClaim{}

	// parse with claims
	token, err := jwt.ParseWithClaims(tokenString, &claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(cfg.JWTSecret), nil
	})

	if err != nil {
		fmt.Printf("Error parsing token: %v", err)
		RespondWithError(w, http.StatusUnauthorized, "not authorized")
		return
	}

	if !token.Valid {
		RespondWithError(w, http.StatusUnauthorized, "invalid token")
		return
	}

	userID, err := uuid.Parse(claims.Subject)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "unable to parse subject")
		return
	}

	ctx := r.Context()

	userToUpdate, err := cfg.DB.GetUserByID(ctx, userID)
	if err != nil{
		RespondWithJSON(w, http.StatusBadRequest, "error finding that user")
	}

	var hashedPass string
	var emailToUpdate string
	var nameToUpdate string

	if params.Password != "" {
		hashed, err := auth.HashPassword(params.Password)
		if err != nil {
			RespondWithError(w, http.StatusBadRequest, "error parsing")
			return
		}
		hashedPass = hashed
	} else {
		hashedPass = userToUpdate.Password
	}

	if params.Email == "" {
		emailToUpdate = userToUpdate.Email
	} else {
		emailToUpdate = params.Email
	}
	if params.Name == "" {
		nameToUpdate = userToUpdate.Email
	} else {
		nameToUpdate = params.Name
	}

	updatedDBUser, err := cfg.DB.UpdateUserByID(ctx, database.UpdateUserByIDParams{
		Name:     nameToUpdate,
		Email:    emailToUpdate,
		Password: hashedPass,
		UpdatedAt: time.Now().UTC(),
		ID:       userID,
	})
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "unable to update user")
		return
	}
	// convert from dbUser struct to handler User struct
	updatedUser := databaseUserToUser(updatedDBUser)
	// create user response
	userResponse := createUserResponse(updatedUser, tokenString)
	// send updated response
	RespondWithJSON(w, http.StatusOK, userResponse)

}