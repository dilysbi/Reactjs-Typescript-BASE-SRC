export interface PetInfo {
  name: string
  cover: string
}
export interface Attributes {
  trait_type: string
  value: string
  display_type: string
  value_date: string
}
export interface NFTInfo {
  id: number
  token_id: string
  name: string
  owner: string
  price: number
  status: number
  image: string
  attributes: Attributes[]
}

export interface Levels {
  [name: string]: PetInfo
}
export interface CollectionLevelGithub {
  attribute: Attributes[]
  levels: Levels[]
}
