---
title: "Terraform | CCNA 200-301 Day 63 (part 2)"
type: ccna-cheat-sheet
day: day-63p2
source_transcript: "[[../jeremy-it-videos/125-terraform-ccna-200-301-day-63-part-2]]"
source_url: https://www.youtube.com/watch?v=VAwUaffejWU
created: 2026-04-28
tags: [ccna, cheat-sheet, day-63p2]
---

# Day 63 (part 2) — Terraform

## 🎯 What this video covers

Maps to v1.1 blueprint **6.6 Recognize the capabilities of configuration management mechanisms such as Ansible and Terraform** — Terraform is a NEW v1.1 entry (replacing Puppet/Chef in some flavors). Covers IaC, provisioning vs configuration management, mutable vs immutable, procedural vs declarative, and Terraform basics.

## 🧠 Core Concept

**Terraform is a declarative, agentless, immutable Infrastructure-as-Code tool — you write the desired end state in HCL, and Terraform figures out the API calls to make it happen.**

## 🔑 Must-Know Table

| Term | One-line function | Trait | Exam giveaway phrase |
|---|---|---|---|
| **Infrastructure as Code (IaC)** | Manage infra with code files instead of CLI/GUI | Repeatable, scalable | "machine-readable config files" |
| **Provisioning** | Create/modify/delete infra resources | Terraform's strength | "from scratch" |
| **Configuration management** | Manage existing infra (settings, software) | Ansible/Puppet/Chef strength | "ongoing config" |
| **Mutable infrastructure** | Modify in-place after deployment | Ansible model | "update existing" |
| **Immutable infrastructure** | Replace, don't modify | Terraform model | "destroy and recreate" |
| **Declarative** | Specify desired *end state* | Terraform, Puppet | "what, not how" |
| **Procedural / imperative** | Specify exact *steps* in order | Ansible, Chef | "how, step by step" |
| **HCL (HashiCorp Configuration Language)** | DSL for Terraform config files | Domain-specific | "Terraform config language" |
| **Provider** | Platform Terraform talks to (AWS, Azure, IOS XE…) | 1000+ supported | "AWS, Catalyst Center, ACI" |
| **State file** | Tracks current state of deployed resources | Diff vs desired = action plan | "tracks current state" |
| **Workflow: write → plan → apply** | The three core Terraform steps | Optional 4th: destroy | "three main steps" |

## 🧩 Concept-pair clarifications

| Pair | Key contrast |
|---|---|
| **Terraform vs Ansible** | Terraform = declarative, immutable, provisioning. Ansible = procedural, mutable, configuration management |
| **Procedural vs declarative** | Procedural: define every step. Declarative: define the result |
| **Mutable vs immutable** | Mutable: edit in place. Immutable: replace with a new version |
| **Push vs pull (agent vs agentless)** | Terraform = push, agentless. Puppet/Chef = pull, agent-based |
| **Terraform Core language vs config files** | Core written in **Go**. Config files written in **HCL** |

## 🔗 How it all connects

```
[Engineer]→[HCL config files]→[Terraform Core]→[Provider APIs]→[Cloud/Network infra]
                                       ↑
                                  [State file]
```

## 🚨 Exam Traps

- **Terraform is NOT primarily configuration management** — it's primarily provisioning (Ansible is the config-mgmt one)
- **Terraform is NOT procedural** — it's declarative (Ansible is procedural)
- **Terraform is NOT agent-based** — it's agentless (Puppet and Chef are agent-based)
- **Terraform Core is NOT written in HCL** — it's written in **Go**; HCL is the config-file language
- **Immutable does NOT mean "can't be updated"** — it means updates are done by replace+destroy, not edit
- **The workflow is NOT "build, test, deploy"** — it's **write → plan → apply** (destroy optional)

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Two key Terraform traits | **Declarative + immutable infrastructure** |
| Three Terraform workflow steps | **Write → Plan → Apply** |
| IaC tools focused on configuration management | **Ansible, Puppet, Chef** |
| IaC tool focused on provisioning | **Terraform** |
| Language Terraform Core is written in | **Go** |
| Language Terraform config files use | **HCL (HashiCorp Configuration Language)** |
| Push or pull model? | **Push** |
| Agent or agentless? | **Agentless** |
| Tool typically paired with Terraform for ongoing config | **Ansible** |
| Owner of Terraform | **HashiCorp (acquired by IBM 2025)** |
| Term for tracking current vs desired state | **State file** |
| Term for AWS/Azure/IOS XE in Terraform | **Provider** |

## ⚡ One-Line Master Recall

**Terraform: declarative + immutable + agentless + push + provisioning + HCL config + Go core + write/plan/apply workflow + state file vs desired state + interacts with providers via APIs.**

## ➕ EXTRA — not in video, but on the exam

- **Idempotency** — applying the same config twice yields the same result; both Ansible and Terraform are idempotent. Common exam wording.
- **Drift detection** — Terraform compares state file vs reality to detect drift. Mentioned as benefit of immutable.
- **CI/CD integration** — Terraform commonly runs in pipelines (GitLab CI, Jenkins). Tangential but appears in v1.1 automation framing.

## 🧾 Recap

- **IaC** = manage infra via code files (Ansible, Puppet, Chef, Terraform).
- **Terraform = provisioning, declarative, immutable, agentless, push** — pairs well with Ansible (config mgmt).
- **Workflow: write → plan → apply** (destroy as optional 4th).
- **Core in Go, configs in HCL** (a domain-specific language).
- If you can build the comparison table (Terraform vs Ansible vs Puppet vs Chef across declarative/mutable/agent), you're exam-ready.

---
Source: Jeremy's IT Lab — Day 63 (part 2) — https://www.youtube.com/watch?v=VAwUaffejWU
