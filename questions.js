const questions = [
  {
    id: 1,
    domain: "1.0 General Security Concepts",
    question: "A security administrator needs to prevent lateral movement within the network after an initial compromise. Which Zero Trust principle BEST addresses this requirement?",
    options: [
      "Adaptive identity verification",
      "Policy-driven access control",
      "Threat scope reduction",
      "Continuous verification"
    ],
    correct: 2,
    explanation: "Threat scope reduction limits lateral movement by implementing network segmentation and micro-segmentation, preventing attackers from moving freely across the network after initial compromise."
  },
  {
    id: 2,
    domain: "1.0 General Security Concepts",
    question: "During a gap analysis, your organization identifies that customer service representatives can access financial records they don't need for their job functions. Which security principle is being violated?",
    options: [
      "Separation of duties",
      "Need to know",
      "Least privilege",
      "Defense in depth"
    ],
    correct: 2,
    explanation: "Least privilege means users should only have access to resources necessary for their job functions. Granting unnecessary access to financial records violates this principle."
  },
  {
    id: 3,
    domain: "1.0 General Security Concepts",
    question: "A company implements bollards around the perimeter of their data center. This is an example of which type of physical security control?",
    options: ["Deterrent", "Preventive", "Detective", "Compensating"],
    correct: 1,
    explanation: "Bollards are preventive physical controls that physically prevent vehicle access to protected areas."
  },
  {
    id: 4,
    domain: "1.0 General Security Concepts",
    question: "Which cryptographic solution would BEST protect data confidentiality for a database containing social security numbers while still allowing the database to perform searches?",
    options: ["Hashing with salt", "Tokenization", "Full-disk encryption", "Data masking"],
    correct: 1,
    explanation: "Tokenization replaces sensitive data with non-sensitive tokens while still allowing searches and matching through token values."
  },
  {
    id: 5,
    domain: "1.0 General Security Concepts",
    question: "A company wants to ensure that if an employee's credentials are compromised, the attacker cannot access resources from an unusual geographic location. Which authentication factor addresses this?",
    options: ["Something you are", "Something you have", "Something you know", "Somewhere you are"],
    correct: 3,
    explanation: "Somewhere you are (geolocation) validates the user’s location and helps detect unusual access attempts."
  },

  {
    id: 6,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question: "An organization discovers an attacker has been in their network for 6 months, slowly exfiltrating IP while avoiding detection. This threat actor is MOST likely:",
    options: ["Unskilled attacker", "Hacktivist", "Nation-state", "Insider threat"],
    correct: 2,
    explanation: "Nation-state actors often run APT campaigns with long dwell times and a focus on intellectual property."
  },
  {
    id: 7,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question: "Users receive an email appearing from the CEO requesting urgent wire transfers. The email uses CEO@comp4ny.com instead of CEO@company.com. This is an example of:",
    options: ["Typosquatting", "Pharming", "Watering hole attack", "Business email compromise"],
    correct: 0,
    explanation: "Typosquatting uses look-alike domain names (like comp4ny.com) to trick users."
  },
  {
    id: 8,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question: "A web app is vulnerable to attacks where malicious scripts are permanently stored in the DB and executed when others view pages. This describes:",
    options: ["Reflected XSS", "Stored XSS", "SQL injection", "CSRF"],
    correct: 1,
    explanation: "Stored XSS persists in the application’s storage and is served to other users."
  },
  {
    id: 9,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question: "Which mitigation technique would BEST prevent ransomware from encrypting critical business data?",
    options: ["Application allow list", "Network segmentation", "Air-gapped backups", "EDR"],
    correct: 2,
    explanation: "Air-gapped backups are isolated and cannot be encrypted by ransomware on the network."
  },
  {
    id: 10,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question: "A scan flags Apache 2.2.15 as vulnerable, but the vendor backported fixes without changing the version number. What type of scan result is this?",
    options: ["False positive", "False negative", "True positive", "True negative"],
    correct: 0,
    explanation: "Version-based detection can flag patched systems as vulnerable—this is a false positive."
  },

  {
    id: 11,
    domain: "3.0 Security Architecture",
    question: "A company wants cloud email but physical control of database servers. Which deployment model BEST fits?",
    options: ["Public cloud", "Private cloud", "Hybrid cloud", "Community cloud"],
    correct: 2,
    explanation: "Hybrid cloud combines cloud services with on-prem systems."
  },
  {
    id: 12,
    domain: "3.0 Security Architecture",
    question: "A WAF is placed in front of web servers. If it fails in fail-open mode, what is the implication?",
    options: [
      "All traffic is blocked (availability issue)",
      "Traffic bypasses the WAF (reduced security)",
      "WAF continues filtering with cached rules",
      "Traffic automatically redirects to a backup WAF"
    ],
    correct: 1,
    explanation: "Fail-open prioritizes availability; traffic can bypass security controls."
  },
  {
    id: 13,
    domain: "3.0 Security Architecture",
    question: "Which network appliance operates at Layer 7 and can inspect encrypted HTTPS traffic via SSL/TLS interception?",
    options: ["Next-generation firewall (NGFW)", "IDS", "NAC", "Load balancer"],
    correct: 0,
    explanation: "NGFWs can decrypt and inspect traffic for application-level threats."
  },
  {
    id: 14,
    domain: "3.0 Security Architecture",
    question: "A company implements a jump server for admins to access production systems. What benefit does this provide?",
    options: [
      "Centralized logging of administrative access",
      "Load balancing for admin connections",
      "High availability for production systems",
      "Encryption of administrative traffic"
    ],
    correct: 0,
    explanation: "Jump servers centralize and control admin access, making monitoring and logging easier."
  },
  {
    id: 15,
    domain: "3.0 Security Architecture",
    question: "Which protocol should be used for a site-to-site VPN connecting two office locations?",
    options: ["TLS", "IPSec", "SSH", "SRTP"],
    correct: 1,
    explanation: "IPSec is commonly used for site-to-site VPNs at the network layer."
  },

  {
    id: 16,
    domain: "4.0 Security Operations",
    question: "An admin needs to ensure Windows workstations cannot run executables from USB drives. Which technique accomplishes this?",
    options: ["Group Policy", "SELinux", "Host-based firewall", "Application sandboxing"],
    correct: 0,
    explanation: "Group Policy can enforce Software Restriction Policies/AppLocker rules."
  },
  {
    id: 17,
    domain: "4.0 Security Operations",
    question: "A company allows employees to use personal smartphones for work email. Which model is this?",
    options: ["BYOD", "COPE", "CYOD", "MDM"],
    correct: 0,
    explanation: "BYOD is employee-owned devices used for work purposes."
  },
  {
    id: 18,
    domain: "4.0 Security Operations",
    question: "Which wireless security protocol provides the STRONGEST protection for enterprise networks?",
    options: ["WPA2-Personal", "WPA3-Personal", "WPA2-Enterprise", "WPA3-Enterprise"],
    correct: 3,
    explanation: "WPA3-Enterprise provides the strongest enterprise wireless security."
  },
  {
    id: 19,
    domain: "4.0 Security Operations",
    question: "During incident response, analysts find 47 workstations compromised. What is the NEXT step after detection and analysis?",
    options: ["Eradication", "Containment", "Recovery", "Lessons learned"],
    correct: 1,
    explanation: "Containment prevents further spread after detection/analysis."
  },
  {
    id: 20,
    domain: "4.0 Security Operations",
    question: "A security team needs to analyze a potentially malicious file without risking production systems. What should they use?",
    options: ["Sandboxing", "Static code analysis", "Input validation", "Code signing"],
    correct: 0,
    explanation: "Sandboxing safely executes/simulates the file in an isolated environment."
  },
  {
    id: 21,
    domain: "4.0 Security Operations",
    question: "Which IAM component verifies a user has permission to access a resource?",
    options: ["Authentication", "Authorization", "Accounting", "Attestation"],
    correct: 1,
    explanation: "Authorization determines what an authenticated user can access."
  },

  {
    id: 22,
    domain: "5.0 Security Program Management and Oversight",
    question: "Asset Value: $500,000, Exposure Factor: 40%, ARO: 0.1. What is the ALE?",
    options: ["$20,000", "$50,000", "$200,000", "$2,000"],
    correct: 0,
    explanation: "SLE = 500,000 × 0.4 = 200,000; ALE = 200,000 × 0.1 = 20,000."
  },
  {
    id: 23,
    domain: "5.0 Security Program Management and Oversight",
    question: "A company buys cyber insurance instead of adding controls. This is an example of:",
    options: ["Risk avoidance", "Risk transference", "Risk mitigation", "Risk acceptance"],
    correct: 1,
    explanation: "Insurance transfers financial risk to a third party."
  },
  {
    id: 24,
    domain: "5.0 Security Program Management and Oversight",
    question: "Which agreement defines expected uptime and response times for a cloud provider?",
    options: ["MOA", "MOU", "SLA", "NDA"],
    correct: 2,
    explanation: "An SLA defines service performance expectations and remedies."
  },
  {
    id: 25,
    domain: "5.0 Security Program Management and Oversight",
    question: "A company must comply with GDPR. Which requirement does this regulation impose?",
    options: ["Encryption of all data at rest", "Right to be forgotten", "Annual pen testing", "MFA for all users"],
    correct: 1,
    explanation: "GDPR includes the right to erasure (right to be forgotten) under certain conditions."
  }
];

