const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const FACTORY_ADDRESS = "0xA47b0dc19F0Cb41BA80370B175C0Bdd4509D6E61";

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)"
];

const FACTORY_ABI = [
  "function getMarkets() external view returns (address[] memory)",
  "function getMarketsCount() external view returns (uint256)",
  "function createMarket(string _title, string _description, string _resolutionSource, uint256 _expirationTime, address _oracle) external returns (address)",
  "function owner() external view returns (address)"
];

const MARKET_ABI = [
  "function details() external view returns (string title, string description, string resolutionSource, uint256 expirationTime, bool resolved, bool yesWins)",
  "function totalYesShares() external view returns (uint256)",
  "function totalNoShares() external view returns (uint256)",
  "function totalUsdcLocked() external view returns (uint256)",
  "function buyShares(uint256 _usdcAmount, bool _buyYes) external",
  "function claimPayout() external",
  "function userYesShares(address) external view returns (uint256)",
  "function userNoShares(address) external view returns (uint256)",
  "function userInvestedUsdc(address) external view returns (uint256)",
  "function oracleAddress() external view returns (address)",
  "function resolveMarket(bool _yesWins) external"
];

// Base Builder ERC-8021 Suffix Config
const BUILDER_CODE = "bc_le2xu9dm";
const ENCODED_BUILDER_SUFFIX = "0x62635f6c6532787539646d0b0080218021802180218021802180218021";

