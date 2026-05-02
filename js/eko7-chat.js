// Eko7 Chat System - Shared across all pages
// Chat functions
function openEko7Chat() {
  document.getElementById('eko7-modal').classList.remove('hidden');
  document.getElementById('eko7-messages').innerHTML = `
      <div class="eko7-message bg-gray-800 p-4 rounded-2xl max-w-[80%]">
        *Eko7's holographic form flickers to life*<br>
        Greetings, traveler! What cosmic signal shall we send today?
      </div>`;
}

function closeEko7Chat() {
  document.getElementById('eko7-modal').classList.add('hidden');
}

async function sendToEko7() {
  const input = document.getElementById('eko7-input');
  const message = input.value.trim();
  if (!message) return;

  const messagesContainer = document.getElementById('eko7-messages');

  // Show user message
  messagesContainer.innerHTML += `<div class="ml-auto bg-cyan-600 text-white p-4 rounded-2xl max-w-[80%]">${message}</div>`;
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  input.value = '';

  // Show typing indicator
  messagesContainer.innerHTML += `<div class="mr-auto bg-gray-700 p-4 rounded-2xl max-w-[80%]">
    <span class="inline-flex items-center gap-1">
      <span class="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
      <span class="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
      <span class="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
    </span>
  </div>`;
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  try {
    // First try to get Google search results
    const searchResponse = await searchGoogle(message);
    
    if (searchResponse && searchResponse.results && searchResponse.results.length > 0) {
      // Format search results into a cosmic response
      const searchResult = searchResponse.results[0];
      const cosmicResponse = formatSearchResponse(searchResult, message);
      
      // Remove typing indicator and show response
      messagesContainer.lastElementChild.remove();
      messagesContainer.innerHTML += `<div class="mr-auto bg-gray-700 p-4 rounded-2xl max-w-[80%]">${cosmicResponse}</div>`;
    } else {
      // Fallback to mock responses if no search results
      throw new Error('No search results');
    }
  } catch (error) {
    // Fallback to mock responses
    const replies = [
      "Interesting signal... I'm decoding it now!",
      "*Beeps excitedly* Now that's a transmission worth receiving!",
      "Fascinating! This one goes straight into the nebula archive.",
      "You're speaking my language, traveler. What else is on your mind?",
      "I'm processing your cosmic query... The stars are aligning with your question.",
      "Your transmission resonates with the universal frequency. Let me consult the cosmic archives."
    ];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    
    // Remove typing indicator and show fallback response
    messagesContainer.lastElementChild.remove();
    messagesContainer.innerHTML += `<div class="mr-auto bg-gray-700 p-4 rounded-2xl max-w-[80%]">${randomReply}</div>`;
  }
  
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Enhanced search with Wikipedia API + knowledge base
async function searchGoogle(query) {
  // First check our built-in knowledge base for immediate answers
  const knowledgeResult = getBasicKnowledge(query);
  if (knowledgeResult) {
    return knowledgeResult;
  }

  // Try Wikipedia API with simplified search terms
  try {
    const searchTerms = extractSearchTerms(query);
    const wikiResult = await searchWikipediaPage(searchTerms);

    if (wikiResult) {
      return wikiResult;
    }
  } catch (error) {
    console.log('Wikipedia search failed, using fallback:', error);
  }

  // Final fallback with helpful message
  return {
    results: [{
      title: "Cosmic Search Results",
      snippet: `I've searched the cosmic archives for "${query}". For the most current and specific information about this topic, I recommend checking official sources or conducting a web search, as this appears to be a specialized or evolving topic.`,
      link: `https://www.google.com/search?q=${encodeURIComponent(query)}`
    }]
  };
}

// Utility functions for enhanced scraping
async function fetchWithTimeout(url, timeout) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Eko7-Research-Bot (Psykters Nebula Project)'
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Search Wikipedia for the correct page title, then get summary
async function searchWikipediaPage(searchTerms) {
  try {
    // First, search for the page
    const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerms)}`;
    const searchResponse = await fetchWithTimeout(searchUrl, 3000);

    if (searchResponse.ok) {
      const data = await searchResponse.json();
      if (data.extract && data.title !== 'Not found') {
        return {
          results: [{
            title: data.title || searchTerms,
            snippet: data.extract || `Found information about ${data.title}`,
            link: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)}`
          }]
        };
      }
    }

    // If direct lookup fails, try search API
    const firstWord = searchTerms.split(' ')[0];
    if (firstWord && firstWord !== searchTerms) {
      const searchApiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(firstWord)}`;
      const fallbackResponse = await fetchWithTimeout(searchApiUrl, 3000);

      if (fallbackResponse.ok) {
        const data = await fallbackResponse.json();
        if (data.extract && data.title !== 'Not found') {
          return {
            results: [{
              title: data.title || firstWord,
              snippet: data.extract || `Found information about ${data.title}`,
              link: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)}`
            }]
          };
        }
      }
    }

    return null; // Explicitly return null when no results found
  } catch (error) {
    console.log('Wikipedia search failed:', error);
    return null; // Return null on error instead of throwing
  }
}

