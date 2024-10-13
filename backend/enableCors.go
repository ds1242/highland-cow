package main

import (
	"net/http"
)


func enableCors(w http.ResponseWriter) {
    // Allow any client to access resources
    w.Header().Set("Access-Control-Allow-Origin", "*")
    // Allow the specified methods
    w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    // Allow the specified headers
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
}
