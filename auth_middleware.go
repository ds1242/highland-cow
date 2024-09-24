package main

import (
	"context"
	"net/http"

	"github.com/ds1242/highland-cow/internal/auth"
)

var ErrNoAuthHeaderIncluded = "no authorization header included"


func (cfg *apiConfig) middlewareAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		tokenString := r.Header.Get("Authorization")
		if tokenString == "" {
			RespondWithError(w, http.StatusBadRequest, ErrNoAuthHeaderIncluded)
			return
		}

		token, err := auth.VerifyToken(tokenString)
		if err != nil {
			RespondWithError(w, http.StatusUnauthorized, "unauthorized")
			return
		}

		ctx := context.WithValue(r.Context(), "token", token)
		next.ServeHTTP(w, r.WithContext(ctx))

	}
}