const STATE = {
  walletConnected: false,
  walletAddress: '',
  walletProvider: '',
  usdcBalance: 0,
  currentView: 'dashboard',
  selectedMarketId: null,
  activeTradeType: 'YES',
  
  markets: [
    {
      id: 1,
      title: "Will OpenAI release GPT-5 before December 2026?",
      category: "AI",
      description: "This market resolves to YES if OpenAI officially releases its next-generation frontier model, explicitly named 'GPT-5', to public users on or before December 31, 2026. Otherwise, resolves to NO.",
      resolution: "Official announcements from OpenAI.",
      yesPrice: 0.65,
      history: [0.50, 0.52, 0.48, 0.55, 0.53, 0.58, 0.62, 0.60, 0.65],
      comments: [
        { author: "SamFan", text: "With GPT-4o out, I think GPT-5 is coming late 2025 or early 2026.", time: "10:15 AM" }
      ]
    },
    {
      id: 2,
      title: "Will Base exceed 10 million daily active addresses in 2026?",
      category: "Crypto",
      description: "Resolves to YES if the daily active address count on Base Mainnet exceeds 10,000,000 as reported by GrowTheL1 or Dune Analytics.",
      resolution: "Dune Analytics dashboard metrics.",
      yesPrice: 0.42,
      history: [0.35, 0.38, 0.40, 0.45, 0.43, 0.39, 0.41, 0.42],
      comments: []
    },
    {
      id: 3,
      title: "Will SpaceX successfully catch a Starship Booster in its next orbital launch?",
      category: "Global",
      description: "Resolves to YES if SpaceX successfully catches the Super Heavy booster back at the launch tower.",
      resolution: "SpaceX live launch stream.",
      yesPrice: 0.78,
      history: [0.60, 0.65, 0.70, 0.72, 0.75, 0.76, 0.78],
      comments: []
    },
    {
      id: 4,
      title: "Will the US pass a comprehensive Stablecoin Bill in 2026?",
      category: "Politics",
      description: "Resolves to YES if the US Senate and House pass a dedicated stablecoin regulatory framework that is signed into law before Dec 31, 2026.",
      resolution: "Congress.gov legislative tracker.",
      yesPrice: 0.35,
      history: [0.20, 0.25, 0.30, 0.32, 0.35],
      comments: []
    },
    {
      id: 5,
      title: "Will Donald Trump pardon Silk Road founder Ross Ulbricht?",
      category: "Politics",
      description: "Resolves to YES if Ross Ulbricht receives a presidential pardon or commutation.",
      resolution: "Official White House press releases.",
      yesPrice: 0.85,
      history: [0.50, 0.60, 0.70, 0.80, 0.85],
      comments: []
    },
    {
      id: 6,
      title: "Will Bitcoin hit $200,000 before January 2027?",
      category: "Crypto",
      description: "Resolves to YES if Bitcoin (BTC) reaches or exceeds $200,000 USD on any major exchange (Coinbase, Binance, or Kraken) before January 1, 2027.",
      resolution: "Coinbase BTC/USD price feed.",
      yesPrice: 0.48,
      history: [0.30, 0.35, 0.38, 0.42, 0.45, 0.48],
      comments: []
    },
    {
      id: 7,
      title: "Will Argentina win the 2026 FIFA World Cup?",
      category: "Sports",
      description: "Resolves to YES if Argentina wins the 2026 FIFA World Cup hosted in the USA, Canada, and Mexico. The tournament runs from June to July 2026.",
      resolution: "Official FIFA World Cup 2026 results.",
      yesPrice: 0.22,
      history: [0.18, 0.20, 0.21, 0.22],
      comments: [
        { author: "LionelFan", text: "Messi's last chance at back-to-back wins. I'm in!", time: "9:00 AM" }
      ]
    },
    {
      id: 8,
      title: "Will Ethereum flip Bitcoin in market cap by 2028?",
      category: "Crypto",
      description: "Resolves to YES if Ethereum's total market capitalization exceeds Bitcoin's total market capitalization at any point before December 31, 2028.",
      resolution: "CoinGecko market cap data.",
      yesPrice: 0.18,
      history: [0.10, 0.12, 0.15, 0.17, 0.18],
      comments: []
    },
    {
      id: 9,
      title: "Will the 2026 World Cup have over 5 million total attendance?",
      category: "Sports",
      description: "Resolves to YES if the total in-stadium attendance across all 2026 FIFA World Cup matches exceeds 5,000,000 fans. With 48 teams and 104 matches this is highly likely.",
      resolution: "Official FIFA attendance report post-tournament.",
      yesPrice: 0.82,
      history: [0.70, 0.75, 0.78, 0.80, 0.82],
      comments: []
    },
    {
      id: 10,
      title: "Will any AI model score above 90% on the ARC-AGI benchmark by 2027?",
      category: "AI",
      description: "Resolves to YES if any publicly available AI model achieves a score of 90% or higher on the official ARC-AGI benchmark evaluation before January 1, 2027.",
      resolution: "Official ARC Prize leaderboard at arcprize.org.",
      yesPrice: 0.55,
      history: [0.20, 0.28, 0.35, 0.42, 0.50, 0.55],
      comments: [
        { author: "AGIWatcher", text: "With o3 already at 87.5%, this is very achievable.", time: "11:30 AM" }
      ]
    },
    {
      id: 11,
      title: "Will Solana's SOL token reach $500 before 2027?",
      category: "Crypto",
      description: "Resolves to YES if the price of Solana (SOL) reaches or exceeds $500 USD on any major exchange (Coinbase, Binance, or Kraken) before January 1, 2027.",
      resolution: "Coinbase SOL/USD price feed.",
      yesPrice: 0.38,
      history: [0.20, 0.25, 0.30, 0.33, 0.36, 0.38],
      comments: []
    },
    {
      id: 12,
      title: "Will Google release Gemini Ultra 2.0 publicly in 2026?",
      category: "AI",
      description: "Resolves to YES if Google officially releases a model branded as Gemini Ultra 2.0 (or equivalent next-gen flagship) to the general public before December 31, 2026.",
      resolution: "Official Google DeepMind announcements.",
      yesPrice: 0.72,
      history: [0.45, 0.50, 0.58, 0.63, 0.68, 0.72],
      comments: [
        { author: "DeepMindWatcher", text: "Gemini 2.0 Flash is already out, Ultra is next.", time: "2:00 PM" }
      ]
    },
    {
      id: 13,
      title: "Will India win the 2026 ICC T20 World Cup?",
      category: "Sports",
      description: "Resolves to YES if the Indian cricket team wins the 2026 ICC Men's T20 World Cup tournament.",
      resolution: "Official ICC match results.",
      yesPrice: 0.30,
      history: [0.25, 0.27, 0.29, 0.30],
      comments: []
    },
    {
      id: 14,
      title: "Will the US Federal Reserve cut interest rates 3+ times in 2026?",
      category: "Politics",
      description: "Resolves to YES if the Federal Reserve makes 3 or more interest rate cuts (each of at least 25bps) during calendar year 2026.",
      resolution: "Federal Reserve official FOMC announcements.",
      yesPrice: 0.44,
      history: [0.55, 0.50, 0.48, 0.45, 0.44],
      comments: []
    },
    {
      id: 15,
      title: "Will XRP win its SEC lawsuit completely by end of 2026?",
      category: "Crypto",
      description: "Resolves to YES if a US court issues a final ruling fully in Ripple's favor in the SEC vs Ripple case, with no further appeals pending, before December 31, 2026.",
      resolution: "US federal court public records and SEC official statements.",
      yesPrice: 0.60,
      history: [0.30, 0.40, 0.50, 0.55, 0.58, 0.60],
      comments: [
        { author: "XRPArmy", text: "The appeal is almost over. Ripple wins!", time: "3:45 PM" }
      ]
    },
    {
      id: 16,
      title: "Will a humanoid robot be deployed in a mainstream factory by 2027?",
      category: "AI",
      description: "Resolves to YES if any company (Tesla Optimus, Figure AI, Agility, etc.) publicly deploys 100+ humanoid robots in a single non-demo production factory setting before January 1, 2027.",
      resolution: "Official company press releases and verified news reporting.",
      yesPrice: 0.62,
      history: [0.20, 0.30, 0.40, 0.50, 0.58, 0.62],
      comments: []
    },
    {
      id: 17,
      title: "Will Donald Trump be impeached during his second term?",
      category: "Politics",
      description: "Resolves to YES if the US House of Representatives passes articles of impeachment against President Donald Trump during his second term (2025–2029).",
      resolution: "Official US House of Representatives records.",
      yesPrice: 0.12,
      history: [0.08, 0.10, 0.11, 0.12],
      comments: []
    },
    {
      id: 18,
      title: "Will Manchester City win the 2025/26 UEFA Champions League?",
      category: "Sports",
      description: "Resolves to YES if Manchester City FC wins the UEFA Champions League title in the 2025/26 season.",
      resolution: "Official UEFA Champions League results.",
      yesPrice: 0.16,
      history: [0.12, 0.14, 0.15, 0.16],
      comments: []
    },
    {
      id: 19,
      title: "Will Ethereum ETF see $10B+ inflows in 2026?",
      category: "Crypto",
      description: "Resolves to YES if the cumulative net inflows into all US-listed Ethereum spot ETFs exceed $10 billion USD in calendar year 2026.",
      resolution: "Bloomberg ETF flow data and official SEC filings.",
      yesPrice: 0.50,
      history: [0.25, 0.32, 0.38, 0.44, 0.48, 0.50],
      comments: []
    },
    {
      id: 20,
      title: "Will OpenAI remain private (not IPO) through 2026?",
      category: "AI",
      description: "Resolves to YES if OpenAI does NOT complete an Initial Public Offering (IPO) or direct listing on a public stock exchange by December 31, 2026.",
      resolution: "SEC filings and official OpenAI announcements.",
      yesPrice: 0.67,
      history: [0.80, 0.75, 0.72, 0.68, 0.67],
      comments: [
        { author: "VCTracker", text: "With the restructuring, an IPO seems closer than ever.", time: "4:30 PM" }
      ]
    },
    {
      id: 21,
      title: "Will North Korea conduct a nuclear test in 2026?",
      category: "Global",
      description: "Resolves to YES if North Korea conducts a confirmed nuclear weapons test detected by international monitoring organizations (CTBTO) in calendar year 2026.",
      resolution: "CTBTO Preparatory Commission official announcements.",
      yesPrice: 0.20,
      history: [0.15, 0.17, 0.18, 0.20],
      comments: []
    },
    {
      id: 22,
      title: "Will Lionel Messi retire from professional football by 2027?",
      category: "Sports",
      description: "Resolves to YES if Lionel Messi officially announces his retirement from professional club football before January 1, 2027.",
      resolution: "Official announcements from Messi or his club Inter Miami.",
      yesPrice: 0.35,
      history: [0.20, 0.25, 0.28, 0.32, 0.35],
      comments: [
        { author: "FootballFan", text: "He's still performing at a high level at Inter Miami.", time: "1:15 PM" }
      ]
    },
    {
      id: 23,
      title: "Will a country officially adopt Bitcoin as legal tender in 2026?",
      category: "Crypto",
      description: "Resolves to YES if any sovereign nation officially passes legislation or executive order making Bitcoin legal tender within its borders during 2026 (beyond El Salvador).",
      resolution: "Official government announcements and verified legal documents.",
      yesPrice: 0.25,
      history: [0.15, 0.18, 0.20, 0.23, 0.25],
      comments: []
    },
    {
      id: 24,
      title: "Will there be a major AI-caused cybersecurity incident in 2026?",
      category: "AI",
      description: "Resolves to YES if a cyberattack publicly attributed to AI-generated malware or AI-assisted hacking causes verifiable damages exceeding $500M to a government or Fortune 500 company in 2026.",
      resolution: "Official government cybersecurity reports and verified news sources.",
      yesPrice: 0.45,
      history: [0.25, 0.30, 0.35, 0.40, 0.43, 0.45],
      comments: []
    },
    {
      id: 25,
      title: "Will global CO2 emissions peak and decline in 2026?",
      category: "Global",
      description: "Resolves to YES if the International Energy Agency (IEA) or IPCC confirms that global CO2 emissions in 2026 were lower than in 2025, marking a confirmed peak.",
      resolution: "IEA Global Energy Review annual report.",
      yesPrice: 0.28,
      history: [0.20, 0.22, 0.24, 0.26, 0.28],
      comments: []
    }
  ],
  positions: []

};

