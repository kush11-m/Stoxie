export async function GET(request) {
  const symbols = ["RELIANCE.BSE", "TCS.BSE", "INFY.BSE", "HDFCBANK.BSE", "ICICIBANK.BSE"];
  const apiKey = "JGLGCYO9TNQVFROX";
  const results = {};

  for (const symbol of symbols) {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      results[symbol] = data["Global Quote"];
      // Alpha Vantage free tier: 5 requests/minute
      await new Promise(r => setTimeout(r, 15000)); // Wait 15s between requests
    } catch (err) {
      results[symbol] = { error: "Fetch error" };
    }
  }

  return new Response(JSON.stringify(results), { status: 200 });
} 