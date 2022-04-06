import { ChainId, Token } from '@pancakeswap/sdk'

export const APP_ENV = process.env.REACT_APP_ENV

export const ROOT_API = process.env.REACT_APP_API
export const ROOT_DOMAIN = process.env.REACT_APP_DOMAIN
export const BASE_BSC_SCAN_URL = process.env.REACT_APP_BINANCE_API
export const ROOT_API_TIMEOUT = process.env.REACT_APP_API_TIMEOUT

// Base contract
export const SMART_CONTRACT = process.env.REACT_APP_CONTRACT || 'notnull'
export const TOKEN_CONTRACT = process.env.REACT_APP_TOKEN_CONTRACT || 'notnull'
export const TOKEN_CONTRACT_NFT = process.env.REACT_APP_TOKEN_CONTRACT_NFT || 'notnull'

export const BASE_TOKEN = new Token(ChainId.MAINNET, TOKEN_CONTRACT, 18, 'Zuki', 'Zuki Moba')

// Github
export const PRIVATE_KEY_GITHUB = process.env.REACT_APP_GITHUB_PRIVATE_KEY
export const ENV_GIT_ORGANIZATION = process.env.REACT_APP_ORGANIZATION
export const ENV_GIT_REPOS = process.env.REACT_APP_REPOS
export const ENV_GIT_ROOT_FOLDER = process.env.REACT_APP_ROOT_FOLDER
export const ENV_GIT_FILENAME_CONFIG = process.env.REACT_APP_FILENAME_CONFIG

/** Cache key */
export const NetworkContextName = 'NETWORK'
