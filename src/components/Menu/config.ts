import { MenuEntry } from 'zuki-libs-uikit'

/**
 * label: string
 * icon: svg
 * href: https || /path || 'function'
 * calloutClass: 'rainbow' || className => background rainbow and custom css
 * initialOpenState: true || false
 * items: array sample parent
 * att: attach => text || icon.png
 */

// export const config: MenuEntry[] = [
//   {
//     label: 'Shop',
//     icon: 'ShopIcon',
//     href: `/shop`,
//   },
//   {
//     label: 'My NFTs',
//     href: `/my-nfts`,
//     icon: 'MarketplaceIcon',
//   },
// ]

export const config: MenuEntry[] = [
  {
    label: 'Farming',
    icon: 'https://zuki-moba.s3.ap-southeast-1.amazonaws.com/icon/farm.svg',
    items: [
      {
        label: 'LPs Zuki/BNB',
        href: 'https://zuki-farm-lp-dev.ufin.uk/lps-zuki-bnb-new',
      },
      {
        label: 'LPs Zuki/BUSD',
        href: 'https://zuki-farm-lp-dev.ufin.uk/lps-zuki-busd',
      },
      {
        label: 'LPs Zuki/USDT',
        href: 'https://zuki-farm-lp-dev.ufin.uk/lps-zuki-usdt',
      },
      {
        label: 'LPs Zuki/BNB End',
        href: 'https://zuki-farm-lp-dev.ufin.uk/lps-zuki-bnb',
      },
    ],
  },
  {
    label: 'ZP Shop',
    icon: 'https://zuki-moba.s3.ap-southeast-1.amazonaws.com/icon/shop.svg',
    href: 'https://zuki-shop-dev.ufin.uk/zp',
  },
  {
    label: 'YGG Shop',
    icon: 'https://zuki-moba.s3.ap-southeast-1.amazonaws.com/icon/shop.svg',
    href: 'https://zuki-shop-dev.ufin.uk/ygg',
  },
  {
    label: 'Auction',
    icon: 'https://zuki-moba.s3.ap-southeast-1.amazonaws.com/icon/auction.svg',
    items: [
      {
        label: 'Create Auction',
        href: 'https://zuki-auction-dev.ufin.uk/create-auction',
      },
      {
        label: 'All Auction',
        href: 'https://zuki-auction-dev.ufin.uk/all-auction?v=all',
      },
      {
        label: 'Auction History',
        href: 'https://zuki-auction-dev.ufin.uk/auction-history',
      },
    ],
  },
  {
    label: 'Marketplace',
    icon: 'https://zuki-moba.s3.ap-southeast-1.amazonaws.com/icon/market.svg',
    items: [
      {
        label: 'Market',
        href: 'https://zuki-market-dev.ufin.uk/market',
      },
      {
        label: 'Hero Market',
        href: 'https://zuki-market-dev.ufin.uk/market?sort_type=ASC&class_id=1',
      },
      {
        label: 'Piece Market',
        href: 'https://zuki-market-dev.ufin.uk/market?sort_type=ASC&class_id=3',
      },
      {
        label: 'History',
        href: 'https://zuki-market-dev.ufin.uk/history',
      },
    ],
  },
  {
    label: 'My NFTs',
    icon: 'https://zuki-moba.s3.ap-southeast-1.amazonaws.com/icon/mynft.svg',
    href: 'https://zuki-market-dev.ufin.uk/my-nfts',
  },
]

export default config
