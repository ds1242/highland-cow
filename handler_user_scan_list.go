package main

import (
	"net/http"
)

func (cfg *apiConfig) handlerGetUserScanList(w http.ResponseWriter, r *http.Request, user User, tokenString string) {

	ctx := r.Context()
	userList, err := cfg.DB.GetUserList(ctx, user.ID)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "unable to get userlist")
		return
	}
	// Setup func to convert to a json response struct
	var userListSlice []userListResponse
	for _, listItem := range userList {
		userListSlice = append(userListSlice, databaseUserListToUserList(listItem))
	}
	RespondWithJSON(w, http.StatusOK, userListSlice)
}