// Extract key search terms from user queries
function extractSearchTerms(query) {
  const lowerQuery = query.toLowerCase();

  // Remove question words and extract key terms
  const cleanQuery = query
    .replace(/[?!.]/g, '')  // Remove punctuation
    .replace(/\b(where|what|how|when|why|is|are|the|a|an)\b/gi, '')
    .replace(/\b(where is|what is|how large|what size)\b/gi, '')
    .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
    .trim();

  // Handle specific cases
  if (lowerQuery.includes('3i atlas') || lowerQuery.includes('3iatlas')) {
    return '3iAtlas';
  }
  if (lowerQuery.includes('sun') && (lowerQuery.includes('size') || lowerQuery.includes('large'))) {
    return 'Sun';
  }
  if (lowerQuery.includes('earth') && (lowerQuery.includes('size') || lowerQuery.includes('large'))) {
    return 'Earth';
  }

  return cleanQuery || query;
}

// Basic knowledge base for common questions
function getBasicKnowledge(query) {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('sun') && (lowerQuery.includes('size') || lowerQuery.includes('large') || lowerQuery.includes('diameter'))) {
    return {
      results: [{
        title: "Sun Size",
        snippet: "The Sun is the largest object in our solar system, with a diameter of about 1.39 million kilometers (864,000 miles), which is about 109 times the diameter of Earth. It contains 99.8% of the total mass of the Solar System.",
        link: "https://en.wikipedia.org/wiki/Sun"
      }]
    };
  }

  if (lowerQuery.includes('3iatlas')) {
    return {
      results: [{
        title: "3iAtlas",
        snippet: "3iAtlas appears to be a specialized system or platform. For the most current location and information about 3iAtlas, I recommend checking official documentation or contacting the provider directly, as specific locations can vary based on context and version.",
        link: "https://www.google.com/search?q=3iAtlas"
      }]
    };
  }

  if (lowerQuery.includes('earth') && (lowerQuery.includes('size') || lowerQuery.includes('large'))) {
    return {
      results: [{
        title: "Earth Size",
        snippet: "Earth has a diameter of approximately 12,742 kilometers (7,918 miles), making it the fifth largest planet in our solar system. It has a mass of about 5.97 × 10^24 kilograms and a surface area of 510 million square kilometers.",
        link: "https://en.wikipedia.org/wiki/Earth"
      }]
    };
  }

  return null;
}

// Format search results into Eko7's cosmic voice
function formatSearchResponse(result, originalQuery) {
  const cosmicPrefixes = [
    "*Accessing cosmic archives...*",
    "*Cross-referencing with universal database...*",
    "*Consulting the stellar networks...*",
    "*Tuning into the cosmic frequency...*"
  ];

  const cosmicSuffixes = [
    "The stars have spoken on this matter.",
    "This knowledge resonates across dimensions.",
    "The universe provides this insight.",
    "Cosmic intelligence has processed your query."
  ];

  const prefix = cosmicPrefixes[Math.floor(Math.random() * cosmicPrefixes.length)];
  const suffix = cosmicSuffixes[Math.floor(Math.random() * cosmicSuffixes.length)];

  return `${prefix}<br><br>
    <strong>Cosmic Transmission:</strong><br>
    ${result.snippet}<br><br>
    <em>${suffix}</em><br>
    <small class="text-gray-400">Source: ${new URL(result.link).hostname}</small>`;
}

// Allow pressing Escape in chat
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeEko7Chat();
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Add Enter key support for chat input
  const chatInput = document.getElementById('eko7-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendToEko7();
      }
    });
  }
});
