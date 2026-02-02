// FHIR Patient Tutorial JavaScript

console.log('FHIR Tutorial loaded');

// ===================================================================
// Server Configuration
// ===================================================================

const SERVERS = {
  hapi: {
    name: 'HAPI FHIR',
    baseUrl: 'https://hapi.fhir.org/baseR4',
    collectionFile: 'assets/postman/FHIR-Patient-Tutorial-HAPI.postman_collection.json',
    environmentFile: 'assets/postman/FHIR-Tutorial-Environment-HAPI.postman_environment.json'
  },
  aegis: {
    name: 'AEGIS WildFHIR',
    baseUrl: 'https://wildfhir4.wildfhir.org/fhir4-0-1',
    collectionFile: 'assets/postman/FHIR-Patient-Tutorial-AEGIS.postman_collection.json',
    environmentFile: 'assets/postman/FHIR-Tutorial-Environment-AEGIS.postman_environment.json'
  }
};

// ===================================================================
// Global State
// ===================================================================

let currentServer = 'hapi';
let currentPatientId = null;

// ===================================================================
// Server Selection Functions
// ===================================================================

function getBaseUrl() {
  return SERVERS[currentServer].baseUrl;
}

function getPatientEndpoint() {
  return `${getBaseUrl()}/Patient`;
}

function saveServerChoice(serverKey) {
  try {
    localStorage.setItem('fhir-tutorial-server', serverKey);
  } catch (e) {
    console.error('Failed to save server choice:', e);
  }
}

function loadServerChoice() {
  try {
    return localStorage.getItem('fhir-tutorial-server') || 'hapi';
  } catch (e) {
    console.error('Failed to load server choice:', e);
    return 'hapi';
  }
}

function updateServerDisplay() {
  const server = SERVERS[currentServer];

  // Update Module 2 server info table
  const serverNameCell = document.getElementById('serverNameCell');
  const baseUrlCell = document.getElementById('baseUrlCell');
  const patientEndpointCell = document.getElementById('patientEndpointCell');

  if (serverNameCell) serverNameCell.innerHTML = `<code>${server.name}</code>`;
  if (baseUrlCell) baseUrlCell.textContent = server.baseUrl;
  if (patientEndpointCell) patientEndpointCell.textContent = `${server.baseUrl}/Patient`;

  // Update Quick Reference section
  const qrServerName = document.getElementById('qrServerName');
  const qrBaseUrl = document.getElementById('qrBaseUrl');

  if (qrServerName) qrServerName.textContent = server.name;
  if (qrBaseUrl) qrBaseUrl.textContent = server.baseUrl;

  // Update Postman download buttons
  const collectionBtn = document.getElementById('downloadCollectionBtn');
  const environmentBtn = document.getElementById('downloadEnvironmentBtn');

  if (collectionBtn) {
    collectionBtn.href = server.collectionFile;
    collectionBtn.download = 'FHIR-Patient-Tutorial.postman_collection.json';
  }

  if (environmentBtn) {
    environmentBtn.href = server.environmentFile;
    environmentBtn.download = 'FHIR-Tutorial-Environment.postman_environment.json';
  }

  console.log('Server updated to:', server.name, server.baseUrl);
}

function setServer(serverKey) {
  if (SERVERS[serverKey]) {
    currentServer = serverKey;
    saveServerChoice(serverKey);
    updateServerDisplay();
  }
}

// ===================================================================
// HTML Escape (so JSON with text.div HTML displays as text, not rendered)
// ===================================================================

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===================================================================
// Copy to Clipboard Function
// ===================================================================

function copyToClipboard(text, button) {
  if (!navigator.clipboard) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showCopyFeedback(button);
    } catch (err) {
      console.error('Copy failed:', err);
    }
    document.body.removeChild(textarea);
    return;
  }

  navigator.clipboard.writeText(text)
    .then(() => {
      showCopyFeedback(button);
    })
    .catch(err => {
      console.error('Failed to copy:', err);
    });
}

function showCopyFeedback(button) {
  const originalText = button.textContent;
  button.textContent = 'Copied!';
  button.classList.add('copied');
  setTimeout(() => {
    button.textContent = originalText;
    button.classList.remove('copied');
  }, 2000);
}

// ===================================================================
// Progress Bar Update Function
// ===================================================================

function updateProgressBar(moduleNumber) {
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');

  if (progressBar) {
    const percentage = (moduleNumber / 6) * 100;
    progressBar.style.width = percentage + '%';
  }

  if (progressText) {
    progressText.textContent = `Module ${moduleNumber} of 6`;
  }
}

