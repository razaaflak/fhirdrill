# FHIR Patient Resource Tutorial

An interactive, hands-on tutorial for learning how to work with FHIR Patient resources using the HAPI FHIR test server.

![FHIR Tutorial](https://img.shields.io/badge/FHIR-R4-blue)
![License](https://img.shields.io/badge/license-Educational-green)
![Status](https://img.shields.io/badge/status-Active-success)

---

## 🎯 What You'll Learn

This tutorial teaches you how to:

- ✅ Understand FHIR Patient resource structure
- ✅ Set up Postman for FHIR testing
- ✅ **CREATE** new patients (POST requests)
- ✅ **READ** patient data (GET requests)
- ✅ **UPDATE** patient information (PUT/PATCH requests)
- ✅ **DELETE** patients (DELETE requests)
- ✅ **SEARCH** for patients with various parameters
- ✅ Handle errors and OperationOutcome responses
- ✅ Work with Bundle responses for search results

---

## 🚀 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Edge, or Safari)
- Internet connection (for API calls to HAPI server)
- Basic understanding of HTTP and JSON

### Running Locally

1. **Clone or download this repository**

   ```bash
   git clone https://github.com/yourusername/fhirdrill.git
   cd fhirdrill
   ```

2. **Start a local web server**

   The tutorial uses the Fetch API which requires an HTTP server (not file://).

   **Option A: Python 3**
   ```bash
   python -m http.server 8000
   ```

   **Option B: Node.js**
   ```bash
   npx serve
   ```

   **Option C: VS Code Live Server**
   - Install the "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **Open in your browser**

   Navigate to: **http://localhost:8000**

4. **Start learning!**

   Follow the 5 modules sequentially, completing the interactive exercises.

---

## 📚 Tutorial Structure

### Module 1: Introduction to FHIR
- What is FHIR and why it matters
- Anatomy of a Patient resource
- Key Patient elements reference

### Module 2: Environment Setup
- Understanding the HAPI FHIR test server
- Configuring Postman for FHIR
- Setting up environment variables and headers

### Module 3: Creating a Patient (POST)
- Creating new patients via web app
- Creating patients via Postman
- Minimal and comprehensive payloads
- Understanding 201 Created responses
- **Interactive Exercise:** Create your own test patient

### Module 4: Reading Patient Data (GET)
- Fetching patients by ID via Postman
- Reading the patient you created in Module 3
- Handling 404 errors and 410 Gone
- Understanding OperationOutcome responses

### Module 5: Advanced Operations (PUT, PATCH, DELETE)
- Full resource replacement (PUT) via Postman
- Partial updates (PATCH) via Postman
- Deleting patients (DELETE) via Postman
- Working with the patient from Module 3

### Module 6: Search Operations
- Search parameters reference
- Combining search criteria (AND/OR logic)
- Pagination and sorting
- Understanding Bundle responses

### Quick Reference
- Server configuration
- Common endpoints
- HTTP status codes
- Search parameters cheat sheet

---

## 🎮 Interactive Features

### Try-It Sections

The tutorial includes a hands-on exercise in Module 3 where you can:

- **Create Patient**: Enter a name and create a real patient on the HAPI test server directly from the web app
- **Copy Payloads**: Copy JSON payloads to use in Postman
- **Learn by Doing**: All other operations (GET, PUT, PATCH, DELETE, SEARCH) are done via Postman for real-world practice

### Progress Tracking

- ✅ Automatic progress saving (localStorage)
- ✅ Visual progress bar
- ✅ Active section highlighting
- ✅ Patient ID persistence for exercises

### Copy-to-Clipboard

Every code example has a "Copy" button for easy testing in Postman or other tools.

---

## 🧪 Testing

### Automated Tests

Run comprehensive automated tests:

```bash
# Start server
python -m http.server 8000

# Open in browser
http://localhost:8000/tests/automated-tests.html
```

**Tests include:**
- DOM structure validation
- JavaScript functionality
- Accessibility checks
- localStorage persistence

### Integration Tests

Test real API calls to HAPI server:

```bash
http://localhost:8000/tests/integration-tests.html
```

**Tests include:**
- CREATE patient operations
- READ patient operations
- SEARCH operations
- Error handling
- Timeout management

### Manual Testing

Follow the comprehensive guide:
- [Manual Testing Guide](docs/manual-testing-guide.md) - 15-minute quick test
- [Detailed Testing Checklist](docs/testing-checklist.md) - Full QA checklist

---

## 📖 Documentation

- **[Implementation Plan](docs/implementation_plan.md)** - Original design specification
- **[Task Tracker](docs/todo.md)** - Development progress tracker
- **[CLAUDE.md](CLAUDE.md)** - Technical architecture guide

---

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, media queries
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Prism.js** - Syntax highlighting for code examples
- **HAPI FHIR Server** - Live FHIR R4 test server

### No Build Required

This is a pure static site with zero build dependencies. Just serve the files!

---

## 🎨 Features

### Responsive Design

- 📱 Mobile-first approach
- 📱 Hamburger menu for small screens
- 💻 Fixed sidebar for desktop
- 📐 Tested at 320px, 768px, 1024px, 1440px

### Accessibility (WCAG 2.1 AA)

- ⌨️ Full keyboard navigation
- 🔊 Screen reader compatible
- 🎨 4.5:1 contrast ratios
- ♿ ARIA labels and live regions
- ⏸️ Respects `prefers-reduced-motion`

### Performance

- 🚀 Under 3-second load time
- 📸 Lazy-loaded images
- 💾 Minimal external dependencies
- ⚡ No build step, instant refresh

---

## 🔗 HAPI FHIR Test Server

This tutorial uses the public HAPI FHIR test server:

- **Base URL:** `https://hapi.fhir.org/baseR4`
- **Version:** FHIR R4 (4.0.1)
- **Authentication:** None required
- **CORS:** Fully enabled

⚠️ **Important Notes:**
- This is a **public test server** - never use real patient data
- Data is periodically purged
- Server may be slow or rate-limited during peak times
- For production use, deploy your own HAPI FHIR server

---

## 📂 File Structure

```
fhirdrill/
├── index.html                 # Main tutorial page
├── styles.css                 # All styling
├── app.js                     # All JavaScript
├── README.md                  # This file
├── CLAUDE.md                  # Technical documentation
├── assets/
│   ├── img/
│   │   └── postman-screenshots/   # Tutorial screenshots
│   └── icons/                      # UI icons
├── docs/
│   ├── implementation_plan.md      # Design specification
│   ├── todo.md                     # Task tracker
│   ├── testing-checklist.md       # QA checklist
│   └── manual-testing-guide.md    # Quick test guide
└── tests/
    ├── automated-tests.html        # Automated test suite
    └── integration-tests.html      # API integration tests
```

---

## 🐛 Known Issues

1. **Placeholder Images**
   - Screenshot placeholders are gray boxes with text
   - Need to be replaced with actual Postman screenshots

2. **HAPI Server Reliability**
   - Public server may be slow or unavailable
   - May return 429 (rate limit) errors
   - Tutorial includes error handling for these cases

3. **Clipboard API**
   - Requires HTTPS or localhost
   - Fallback provided for older browsers

---

## 🤝 Contributing

This is an educational project. Contributions are welcome!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Run tests (`http://localhost:8000/tests/automated-tests.html`)
5. Commit your changes (`git commit -m 'Add improvement'`)
6. Push to the branch (`git push origin feature/improvement`)
7. Open a Pull Request

### Development Workflow

1. Make changes to HTML/CSS/JS
2. Hard refresh browser (Ctrl+Shift+R)
3. Run automated tests
4. Run integration tests
5. Follow manual testing guide
6. Update documentation

---

## 📋 Browser Support

Tested and working on:

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

**Features requiring modern browsers:**
- Fetch API
- IntersectionObserver
- localStorage
- CSS Grid and Flexbox
- CSS Custom Properties

---

## 📜 License

This project is for **educational purposes only**.

- Tutorial content: Free to use and modify
- FHIR specification: HL7 FHIR® standard
- HAPI FHIR Server: Apache License 2.0

---

## 🙏 Acknowledgments

- **HL7 FHIR®** - For the FHIR specification
- **HAPI FHIR** - For the public test server
- **Prism.js** - For syntax highlighting
- **Healthcare Developer Community** - For feedback and support

---

## 📞 Support

### Resources

- 📖 [Official FHIR Documentation](https://hl7.org/fhir/patient.html)
- 🏥 [HAPI FHIR Homepage](https://hapi.fhir.org/)
- 📚 [FHIR Resource List](https://www.hl7.org/fhir/resourcelist.html)
- 🔌 [FHIR RESTful API](https://www.hl7.org/fhir/http.html)

### Getting Help

1. Check [docs/todo.md](docs/todo.md) for known issues
2. Review [CLAUDE.md](CLAUDE.md) for technical details
3. Run tests to diagnose problems
4. Check browser console for errors

---

## 🎓 Learning Path

### Beginner Path (First Time)

1. ✅ Read Module 1 (Introduction)
2. ✅ Set up Postman (Module 2)
3. ✅ Try fetching a patient (Module 3)
4. ✅ Create your first patient (Module 4)
5. ✅ Review Quick Reference

### Intermediate Path (Refresher)

1. ✅ Skip to Module 4
2. ✅ Create a patient
3. ✅ Practice CRUD operations
4. ✅ Explore search parameters (Module 5)

### Advanced Path (Reference)

1. ✅ Use Quick Reference section
2. ✅ Copy code examples directly
3. ✅ Focus on search operations
4. ✅ Review Bundle structure

---

## 🚀 Deployment

### Deploy to GitHub Pages

```bash
git add .
git commit -m "Deploy FHIR tutorial"
git push origin main

# Enable GitHub Pages in repository settings
# Source: main branch, root folder
```

### Deploy to Netlify

```bash
# Drag and drop the fhirdrill folder to Netlify
# Or connect your GitHub repository
# Build command: (none)
# Publish directory: /
```

### Deploy to Vercel

```bash
vercel deploy
# Follow prompts
# No build configuration needed
```

---

## 📊 Project Status

| Phase | Status | Completion |
|-------|--------|------------|
| Phase 1: Project Setup | ✅ Complete | 100% |
| Phase 2: HTML Foundation | ✅ Complete | 100% |
| Phase 3: CSS Foundation | ✅ Complete | 100% |
| Phase 4: JavaScript Functionality | ✅ Complete | 100% |
| Phase 5: Module Content | ✅ Complete | 100% |
| Phase 6: Quality Assurance | ✅ Testing Infrastructure | 95% |
| Phase 7: Final Polish | 🚧 In Progress | 80% |

---

## 🎯 Next Steps

- [ ] Replace placeholder screenshots with actual Postman images
- [ ] Add more search examples
- [ ] Create video walkthrough
- [ ] Add downloadable Postman collection
- [ ] Translate to other languages

---

**Happy Learning! 🎉**

*Built with ❤️ for the healthcare developer community*
