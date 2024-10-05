package main

import (
	"fmt"
	"net/http"
)

func (cfg *apiConfig) handlerGetUserScanList(w http.ResponseWriter, r *http.Request, user User, tokenString string) {

	ctx := r.Context()
	userList, err := cfg.DB.GetUserList(ctx, user.ID)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "unable to get userlist")
		return
	}
	fmt.Println(userList)
	// Setup func to convert to a json response struct
}
