# Domain 6.0 — Automation and Programmability Glossary

Source: Jeremy's IT Lab — Free CCNA v1.1 200-301 Complete Course
Scope: 6 sub-objectives, 8 videos

## 6.1 — Explain how automation impacts network management

### Technologies & Tools
- **Network automation** — using tools/scripts to configure and manage network devices instead of logging into each one manually. *(Day 59)*
- **Traditional model** — engineers manage devices one at a time via SSH, Telnet, console, or GUI.
- **Python script** — example automation tool that can SSH to devices and push commands to many at once.
- **SDN (Software-Defined Networking)** — approach that centralizes the control plane into an application called a controller.
- **Controller** — centralized application running on a server that operates the control plane of the network.
- **Ansible** — configuration management / automation tool.
- **Puppet** — configuration management tool.
- **Regular expressions** — patterns used to search text, e.g., to parse `show` command output in scripts.
- **ASIC (application-specific integrated circuit)** — specialized chip that handles data-plane forwarding faster than a CPU.
- **TCAM (ternary content-addressable memory)** — fast memory that stores MAC/forwarding tables for hardware lookups.
- **CAM table** — another name for the MAC address table (content-addressable memory).
- **CPU** — handles control-plane and management-plane traffic on a device; too slow for data-plane forwarding.
- **WLC (Wireless LAN Controller)** — earlier example of centralized control; many AP functions are moved to the controller.

### Protocols & Standards
- **OSPF** — example control-plane routing protocol in a distributed model.
- **STP** — control-plane protocol that decides which interfaces forward frames.
- **ARP** — control-plane protocol that builds the ARP table.
- **SSH / Telnet** — management-plane protocols for connecting to a device's CLI.
- **Syslog** — management-plane logging protocol.
- **SNMP** — management-plane protocol for monitoring device status.
- **NTP** — management-plane protocol for maintaining accurate time.
- **NAT / ACL / port security / dot1Q tagging** — data-plane functions that affect how a message is forwarded or discarded.

### Key Vocabulary
- **Data plane (forwarding plane)** — all tasks involved in forwarding user data from one interface to another.
- **Control plane** — functions that build the tables and state the data plane uses (routing table, MAC table, STP, ARP); "overhead" work.
- **Management plane** — protocols used to manage devices (SSH, Telnet, Syslog, SNMP, NTP); doesn't directly affect forwarding.
- **Distributed control plane** — traditional model where each device has its own control plane.
- **Centralized control plane** — SDN model where control-plane functions are moved to a controller.
- **Configuration drift** — when individual changes over time cause a device's config to deviate from the company standard.
- **OpEx (operating expenses)** — reduced by automation because fewer man-hours are needed per task.
- **Human error** — mistakes like typos, reduced when tasks are automated.
- **Scalability** — ability to deploy/change the network in a fraction of the time; a key benefit of automation.
- **Policy compliance** — automation helps ensure all devices have standard configs and software versions.

### Acronyms
- **SDN** — Software-Defined Networking.
- **ASIC** — Application-Specific Integrated Circuit.
- **TCAM** — Ternary Content-Addressable Memory.
- **CAM** — Content-Addressable Memory.
- **CPU** — Central Processing Unit.

## 6.2 — Compare traditional networks with controller-based networking

### Technologies & Tools
- **Controller-based networking** — another name for SDN; control plane lives in a controller. *(Day 59)*
- **Software-defined architecture** — another name for SDN.
- **Northbound API** — interface apps/scripts use to interact with the controller.
- **Southbound API** — interface the controller uses to talk to the managed network devices.

### Protocols & Standards
- **OpenFlow** — southbound interface.
- **Cisco OpFlex** — southbound interface.
- **Cisco onePK** — southbound interface.
- **NETCONF** — southbound interface.
- **REST API** — common choice for the northbound interface on a controller.
- **JSON / XML** — standard structured data formats returned by REST APIs.

### Key Vocabulary
- **API (application programming interface)** — software interface that lets two applications communicate / exchange data.
- **SBI (southbound interface)** — communication protocol + API used between controller and network devices.
- **NBI (northbound interface)** — interface that lets apps access controller data and program the network.
- **Centralized data** — controller gathers a network-wide view, enabling network-wide analytics without parsing individual `show` commands.
- **Structured data** — data in a standard format (JSON, XML) that programs can easily parse.

