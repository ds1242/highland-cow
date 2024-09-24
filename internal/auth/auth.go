package auth

import (
	"strings"
	"errors"

	"golang.org/x/crypto/bcrypt"
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

// func CheckPasswordHash(password, hash string) error {

// }