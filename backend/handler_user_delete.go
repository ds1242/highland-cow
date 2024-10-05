package main

import (
	"net/http"
)

func (cfg *apiConfig) handlerUserDelete(w http.ResponseWriter, r *http.Request, user User, tokenString string) {
	ctx := r.Context()

	err := cfg.DB.DeleteUserByID(ctx, user.ID)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "unable to delete user")
		return
	}
	RespondWithJSON(w, http.StatusOK, map[string]string{"status": "user deleted"})
}
