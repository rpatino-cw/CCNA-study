/* Domain 6 — Automation and Programmability — micro-topic checklists */
window.microTopicsD6 = {
  domain: { id: '6', name: 'Automation and Programmability', weight: 10 },
  topics: {
    '6.1': {
      name: 'How automation impacts network management',
      items: {
        'Benefits': [
          'Reduced human error — templated configs, no typos',
          'Faster provisioning — minutes not days',
          'Scalability — same effort for 10 or 10,000 devices',
          'Consistency — every device matches standard',
          'Auditability — changes tracked in version control',
          'Self-healing — detect and remediate automatically',
          'Frees engineers from repetitive work',
        ],
        'Trade-offs and risks': [
          'Blast radius — a bad script can break many devices fast',
          'Learning curve — YAML, Python, APIs',
          'Requires strong change control and testing',
        ],
      },
    },
    '6.2': {
      name: 'Traditional vs controller-based networking',
      items: {
        'Traditional': [
          'Distributed control plane (each device decides)',
          'CLI/SNMP configuration per device',
          'Manual, slow, error-prone at scale',
          'Vendor-specific syntax',
        ],
        'Controller-based (SDN)': [
          'Centralized control plane in a controller',
          'Network devices become data-plane forwarders',
          'Programmable via APIs (REST, NETCONF, gRPC)',
          'Policy and intent driven',
        ],
        'Benefits of SDN': [
          'Single pane of glass',
          'Consistent policy across devices',
          'Faster and safer changes',
          'Telemetry and analytics built in',
        ],
        'Cisco examples': [
          'DNA Center — campus SDN, intent-based',
          'ACI — data center SDN (spine-leaf fabric)',
          'Meraki — cloud-managed',
          'SD-WAN (vManage) — WAN overlay',
        ],
      },
    },
    '6.3': {
      name: 'SDN architecture — overlay, underlay, fabric',
      items: {
        'Control plane vs data plane': [
          'Control plane — decides where traffic goes (routing, policy)',
          'Data plane — actually forwards packets',
          'SDN separates them: controller holds control plane',
        ],
        'Underlay': [
          'Physical network (routers, switches, cables)',
          'Provides IP reachability between fabric devices',
          'Usually runs OSPF or IS-IS internally',
        ],
        'Overlay': [
          'Virtual network built on top of the underlay',
          'Encapsulation — VXLAN, GRE, MPLS',
          'Tenant/traffic isolation independent of physical',
        ],
        'Fabric': [
          'Underlay + overlay + automation controller',
          'Cisco SD-Access uses VXLAN overlay + LISP control plane',
          'Single administrative domain managed by the controller',
        ],
        'API directions': [
          'Northbound — controller → apps/admins (REST)',
          'Southbound — controller → devices (OpenFlow, NETCONF, gRPC)',
          'East-west — between controllers',
        ],
      },
    },
    '6.4': {
      name: 'AI and ML in network operations',
      items: {
        'Generative AI': [
          'Creates configs from natural language',
          'Summarizes logs and troubleshooting sessions',
          'Generates documentation and runbooks',
        ],
        'Predictive AI': [
          'Forecasts capacity needs',
          'Predicts failures before they happen',
          'Anomaly detection on baseline behavior',
        ],
        'AIOps': [
          'Correlates events across systems',
          'Automated root-cause analysis',
          'Intelligent alerting (reduces noise)',
          'Closed-loop remediation — detect and fix automatically',
        ],
        'Cisco examples (awareness)': [
          'DNA Center Assurance — ML-based issue detection',
          'ThousandEyes — internet + cloud performance insights',
          'Meraki Insight — app performance analytics',
        ],
      },
    },
    '6.5': {
      name: 'REST APIs — auth, CRUD, verbs, encoding',
      items: {
        'REST principles': [
          'Stateless — each request contains everything needed',
          'Client-server separation',
          'Resources identified by URIs',
          'Uses standard HTTP methods',
          'Cacheable responses',
        ],
        'HTTP methods ↔ CRUD': [
          'POST — Create',
          'GET — Read',
          'PUT — Replace (full update)',
          'PATCH — Partial update',
          'DELETE — Delete',
        ],
        'HTTP status codes': [
          '200 OK — success',
          '201 Created — resource created',
          '204 No Content — success, no body',
          '301/302 — redirect',
          '400 Bad Request — malformed',
          '401 Unauthorized — missing/invalid auth',
          '403 Forbidden — auth ok, no permission',
          '404 Not Found',
          '429 Too Many Requests — rate limited',
          '500 Internal Server Error',
          '503 Service Unavailable',
        ],
        'Authentication types': [
          'API key — simple shared secret in header or query',
          'HTTP Basic — base64(user:pass) — use only over TLS',
          'Bearer token — token in Authorization header',
          'OAuth 2.0 — token-based with scopes, delegated access',
          'mTLS — client certificate auth',
        ],
        'Data encoding formats': [
          'JSON — lightweight, most common',
          'XML — verbose, legacy',
          'YAML — human-friendly, common in configs (Ansible)',
        ],
        'Common headers': [
          'Content-Type: application/json',
          'Accept: application/json',
          'Authorization: Bearer <token>',
        ],
      },
    },
    '6.6': {
      name: 'Configuration management — Ansible and Terraform',
      items: {
        'Ansible': [
          'Agentless — uses SSH/NETCONF/WinRM',
          'Push model — control node sends changes',
          'YAML playbooks describe desired state',
          'Idempotent — same result on repeated runs',
          'Modules — units of work (ios_config, ios_facts, etc.)',
        ],
        'Ansible structure': [
          'Inventory — list of devices/hosts (INI or YAML)',
          'Playbook — ordered set of plays and tasks',
          'Roles — reusable bundles of tasks/vars/templates',
          'Variables — host_vars, group_vars, defaults',
          'Jinja2 templates — for generating configs',
        ],
        'Terraform': [
          'Infrastructure as Code (IaC)',
          'HCL language (HashiCorp Configuration Language)',
          'Declarative — describe desired end state',
          'State file (terraform.tfstate) tracks reality',
          'Providers — AWS, Azure, GCP, Cisco, etc.',
        ],
        'Terraform workflow': [
          'terraform init — download providers',
          'terraform plan — preview changes',
          'terraform apply — make changes',
          'terraform destroy — tear down',
        ],
        'Ansible vs Terraform': [
          'Ansible — configuration of existing devices (day 2)',
          'Terraform — provisioning infrastructure (day 0/1)',
          'Often used together',
        ],
        'Puppet / Chef (awareness only)': [
          'Agent-based, pull model',
          'Ruby-based DSL',
          'Less common in network automation than Ansible',
        ],
      },
    },
    '6.7': {
      name: 'JSON-encoded data',
      items: {
        'Syntax': [
          'Object — { } with comma-separated key:value pairs',
          'Keys must be double-quoted strings',
          'Array — [ ] with comma-separated values',
          'No trailing commas',
          'No comments allowed',
        ],
        'Data types': [
          'String — "text"',
          'Number — 42 or 3.14 (no quotes)',
          'Boolean — true or false',
          'Null — null',
          'Object — { ... }',
          'Array — [ ... ]',
        ],
        'Nesting': [
          'Objects inside objects',
          'Arrays inside objects',
          'Objects inside arrays',
          'Arbitrary depth',
        ],
        'Validity gotchas': [
          'Use double quotes — not single',
          'No trailing comma before } or ]',
          'Escape special chars in strings (\\", \\\\, \\n)',
          'Whitespace is ignored outside strings',
        ],
        'Reading practice': [
          'Given a JSON blob, identify which key holds what value',
          'Parse nested paths — e.g., data.devices[0].interfaces[2].name',
          'Know JSON vs YAML at a glance (braces vs indentation)',
        ],
      },
    },
  },
};
