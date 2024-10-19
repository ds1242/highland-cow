package main

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/ds1242/highland-cow/internal/auth"
	"github.com/ds1242/highland-cow/internal/database"

	"github.com/google/uuid"
)

// handler to Create New Users
func (cfg *apiConfig) handlerUsersCreate(w http.ResponseWriter, r *http.Request) {
	type Params struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	decoder := json.NewDecoder(r.Body)
	params := Params{}

	err := decoder.Decode(&params)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Couldn't decode parameters")
		return
	}

	ctx := r.Context()

	passHash, err := auth.HashPassword(params.Password)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "could not decode parameters")
		return
	}

	newUser, err := cfg.DB.CreateUser(ctx, database.CreateUserParams{
		ID:        uuid.New(),
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
		Name:      params.Name,
		Email:     params.Email,
		Password:  passHash,
	})
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	// create token
	defaultTokenExpiration := 60 * 60

	token, err := auth.CreateToken(newUser.ID.String(), defaultTokenExpiration, cfg.JWTSecret)
	if err != nil {
		RespondWithError(w, http.StatusUnauthorized, err.Error())
		return
	}
	
	convertedUser := databaseUserToUser(newUser)
	userResponse := createLoginResponse(convertedUser, token)

	RespondWithJSON(w, http.StatusCreated, userResponse)
}