// ===================================================================
// LocalStorage Progress Tracking
// ===================================================================

function saveProgress(moduleNumber) {
  try {
    localStorage.setItem('fhir-tutorial-progress', moduleNumber.toString());
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

function loadProgress() {
  try {
    const saved = localStorage.getItem('fhir-tutorial-progress');
    return saved ? parseInt(saved, 10) : 1;
  } catch (e) {
    console.error('Failed to load progress:', e);
    return 1;
  }
}

function savePatientId(patientId) {
  try {
    localStorage.setItem('fhir-tutorial-patientId', patientId);
  } catch (e) {
    console.error('Failed to save patient ID:', e);
  }
}

function loadPatientId() {
  try {
    return localStorage.getItem('fhir-tutorial-patientId');
  } catch (e) {
    console.error('Failed to load patient ID:', e);
    return null;
  }
}

// ===================================================================
// Create Patient API Function
// ===================================================================

async function createPatient(familyName, givenName) {
  const patient = {
    resourceType: 'Patient',
    name: [{
      family: familyName,
      given: [givenName]
    }]
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(getPatientEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/fhir+json',
        'Accept': 'application/fhir+json'
      },
      body: JSON.stringify(patient),
      signal: controller.signal
    });

    clearTimeout(timeout);

    const text = await response.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      console.error('Failed to parse response:', e);
    }

    return { response, data, text };
  } catch (error) {
    clearTimeout(timeout);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out after 10 seconds');
    }
    throw error;
  }
}

// ===================================================================
// Fetch Patient API Function
// ===================================================================

async function fetchPatient(patientId) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(
      `${getPatientEndpoint()}/${encodeURIComponent(patientId)}`,
      {
        method: 'GET',
        headers: { 'Accept': 'application/fhir+json' },
        signal: controller.signal
      }
    );

    clearTimeout(timeout);

    const text = await response.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      console.error('Failed to parse response:', e);
    }

    return { response, data, text };
  } catch (error) {
    clearTimeout(timeout);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out after 10 seconds');
    }
    throw error;
  }
}

