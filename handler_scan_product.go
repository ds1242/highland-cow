package main

import (
	"encoding/json"
	"fmt"
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

	ctx := r.Context()

	fmt.Println(params)
	product, err := cfg.DB.GetProductByProductCode(ctx, params.ProductCode)
	if err != nil {
		fmt.Println("error getting product")
		return
	}
	fmt.Println(product)
}