### Acronyms
- **API** — Application Programming Interface.
- **SBI** — Southbound Interface.
- **NBI** — Northbound Interface.
- **REST** — Representational State Transfer.
- **SDN** — Software-Defined Networking.

## 6.3 — Describe controller-based, software-defined architecture (overlay, underlay, fabric)

### Technologies & Tools
- **Cisco SD-Access** — Cisco's SDN solution for automating campus LANs (wired + wireless). *(Day 62)*
- **Cisco ACI (Application Centric Infrastructure)** — Cisco's SDN solution for data center networks; uses spine-leaf.
- **Cisco SD-WAN** — Cisco's SDN solution for WANs.
- **Cisco DNA Center / Catalyst Center** — SDN controller at the heart of SD-Access; also a general network management platform.
- **Cisco UCS** — server hardware on which DNA Center is installed.
- **Edge node** — SD-Access switch that connects to end hosts (like a traditional access switch).
- **Border node** — SD-Access switch that connects to devices outside the SD-Access domain (e.g., a WAN router).
- **Control node** — SD-Access switch that runs LISP to perform control-plane functions.
- **Cisco TrustSec (CTS)** — provides policy control in SD-Access (QoS, security policy).
- **Brownfield deployment** — adding SD-Access to an existing network; DNA Center does not configure the underlay.
- **Greenfield deployment** — brand-new network built for SD-Access; DNA Center configures the underlay optimally.
- **Routed access layer** — all links between switches are Layer 3; access switches act as the default gateway for end hosts.
- **Postman** — platform/desktop app for building and sending API calls.
- **Cisco DevNet** — Cisco's developer program with free sandboxes, tutorials, and labs; also a certification track.
- **Always-on sandbox** — DevNet devices free to access any time (e.g., the DNA Center sandbox).

### Protocols & Standards
- **VXLAN (Virtual Extensible LAN)** — builds the tunnels that form the SD-Access overlay data plane.
- **LISP (Locator/ID Separation Protocol)** — SD-Access control plane; maps EIDs to RLOCs.
- **IS-IS** — routing protocol DNA Center configures for an optimal SD-Access underlay.
- **NETCONF / RESTCONF** — southbound protocols DNA Center can use with devices.
- **SSH / Telnet / SNMP** — traditional southbound options also supported by DNA Center.

### Key Vocabulary
- **Underlay** — underlying physical network of devices and wired/wireless connections that provides IP connectivity.
- **Overlay** — virtual network (e.g., VXLAN tunnels) built on top of the physical underlay.
- **Fabric** — overlay + underlay together; the physical and virtual network as a whole.
- **Application layer (SDN)** — top layer; contains apps/scripts that instruct the controller. Not the OSI application layer.
- **Control layer (SDN)** — middle layer; contains the SDN controller.
- **Infrastructure layer (SDN)** — bottom layer; contains the network devices that forward traffic.
- **Intent-based networking (IBN)** — engineer declares intended behavior; DNA Center translates that into device configs.
- **EID (endpoint identifier)** — LISP term for the identity of an end host.
- **RLOC (routing locator)** — LISP term for the edge switch that can be used to reach an end host.
- **Group-based access control** — defining policy by source/destination groups in DNA Center instead of per-ACL.
- **Compliance status** — DNA Center label indicating whether a device matches standards (software version, security advisories).
- **Assurance** — DNA Center section that monitors device health.

### Syntax / Examples
- `Authorization: Basic` with `devnetuser / Cisco123!` — credentials used in the DevNet DNA Center sandbox tutorial.
- `X-Auth-Token: <token>` — HTTP header used to pass the DNA Center auth token on subsequent calls.

### Acronyms
- **SD-Access** — Software-Defined Access.
- **ACI** — Application Centric Infrastructure.
- **SD-WAN** — Software-Defined WAN.
- **DNA** — Digital Network Architecture.
- **VXLAN** — Virtual Extensible LAN.
- **LISP** — Locator/ID Separation Protocol.
- **EID** — Endpoint Identifier.
- **RLOC** — Routing Locator.
- **CTS** — Cisco TrustSec.
- **IBN** — Intent-Based Networking.
- **IS-IS** — Intermediate System to Intermediate System.

