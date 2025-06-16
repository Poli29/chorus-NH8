export async function runChorusEngine(buffer: Buffer) {
  // MOCKED response
  return {
    finalVerdict: "✅ BUY READY (92% Confidence)",
    buyVerdict: "✅ READY",
    buyScore: 92,
    buyCont: "✅ Yes",
    buyComment: "Clean continuation + BOS + OB return + rejection",
    sellVerdict: "❌ BLOCKED",
    sellScore: 21,
    sellCont: "❌ No",
    sellComment: "No sweep, no CHoCH, no return, trend flipped",
    ptlmBuy: "✅", ptlmSell: "❌", ptlmNotes: "[Sweep → CHoCH → OB → BOS]",
    sbBuy: "✅", sbSell: "❌", sbNotes: "[0.5 bounce]",
    amalBuy: "✅", amalSell: "❌", amalNotes: "[Fair Value Gap alignment]",
    narrativeBuy: "✅", narrativeSell: "❌", narrativeNotes: "[HTF confluence]",
    stopLoss: "13.5",
    takeProfit: "40.5",
    riskReward: "1:3",
    htfBias: "BULLISH",
    guardComment: "Within safe RR range for prop rules.",
    sweep: "✅",
    choch: "✅",
    return: "✅",
    rejection: "Strong wick + engulf",
    bos: "Confirmed",
    tradeLog: "Entry taken at OB retest after CHoCH. SL/TP set. Waiting result."
  };
}