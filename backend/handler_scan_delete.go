package main

import (
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
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

	scanID, err := uuid.Parse(params.ScanID)
	if err != nil {
		RespondWithError(w, http.StatusUnauthorized, "unable to parse scan id")
		return
	}

	ctx := r.Context()

	err = cfg.DB.DeleteScanById(ctx, scanID)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "unable to delete scan")
		return
	}

	RespondWithJSON(w, http.StatusOK, "scan deleted")
}
