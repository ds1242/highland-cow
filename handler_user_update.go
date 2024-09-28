package main

import (
	"net/http"
	"encoding/json"
	"time"
	
	"github.com/ds1242/highland-cow/internal/auth"
	"github.com/ds1242/highland-cow/internal/database"
)

func (cfg *apiConfig) handlerUserUpdate(w http.ResponseWriter, r *http.Request, userToUpdate User) {
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
		nameToUpdate = userToUpdate.Name
	} else {
		nameToUpdate = params.Name
	}

	ctx := r.Context()

	updatedDBUser, err := cfg.DB.UpdateUserByID(ctx, database.UpdateUserByIDParams{
		Name:     nameToUpdate,
		Email:    emailToUpdate,
		Password: hashedPass,
		UpdatedAt: time.Now().UTC(),
		ID:       userToUpdate.ID,
	})
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "unable to update user")
		return
	}
	// convert from dbUser struct to handler User struct
	updatedUser := databaseUserToUser(updatedDBUser)
	// create user response
	userResponse := updatedUserResponse(updatedUser)
	// send updated response
	RespondWithJSON(w, http.StatusOK, userResponse)

}

