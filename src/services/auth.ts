import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import UserLoginDto from "../dtos/users/UserLoginDto";
import 'dotenv/config'

const JWT_SECRET = process.env.JWT_SECRET
const JWT_AUTH_EXPIRATION_MINUTES= 10
const JWT_REFRESH_EXPIRATION_MINUTES = 60
export interface AuthAndRefreshTokens {
    authToken: string;
    refreshToken: string;
}

export async function usernamePasswordLogin(payloadPassword: string, userPersistedPassword: string): Promise<boolean> {
    return bcrypt.compareSync(payloadPassword, userPersistedPassword)
}

export class Auth {
    static async usernamePasswordLogin(payloadPassword: string, userPersistedPassword: string): Promise<boolean> {
        return bcrypt.compareSync(payloadPassword, userPersistedPassword)
    }

    static async signAuthAndRefreshTokens(user: UserLoginDto): Promise<AuthAndRefreshTokens> {
        const authTokenPayload = {
            type: 'auth',
            user: user,
        }
        const authToken = jwt.sign(authTokenPayload, JWT_SECRET, {expiresIn: JWT_AUTH_EXPIRATION_MINUTES * 60})

        const refreshTokenPayload = {
            type: 'refresh',
            user: user
        }
        const refreshToken = jwt.sign(refreshTokenPayload, JWT_SECRET, {expiresIn: JWT_REFRESH_EXPIRATION_MINUTES * 60})

        return {
            authToken: authToken,
            refreshToken: refreshToken
        }
    }

    static async verifyAuthToken(authToken: string, refreshToken: string): Promise<boolean>{
        try {
            const decodedAuth = jwt.verify(authToken, JWT_SECRET)
            return decodedAuth
        } catch {
            const decodedRefresh = jwt.verify(refreshToken, JWT_SECRET)
            
        }
    }

}