## 6.4 — Explain AI and machine learning in network operations

### Technologies & Tools
- **AI (Artificial Intelligence)** — uses computers to simulate intelligence: pattern recognition, learning, decision making, problem solving. *(Day 59 p2)*
- **Machine Learning (ML)** — subset of AI in which computers learn from data and improve without explicit programming.
- **Supervised learning** — model is trained on labeled data to make predictions/classifications on new data.
- **Unsupervised learning** — model is trained on unlabeled data and discovers its own patterns, clusters, and relationships.
- **Reinforcement learning** — an agent interacts with an environment and is rewarded or penalized for its actions; used in game AIs and self-driving cars.
- **Deep learning** — ML subset that uses multi-layered artificial neural networks for large, complex datasets.
- **Semi-supervised learning** — combines labeled and unlabeled data; benefits of both supervised and unsupervised.
- **Artificial neural network** — computational model of interconnected nodes ("neurons") inspired by the human brain.
- **Predictive AI** — uses ML on historical data to forecast future outcomes or trends (e.g., traffic forecasting, anomaly detection).
- **Generative AI (GenAI)** — learns patterns from existing data and creates new content like text, images, or audio.
- **LLM (Large Language Model)** — generative text AI such as ChatGPT, Gemini, or Copilot.
- **Virtual concierge** — chatbot embedded on a corporate site (example: the chatbot on cisco.com).
- **ChatGPT / Gemini / Copilot** — example LLMs used for text generation.
- **Midjourney / DALL-E** — example image-generation AIs.
- **Sora / Veo 2** — example video-generation AIs.
- **Cisco Catalyst Center (formerly DNA Center)** — Cisco controller with AI-enabled features.
- **AI Network Analytics** — umbrella feature in Catalyst Center; uses ML to establish a baseline of "normal" network behavior.
- **Machine Reasoning Engine (MRE)** — Catalyst Center feature that performs AI-driven root-cause analysis and can take automated corrective actions.
- **AI Endpoint Analytics** — Catalyst Center feature that identifies, classifies, and profiles devices connecting to the network.
- **AI-enhanced RRM (Radio Resource Management)** — Catalyst Center feature that optimizes Wi-Fi via dynamic channel, power, and load balancing on APs.

### Key Vocabulary
- **Agent** — in reinforcement learning, the model that interacts with the environment.
- **Reward / penalty** — feedback that shapes the agent's behavior in reinforcement learning.
- **Labeled data** — training data where each sample has a correct answer attached.
- **Unlabeled data** — training data without predefined labels.
- **Cluster** — group of similar data points identified by unsupervised learning.
- **Hidden layers** — internal layers of a deep neural network between input and output.
- **Black box** — deep learning's interpretability problem; hard to tell which features drove a decision.
- **Hallucination** — an LLM making up an answer that is totally incorrect.
- **Anomaly detection** — predictive AI use case, flags unusual traffic/security events.
- **Predictive maintenance** — anticipating hardware failures before they cause an outage.
- **Traffic forecasting** — predicting congestion to optimize bandwidth or QoS.
- **Script generation** — using GenAI to write network automation scripts (e.g., Python).
- **Deepfakes / plagiarism** — misuse risks of generative AI.

### Acronyms
- **AI** — Artificial Intelligence.
- **ML** — Machine Learning.
- **LLM** — Large Language Model.
- **MRE** — Machine Reasoning Engine.
- **RRM** — Radio Resource Management.
- **GenAI** — Generative AI.

## 6.5 — Describe characteristics of REST-based APIs

### Technologies & Tools
- **REST API (RESTful API / REST-based API)** — API that follows REST rules; typically uses HTTP. *(Day 61)*
- **HTTP / HTTPS** — most common application-layer protocol used by REST APIs; HTTPS = HTTP + TLS.
- **TLS (Transport Layer Security)** — adds encryption to HTTP to produce HTTPS.
- **Postman** — tool for constructing and sending API requests.
- **Base64** — encoding (not encryption) scheme used in Basic authentication.
- **Cisco DevNet** — offers sandboxes and tutorials for practicing REST calls (e.g., DNA Center).