const LIQUIDITY_FACTOR = 15000;

// Dynamic on-chain market loader
async function loadMarketsFromChain() {
  try {
    const provider = window.ethereum ? new ethers.BrowserProvider(window.ethereum) : new ethers.JsonRpcProvider("https://mainnet.base.org");
    const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, provider);
    
    const marketAddresses = await factory.getMarkets();
    console.log("Loaded on-chain markets:", marketAddresses);
    
    if (marketAddresses.length === 0) {
      console.log("No on-chain markets found, keeping default mock markets.");
      return;
    }
    
    const loadedMarkets = [];
    for (let i = 0; i < marketAddresses.length; i++) {
      const addr = marketAddresses[i];
      const marketContract = new ethers.Contract(addr, MARKET_ABI, provider);
      
      const [title, description, resolutionSource, expirationTime, resolved, yesWins] = await marketContract.details();
      const totalYes = await marketContract.totalYesShares();
      const totalNo = await marketContract.totalNoShares();
      const totalLocked = await marketContract.totalUsdcLocked();
      const oracle = await marketContract.oracleAddress();
      
      const totalShares = Number(totalYes) + Number(totalNo);
      let yesPrice = 0.50;
      if (totalShares > 0) {
        yesPrice = Number(totalYes) / totalShares;
      }
      
      const commentsKey = `comments_${addr.toLowerCase()}`;
      const comments = JSON.parse(localStorage.getItem(commentsKey) || "[]");
      
      loadedMarkets.push({
        id: i + 1,
        address: addr,
        title,
        category: "Markets",
        description,
        resolution: resolutionSource,
        yesPrice,
        resolved,
        yesWins,
        oracleAddress: oracle,
        expirationTime: Number(expirationTime),
        totalYesShares: Number(ethers.formatUnits(totalYes, 6)),
        totalNoShares: Number(ethers.formatUnits(totalNo, 6)),
        totalUsdcLocked: Number(ethers.formatUnits(totalLocked, 6)),
        comments
      });
    }
    
    STATE.markets = loadedMarkets;
  } catch (error) {
    console.error("Error loading on-chain markets:", error);
  }
}

