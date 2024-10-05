package main

import (
	// "fmt"
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/ds1242/highland-cow/internal/database"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type apiConfig struct {
	DB        *database.Queries
	JWTSecret string
}

func main() {
	godotenv.Load()

	jwtSecret := os.Getenv("JWT_SECRET")
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("PORT environment variable is not set")
	}

	dbURL := os.Getenv("CONNECTION_STRING")
	if dbURL == "" {
		log.Fatal("no db connection environment variable set")
	}

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatal("unable to open db")
	}

	dbQueries := database.New(db)

	cfg := &apiConfig{
		DB:        dbQueries,
		JWTSecret: jwtSecret,
	}

	mux := http.NewServeMux()

	// Health/Error test routes
	mux.HandleFunc("GET /v1/healthz", healthzHandler)
	mux.HandleFunc("GET /v1/err", errorHealthHandler)

	// User Routes
	mux.HandleFunc("POST /v1/users", cfg.handlerUsersCreate)
	mux.HandleFunc("GET /v1/users", cfg.handlerUserLogin)
	mux.HandleFunc("PUT /v1/users", cfg.middlewareAuth(cfg.handlerUserUpdate))
	mux.HandleFunc("DELETE /v1/users", cfg.middlewareAuth(cfg.handlerUserDelete))

	// Product Routes
	mux.HandleFunc("POST /v1/scan_product", cfg.middlewareAuth(cfg.handlerScanProduct))

	// User Scan Feed
	mux.HandleFunc("GET /v1/user_scans", cfg.middlewareAuth(cfg.handlerGetUserScanList))

	srv := &http.Server{
		Addr:    ":" + port,
		Handler: mux,
	}

	log.Printf("Serving on port: %s\n", port)
	log.Fatal(srv.ListenAndServe())

}
