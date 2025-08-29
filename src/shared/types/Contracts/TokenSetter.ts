export interface TokenSetter {
    /**
     * Store the application request token
     */
    setToken(token: string): this;
}