### Protocols & Standards
- **RFC 8259** — standardizes JSON.
- **RFC 6749** — standardizes OAuth 2.0.
- **NETCONF / RESTCONF** — other APIs commonly used on the southbound interface.

### Syntax / Examples
- **HTTP verbs (CRUD mapping):**
  - `POST` — Create a new variable/resource.
  - `GET` — Read / retrieve a resource.
  - `PUT` — Update (replace) a resource (can also create).
  - `PATCH` — Update (modify) a resource.
  - `DELETE` — Delete a resource.
- **HTTP response code classes:**
  - `1xx` — Informational (e.g., `102 Processing`).
  - `2xx` — Successful (e.g., `200 OK`, `201 Created`).
  - `3xx` — Redirection (e.g., `301 Moved Permanently`).
  - `4xx` — Client error (e.g., `403 Unauthorized`, `404 Not Found`).
  - `5xx` — Server error (e.g., `500 Internal Server Error`).
- **URI parts:** `https://sandboxdnac.cisco.com/dna/intent/api/v1/network-device` — scheme / authority / path.
- **Authorization headers:**
  - `Authorization: Basic <base64(user:pass)>` — Basic auth.
  - `Authorization: Bearer <token>` — Bearer auth.
- **Accept header** — tells the server what data formats the client can receive (e.g., JSON, XML).

### Key Vocabulary
- **CRUD** — Create, Read, Update, Delete; the four core operations.
- **Uniform interface** — REST constraint: consistent interface for clients.
- **Client-server** — REST constraint: client and server evolve independently.
- **Stateless** — REST constraint: each request is independent; server stores no prior-request state. Client re-authenticates each request.
- **Cacheable / non-cacheable** — REST constraint: caching must be supported; individual resources may or may not be cacheable.
- **Layered system** — REST constraint: intermediaries may exist between client and server.
- **Code-on-demand** — optional REST constraint: server can send executable code to extend the client.
- **Stateful** — opposite of stateless; keeps track of session state (e.g., TCP).
- **Scheme** — protocol part of a URI (e.g., `https`).
- **Authority** — hostname/address part of a URI.
- **Path** — resource part of a URI.
- **URI (Uniform Resource Identifier)** — identifies a resource; URL is a type of URI.
- **URL (Uniform Resource Locator)** — URI that locates a resource.
- **Start line** — first line of an HTTP message: method + URL + HTTP version.
- **Headers** — HTTP metadata lines (authentication, content type, client info).
- **Message body** — actual contents/payload of the HTTP message.
- **API call / API request** — a client's HTTP request to a REST API.

### REST API Authentication (Day 61 p2)

### Technologies & Tools
- **Basic authentication** — sends username + password in the `Authorization` header, encoded in Base64 (not encrypted).
- **Bearer authentication** — token-based; client obtains a bearer token from an auth server and includes it in each request.
- **API key authentication** — static key issued by the API provider; sent in the `Authorization` header (recommended), URL, or cookie.
- **OAuth 2.0** — framework for access delegation; third-party apps get limited access without seeing user credentials.
- **Authorization server (auth server)** — issues tokens after authenticating the user.
- **Resource server** — hosts the protected resource the client wants to access.
- **Refresh token** — lets the client get a new access token without requiring the user to log in again.

