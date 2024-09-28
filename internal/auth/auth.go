package auth

import (
	"strings"
	"errors"
	"time"

	"golang.org/x/crypto/bcrypt"
	"github.com/golang-jwt/jwt/v5"
)



func VerifyToken(authString string) (string, error) {
	
	splitAuth := strings.Split(authString, " ")
	if len(splitAuth) < 2 || splitAuth[0] != "Bearer" {
		return "", errors.New("malformed authorization header")
	}

	return splitAuth[1], nil
}

func HashPassword(password string) (string, error) {
	passHash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(passHash), nil
}

func CheckPasswordHash(password, hash string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if err != nil {
		return err
	}
	return nil
}

func CreateToken(id string, expiresInSeconds int, jwtSecret string) (string, error) {
	// Set time values for claims
	currentTime := time.Now().UTC()
	expirationTime := time.Now().Add(time.Duration(expiresInSeconds) * time.Second).UTC()

	// create claims
	claim := UserClaim {
		jwt.RegisteredClaims{
			Issuer: "highland cow",
			IssuedAt: jwt.NewNumericDate(currentTime),
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			Subject: id,
		},
	}

	// Create the token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)

	// Sign the token with the secret string
	signedString, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		return "", err
	}

	return signedString, nil
}


