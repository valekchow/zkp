# ZKP Circulating Supply API

Auto-calculates $ZKP circulating supply based on the vesting schedule for CoinMarketCap integration.

## Endpoints

| Endpoint | Response | Description |
|---|---|---|
| `/circulating-supply` | `201666667` | Current circulating supply (plain number) — **submit this to CMC** |
| `/total-supply` | `1000000000` | Total supply (plain number) |
| `/max-supply` | `1000000000` | Max supply (plain number) |
| `/supply-details` | JSON | Detailed breakdown with per-category unlock status |

## Vesting Logic

Based on TGE date: **December 19, 2025**

| Category | Allocation | Schedule |
|---|---|---|
| Community | 48.5% (485M) | 12.5% at TGE + 6% over 3 months + 30% over 5 years |
| Early Investors | 22.5% (225M) | 12-month cliff → 18-month linear |
| Core Contributors | 14% (140M) | 24-month cliff → 24-month linear |
| DAO Treasury | 10% (100M) | 5-year linear |
| Liquidity | 5% (50M) | 100% at TGE |

## Deploy to Vercel

### Option 1: CLI
```bash
npm i -g vercel
cd zkp-supply-api
vercel
```

### Option 2: GitHub
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import your repo
3. Deploy (zero config needed)

## Submit to CoinMarketCap

After deployment, submit your endpoint URL to CMC:

1. Go to: https://support.coinmarketcap.com/hc/en-us/requests/new
2. Select "Supply Circulating" as request type
3. Provide:
   - **Project**: zkPass ($ZKP)
   - **Circulating Supply API**: `https://your-domain.vercel.app/circulating-supply`
   - **Total Supply API**: `https://your-domain.vercel.app/total-supply`
   - **Max Supply API**: `https://your-domain.vercel.app/max-supply`
4. Explain the vesting calculation logic

CMC will review and start polling your endpoint periodically.
