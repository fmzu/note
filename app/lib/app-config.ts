export const appConfig = {
  /**
   * アクセストークン
   */
  accessTokenExpiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
  /**
   * リフレッシュトークン
   */
  refreshTokenExpiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 14,
}
