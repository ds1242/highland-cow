package main

import (
	"net/http"
	"strings"


	"github.com/google/uuid"
)

var ErrNoAuthHeaderIncluded = "no authorization header included"

type authedHandler func(http.ResponseWriter, *http.Request, User)

func (cfg *apiConfig) middlewareAuth(handler authedHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		tokenString := r.Header.Get("Authorization")
		if tokenString == "" {
			RespondWithError(w, http.StatusBadRequest, ErrNoAuthHeaderIncluded)
			return
		}


		authHeader := r.Header.Get("Authorization")
		// trim out Bearer from token
		tokenString = strings.TrimPrefix(authHeader, "Bearer ")

		token, err := CheckToken(tokenString, cfg)
		if err != nil {
			RespondWithError(w, http.StatusUnauthorized, "unauthorized")
			return
		}

		ctx := r.Context()

		userID, err := uuid.Parse(token.Subject)
		if err != nil {
			RespondWithError(w, http.StatusBadRequest, "unable to parse subject")
			return
		}

		user, err := cfg.DB.GetUserByID(ctx, userID)
		if err != nil{
			RespondWithJSON(w, http.StatusBadRequest, "error finding that user")
		}

		userToHandle := databaseUserToUser(user)
		handler(w, r, userToHandle)

	}
}
