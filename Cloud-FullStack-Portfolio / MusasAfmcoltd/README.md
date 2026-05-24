# 🏢 Mussa & AFMCO Ltd — Enterprise Cloud ERP Deployment & ZATCA Integration

A production-grade, end-to-end cloud rollout of an enterprise Resource Planning system utilizing the **Frappe Framework** and **ERPNext v15**. This deployment features multi-tenant module isolation, custom facility spatial tracking via **Apex Habitat**, and full phase-2 cryptographic e-invoicing localization compliant with the Saudi Arabian Tax and Customs Authority (**ZATCA**) framework.

---

## 🖥️ Core Infrastructure Requirements & Environment

The architecture is built and hardened on a high-performance cloud virtualization host to guarantee transactional integrity and high concurrency processing:

* **Cloud Hosting Instance:** Contabo VPS Cloud 10
* **Operating System Platform:** Ubuntu 22.04.5 LTS
* **Kernel Architecture Tree:** `5.15.0-173-generic` (x86_64 Structure)
* **Isolated Environment Runtime:** Python 3.10.12 (Standalone `python-venv`)
* **Database Management Engine:** MariaDB (Optimized internal thread pooling)
* **Production Deployment Status:** Active and operating cleanly via Server Public IP (`161.97.67.153`)

---

## 📦 Installed Applications Stack

The production site manages a fully integrated stack of enterprise modules, ensuring a seamless data lifecycle across logistics, finance, human resources, and regional compliance:

| Application | Version | Branch | Description |
| :--- | :--- | :--- | :--- |
| **Frappe Framework** | `15.108.0` | `version-15` | Core full-stack framework, metadata engine, and low-code rapid development platform. |
| **ERPNext** | `15.108.3` | `version-15` | Core Enterprise Resource Planning (ERP) suite handling foundational masters, accounts, and dimensions. |
| **HRMS** | `15.60.3` | `version-15` | Human Resource Management System managing employee data, shifts, and payroll structures. |
| **KSA Compliance Suite** | `0.61.2` | `master` | Regional localization handling phase-2 ZATCA tax cryptographic configurations and compliance engines. |
| **Apex Habitat** | `0.6.0` | `apex` | Custom application handling operational accommodation, capacity tracking, maintenance, and isolated memo ledger management. |

---

## 🌐 Background Architecture & Data Pipelines

To bridge core operational entry logs with external micro-services, the environment relies on two core daemon arrays:
1. **Web Request Proxy Routing:** Handled via an optimized **Nginx** reverse proxy to cleanly isolate virtual environments and process concurrent connections without structural collision.
2. **Asynchronous Background Tasks:** Orchestrated via **Supervisor** daemons driving distinct low-latency **Redis** queues (Short, Long, and Default background workers) to process intense payroll or analytical ledger compilation tasks away from the primary user thread.

---

## 🚀 DevOps & Zero-Downtime Deployment Pipelines

To maintain 100% platform availability and completely eliminate `503 Service Unavailable` routing errors during hot-fixes and developer pushes, the environment utilizes a hot-swappable deployment execution pipeline.

### The Zero-Downtime Update Sequence:
1. **The Git Integration Layer:** Uses stashing strategies (`git stash` / `git pull` / `git stash pop`) to isolate machine-specific version identifiers, clearing merge conflicts automatically before pulling from the active deployment branch (`apex`).
2. **Process Suspension:** Gracefully pauses asynchronous background loops via Supervisor (`sudo supervisorctl stop frappe-bench-workers:`) *before* applying changes. This blocks code threads from writing data while database schemas alter, preventing database locks.
3. **Automated Schema Ingestion:** Executes `bench migrate` to update relational MariaDB structures derived from version-controlled JSON definitions, automatically firing required multi-version Python patch scripts.
4. **Asset Compilation Pipeline:** Triggers frontend build optimizations (**Esbuild** for standard desktop desks and **Vite** for custom single-page progressive applications), grouping and minifying static assets down into compressed production distribution bundles.

---

## 🔌 Modules & Native Integrations

The platform features an isolated **Operational Memo Ledger** ecosystem. All daily cost-recoveries, facilities utilization rates, and operational asset deductions populate a custom data tracking ledger, entirely decoupling high-frequency logistics analysis from the core General Ledger (GL).

