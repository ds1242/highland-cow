package main

import (
	"net/http"
)

func (cfg *apiConfig) handlerGetUserScanList(w http.ResponseWriter, r *http.Request, user User, tokenString string) {
	// Get user list slice from db
	ctx := r.Context()
	userList, err := cfg.DB.GetUserList(ctx, user.ID)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "unable to get userlist")
		return
	}
	// Convert to a user list reponse for the json object to be returned 
	var userListSlice []userListResponse
	for _, listItem := range userList {
		userListSlice = append(userListSlice, databaseUserListToUserList(listItem))
	}
	RespondWithJSON(w, http.StatusOK, userListSlice)
}
