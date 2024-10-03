package main

import (
	"encoding/json"
	"net/http"
)

func (cfg *apiConfig) handlerScanProduct(w http.ResponseWriter, r *http.Request, user User, tokenString string) {
	type Params struct {
		ProductName string `json:"product_name"`
		Description string `json:"description"`
		Brand       string `json:"brand"`
		ProductCode string `json:"product_code"`
	}

	decoder := json.NewDecoder(r.Body)
	params := Params{}

	err := decoder.Decode(&params)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "invalid request payload")
		return
	}
}