### Key Vocabulary
- **Authentication** — verifying the identity of a user/system.
- **Authorization** — deciding what an authenticated user is allowed to do.
- **Encoding vs encryption** — encoding (Base64) just reformats data; encryption protects it. Base64 is easily reversible.
- **Bearer token** — token where "whoever holds it" can use it; usually expires.
- **Static key** — API key that doesn't expire automatically; must be rotated/revoked manually.
- **Access delegation** — letting a third-party app act on a user's behalf without sharing credentials (the "Log in with Google" pattern).
- **Resource owner** — the account owner whose data is being accessed (OAuth).
- **Client app** — the third-party app requesting access (OAuth).
- **Third-party API** — external API consumed by an app (e.g., an app calling OpenAI's ChatGPT API).
- **Token expiration** — short lifetime on tokens to limit damage if stolen.
- **Token rotation / revocation** — manual steps to invalidate an API key if compromised.

### Acronyms
- **REST** — Representational State Transfer.
- **CRUD** — Create, Read, Update, Delete.
- **HTTP / HTTPS** — HyperText Transfer Protocol / HTTP Secure.
- **TLS** — Transport Layer Security.
- **URI / URL** — Uniform Resource Identifier / Locator.
- **OAuth** — Open Authorization.
- **RFC** — Request for Comments.

## 6.6 — Recognize capabilities of configuration management mechanisms

### Technologies & Tools
- **Configuration management tools** — network automation tools for centralized control of large numbers of devices. *(Day 63)*
- **Ansible** — configuration management tool owned by Red Hat, written in Python.
- **Puppet** — configuration management tool written in Ruby; server is the Puppet master.
- **Chef** — configuration management tool written in Ruby.
- **Terraform** — HashiCorp's IaC provisioning tool; acquired by IBM in 2025. *(Day 63 p2)*
- **Terraform Core** — main Terraform software (written in Go) that processes configs and calls providers.
- **Provider (Terraform)** — platform Terraform deploys to (AWS, Azure, GCP, Kubernetes, Catalyst Center, ACI, IOS XE, …); 1000+ supported.
- **Configuration file (Terraform)** — engineer-authored file specifying the desired end state (written in HCL).
- **State file (Terraform)** — tracks the current state of deployed infrastructure so Terraform knows what to change.
- **Control node** — the Ansible server that pushes configs over SSH.
- **Puppet master** — Puppet's server; clients pull configs from it over TCP 8140.
- **Puppet agent** — software that must be installed on managed devices (agent-based).
- **Puppet proxy / external agent** — workaround that runs the agent on an external host and uses SSH to devices.
- **Chef workstation** — the admin's computer used to prepare cookbooks and recipes.
- **Chef server / Chef client** — server stores data; clients (servers, storage, VMs, network devices) pull configs.
- **Jinja2** — templating format used by Ansible for device configuration templates.
- **INI / YAML** — formats supported for Ansible inventory files.
- **Go** — programming language Terraform Core is written in.
- **Ruby** — programming language used by Puppet and Chef.
- **Python** — programming language used by Ansible.

### Protocols & Standards
- **SSH** — transport Ansible uses to reach managed devices (agentless).
- **TCP 8140** — Puppet client-to-master communication port.
- **TCP 10002** — Chef server port for sending configurations to clients.
- **HTTP + REST API** — Puppet and Chef communicate via REST APIs.

### Syntax / Examples
- **Ansible file types (all code, i.e., IaC):**
  - **Playbook** — YAML file; "blueprint" of automation tasks and their logic.
  - **Inventory** — lists managed devices and characteristics (role, etc.); INI or YAML.
  - **Template** — Jinja2 file representing a device config with variables left blank.
  - **Variable file** — YAML file mapping variables to values that get substituted into templates.
- **Puppet file types:**
  - **Manifest** — defines the desired configuration state of a device.
  - **Template** — helps generate Manifests.
- **Chef file types (written in a Ruby-based DSL):**
  - **Resource** — a configuration object managed by Chef (like an ingredient).
  - **Recipe** — logic/actions performed on resources.
  - **Cookbook** — a collection of related recipes.
  - **Run-list** — ordered list of recipes executed to reach the desired state.
- **Terraform file:** `.tf` configuration file written in HCL (HashiCorp Configuration Language, a DSL).
- **Terraform workflow:** `write` → `plan` → `apply` (optional 4th: `destroy`).

### Key Vocabulary
- **Configuration drift** — gradual deviation from standard configs; IaC tools help prevent it.
- **Configuration provisioning** — applying configuration changes to devices (including brand-new ones).
- **Template + variables** — core pattern shared by all these tools: one generic blueprint + per-device values produce a final config.
- **Agentless** — tool doesn't require any software to be installed on managed devices (Ansible, Terraform).
- **Agent-based** — specific software agent must run on each managed device (Puppet, Chef).
- **Push model** — server pushes configs to devices (Ansible, Terraform).
- **Pull model** — clients pull configs from the server (Puppet, Chef).
- **Client-server model** — used by all three (Ansible, Puppet, Chef) despite different specifics.
- **IaC (Infrastructure as Code)** — managing infrastructure via machine-readable files instead of manual CLI/GUI.
- **Configuration management** — managing existing infrastructure: installing software, applying settings, enforcing state (Ansible, Puppet, Chef).
- **Infrastructure provisioning** — creating, modifying, and deleting infrastructure from scratch (Terraform's strength).
- **Mutable infrastructure** — resources are updated in place after deployment (configuration-management style).
- **Immutable infrastructure** — resources are replaced rather than modified; new instance is deployed, old one destroyed (Terraform's default).
- **Procedural / imperative approach** — user defines the specific steps and order (Ansible, Chef).
- **Declarative approach** — user defines the desired end state; tool figures out the steps (Terraform, Puppet).
- **Desired end state** — what the infrastructure should look like; the target Terraform works toward.
- **DSL (Domain-Specific Language)** — language built for one purpose (Puppet's DSL, Chef's Ruby-based DSL, Terraform's HCL).

### Acronyms
- **IaC** — Infrastructure as Code.
- **HCL** — HashiCorp Configuration Language.
- **DSL** — Domain-Specific Language.
- **YAML** — YAML Ain't Markup Language.
- **INI** — initialization (file format).
- **AWS / GCP** — Amazon Web Services / Google Cloud Platform.
- **ACI** — Application Centric Infrastructure.
- **IOS XE** — Cisco IOS XE (modern Cisco device OS).

## 6.7 — Recognize components of JSON-encoded data

### Technologies & Tools
- **JSON (JavaScript Object Notation)** — open-standard, human-readable file/data-interchange format; derived from JavaScript but language-independent. *(Day 60)*
- **XML (Extensible Markup Language)** — data serialization / markup language; uses HTML-like tags. Often used by REST APIs.
- **YAML (YAML Ain't Markup Language)** — highly human-readable serialization format; used by Ansible. Recursive acronym.
- **HTML** — markup language (for context; XML resembles it syntactically).

### Protocols & Standards
- **RFC 8259** — JSON standard.
- **REST APIs** — often use JSON or XML for request/response bodies.
- **`show … | format`** — Cisco IOS pipe that outputs a `show` command in XML.

### Syntax / Examples
- **String** — text in double quotes: `"Hello"`, `"5"`, `"true"`.
- **Number** — numeric value, no quotes: `5`, `1000`.
- **Boolean** — `true` or `false` (lowercase, no quotes).
- **Null** — `null` (lowercase, no quotes); intentional absence of a value.
- **Object** — unordered list of key-value pairs in curly brackets: `{"interface": "GigabitEthernet1/1", "is_up": true}`.
- **Array** — ordered list of values in square brackets: `["Gig1/1", "Gig1/2", "Gig1/3"]`; values can be mixed types.
- **Nested object** — an object whose value is itself another object.
- **Key-value pair** — `"key": value` separated by a colon; multiple pairs separated by commas; no trailing comma after the last pair.
- **XML example** — `<Interface>GigabitEthernet0/0</Interface>`.
- **YAML example** — starts with `---`; list items use `-`; key-value is `key: value`; indentation matters.

### Key Vocabulary
- **Data serialization** — converting data into a standard format so it can be stored or transmitted and reconstructed later, possibly by a different application.
- **Data serialization language / format** — JSON, XML, YAML.
- **Variable** — a named container that stores a value.
- **Primitive data types (JSON)** — string, number, boolean, null.
- **Structured data types (JSON)** — object, array.
- **Key** — the name side of a key-value pair; in JSON it must be a string.
- **Value** — the data side of a key-value pair; any valid JSON type.
- **Dictionary** — another name for a JSON object.
- **Whitespace insignificance** — spaces and line breaks don't change meaning in JSON or XML.
- **Whitespace significance** — indentation *does* matter in YAML.
- **Markup language** — language used to format text (HTML, XML by origin); YAML deliberately is *not* one.
- **Recursive acronym** — an acronym that contains itself (e.g., YAML = "YAML Ain't Markup Language").
- **Human-readable** — easy for people to read; all three formats are (JSON and YAML especially).
- **Machine-readable** — easy for programs to parse; the whole point of serialization formats.

### Acronyms
- **JSON** — JavaScript Object Notation.
- **XML** — Extensible Markup Language.
- **YAML** — YAML Ain't Markup Language.
- **HTML** — HyperText Markup Language.
- **RFC** — Request for Comments.
