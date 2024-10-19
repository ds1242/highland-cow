package main

import (
	"encoding/json"
	"net/http"

	"github.com/ds1242/highland-cow/internal/auth"
)

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
	userResponse := createLoginResponse(convertedUser, token)
	// Response
	RespondWithJSON(w, http.StatusOK, userResponse)
}
