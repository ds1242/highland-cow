package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

	"github.com/ds1242/highland-cow/internal/database"
	"github.com/google/uuid"
)

func (cfg *apiConfig) handlerScanProduct(w http.ResponseWriter, r *http.Request, user User, tokenString string) {
	type Params struct {
		ProductName string `json:"product_name"`
		Description string `json:"description"`
		Brand       string `json:"brand"`
		ProductCode string `json:"product_code"`
		Quantity    int    `json:"quantity"`
	}

	decoder := json.NewDecoder(r.Body)
	params := Params{}

	err := decoder.Decode(&params)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	ctx := r.Context()

	// Checks if the product has been scanned previously, if not then it stores it in the DB
	// both set the information to the product variable
	product, err := cfg.DB.GetProductByProductCode(ctx, params.ProductCode)
	if err != nil {
		product, err = cfg.DB.AddProduct(ctx, database.AddProductParams{
			ID:          uuid.New(),
			ProductName: params.ProductName,
			Description: sql.NullString{String: params.Description, Valid: params.Description != ""},
			Brand:       sql.NullString{String: params.Brand, Valid: params.Brand != ""},
			ProductCode: params.ProductCode,
			CreatedAt:   time.Now().UTC(),
			UpdatedAt:   time.Now().UTC(),
		})
		if err != nil {
			RespondWithError(w, http.StatusBadRequest, "unable to find or add product")
			return
		}
	}

	// Checks if the user has scanned the product before
	previousScannedProduct, err := cfg.DB.GetScanByUserAndProductID(ctx, database.GetScanByUserAndProductIDParams{
		UserID:    user.ID,
		ProductID: product.ID,
	})
	// if the user has not scanned bofore, adds a new product scan for that user
	if err != nil {
		dbProductScanned, err := cfg.DB.AddProductScan(ctx, database.AddProductScanParams{
			ID:        uuid.New(),
			ProductID: product.ID,
			UserID:    user.ID,
			Quantity:  int32(params.Quantity),
		})
		if err != nil {
			RespondWithError(w, http.StatusBadRequest, "unable to add product scan")
			return
		}

		scanResponse := dbProductScanToProductScanResponse(dbProductScanned)

		RespondWithJSON(w, http.StatusOK, scanResponse)
		return
	}
	// If previously scanned then it adds the new quantity to the old quantity
	newQuantity := previousScannedProduct.Quantity + int32(params.Quantity)
	updatedProduct, err := cfg.DB.UpdateScanQuantity(ctx, database.UpdateScanQuantityParams{
		Quantity: newQuantity,
		ID:       previousScannedProduct.ID,
	})

	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "unable to update product quantity")
		return
	}

	scanResponse := dbProductScanToProductScanResponse(updatedProduct)
	RespondWithJSON(w, http.StatusOK, scanResponse)
}
