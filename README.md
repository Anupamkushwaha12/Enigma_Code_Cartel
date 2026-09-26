Team Name: code_cartal
Members: Anupam Kushwaha
           Rahil Majithia
           Mohammed Amaan Shaikh
           Krishi Oza

# AXIA - Managed B2B Resource Exchange

AXIA is an active, managed B2B resource-exchange infrastructure platform that helps industrial enterprises and IT asset disposition (ITAD) teams move surplus resources to markets where they have meaningful value.

> Where surplus finds its next value.

## Problem Statement

Industrial enterprises and corporate ITAD departments face a geographical value discrepancy:

- High-wage markets such as Dallas, USA decommission large volumes of working laptops and surplus assets. Locally, these assets can have near-zero scrap value because labor and processing costs are high.
- Indian refurbishers, foundries, and manufacturers face supply deficits and may be willing to pay healthy landed margins of approximately INR 18,000-22,000 per laptop.
- Classified marketplaces such as Alibaba and IndiaMART generally only introduce counterparties. This leaves participants exposed to disintermediation, escrow defaults, unexpected customs seizures, EPR/DGFT/BIS violations, and cargo abandonment.
- Cross-border transactions are frequently executed without a complete landed-cost calculation, including freight, insurance, 7.5% customs duty, 18% IGST, and testing costs. A shipment that looks profitable at first can therefore produce a negative margin.

## AXIA Solution

AXIA sits between suppliers and receivers and actively manages discovery, economics, logistics, compliance, and impact.

### Commercial anonymity

Counterparties do not see each other's identity, phone number, or pricing margins. A supplier sees `IND - Mumbai Distribution Hub`, while a receiver sees `USA - Dallas Logistics Hub`.

### Two-tier geographic scope

**Inside India:** Broad industrial resource exchange, including:

- Steel billets
- Copper cathodes
- 6063 aluminum offcuts
- Polymer regrinds
- Capital machinery

**International (USA/China to India):** High-arbitrage secondary electronics and components, including:

- Enterprise laptops
- Server RAM
- NVMe SSDs
- Smartphones

### Landed economics engine

AXIA deterministically calculates whether moving a resource creates positive net value before trade execution. Opportunities are classified as:

- `VIABLE`
- `NOT VIABLE`

The calculation accounts for the expected sale value, freight, insurance, customs duty, IGST, testing, and other applicable costs.

### Deterministic buyer auction

1. **One interested buyer:** Execute a direct buy with no auction delay.
2. **Multiple interested buyers:** Open an anonymous multi-buyer auction for Buyer A, Buyer B, Buyer C, and other qualified participants.

### On-demand impact accounting

Avoided-emissions calculations are generated only when requested. AXIA avoids presenting impact estimates as a default claim or using them as greenwashing.

## Technology Stack

- **Framework:** React 19.0.1 with modular functional components and custom hooks
- **Language:** TypeScript 7.0.2 with strict end-to-end typed domain models
- **Build tool:** Vite 8.3.0
- **Styling:** Tailwind CSS 4.3.3 with `@tailwindcss/vite` and custom corporate slate design tokens
- **Iconography and motion:** Lucide React 0.546.0 and Motion 12.23.24
- **Data formatting:** Tabular numerals and monospace typography for precise ledger alignment
- **AI integration:** Google Gemini API through `@google/genai`

## Getting Started

### Prerequisites

- Node.js and npm
- A Gemini API key if AI-backed functionality is enabled

### Installation

```bash
git clone https://github.com/Anupamkushwaha12/Enigma_Code_Cartel.git
cd Enigma_Code_Cartel
npm install
```

### Environment configuration

Copy the example environment file and configure the values:

```bash
cp .env.example .env
```

Set `GEMINI_API_KEY` in `.env` when using Gemini-powered functionality. Keep `.env` out of version control.

### Run the development server

The development server runs on port `3000`:

```bash
npm run dev
```

Open `http://localhost:3000` in a browser.

### Validate and build

```bash
# Type-check the project
npm run lint

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Repository Structure

```text
src/
  components/   Feature and shared UI components
  context/      Application state and providers
  data/         Demo and domain data
  types/        Shared TypeScript domain models
  utils/        Matching, landed-cost, and impact calculation engines
```
