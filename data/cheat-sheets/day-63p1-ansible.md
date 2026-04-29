---
title: "Free CCNA | Ansible, Puppet, & Chef | Day 63 (part 1) | CCNA 200-301 Complete Course"
type: ccna-cheat-sheet
day: day-63p1
source_transcript: "[[../jeremy-it-videos/124-ansible-puppet-chef-day-63-part-1]]"
source_url: https://www.youtube.com/watch?v=Kog9gHTjALI
created: 2026-04-28
tags: [ccna, cheat-sheet, day-63p1]
---

# Day 63 (Part 1) — Ansible, Puppet, Chef

## 🎯 What this video covers

Maps to v1.1 blueprint **6.6 Recognize components of automation tools (Ansible, Terraform)**. ⚠️ Note: **v1.1 dropped Puppet and Chef** from the explicit list and added **Terraform** (covered Day 63 part 2). Jeremy's video predates that change. Read as background, but exam-priority is Ansible + Terraform.

## 🧠 Core Concept

**Configuration management tools push standard configs to many devices, preventing config drift. Ansible (Python, agentless, push, YAML) is the modern winner for network gear.**

## 🔑 Must-Know Table

| Tool | Language | Agent? | Model | Files | Port |
|---|---|---|---|---|---|
| **Ansible** ✅v1.1 | Python | **Agentless (SSH)** | **Push** | YAML (playbooks, inventory, vars), Jinja2 (templates) | SSH 22 |
| **Puppet** (legacy) | Ruby | Agent-based (or proxy) | **Pull** | Manifest, proprietary DSL | TCP **8140** |
| **Chef** (legacy) | Ruby | Agent-based | **Pull** | Cookbook, recipe, run-list, Ruby DSL | TCP **10002** |
| **Terraform** ✅v1.1 (Day 63 part 2) | HCL | Agentless | Push (declarative) | `.tf` files | varies |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Push vs Pull** | Push (Ansible) = server reaches out and configures. Pull (Puppet/Chef) = client checks in and downloads |
| **Agentless vs Agent-based** | Agentless (Ansible) = uses SSH, no software on device. Agent-based (Puppet/Chef) = special daemon on device |
| **Configuration drift** | Devices' real config slowly diverges from intended template through ad-hoc fixes — what these tools prevent |
| **Templates + variables** | Template = config skeleton with placeholders. Variables = per-device specifics. Combine → final config |

## 🔗 How it all connects

```
Inventory (devices) + Templates (Jinja2) + Variables (YAML) → Playbook (YAML) → Ansible pushes via SSH
```

## 🚨 Exam Traps

- **Ansible is AGENTLESS** — uses SSH to managed devices. No daemon to install. This is why it dominates network use.
- **Ansible uses PUSH model.** Puppet and Chef use PULL.
- **Ansible written in Python.** Puppet and Chef written in Ruby.
- **Puppet's port is TCP 8140.** Chef's port is TCP 10002.
- **Ansible uses YAML for playbooks/inventory/vars** and **Jinja2 for templates** — two different formats.
- **`Manifest` = Puppet term.** **`Cookbook/Recipe/Run-list` = Chef terms.** **`Playbook` = Ansible term.** Don't mix.

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Agentless config-mgmt tool | **Ansible** |
| Push model tools | **Ansible** |
| Pull model tools | **Puppet, Chef** |
| Tools using a client-server model | **All three** |
| Written in Ruby | **Puppet, Chef** |
| Written in Python | **Ansible** |
| Uses TCP 8140 | **Puppet** |
| Uses TCP 10002 | **Chef** |
| Ansible playbook format | **YAML** |
| Ansible template format | **Jinja2** |
| Puppet's main config file | **Manifest** |
| Chef's grouped recipes | **Cookbook** |

## ⚡ One-Line Master Recall

**Ansible = Python, Agentless, Push, YAML, SSH. Puppet/Chef = Ruby, Agent, Pull, REST API, custom DSLs.**

## ➕ EXTRA — not in video, but on the exam

- **⚠️ v1.1 BLUEPRINT CHANGE:** v1.1's 6.6 lists ONLY **Ansible** + **Terraform** as named tools. Puppet and Chef have been dropped from the exam topic. Jeremy's video covers all three for background, but **exam priority is Ansible + Terraform** (Day 63 part 2).
- **Terraform** — declarative IaC tool from HashiCorp, written in Go, uses HCL (HashiCorp Configuration Language). Focuses on provisioning infrastructure (cloud, networks). Uses **state files** to track what's deployed. Compare with Ansible: Terraform = provision, Ansible = configure (though overlap exists).
- **Idempotency** — running the same playbook twice produces the same end state. Core property of all three tools.

## 🧾 Recap

- **Ansible (v1.1):** Python, agentless, push, YAML/Jinja2, uses SSH. The modern default.
- **Puppet (legacy):** Ruby, agent-based, pull, manifests, TCP 8140.
- **Chef (legacy):** Ruby, agent-based, pull, cookbooks/recipes, TCP 10002.
- **Terraform (v1.1):** HCL, declarative, focuses on provisioning — covered Day 63 part 2.
- **All prevent configuration drift** via templates + variables + idempotent runs.
- If you can fill in the comparison chart from memory, move to Day 63 part 2 (Terraform).

---
Source: Jeremy's IT Lab — Day 63 (part 1) — https://www.youtube.com/watch?v=Kog9gHTjALI
