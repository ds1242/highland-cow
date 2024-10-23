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
	"github.com/rs/cors"
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
	mux.HandleFunc("POST /v1/login", cfg.handlerUserLogin)
	mux.HandleFunc("POST /v1/users", cfg.handlerUsersCreate)
	mux.HandleFunc("PUT /v1/users", cfg.middlewareAuth(cfg.handlerUserUpdate))
	mux.HandleFunc("DELETE /v1/users", cfg.middlewareAuth(cfg.handlerUserDelete))
	mux.HandleFunc("GET /v1/users", cfg.middlewareAuth(cfg.handlerGetUser))

	// Product Routes
	mux.HandleFunc("POST /v1/scan_product", cfg.middlewareAuth(cfg.handlerScanProduct))
	mux.HandleFunc("PUT /v1/scan_product", cfg.middlewareAuth(cfg.handlerUpdateScan))
	mux.HandleFunc("DELETE /v1/scan_product", cfg.middlewareAuth(cfg.handlerDeleteScan))

	// User Scan Feed
	mux.HandleFunc("GET /v1/user_scans", cfg.middlewareAuth(cfg.handlerGetUserScanList))

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"}, // Allow all origins, specify for production
		AllowedMethods:   []string{"GET", "POST", "OPTIONS", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	handler := c.Handler(mux)

	srv := &http.Server{
		Addr:    ":" + port,
		Handler: handler,
	}

	log.Printf("Serving on port: %s\n", port)
	log.Fatal(srv.ListenAndServeTLS("./localhost+2.pem", "./localhost+2-key.pem"))

}
