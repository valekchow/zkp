const TOTAL_SUPPLY = 1_000_000_000;
const TGE_DATE = new Date("2025-12-19T12:00:00Z");

function fullMonthsSinceTGE(now) {
  if (now < TGE_DATE) return 0;
  let months = (now.getUTCFullYear() - TGE_DATE.getUTCFullYear()) * 12
    + (now.getUTCMonth() - TGE_DATE.getUTCMonth());
  if (now.getUTCDate() < TGE_DATE.getUTCDate()) months -= 1;
  return Math.max(0, months);
}

export default function handler(req, res) {
  const now = new Date();
  const months = fullMonthsSinceTGE(now);
  const beforeTGE = now < TGE_DATE;

  const community_tge = 125000000;
  const community_3m = Math.min(months, 3) * 20000000;
  const community_5y = Math.min(months, 60) * 5000000;
  const community = Math.min(community_tge + community_3m + community_5y, 485000000);

  let earlyInvestors = 0;
  if (months >= 12) earlyInvestors = Math.min(Math.floor(Math.min(months-12,18)*225000000/18), 225000000);

  let coreContributors = 0;
  if (months >= 24) coreContributors = Math.min(Math.floor(Math.min(months-24,24)*140000000/24), 140000000);

  let daoTreasury = months > 0 ? Math.min(Math.floor(Math.min(months,60)*100000000/60), 100000000) : 0;
  const liquidity = beforeTGE ? 0 : 50000000;
  const total = Math.floor(community + earlyInvestors + coreContributors + daoTreasury + liquidity);

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.status(200).json({
    timestamp: now.toISOString(),
    tge_date: TGE_DATE.toISOString(),
    months_since_tge: months,
    total_supply: TOTAL_SUPPLY,
    circulating_supply: total,
    circulating_pct: Math.round((total / TOTAL_SUPPLY) * 10000) / 100,
    breakdown: {
      community: { unlocked: community, of: 485000000 },
      early_investors: { unlocked: earlyInvestors, of: 225000000 },
      core_contributors: { unlocked: coreContributors, of: 140000000 },
      dao_treasury: { unlocked: daoTreasury, of: 100000000 },
      liquidity: { unlocked: liquidity, of: 50000000 }
    }
  });
}
