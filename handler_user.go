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
	}

	ctx := r.Context()

	passHash, err := auth.HashPassword(params.Password)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "could not decode parameters")
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
	}
	// create token
	defaultTokenExpiration := 60 * 60

	token, err := auth.CreateToken(newUser.ID.String(), defaultTokenExpiration, cfg.JWTSecret)
	if err != nil {
		RespondWithError(w, http.StatusUnauthorized, err.Error())
	}
	convertedUser := databaseUserToUser(newUser)
	userResponse := createUserResponse(convertedUser, token)

	RespondWithJSON(w, http.StatusCreated, userResponse)
}

// Handler for User Login
func (cfg *apiConfig) handlerUserLogin(w http.ResponseWriter, r *http.Request) {
	type Params struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	defaultTokenExpiration := 60 * 60

	decoder := json.NewDecoder(r.Body)
	params := Params{}

	err := decoder.Decode(&params)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "could not decode parameters")
		return
	}

	ctx := r.Context()

	user, err := cfg.DB.GetUserByEmail(ctx, params.Email)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "user not found")
		return
	}

	passErr := auth.CheckPasswordHash(params.Password, user.Password)
	if passErr != nil {
		RespondWithError(w, http.StatusForbidden, "unable to login")
		return
	}

	token, err := auth.CreateToken(user.ID.String(), defaultTokenExpiration, cfg.JWTSecret)
	if err != nil {
		RespondWithError(w, http.StatusUnauthorized, err.Error())
		return
	}

	// convert queried DB user to a struct user
	convertedUser := databaseUserToUser(user)
	// create userResponse to display information
	userResponse := createUserResponse(convertedUser, token)
	// Response
	RespondWithJSON(w, http.StatusOK, userResponse)
}

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

	}
}
