package main

import (
	"encoding/json"
	"net/http"

	"github.com/ds1242/highland-cow/internal/database"
	"github.com/google/uuid"
)

func (cfg *apiConfig) handlerUpdateScan(w http.ResponseWriter, r *http.Request, user User, tokenString string) {
	type Params struct {
		ScanID   string `json:"scan_id"`
		Quantity int32  `json:"quantity"`
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

	updatedProduct, err := cfg.DB.UpdateScanQuantity(ctx, database.UpdateScanQuantityParams{
		Quantity: params.Quantity,
		ID:       scanID,
	})
	if err != nil {
		RespondWithError(w, http.StatusServiceUnavailable, "unable to update quantity")
		return
	}

	scanResponse := dbProductScanToProductScanResponse(updatedProduct)
	RespondWithJSON(w, http.StatusOK, scanResponse)

}
