const TOTAL_SUPPLY = 1_000_000_000;
const TGE_DATE = new Date("2025-12-19T12:00:00Z");

function fullMonthsSinceTGE(now) {
  if (now < TGE_DATE) return 0;
  let months = (now.getUTCFullYear() - TGE_DATE.getUTCFullYear()) * 12
    + (now.getUTCMonth() - TGE_DATE.getUTCMonth());
  if (now.getUTCDate() < TGE_DATE.getUTCDate()) months -= 1;
  return Math.max(0, months);
}

function calculateCirculatingSupply(now = new Date()) {
  const months = fullMonthsSinceTGE(now);
  const beforeTGE = now < TGE_DATE;

  const community = Math.min(125000000 + Math.min(months,3)*20000000 + Math.min(months,60)*5000000, 485000000);
  const earlyInvestors = months >= 12 ? Math.min(Math.floor(Math.min(months-12,18)*225000000/18), 225000000) : 0;
  const coreContributors = months >= 24 ? Math.min(Math.floor(Math.min(months-24,24)*140000000/24), 140000000) : 0;
  const daoTreasury = months > 0 ? Math.min(Math.floor(Math.min(months,60)*100000000/60), 100000000) : 0;
  const liquidity = beforeTGE ? 0 : 50000000;

  return Math.floor(community + earlyInvestors + coreContributors + daoTreasury + liquidity);
}

export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).send(calculateCirculatingSupply().toString());
}
