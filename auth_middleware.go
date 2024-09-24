package main

import (
	"net/http"

	"github.com/ds1242/highland-cow/auth"
	"github.com/ds1242/highland-cow/internal/database"
)

type authHandler func(http.ResponseWriter, *http.Request, database.User)

func (cfg *apiConfig) middlewareAuth(handler authHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		apiKey, err := auth.GetAPIKey(r.Header)
		if err != nil {
			RespondWithError(w, http.StatusUnauthorized, "could not find api key")
			return
		}

		user, err := cfg.DB.GetUserByAPIKey(r.Context(), apiKey)
		if err != nil {
			RespondWithError(w, http.StatusNotFound, "could not get user")
			return
		}
		handler(w, r, user)
	}
}
