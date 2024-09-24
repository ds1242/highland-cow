package main

import (
	"net/http"
)

func healthzHandler(w http.ResponseWriter, r *http.Request) {
	RespondWithJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func errorHealthHandler(w http.ResponseWriter, r *http.Request) {
	RespondWithJSON(w, http.StatusInternalServerError, map[string]string{"error": "Interal Server Error"})
}