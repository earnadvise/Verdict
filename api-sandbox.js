/**
 * Verdict Developer Portal & API Sandbox Helper
 * Implements ERC-8021 Transaction Attribution suffix compiler
 */

const ApiSandbox = {
  // Constant EIP-8021 Marker
  ERC_MARKER: '80218021802180218021802180218021',
  SCHEMA_ID: '00',

  // Encode builder code into ERC-8021 suffix structure
  encodeErc8021(builderCode) {
    // Sanitize: allow lowercase letters, digits, and underscores, max 32 chars
    let sanitized = builderCode
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '')
      .slice(0, 32);
    
    if (sanitized.length === 0) {
      sanitized = 'verdict_market';
    }

    // Convert letters to ASCII hex array
    const lettersHex = [];
    const charArray = sanitized.split('');
    for (let i = 0; i < charArray.length; i++) {
      const char = charArray[i];
      const hex = char.charCodeAt(0).toString(16).padStart(2, '0');
      lettersHex.push({ char, hex });
    }

    const lettersHexStr = lettersHex.map(item => item.hex).join('');
    
    // Suffix Length byte (number of letters bytes)
    const lengthDecimal = lettersHex.length;
    const lengthHex = lengthDecimal.toString(16).padStart(2, '0');

    // Assemble the complete hex string (excluding 0x prefix for calculations)
    // Format: [lettersHex] + [lengthHex] + [schemaHex] + [markerHex]
    const fullSuffixHex = lettersHexStr + lengthHex + this.SCHEMA_ID + this.ERC_MARKER;

    return {
      builderCode: sanitized,
      lettersHex: lettersHex, // Array of {char, hex}
      lettersHexStr: lettersHexStr,
      lengthHex: lengthHex,
      lengthDecimal: lengthDecimal,
      schemaHex: this.SCHEMA_ID,
      markerHex: this.ERC_MARKER,
      fullSuffix: '0x' + fullSuffixHex
    };
  },

  // Renders the byte blocks in the visualizer UI
  renderByteVisualizer(encoding) {
    const container = document.getElementById('byte-visualizer-container');
    if (!container) return;

    container.innerHTML = '';

    // 1. Letters Bytes
    encoding.lettersHex.forEach(item => {
      const byteSpan = document.createElement('span');
      byteSpan.className = 'byte-block byte-letters';
      byteSpan.innerHTML = `${item.hex}<span class="byte-tooltip">ASCII Letter: '${item.char}' (0x${item.hex})</span>`;
      container.appendChild(byteSpan);
    });

    // 2. Length Byte
    const lenSpan = document.createElement('span');
    lenSpan.className = 'byte-block byte-length';
    lenSpan.innerHTML = `${encoding.lengthHex}<span class="byte-tooltip">Length Byte: ${encoding.lengthDecimal} bytes (0x${encoding.lengthHex})</span>`;
    container.appendChild(lenSpan);

    // 3. Schema Byte
    const schemaSpan = document.createElement('span');
    schemaSpan.className = 'byte-block byte-schema';
    schemaSpan.innerHTML = `${encoding.schemaHex}<span class="byte-tooltip">Schema Version: 0x${encoding.schemaHex} (Standard Registry)</span>`;
    container.appendChild(schemaSpan);

    // 4. Marker Bytes (16 bytes, show as 16 blocks)
    for (let i = 0; i < 16; i++) {
      const markerSpan = document.createElement('span');
      markerSpan.className = 'byte-block byte-marker';
      markerSpan.innerHTML = `80<span class="byte-tooltip">ERC-8021 Marker Byte (Index: ${i}/15)</span>`;
      
      // Toggle color slightly to make individual bytes visually distinct
      if (i % 2 === 1) {
        markerSpan.style.background = 'rgba(239, 68, 68, 0.25)';
      }
      
      container.appendChild(markerSpan);
    }
  },

  // Generate code snippet template
  generateSnippets(encoding, activeLang) {
    const snippetBox = document.getElementById('snippet-code-box');
    if (!snippetBox) return;

    let code = '';
    const suffix = encoding.fullSuffix;
    const codeStr = encoding.builderCode;

    if (activeLang === 'js') {
      code = `// Install dependency: npm install viem
import { createWalletClient, http } from 'viem';
import { base } from 'viem/chains';

// Suffix encoded for "${codeStr}"
const DATA_SUFFIX = '${suffix}';

// Initialize wallet client with automatic transaction attribution
const walletClient = createWalletClient({
  chain: base,
  transport: http(),
  dataSuffix: DATA_SUFFIX, // Automatically appends suffix to all calls
});

// Any transaction submitted will include the builder code on-chain:
const hash = await walletClient.sendTransaction({
  account: '0xYourWalletAddress...',
  to: '0xVerdictPredictionContract...',
  value: 0n,
  data: '0x38a6a5d40000000000000000000000000000...' // Your target call data
});`;
    } else if (activeLang === 'py') {
      code = `# Install dependency: pip install web3
from web3 import Web3

# Suffix encoded for "${codeStr}"
data_suffix_hex = "${suffix.slice(2)}"
data_suffix_bytes = bytes.fromhex(data_suffix_hex)

w3 = Web3(Web3.HTTPProvider('https://mainnet.base.org'))

# Prepare transaction calldata
original_calldata_hex = "38a6a5d40000000000000000000000000000..." 

# Append ERC-8021 suffix byte code
attributed_calldata_hex = original_calldata_hex + data_suffix_hex

tx = {
    'from': '0xYourWalletAddress...',
    'to': '0xVerdictPredictionContract...',
    'value': 0,
    'gas': 150000,
    'gasPrice': w3.eth.gas_price,
    'nonce': w3.eth.get_transaction_count('0xYourWalletAddress...'),
    'data': '0x' + attributed_calldata_hex,
    'chainId': 8453 # Base Mainnet Chain ID
}

# Sign and send
# signed_tx = w3.eth.account.sign_transaction(tx, private_key)
# tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)`;
    } else if (activeLang === 'curl') {
      code = `# Raw RPC request to Base Mainnet Nodes
# Append the data suffix directly to the transaction 'data' field.
# Suffix for "${codeStr}": ${suffix}

curl https://mainnet.base.org \\
  -X POST \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "method": "eth_sendTransaction",
    "params": [{
      "from": "0xYourWalletAddress...",
      "to": "0xVerdictPredictionContract...",
      "data": "0x38a6a5d4000000000000000000...[original_data]...${suffix.slice(2)}"
    }],
    "id": 1
  }'`;
    }

    snippetBox.textContent = code;
  },

  // Setup UI interactive binds for Sandbox
  init() {
    const input = document.getElementById('sandbox-builder-code');
    const tabs = document.querySelectorAll('.snippet-tab');
    const copyBtn = document.getElementById('copy-snippet-btn');
    const triggerRpcBtn = document.getElementById('rpc-trigger-btn');
    const rpcConsole = document.getElementById('rpc-console-output');

    let currentLang = 'js';

    const performUpdate = () => {
      const codeStr = input.value || 'verdict_market';
      const encoding = this.encodeErc8021(codeStr);
      
      // Update visual bytes
      this.renderByteVisualizer(encoding);
      
      // Update code snippets
      this.generateSnippets(encoding, currentLang);

      // Sync display in sidebar
      const sidebarCode = document.getElementById('current-builder-code-display');
      if (sidebarCode) {
        sidebarCode.textContent = encoding.builderCode;
      }
    };

    // Listen to changes
    if (input) {
      input.addEventListener('input', (e) => {
        // Sanitize on-the-fly
        let val = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
        if (val.length > 32) val = val.slice(0, 32);
        e.target.value = val;
        
        performUpdate();
      });
    }

    // Toggle languages snippets
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        tabs.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        currentLang = e.target.getAttribute('data-lang');
        performUpdate();
      });
    });

    // Copy to clipboard
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const snippetText = document.getElementById('snippet-code-box').textContent;
        navigator.clipboard.writeText(snippetText).then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.textContent = 'Copy';
          }, 1500);
        }).catch(err => {
          console.error('Could not copy text: ', err);
        });
      });
    }

    // RPC Simulation terminal run
    if (triggerRpcBtn && rpcConsole) {
      triggerRpcBtn.addEventListener('click', () => {
        const codeStr = input.value || 'verdict_market';
        const encoding = this.encodeErc8021(codeStr);
        const txHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
        const mockBlock = Math.floor(Math.random() * 5000) + 12450000;
        
        rpcConsole.innerHTML = `<div class="console-line input">&gt; Broadcasting client-signed payload to Base Mainnet RPC...</div>`;
        triggerRpcBtn.disabled = true;

        setTimeout(() => {
          rpcConsole.innerHTML += `<div class="console-line output">&gt; Connection established with https://mainnet.base.org/</div>`;
          rpcConsole.scrollTop = rpcConsole.scrollHeight;
        }, 600);

        setTimeout(() => {
          rpcConsole.innerHTML += `<div class="console-line input">&gt; Method: eth_sendRawTransaction</div>`;
          rpcConsole.innerHTML += `<div class="console-line input" style="word-break: break-all; opacity: 0.6;">&gt; Data: 0x38a6a5d4000...${encoding.fullSuffix.slice(2)}</div>`;
          rpcConsole.scrollTop = rpcConsole.scrollHeight;
        }, 1200);

        setTimeout(() => {
          rpcConsole.innerHTML += `<div class="console-line output" style="color: #6366F1;">&gt; Transaction Success! Suffix parsed: '${encoding.builderCode}'</div>`;
          rpcConsole.innerHTML += `<div class="console-line output">&gt; Tx Hash: ${txHash}</div>`;
          rpcConsole.innerHTML += `<div class="console-line output">&gt; Block: #${mockBlock} | Gas Used: 120,432</div>`;
          rpcConsole.scrollTop = rpcConsole.scrollHeight;
          triggerRpcBtn.disabled = false;
          
          // Trigger global notification toast
          if (window.showToast) {
            window.showToast(`Simulated Base transaction attributed to '${encoding.builderCode}' successful!`, 'success');
          }
        }, 2200);
      });
    }

    // Initial render
    performUpdate();
  }
};

// Expose to window
window.ApiSandbox = ApiSandbox;
