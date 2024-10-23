package main

import (
	"net/http"
)

func (cfg *apiConfig) handlerGetUser(w http.ResponseWriter, r *http.Request, user User, tokenString string) {
	userResponse := createUserResponse(user, tokenString)

	RespondWithJSON(w, http.StatusOK, userResponse)
}