async function loadUserPositions() {
  if (!STATE.walletConnected || !STATE.walletAddress) {
    STATE.positions = [];
    return;
  }
  
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const activePositions = [];
    
    for (const market of STATE.markets) {
      if (!market.address) continue;
      const marketContract = new ethers.Contract(market.address, MARKET_ABI, provider);
      
      const yesShares = await marketContract.userYesShares(STATE.walletAddress);
      const noShares = await marketContract.userNoShares(STATE.walletAddress);
      const invested = await marketContract.userInvestedUsdc(STATE.walletAddress);
      
      const yesSharesFormatted = Number(ethers.formatUnits(yesShares, 6));
      const noSharesFormatted = Number(ethers.formatUnits(noShares, 6));
      const investedFormatted = Number(ethers.formatUnits(invested, 6));
      
      if (yesSharesFormatted > 0) {
        activePositions.push({
          marketId: market.id,
          marketAddress: market.address,
          option: 'YES',
          shares: yesSharesFormatted,
          avgPricePaid: yesSharesFormatted > 0 ? (investedFormatted / yesSharesFormatted) : 0.50,
          totalCost: investedFormatted
        });
      }
      if (noSharesFormatted > 0) {
        activePositions.push({
          marketId: market.id,
          marketAddress: market.address,
          option: 'NO',
          shares: noSharesFormatted,
          avgPricePaid: noSharesFormatted > 0 ? (investedFormatted / noSharesFormatted) : 0.50,
          totalCost: investedFormatted
        });
      }
    }
    
    STATE.positions = activePositions;
  } catch (error) {
    console.error("Error loading user positions:", error);
  }
}

async function createMarketOnChain() {
  if (!STATE.walletConnected) {
    showToast("Please connect your wallet first.", "error");
    return;
  }
  
  const title = document.getElementById('manual-title').value.trim();
  const category = document.getElementById('manual-category').value;
  const expDateStr = document.getElementById('manual-expiration').value;
  
  if (!title) {
    showToast("Please enter a market title.", "error");
    return;
  }
  
  try {
    showToast("Preparing to create market on-chain...", "info");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);
    
    // Parse expiration date to Unix timestamp (seconds)
    const expirationTimestamp = Math.floor(new Date(expDateStr).getTime() / 1000);
    
    const description = `This market resolves to YES if: ${title}. Category: ${category}.`;
    const resolutionSource = "Official public announcements and trusted news sources.";
    const oracleAddress = STATE.walletAddress; // Creator is the oracle by default
    
    showToast("Please confirm the transaction in your wallet...", "info");
    const tx = await factory.createMarket(
      title,
      description,
      resolutionSource,
      expirationTimestamp,
      oracleAddress
    );
    
    showToast("Transaction sent! Waiting for confirmation...", "info");
    await tx.wait();
    
    showToast("🎉 Market successfully created on Base!", "success");
    document.getElementById('manual-title').value = '';
    
    // Reload markets
    await loadMarketsFromChain();
    switchView('dashboard');
  } catch (error) {
    console.error(error);
    showToast(error.shortMessage || error.message || "Failed to create market.", "error");
  }
}

async function resolveMarketOnChain(marketAddress, yesWins) {
  try {
    showToast(`Resolving market as ${yesWins ? 'YES' : 'NO'}...`, "info");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    const market = new ethers.Contract(marketAddress, MARKET_ABI, signer);
    
    showToast("Confirm resolution in your wallet...", "info");
    const tx = await market.resolveMarket(yesWins);
    showToast("Transaction sent! Waiting for confirmation...", "info");
    await tx.wait();
    
    showToast(`🎉 Market successfully resolved as ${yesWins ? 'YES' : 'NO'}!`, "success");
    closeDrawer();
    
    // Reload state
    await loadMarketsFromChain();
    await loadUserPositions();
  } catch (error) {
    console.error(error);
    showToast(error.shortMessage || error.message || "Failed to resolve market.", "error");
  }
}

// Global claim payout helper
window.claimPayoutOnChain = async function(marketAddress) {
  try {
    showToast("Preparing payout claim...", "info");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    const market = new ethers.Contract(marketAddress, MARKET_ABI, signer);
    
    showToast("Confirm claim in your wallet...", "info");
    const tx = await market.claimPayout();
    showToast("Transaction sent! Waiting for confirmation...", "info");
    await tx.wait();
    
    showToast("🎉 Payout claimed successfully!", "success");
    
    // Reload USDC balance
    const usdc = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, signer);
    const rawBalance = await usdc.balanceOf(STATE.walletAddress);
    STATE.usdcBalance = parseFloat(ethers.formatUnits(rawBalance, 6));
    
    // Reload positions
    await loadUserPositions();
    updateWalletDisplay();
    renderPortfolio();
  } catch (error) {
    console.error(error);
    showToast(error.shortMessage || error.message || "Failed to claim payout.", "error");
  }
};

async function switchView(viewId) {
  STATE.currentView = viewId;
  document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  
  const activePanel = document.getElementById(`view-${viewId}`);
  if (activePanel) activePanel.classList.add('active');
  
  const activeNav = document.querySelector(`.nav-item[data-view="${viewId}"]`);
  if (activeNav) activeNav.classList.add('active');

  if (viewId === 'dashboard') {
    await loadMarketsFromChain();
    renderMarkets();
  }
  if (viewId === 'portfolio') {
    await loadUserPositions();
    renderPortfolio();
  }
}

