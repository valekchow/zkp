// ZKP Circulating Supply API for CoinMarketCap
// Total Supply: 1,000,000,000 ZKP
// TGE Date: December 19, 2025 12:00 UTC
// Vesting: discrete monthly unlocks

const TOTAL_SUPPLY = 1_000_000_000;
const TGE_DATE = new Date("2025-12-19T12:00:00Z");

function fullMonthsSinceTGE(now) {
  if (now < TGE_DATE) return 0;
  let months = (now.getUTCFullYear() - TGE_DATE.getUTCFullYear()) * 12
    + (now.getUTCMonth() - TGE_DATE.getUTCMonth());
  if (now.getUTCDate() < TGE_DATE.getUTCDate()) {
    months -= 1;
  }
  return Math.max(0, months);
}

function calculateCommunity(months) {
  const total = 485_000_000;
  const tge = 125_000_000;
  let unlocked = tge;
  unlocked += Math.min(months, 3) * 20_000_000;   // 6% over 3 months
  unlocked += Math.min(months, 60) * 5_000_000;    // 30% over 60 months
  return Math.min(unlocked, total);
}

function calculateEarlyInvestors(months) {
  const total = 225_000_000;
  if (months < 12) return 0;
  const vm = Math.min(months - 12, 18);
  return Math.min(Math.floor(vm * total / 18), total);
}

function calculateCoreContributors(months) {
  const total = 140_000_000;
  if (months < 24) return 0;
  const vm = Math.min(months - 24, 24);
  return Math.min(Math.floor(vm * total / 24), total);
}

function calculateDaoTreasury(months) {
  const total = 100_000_000;
  if (months <= 0) return 0;
  return Math.min(Math.floor(Math.min(months, 60) * total / 60), total);
}

function calculateLiquidity(beforeTGE) {
  return beforeTGE ? 0 : 50_000_000;
}

function calculateCirculatingSupply(now = new Date()) {
  const months = fullMonthsSinceTGE(now);
  const beforeTGE = now < TGE_DATE;
  return Math.floor(
    calculateCommunity(months) +
    calculateEarlyInvestors(months) +
    calculateCoreContributors(months) +
    calculateDaoTreasury(months) +
    calculateLiquidity(beforeTGE)
  );
}

export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).send(calculateCirculatingSupply().toString());
}