// ===================================================================
// DOMContentLoaded Event - Main Initialization
// ===================================================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing...');

  // ===============================================================
  // Server Selection Initialization
  // ===============================================================

  // Load saved server choice
  currentServer = loadServerChoice();

  // Set the dropdown to match saved choice
  const serverSelect = document.getElementById('serverSelect');
  if (serverSelect) {
    serverSelect.value = currentServer;

    // Handle server selection changes
    serverSelect.addEventListener('change', function() {
      setServer(this.value);
    });
  }

  // Update all server displays
  updateServerDisplay();

  // ===============================================================
  // Add Copy Buttons to Code Blocks
  // ===============================================================

  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach((codeBlock) => {
    const pre = codeBlock.parentElement;

    // Only add button if it doesn't exist
    if (!pre.querySelector('.copy-btn')) {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.textContent = 'Copy';
      copyBtn.setAttribute('aria-label', 'Copy code to clipboard');

      copyBtn.addEventListener('click', () => {
        copyToClipboard(codeBlock.textContent, copyBtn);
      });

      pre.style.position = 'relative';
      pre.appendChild(copyBtn);
    }
  });

  // ===============================================================
  // Smooth Scrolling for Navigation
  // ===============================================================

  const navLinks = document.querySelectorAll('.nav-links a, .sidebar > a');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ===============================================================
  // Active Section Tracking (IntersectionObserver)
  // ===============================================================

  const modules = document.querySelectorAll('.module');
  const navLinksArray = Array.from(document.querySelectorAll('.nav-links a'));

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const moduleId = entry.target.id;
        const moduleNumber = parseInt(moduleId.split('-')[1]);

        // Update active nav link
        navLinksArray.forEach(link => {
          if (link.getAttribute('href') === `#${moduleId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Update progress
        updateProgressBar(moduleNumber);
        saveProgress(moduleNumber);
      }
    });
  }, observerOptions);

  modules.forEach(module => {
    observer.observe(module);
  });

  // ===============================================================
  // Mobile Menu Toggle
  // ===============================================================

  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');

  if (hamburgerBtn && sidebar) {
    hamburgerBtn.addEventListener('click', function() {
      sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking a nav link (on mobile)
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('open');
        }
      });
    });

    // Close sidebar when clicking outside (on mobile)
    document.addEventListener('click', function(event) {
      if (window.innerWidth <= 768) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnHamburger = hamburgerBtn.contains(event.target);

        if (!isClickInsideSidebar && !isClickOnHamburger && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
        }
      }
    });
  }

  // ===============================================================
  // Load Saved Progress
  // ===============================================================

  const savedProgress = loadProgress();
  updateProgressBar(savedProgress);

  // Load saved patient ID
  const savedPatientId = loadPatientId();
  if (savedPatientId) {
    currentPatientId = savedPatientId;
    const patientIdInput = document.getElementById('patientIdInput');
    if (patientIdInput) {
      patientIdInput.value = savedPatientId;
    }
  }

  // ===============================================================
  // Track Postman Collection Downloads (Optional)
  // ===============================================================

  const collectionBtn = document.getElementById('downloadCollectionBtn');
  const environmentBtn = document.getElementById('downloadEnvironmentBtn');

  if (collectionBtn) {
    collectionBtn.addEventListener('click', () => {
      console.log('Postman collection downloaded');
      // Add analytics tracking here if needed
    });
  }

  if (environmentBtn) {
    environmentBtn.addEventListener('click', () => {
      console.log('Postman environment downloaded');
      // Add analytics tracking here if needed
    });
  }

  // ===============================================================
  // Create Patient Button Handler
  // ===============================================================

  const createPatientBtn = document.getElementById('createPatientBtn');
  const createResponseOutput = document.getElementById('createResponseOutput');
  const createdPatientIdDisplay = document.getElementById('createdPatientId');
  const copyCreateResponseBtn = document.getElementById('copyCreateResponseBtn');

  if (createPatientBtn) {
    createPatientBtn.addEventListener('click', async () => {
      const familyName = document.getElementById('patientFamilyName').value.trim();
      const givenName = document.getElementById('patientGivenName').value.trim();

      // Validate inputs
      if (!familyName || !givenName) {
        createResponseOutput.innerHTML = '<pre class="error">Error: Both family name and given name are required</pre>';
        createResponseOutput.classList.add('error');
        createResponseOutput.classList.remove('success');
        copyCreateResponseBtn.style.display = 'none';
        return;
      }

      // Show loading state
      createResponseOutput.innerHTML = '<pre class="loading">Creating patient...</pre>';
      createResponseOutput.classList.remove('success', 'error');
      createPatientBtn.disabled = true;
      copyCreateResponseBtn.style.display = 'none';

      try {
        const { response, data, text } = await createPatient(familyName, givenName);

        const statusLine = `HTTP ${response.status} ${response.statusText}`;
        const body = data ? JSON.stringify(data, null, 2) : (text || '(no body)');

        if (response.status === 201 && data && data.id) {
          // Success!
          currentPatientId = data.id;
          savePatientId(currentPatientId);

          // Update the fetch patient input
          const patientIdInput = document.getElementById('patientIdInput');
          if (patientIdInput) {
            patientIdInput.value = currentPatientId;
          }

          // Display patient ID prominently
          createdPatientIdDisplay.innerHTML = `
            <div class="success-message">
              ✓ Patient created successfully!<br>
              <strong>Patient ID: ${currentPatientId}</strong>
            </div>
          `;

          createResponseOutput.innerHTML = `<pre>${escapeHtml(statusLine + '\n\n' + body)}</pre>`;
          createResponseOutput.classList.add('success');
          createResponseOutput.classList.remove('error');
          copyCreateResponseBtn.style.display = 'block';
        } else {
          // Error response
          createResponseOutput.innerHTML = `<pre>${escapeHtml(statusLine + '\n\n' + body)}</pre>`;
          createResponseOutput.classList.add('error');
          createResponseOutput.classList.remove('success');
          copyCreateResponseBtn.style.display = 'block';
          createdPatientIdDisplay.innerHTML = '';
        }
      } catch (error) {
        createResponseOutput.innerHTML = `<pre class="error">Network error: ${escapeHtml(error.message)}</pre>`;
        createResponseOutput.classList.add('error');
        createResponseOutput.classList.remove('success');
        copyCreateResponseBtn.style.display = 'none';
        createdPatientIdDisplay.innerHTML = '';
      } finally {
        createPatientBtn.disabled = false;
      }
    });
  }

  // ===============================================================
  // Fetch Patient Button Handler
  // ===============================================================

  const fetchPatientBtn = document.getElementById('fetchPatientBtn');
  const fetchResponseOutput = document.getElementById('fetchResponseOutput');
  const copyFetchResponseBtn = document.getElementById('copyFetchResponseBtn');

  if (fetchPatientBtn) {
    fetchPatientBtn.addEventListener('click', async () => {
      const patientId = document.getElementById('patientIdInput').value.trim();

      // Validate input
      if (!patientId) {
        fetchResponseOutput.innerHTML = '<pre class="error">Error: Please enter a Patient ID</pre>';
        fetchResponseOutput.classList.add('error');
        fetchResponseOutput.classList.remove('success');
        copyFetchResponseBtn.style.display = 'none';
        return;
      }

      // Show loading state
      fetchResponseOutput.innerHTML = '<pre class="loading">Fetching patient...</pre>';
      fetchResponseOutput.classList.remove('success', 'error');
      fetchPatientBtn.disabled = true;
      copyFetchResponseBtn.style.display = 'none';

      try {
        const { response, data, text } = await fetchPatient(patientId);

        const statusLine = `HTTP ${response.status} ${response.statusText}`;
        const body = data ? JSON.stringify(data, null, 2) : (text || '(no body)');

        fetchResponseOutput.innerHTML = `<pre>${escapeHtml(statusLine + '\n\n' + body)}</pre>`;

        if (response.ok && data && data.resourceType === 'Patient') {
          fetchResponseOutput.classList.add('success');
          fetchResponseOutput.classList.remove('error');
        } else {
          fetchResponseOutput.classList.add('error');
          fetchResponseOutput.classList.remove('success');
        }

        copyFetchResponseBtn.style.display = 'block';
      } catch (error) {
        fetchResponseOutput.innerHTML = `<pre class="error">Network error: ${escapeHtml(error.message)}</pre>`;
        fetchResponseOutput.classList.add('error');
        fetchResponseOutput.classList.remove('success');
        copyFetchResponseBtn.style.display = 'none';
      } finally {
        fetchPatientBtn.disabled = false;
      }
    });
  }

  // ===============================================================
  // Clear Response Buttons
  // ===============================================================

  const clearCreateBtn = document.getElementById('clearCreateBtn');
  if (clearCreateBtn) {
    clearCreateBtn.addEventListener('click', () => {
      createResponseOutput.innerHTML = '<pre>Enter patient details and click "Create Patient"</pre>';
      createResponseOutput.classList.remove('success', 'error');
      createdPatientIdDisplay.innerHTML = '';
      copyCreateResponseBtn.style.display = 'none';
    });
  }

  const clearFetchBtn = document.getElementById('clearFetchBtn');
  if (clearFetchBtn) {
    clearFetchBtn.addEventListener('click', () => {
      fetchResponseOutput.innerHTML = '<pre>Click "Fetch Patient" to see results...</pre>';
      fetchResponseOutput.classList.remove('success', 'error');
      copyFetchResponseBtn.style.display = 'none';
    });
  }

  // ===============================================================
  // Copy Response Buttons
  // ===============================================================

  if (copyCreateResponseBtn) {
    copyCreateResponseBtn.addEventListener('click', () => {
      const text = createResponseOutput.textContent;
      copyToClipboard(text, copyCreateResponseBtn);
    });
  }

  if (copyFetchResponseBtn) {
    copyFetchResponseBtn.addEventListener('click', () => {
      const text = fetchResponseOutput.textContent;
      copyToClipboard(text, copyFetchResponseBtn);
    });
  }

  // ===============================================================
  // Reset Progress Button
  // ===============================================================

  const resetProgressBtn = document.getElementById('resetProgressBtn');
  if (resetProgressBtn) {
    resetProgressBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all progress? This will clear your saved module progress, patient ID, and server selection.')) {
        try {
          localStorage.removeItem('fhir-tutorial-progress');
          localStorage.removeItem('fhir-tutorial-patientId');
          localStorage.removeItem('fhir-tutorial-server');
          currentPatientId = null;
          currentServer = 'hapi';

          // Reset UI
          updateProgressBar(1);

          // Reset server selection
          const serverSelect = document.getElementById('serverSelect');
          if (serverSelect) {
            serverSelect.value = 'hapi';
          }
          updateServerDisplay();

          // Clear patient ID input
          const patientIdInput = document.getElementById('patientIdInput');
          if (patientIdInput) {
            patientIdInput.value = '';
          }

          // Remove active class from all nav links
          navLinksArray.forEach(link => link.classList.remove('active'));

          alert('Progress reset successfully! Scroll to the top to start from Module 1.');
        } catch (e) {
          console.error('Failed to reset progress:', e);
          alert('Failed to reset progress. Please try again.');
        }
      }
    });
  }

  console.log('Initialization complete');
});