function renderMarkets() {
  const container = document.getElementById('markets-container');
  if (!container) return;

  const searchQuery = document.getElementById('market-search').value.toLowerCase();
  const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');

  let filtered = STATE.markets.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery);
    const matchesCategory = activeCategory === 'all' || m.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  container.innerHTML = '';
  
  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">No markets found.</div>`;
    return;
  }

  filtered.forEach(market => {
    const card = document.createElement('div');
    card.className = 'market-card';
    
    const yesPriceFormatted = Math.round(market.yesPrice * 100);
    const noPriceFormatted = 100 - yesPriceFormatted;

    card.innerHTML = `
      <div onclick="openMarketDrawer(${market.id})">
        <h3 class="market-title">${market.title}</h3>
      </div>
      <div class="card-buttons">
        <button class="card-btn yes" onclick="openMarketDrawer(${market.id}, 'YES')">
          <span>Yes</span><span>${yesPriceFormatted}¢</span>
        </button>
        <button class="card-btn no" onclick="openMarketDrawer(${market.id}, 'NO')">
          <span>No</span><span>${noPriceFormatted}¢</span>
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function drawChart(history) {
  const svg = document.getElementById('svg-chart');
  if (!svg) return;
  svg.innerHTML = '';
  
  const width = 500;
  const height = 200;
  const padding = 20;
  
  const points = history.map((price, index) => {
    const x = padding + (index * (width - 2 * padding)) / (history.length - 1);
    const y = height - padding - (price * (height - 2 * padding));
    return { x, y };
  });
  
  // Create gradient defs
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
  gradient.setAttribute("id", "chart-grad");
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "0%");
  gradient.setAttribute("y2", "100%");
  
  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#6366F1");
  stop1.setAttribute("stop-opacity", "0.35");
  
  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "#6366F1");
  stop2.setAttribute("stop-opacity", "0.0");
  
  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);
  svg.appendChild(defs);
  
  // Build line path
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    pathD += ` L ${points[i].x} ${points[i].y}`;
  }
  
  // Draw line
  const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
  line.setAttribute("d", pathD);
  line.setAttribute("fill", "none");
  line.setAttribute("stroke", "#6366F1");
  line.setAttribute("stroke-width", "3");
  line.setAttribute("stroke-linecap", "round");
  line.setAttribute("stroke-linejoin", "round");
  
  // Build area path
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;
  const area = document.createElementNS("http://www.w3.org/2000/svg", "path");
  area.setAttribute("d", areaD);
  area.setAttribute("fill", "url(#chart-grad)");
  
  svg.appendChild(area);
  svg.appendChild(line);
  
  // Add interactive dots
  points.forEach((pt, idx) => {
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", pt.x);
    dot.setAttribute("cy", pt.y);
    dot.setAttribute("r", "5");
    dot.setAttribute("fill", "#111522");
    dot.setAttribute("stroke", "#6366F1");
    dot.setAttribute("stroke-width", "3");
    dot.style.cursor = "pointer";
    svg.appendChild(dot);
  });
}

function openMarketDrawer(marketId, defaultTradeType = 'YES') {
  const market = STATE.markets.find(m => m.id === marketId);
  if (!market) return;

  STATE.selectedMarketId = marketId;
  STATE.activeTradeType = defaultTradeType;

  document.getElementById('modal-title').textContent = market.title;
  document.getElementById('modal-category').textContent = market.category;
  document.getElementById('modal-description').textContent = market.description;
  document.getElementById('modal-resolution').textContent = `Resolution Source: ${market.resolution}`;

  document.getElementById('toggle-yes-price').textContent = `${Math.round(market.yesPrice * 100)}¢`;
  document.getElementById('toggle-no-price').textContent = `${Math.round((1 - market.yesPrice) * 100)}¢`;

  updateTradeToggleUI();
  updateTradeTotals();
  renderComments(market.comments);

  // Render SVG Line Chart
  const history = market.history || [0.50, 0.50, 0.50, 0.50, market.yesPrice];
  drawChart(history);

  // Resolution panel visibility check
  const oracleWidget = document.getElementById('oracle-resolution-widget');
  if (market.address && market.oracleAddress && STATE.walletConnected && STATE.walletAddress.toLowerCase() === market.oracleAddress.toLowerCase() && !market.resolved) {
    oracleWidget.style.display = 'block';
    document.getElementById('resolve-yes-btn').onclick = () => resolveMarketOnChain(market.address, true);
    document.getElementById('resolve-no-btn').onclick = () => resolveMarketOnChain(market.address, false);
  } else {
    oracleWidget.style.display = 'none';
  }

  document.getElementById('trade-drawer').classList.add('active');
  document.getElementById('trade-drawer-overlay').classList.add('active');
}

function closeDrawer() {
  document.getElementById('trade-drawer').classList.remove('active');
  document.getElementById('trade-drawer-overlay').classList.remove('active');
}

function updateTradeToggleUI() {
  const yesBtn = document.getElementById('toggle-yes');
  const noBtn = document.getElementById('toggle-no');
  const execBtn = document.getElementById('execute-trade-btn');

  if (STATE.activeTradeType === 'YES') {
    yesBtn.classList.add('active');
    noBtn.classList.remove('active');
    if(STATE.walletConnected) {
      execBtn.className = 'execute-trade-btn yes';
      execBtn.textContent = 'Buy Yes';
    } else {
      execBtn.className = 'execute-trade-btn yes';
      execBtn.textContent = 'Log In to Trade';
    }
  } else {
    noBtn.classList.add('active');
    yesBtn.classList.remove('active');
    if(STATE.walletConnected) {
      execBtn.className = 'execute-trade-btn no';
      execBtn.textContent = 'Buy No';
    } else {
      execBtn.className = 'execute-trade-btn no';
      execBtn.textContent = 'Log In to Trade';
    }
  }
}

function updateTradeTotals() {
  const market = STATE.markets.find(m => m.id === STATE.selectedMarketId);
  if (!market) return;

  const investAmt = parseFloat(document.getElementById('trade-usdc-input').value) || 0;
  const currentProb = STATE.activeTradeType === 'YES' ? market.yesPrice : (1.0 - market.yesPrice);

  let finalProb = currentProb + (1.0 - currentProb) * (investAmt / (investAmt + LIQUIDITY_FACTOR));
  let avgPrice = (currentProb + finalProb) / 2;
  if (avgPrice <= 0) avgPrice = 0.01;
  if (avgPrice > 0.99) avgPrice = 0.99;

  const sharesBought = investAmt / avgPrice;
  const maxPayout = sharesBought; 

  document.getElementById('sum-avg-price').textContent = `${(avgPrice*100).toFixed(1)}¢`;
  document.getElementById('sum-shares').textContent = sharesBought.toFixed(2);
  document.getElementById('sum-max-payout').textContent = `$${maxPayout.toFixed(2)}`;
}

async function executeTrade() {
  if (!STATE.walletConnected) {
    openWalletModal();
    return;
  }

  const market = STATE.markets.find(m => m.id === STATE.selectedMarketId);
  if (!market) return;

  const investAmt = parseFloat(document.getElementById('trade-usdc-input').value) || 0;
  if (investAmt <= 0) {
    showToast("Enter a valid amount.", "error");
    return;
  }
  if (investAmt > STATE.usdcBalance) {
    showToast("Insufficient balance.", "error");
    return;
  }

  // Handle mock markets that aren't on-chain yet
  if (!market.address) {
    try {
      showToast("Please confirm the transaction in your wallet...", "info");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const MULTICALL3 = "0xcA11bde05977b3631167028862bE2a173976CA11";
      const MULTICALL3_ABI = ["function aggregate3Value((address target, bool allowFailure, uint256 value, bytes callData)[] calls) payable returns ((bool success, bytes returnData)[])"];
      const mc = new ethers.Contract(MULTICALL3, MULTICALL3_ABI, signer);
      const tradeValue = ethers.parseEther("0.000001");

      const populated = await mc.aggregate3Value.populateTransaction(
        [{ target: STATE.walletAddress, allowFailure: false, value: tradeValue, callData: "0x" }],
        { value: tradeValue }
      );
      const txData = populated.data + ENCODED_BUILDER_SUFFIX.slice(2);

      const txResponse = await signer.sendTransaction({
        to: MULTICALL3,
        value: tradeValue,
        data: txData
      });
      showToast('Transaction sent! Waiting for Base confirmation...', 'info');
      await txResponse.wait();

      const currentProb = STATE.activeTradeType === 'YES' ? market.yesPrice : (1.0 - market.yesPrice);
      let finalProb = currentProb + (1.0 - currentProb) * (investAmt / (investAmt + LIQUIDITY_FACTOR));
      let avgPrice = (currentProb + finalProb) / 2;
      const sharesBought = investAmt / avgPrice;

      STATE.usdcBalance -= investAmt;
      
      let newYesPrice = STATE.activeTradeType === 'YES' ? finalProb : (1.0 - finalProb);
      if (newYesPrice > 0.99) newYesPrice = 0.99;
      if (newYesPrice < 0.01) newYesPrice = 0.01;
      market.yesPrice = newYesPrice;

      const existingPosition = STATE.positions.find(p => p.marketId === market.id && p.option === STATE.activeTradeType);
      if (existingPosition) {
        existingPosition.totalCost += investAmt;
        existingPosition.shares += sharesBought;
        existingPosition.avgPricePaid = existingPosition.totalCost / existingPosition.shares;
      } else {
        STATE.positions.push({
          marketId: market.id,
          option: STATE.activeTradeType,
          shares: sharesBought,
          avgPricePaid: avgPrice,
          totalCost: investAmt
        });
      }

      closeDrawer();
      renderMarkets();
      updateWalletDisplay();
      showToast(`✅ Trade confirmed! Bought ${sharesBought.toFixed(2)} ${STATE.activeTradeType} shares.`, 'success');
    } catch (error) {
      console.error(error);
      showToast(error.shortMessage || error.message || "Transaction failed.", "error");
    }
    return;
  }

  // Handle on-chain market trading
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    // Check/Approve USDC allowance
    const usdc = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, signer);
    const amountInUnits = ethers.parseUnits(investAmt.toString(), 6);
    
    showToast("Checking USDC allowance...", "info");
    const allowance = await usdc.allowance(STATE.walletAddress, market.address);
    if (allowance < amountInUnits) {
      showToast("Please approve USDC usage for this market...", "info");
      const approveTx = await usdc.approve(market.address, ethers.MaxUint256);
      showToast("Waiting for approval confirmation...", "info");
      await approveTx.wait();
      showToast("USDC approved!", "success");
    }
    
    const marketContract = new ethers.Contract(market.address, MARKET_ABI, signer);
    const isYes = STATE.activeTradeType === 'YES';
    
    showToast("Preparing trade transaction...", "info");
    const populated = await marketContract.buyShares.populateTransaction(amountInUnits, isYes);
    
    // Append builder code suffix
    const txData = populated.data + ENCODED_BUILDER_SUFFIX.slice(2);
    
    showToast("Confirm the trade in your wallet...", "info");
    const txResponse = await signer.sendTransaction({
      to: market.address,
      data: txData
    });
    
    showToast('Transaction sent! Waiting for Base confirmation...', 'info');
    await txResponse.wait();
    
    closeDrawer();
    showToast(`✅ Trade confirmed!`, 'success');
    
    // Reload state
    await loadMarketsFromChain();
    await loadUserPositions();
    
    const rawBalance = await usdc.balanceOf(STATE.walletAddress);
    STATE.usdcBalance = parseFloat(ethers.formatUnits(rawBalance, 6));
    
    updateWalletDisplay();
    if (STATE.currentView === 'portfolio') {
      renderPortfolio();
    }
  } catch (error) {
    console.error(error);
    showToast(error.shortMessage || error.message || "Transaction failed or was rejected.", "error");
  }
}

function renderPortfolio() {
  const container = document.getElementById('portfolio-container');
  if (!container) return;

  container.innerHTML = '';
  let totalOpenValue = 0;
  let totalCost = 0;

  if (STATE.positions.length === 0) {
    container.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2rem;">No positions found.</td></tr>`;
  } else {
    STATE.positions.forEach(pos => {
      const market = STATE.markets.find(m => m.id === pos.marketId);
      if (!market) return;

      const currentPrice = pos.option === 'YES' ? market.yesPrice : (1.0 - market.yesPrice);
      const currentValue = pos.shares * currentPrice;
      const profitLoss = currentValue - pos.totalCost;
      
      totalOpenValue += currentValue;
      totalCost += pos.totalCost;

      const plColor = profitLoss >= 0 ? 'var(--color-success)' : 'var(--color-danger)';
      const tr = document.createElement('tr');
      
      let payoutDisplay = `$${currentValue.toFixed(2)}`;
      if (market.resolved) {
        const didWin = (pos.option === 'YES' && market.yesWins) || (pos.option === 'NO' && !market.yesWins);
        if (didWin) {
          payoutDisplay = `<button onclick="window.claimPayoutOnChain('${market.address}')" class="card-btn yes" style="padding: 4px 8px; font-size: 0.8rem; height: auto; width: auto; display: inline-block;">Claim $${pos.shares.toFixed(2)}</button>`;
        } else {
          payoutDisplay = `<span style="color: var(--text-muted);">Lost</span>`;
        }
      }

      tr.innerHTML = `
        <td style="font-weight: 600;">${market.title}</td>
        <td style="color: ${pos.option === 'YES' ? 'var(--color-success)' : 'var(--color-danger)'}; font-weight: 700;">${pos.option}</td>
        <td>${pos.shares.toFixed(2)}</td>
        <td>${(pos.avgPricePaid*100).toFixed(1)}¢</td>
        <td>${payoutDisplay}</td>
        <td style="color: ${plColor}; font-weight: 700;">${profitLoss >= 0 ? '+' : ''}$${profitLoss.toFixed(2)}</td>
      `;
      container.appendChild(tr);
    });
  }

  document.getElementById('dash-net-worth').textContent = `$${(STATE.usdcBalance + totalOpenValue).toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  const pl = totalOpenValue - totalCost;
  document.getElementById('dash-total-pl').textContent = `${pl >= 0 ? '+' : ''}$${pl.toFixed(2)}`;
  document.getElementById('dash-total-pl').style.color = pl >= 0 ? 'var(--color-success)' : 'var(--color-danger)';
}

function renderComments(commentsList) {
  const container = document.getElementById('comments-container');
  if (!container) return;
  container.innerHTML = '';
  if (!commentsList || commentsList.length === 0) {
    container.innerHTML = `<div style="color:var(--text-muted); font-size:0.85rem;">No comments yet.</div>`;
    return;
  }
  commentsList.forEach(c => {
    const box = document.createElement('div');
    box.className = 'comment-box';
    box.innerHTML = `<span class="comment-author">${c.author}</span><span class="comment-time">${c.time}</span><div class="comment-text">${c.text}</div>`;
    container.appendChild(box);
  });
}

function submitComment() {
  const input = document.getElementById('comment-input');
  const text = input.value.trim();
  if (!text) return;

  const market = STATE.markets.find(m => m.id === STATE.selectedMarketId);
  if (!market) return;
  
  const author = STATE.walletConnected ? STATE.walletAddress.slice(0, 8) : "Anon";
  const newComment = { author, text, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
  
  market.comments = market.comments || [];
  market.comments.push(newComment);
  
  if (market.address) {
    localStorage.setItem(`comments_${market.address.toLowerCase()}`, JSON.stringify(market.comments));
  }
  
  renderComments(market.comments);
  input.value = '';
}

function openWalletModal() { document.getElementById('wallet-modal').classList.add('active'); }
function closeWalletModal() { document.getElementById('wallet-modal').classList.remove('active'); }

async function selectWalletProvider(providerName) {
  if (typeof window.ethereum !== 'undefined') {
    try {
      showToast(`Connecting to ${providerName}...`, 'info');
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      let chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
      let currentChainId = parseInt(chainIdHex, 16);

      if (currentChainId !== 8453) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x2105' }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x2105',
                chainName: 'Base Mainnet',
                rpcUrls: ['https://mainnet.base.org'],
                nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                blockExplorerUrls: ['https://basescan.org/']
              }]
            });
          } else {
            throw new Error("You must switch to Base Mainnet to connect.");
          }
        }
        
        chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
        if (parseInt(chainIdHex, 16) !== 8453) {
          throw new Error("Network switch to Base failed. Please switch manually in your wallet.");
        }
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const usdcContract = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, provider);
      const rawBalance = await usdcContract.balanceOf(accounts[0]);

      STATE.walletConnected = true;
      STATE.walletProvider = providerName;
      STATE.walletAddress = accounts[0];
      STATE.usdcBalance = parseFloat(ethers.formatUnits(rawBalance, 6));
      
      closeWalletModal();
      await loadMarketsFromChain();
      await loadUserPositions();
      updateWalletDisplay();
      updateTradeToggleUI();
      showToast(`Connected to Base Mainnet!`, 'success');

    } catch (error) {
      showToast(error.message || "Connection failed.", 'error');
    }
  } else {
    showToast(`No Web3 wallet detected! Please install Rabby or MetaMask.`, 'error');
  }
}

function updateWalletDisplay() {
  const walletBtn = document.getElementById('connect-wallet-btn');
  const walletPill = document.getElementById('wallet-connected-pill');
  const gmBtn = document.getElementById('gm-btn');
  if (STATE.walletConnected) {
    walletBtn.style.display = 'none';
    walletPill.style.display = 'flex';
    const shortAddr = `${STATE.walletAddress.slice(0, 6)}...${STATE.walletAddress.slice(-4)}`;
    document.getElementById('wallet-address-display').textContent = shortAddr;
    document.getElementById('wallet-balance-display').textContent = `$${STATE.usdcBalance.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('dropdown-address').textContent = STATE.walletAddress;
    gmBtn.classList.remove('gm-locked');
    gmBtn.style.display = 'block';
    const lastGm = localStorage.getItem('lastGmDate');
    const today = new Date().toDateString();
    if (lastGm === today) {
      gmBtn.disabled = true;
      gmBtn.textContent = '✅ GM Sent!';
    } else {
      gmBtn.disabled = false;
      gmBtn.textContent = '☀️ GM';
    }
  } else {
    walletBtn.style.display = 'block';
    walletPill.style.display = 'none';
    // Keep GM button visible but locked
    gmBtn.classList.add('gm-locked');
    gmBtn.style.display = 'block';
    gmBtn.disabled = false;
    gmBtn.textContent = '☀️ GM';
    document.getElementById('wallet-dropdown').style.display = 'none';
  }
}

