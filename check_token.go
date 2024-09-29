package main

import(
	"fmt"

	"github.com/golang-jwt/jwt/v5"
	"github.com/ds1242/highland-cow/internal/auth"
)

func CheckToken(tokenString string, cfg *apiConfig) (*auth.UserClaim, error){
	claims := &auth.UserClaim{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(cfg.JWTSecret), nil
	})

	if err != nil {
		return nil, fmt.Errorf("error parsing token: %v", err)
	}

	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}
	// Return the claims if everything is valid
	return claims, nil
}