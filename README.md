# Onboardly 

**Eliminating the "Onboarding Black Hole" for Professional Service Firms.**

Onboardly is a high-security, multi-tenant SaaS platform designed to replace fragmented email threads and lost documents with a centralized, white-labeled "front door" for client intake. By automating administrative workflows, Onboardly helps Law Firms, Creative Agencies, and Financial Advisors reclaim billable hours and ensure 100% compliance.

---

##  Key Features

### The "Gatekeeper" Policy Engine
A configurable logic gate that manages the client journey through two distinct modes:
* **Strict Mode (Sequential):** Programmatically enforces a linear path. Tasks like "Conflict of Interest" remain locked until a verified digital signature is recorded.
* **Parallel Mode (Agile):** Treats onboarding as a non-sequential checklist, allowing clients to complete tasks in any order.

### Dynamic White-Labeling
* **CSS Variable Engine:** Injects tenant-specific logos and hex codes into the UI within **200ms** of page load for a native brand experience.
* **Atomic Design System:** A standardized UI library (Atoms, Molecules, Organisms) ensuring consistency across all portals.

### Enterprise-Grade Security
* **Data Isolation:** Total multi-tenant separation using **Supabase Row-Level Security (RLS)**.
* **Secure Vault:** Industry-standard AES-256 encryption for all uploaded legal documents and sensitive client data.

---

## Tech Stack

* **Frontend:** [Vite.js](https://vite.dev/) (App Router) & [TypeScript](https://www.typescriptlang.org/)
* **Backend:** [Node.js](https://nodejs.org/) logic layer
* **Database:** [Supabase](https://supabase.com/) / PostgreSQL
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) with Dynamic CSS Variables
* **Infrastructure:** [Vercel](https://vercel.com/) / Caddy for automated SSL and Custom Domain Orchestration

---

## Architecture

The system follows a **Serverless Monolith** pattern with a focus on **Atomic Infrastructure**:
* **Global Atoms:** Core shared services (Auth, Global Admin).
* **Tenant Molecules:** Specific configurations (Branding assets, Domain mappings).
* **Tenant Organisms:** Isolated logic processes (Policy Engine, Workflow Builder).

---

## Getting Started

### Prerequisites
* Node.js 18+
* Supabase Account

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/onboardly.git](https://github.com/your-username/onboardly.git)
