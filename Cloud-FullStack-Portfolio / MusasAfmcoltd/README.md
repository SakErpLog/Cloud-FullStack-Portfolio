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

## 🌐 Background Architecture & Data Pipelines

To bridge core operational entry logs with external micro-services, the environment relies on two core daemon arrays:
1. **Web Request Proxy Routing:** Handled via an optimized **Nginx** reverse proxy to cleanly isolate virtual environments and process concurrent connections without structural collision.
2. **Asynchronous Background Tasks:** Orchestrated via **Supervisor** daemons driving distinct low-latency **Redis** queues (Short, Long, and Default background workers) to process intense payroll or analytical ledger compilation tasks away from the primary user thread.

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
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Activate isolated virtual environment wrapper and initialize the Frappe engine core
source /home/abdulafmco/env/bin/activate
bench init frappe-bench --frappe-branch version-15
cd /home/abdulafmco/frappe-bench

# Fetch core enterprise functional application files
bench get-app erpnext --branch version-15

# Provision critical system process monitors, reverse proxies, and Node runtime engines
sudo apt update && sudo apt install -y supervisor nginx
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Activate isolated virtual environment wrapper and initialize the Frappe engine core
source /home/abdulafmco/env/bin/activate
bench init frappe-bench --frappe-branch version-15
cd /home/abdulafmco/frappe-bench

# Fetch core enterprise functional application files
bench get-app erpnext --branch version-15

# Sourcing the public open-source Lavaloon KSA tax localization module
bench get-app https://github.com/lavaloon-eg/ksa_compliance.git --branch version-15

# Link the core business framework tools directly to the active site container database
bench --site afmco.production.local install-app erpnext
bench --site afmco.production.local install-app ksa_compliance

# Resolve explicit required app dependencies by pulling the Human Resource Management module
bench get-app hrms --branch version-15
bench --site afmco.production.local install-app hrms

# Fetch custom accommodation and facilities spatial logistics tracking framework (Apex Habitat)
bench get-app https://github.com/iabodysa/apex.git

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
