package main

import (
	"net/http"
	"encoding/json"
)

func (cfg *apiConfig) handlerDeleteScan(w http.ResponseWriter, r *http.Request, user User, tokenString string) {
	type Params struct {
		ScanID string `json:"scan_id"`
	}

	decoder := json.NewDecoder(r.Body)
	params := Params{}

	err := decoder.Decode(&params)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "invalid request payload")
		return
	}
}