* **HRMS & Payroll Automation:** Implements a direct mapping hook to the HRMS module. When custody supervisors log asset damage metrics, the platform handles employee salary deductions natively by generating isolated `Additional Salary` records rather than relying on hardcoded name lookups.
* **Automated Rental Scheduling:** Integrates automated leasing calculators. Inputting a specific billing cycle (Monthly, Quarterly, Semi-Annual, Annual) and a period anchor date automatically auto-populates the entire target Rent Payment Schedule child table upon saving.
* **Utility Cost-Split Engine:** Features a shared-meter cost allocation matrix. When a main utility meter handles multiple buildings, entering the primary invoice alongside a custom `Utility cost share %` auto-calculates precise landlord-split proportions, saving a clean audit string.
* **Public Worker Intake Web Forms:** Bypasses standard system desktop authentication limits by mapping explicit public website routing maps (`accommodation-resident-request`). Workers can scan room-specific QR codes to register maintenance requests directly into internal coordinator triaging queues.
* **Localized KSA Compliance Interface:** Refined with scoped workspace element CSS styles to adapt user components across varying browser resolutions, while supporting Right-to-Left (RTL) safety for Arabic-locale translations.

---

## 🛠️ Chronological Step-by-Step Production Configuration

The following verified terminal execution sequence traces the host provisioning, dependency resolution, localization injection, and final production state orchestration:

### 1. Host Hardening & Network Buffer Optimization
```bash
# Purge fractured runtime directories and clear downstream download caches
rm -rf /home/abdulafmco/frappe-bench
rm -rf /home/abdulafmco/.cache/uv

# Extend global network tolerances to safely handle heavy multi-thread repository distributions
git config --global http.postBuffer 524288000
git config --global http.maxRequestSize 524288000
git config --global http.version HTTP/1.1

# Provision critical system process monitors, reverse proxies, and Node runtime engines
sudo apt update && sudo apt install -y supervisor nginx
curl -fsSL [https://deb.nodesource.com/setup_18.x](https://deb.nodesource.com/setup_18.x) | sudo -E bash -

# Activate isolated virtual environment wrapper and initialize the Frappe engine core
source /home/abdulafmco/env/bin/activate
bench init frappe-bench --frappe-branch version-15
cd /home/abdulafmco/frappe-bench

# Fetch core enterprise functional application files
bench get-app erpnext --branch version-15

# Sourcing the public open-source Lavaloon KSA tax localization module
bench get-app [https://github.com/lavaloon-eg/ksa_compliance.git](https://github.com/lavaloon-eg/ksa_compliance.git) --branch version-15

# Link the core business framework tools directly to the active site container database
bench --site afmco.production.local install-app erpnext
bench --site afmco.production.local install-app ksa_compliance

# Resolve explicit required app dependencies by pulling the Human Resource Management module
bench get-app hrms --branch version-15
bench --site afmco.production.local install-app hrms

# Fetch custom accommodation and facilities spatial logistics tracking framework (Apex Habitat)
bench get-app [https://github.com/iabodysa/apex.git](https://github.com/iabodysa/apex.git)

# NOTE: Applied a setup patch to setup.py line 92 to force insert mandatory lifecycle years fields:
# From: doc.insert(ignore_permissions=True)
# To: doc.insert(ignore_permissions=True, ignore_if_duplicate=True, ignore_mandatory=True)

# Complete the setup installation cycle for custom facility trackers
bench --site afmco.production.local install-app apex_habitat

# Fire structural database migrations to map new custom schemas and fields inside MariaDB
bench --site afmco.production.local migrate

# Purge manual, duplicate or conflicting symlinks to pass structural Nginx configuration tests
sudo rm -f /etc/nginx/conf.d/frappe.conf
sudo apt install -f -y
sudo ln -sf /home/abdulafmco/env/bin/bench /usr/local/bin/bench

# Generate clean supervisor worker blocks and web mapping templates from the active binaries
sudo /home/abdulafmco/env/bin/bench setup supervisor
sudo /home/abdulafmco/env/bin/bench setup nginx

# Link fresh site proxy files and commit the host into production-ready modes
sudo mkdir -p /etc/nginx/conf.d
sudo ln -sf /home/abdulafmco/frappe-bench/config/nginx.conf /etc/nginx/conf.d/frappe.conf
sudo /home/abdulafmco/env/bin/bench setup production abdulafmco

# Open directory access parameters and optimize browser asset bundles
sudo chmod o+x /home/abdulafmco
bench --site afmco.production.local clear-cache
bench build --force
sudo systemctl restart nginx