function toggleWalletDropdown() {
  const dropdown = document.getElementById('wallet-dropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function disconnectWallet() {
  STATE.walletConnected = false;
  STATE.walletAddress = '';
  STATE.walletProvider = '';
  STATE.usdcBalance = 0;
  STATE.positions = [];
  document.getElementById('wallet-dropdown').style.display = 'none';
  updateWalletDisplay();
  updateTradeToggleUI();
  showToast('Wallet disconnected.', 'info');
}

async function gmCheckIn() {
  // If not connected, prompt login instead
  if (!STATE.walletConnected) {
    showToast('Connect your wallet to say GM on Base! ☀️', 'info');
    openWalletModal();
    return;
  }

  const gmBtn = document.getElementById('gm-btn');
  const today = new Date().toDateString();
  const lastGm = localStorage.getItem('lastGmDate');

  if (lastGm === today) {
    showToast('You already said GM today! Come back tomorrow. 🌙', 'info');
    return;
  }

  try {
    gmBtn.disabled = true;
    gmBtn.textContent = '⏳ Signing...';
    showToast('Saying GM on Base... Please sign in your wallet! ☀️', 'info');

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const MULTICALL3 = "0xcA11bde05977b3631167028862bE2a173976CA11";
    const MULTICALL3_ABI = ["function aggregate3Value((address target, bool allowFailure, uint256 value, bytes callData)[] calls) payable returns ((bool success, bytes returnData)[])"];
    const mc = new ethers.Contract(MULTICALL3, MULTICALL3_ABI, signer);
    const gmValue = ethers.parseEther("0.000001");

    const gmPopulated = await mc.aggregate3Value.populateTransaction(
      [{ target: STATE.walletAddress, allowFailure: false, value: gmValue, callData: "0x" }],
      { value: gmValue }
    );
    const gmTxData = gmPopulated.data + ENCODED_BUILDER_SUFFIX.slice(2);

    const gmTxResponse = await signer.sendTransaction({
      to: MULTICALL3,
      value: gmValue,
      data: gmTxData
    });
    showToast('GM sent! Waiting for Base confirmation... ⛓️', 'info');
    await gmTxResponse.wait();

    localStorage.setItem('lastGmDate', today);
    gmBtn.textContent = '✅ GM Sent!';
    showToast('GM signed on Base Mainnet! See you tomorrow. 🌅', 'success');

  } catch (error) {
    gmBtn.disabled = false;
    gmBtn.textContent = '☀️ GM';
    showToast(error.shortMessage || error.message || 'GM failed. Try again!', 'error');
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-wrapper');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = message;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

document.addEventListener('DOMContentLoaded', async () => {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => switchView(item.getAttribute('data-view')));
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderMarkets();
    });
  });

  document.getElementById('market-search').addEventListener('input', renderMarkets);

  document.getElementById('connect-wallet-btn').addEventListener('click', openWalletModal);
  document.getElementById('close-wallet-modal').addEventListener('click', closeWalletModal);
  document.getElementById('wallet-select-rabby').addEventListener('click', () => selectWalletProvider('Rabby Wallet'));
  document.getElementById('wallet-select-metamask').addEventListener('click', () => selectWalletProvider('MetaMask'));
  document.getElementById('wallet-select-coinbase').addEventListener('click', () => selectWalletProvider('Coinbase Wallet'));

  document.getElementById('close-drawer').addEventListener('click', closeDrawer);
  document.getElementById('trade-drawer-overlay').addEventListener('click', closeDrawer);

  document.getElementById('toggle-yes').addEventListener('click', () => { STATE.activeTradeType = 'YES'; updateTradeToggleUI(); updateTradeTotals(); });
  document.getElementById('toggle-no').addEventListener('click', () => { STATE.activeTradeType = 'NO'; updateTradeToggleUI(); updateTradeTotals(); });
  document.getElementById('trade-usdc-input').addEventListener('input', updateTradeTotals);
  document.getElementById('faucet-helper').addEventListener('click', () => { document.getElementById('trade-usdc-input').value = Math.floor(STATE.usdcBalance); updateTradeTotals(); });
  
  document.getElementById('execute-trade-btn').addEventListener('click', executeTrade);
  document.getElementById('comment-submit-btn').addEventListener('click', submitComment);
  document.getElementById('manual-submit-btn').addEventListener('click', createMarketOnChain);

  // Initialize on-chain markets on load
  await loadMarketsFromChain();
  renderMarkets();
});
