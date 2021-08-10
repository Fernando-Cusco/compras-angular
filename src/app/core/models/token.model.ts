export interface Token {
    jti: string;
    sub: string;
    authorities: string[];
    iat: number;
    exp: number;
}