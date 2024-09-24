package main

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/ds1242/highland-cow/internal/auth"
	"github.com/ds1242/highland-cow/internal/database"
	"github.com/google/uuid"
)

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
		RespondWithError(w, http.StatusInternalServerError, "Couldn't create users")
	}
	RespondWithJSON(w, http.StatusCreated, databaseUserToUser(newUser))
}

// func (cfg *apiConfig) handlerGetUser(w http.ResponseWriter, r *http.Request, user database.User) {
// 	RespondWithJSON(w, http.StatusOK, databaseUserToUser(user))
// }
