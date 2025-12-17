// questions.js
// Global question bank used by the exam engine
// MUST be a single valid array

window.questionBank = [

  // =========================
  // 1.0 General Security Concepts
  // =========================
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
    explanation: "Threat scope reduction limits lateral movement through segmentation and micro-segmentation."
  },
  {
    id: 2,
    domain: "1.0 General Security Concepts",
    question: "Which security principle ensures users only have access necessary to perform their job functions?",
    options: [
      "Separation of duties",
      "Least privilege",
      "Defense in depth",
      "Need to know"
    ],
    correct: 1,
    explanation: "Least privilege limits access to only what is required for a role."
  },
  {
    id: 3,
    domain: "1.0 General Security Concepts",
    question: "A company implements bollards around the perimeter of their data center. This is an example of which type of physical security control?",
    options: [
      "Deterrent",
      "Preventive",
      "Detective",
      "Compensating"
    ],
    correct: 1,
    explanation: "Bollards are preventive physical controls that physically prevent vehicle access."
  },
  {
    id: 4,
    domain: "1.0 General Security Concepts",
    question: "Which cryptographic solution allows searching while protecting sensitive data?",
    options: [
      "Hashing",
      "Tokenization",
      "Full-disk encryption",
      "Data masking"
    ],
    correct: 1,
    explanation: "Tokenization replaces sensitive values with tokens while preserving usability."
  },
  {
    id: 5,
    domain: "1.0 General Security Concepts",
    question: "Which authentication factor validates the user's geographic location?",
    options: [
      "Something you know",
      "Something you have",
      "Something you are",
      "Somewhere you are"
    ],
    correct: 3,
    explanation: "Geolocation is an example of 'somewhere you are'."
  },

  // =========================
  // 2.0 Threats, Vulnerabilities, and Mitigations
  // =========================
  {
    id: 6,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question: "An attacker remains undetected for months while stealing IP. This actor is MOST likely:",
    options: [
      "Script kiddie",
      "Hacktivist",
      "Nation-state",
      "Competitor"
    ],
    correct: 2,
    explanation: "Nation-state attackers often conduct long-term APT campaigns."
  },
  {
    id: 7,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question: "An email from CEO@comp4ny.com requesting wire transfers is an example of:",
    options: [
      "Typosquatting",
      "Pharming",
      "Vishing",
      "BEC"
    ],
    correct: 0,
    explanation: "Typosquatting uses look-alike domains to deceive users."
  },
  {
    id: 8,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question: "Malicious scripts stored in a database and executed later describe:",
    options: [
      "Reflected XSS",
      "Stored XSS",
      "CSRF",
      "SQL Injection"
    ],
    correct: 1,
    explanation: "Stored XSS persists in application storage."
  },
  {
    id: 9,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question: "Which control BEST protects against ransomware?",
    options: [
      "EDR",
      "Network segmentation",
      "Air-gapped backups",
      "IDS"
    ],
    correct: 2,
    explanation: "Air-gapped backups cannot be encrypted by ransomware."
  },
  {
    id: 10,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question: "A scanner flags a patched system as vulnerable. This is a:",
    options: [
      "False positive",
      "False negative",
      "True positive",
      "True negative"
    ],
    correct: 0,
    explanation: "Version-based scans often cause false positives."
  },

  // =========================
  // 3.0 Security Architecture
  // =========================
  {
    id: 11,
    domain: "3.0 Security Architecture",
    question: "Which cloud model combines on-prem and cloud services?",
    options: [
      "Public",
      "Private",
      "Hybrid",
      "Community"
    ],
    correct: 2,
    explanation: "Hybrid cloud integrates cloud and on-prem infrastructure."
  },
  {
    id: 12,
    domain: "3.0 Security Architecture",
    question: "Fail-open security controls prioritize:",
    options: [
      "Confidentiality",
      "Integrity",
      "Availability",
      "Authentication"
    ],
    correct: 2,
    explanation: "Fail-open ensures availability if a control fails."
  },
  {
    id: 13,
    domain: "3.0 Security Architecture",
    question: "Which device inspects encrypted HTTPS traffic?",
    options: [
      "NGFW",
      "IDS",
      "NAC",
      "Router"
    ],
    correct: 0,
    explanation: "NGFWs support TLS inspection."
  },
  {
    id: 14,
    domain: "3.0 Security Architecture",
    question: "A jump server primarily provides:",
    options: [
      "Centralized admin access logging",
      "Load balancing",
      "High availability",
      "Encryption"
    ],
    correct: 0,
    explanation: "Jump servers centralize and audit administrative access."
  },
  {
    id: 15,
    domain: "3.0 Security Architecture",
    question: "Which protocol is used for site-to-site VPNs?",
    options: [
      "TLS",
      "IPSec",
      "SSH",
      "SRTP"
    ],
    correct: 1,
    explanation: "IPSec is used for network-layer VPNs."
  },

  // =========================
  // 4.0 Security Operations
  // =========================
  {
    id: 16,
    domain: "4.0 Security Operations",
    question: "Blocking executables from USB drives is enforced using:",
    options: [
      "Group Policy",
      "SELinux",
      "Firewall",
      "Sandboxing"
    ],
    correct: 0,
    explanation: "Group Policy can restrict executable execution."
  },
  {
    id: 17,
    domain: "4.0 Security Operations",
    question: "Employee-owned devices used for work are:",
    options: [
      "BYOD",
      "COPE",
      "CYOD",
      "MDM"
    ],
    correct: 0,
    explanation: "BYOD allows personal devices for work use."
  },
  {
    id: 18,
    domain: "4.0 Security Operations",
    question: "Strongest enterprise Wi-Fi security:",
    options: [
      "WPA2-Personal",
      "WPA3-Personal",
      "WPA2-Enterprise",
      "WPA3-Enterprise"
    ],
    correct: 3,
    explanation: "WPA3-Enterprise provides the strongest protection."
  },
  {
    id: 19,
    domain: "4.0 Security Operations",
    question: "After detection, the next IR step is:",
    options: [
      "Eradication",
      "Containment",
      "Recovery",
      "Lessons learned"
    ],
    correct: 1,
    explanation: "Containment prevents further spread."
  },
  {
    id: 20,
    domain: "4.0 Security Operations",
    question: "Safely analyzing malware requires:",
    options: [
      "Sandboxing",
      "Static analysis",
      "Code signing",
      "Input validation"
    ],
    correct: 0,
    explanation: "Sandboxing isolates malicious code."
  },

  // =========================
  // 5.0 Security Program Management and Oversight
  // =========================
  {
    id: 21,
    domain: "5.0 Security Program Management and Oversight",
    question: "Cyber insurance is an example of:",
    options: [
      "Risk acceptance",
      "Risk transference",
      "Risk mitigation",
      "Risk avoidance"
    ],
    correct: 1,
    explanation: "Insurance transfers financial risk."
  },
  {
    id: 22,
    domain: "5.0 Security Program Management and Oversight",
    question: "Which document defines uptime guarantees?",
    options: [
      "NDA",
      "SLA",
      "MOU",
      "AUP"
    ],
    correct: 1,
    explanation: "SLAs define service expectations."
  },
  {
    id: 23,
    domain: "5.0 Security Program Management and Oversight",
    question: "Which GDPR right allows deletion of personal data?",
    options: [
      "Data portability",
      "Right to erasure",
      "Consent",
      "Transparency"
    ],
    correct: 1,
    explanation: "GDPR includes the right to be forgotten."
  },
  {
    id: 24,
    domain: "5.0 Security Program Management and Oversight",
    question: "Which metric defines acceptable downtime?",
    options: [
      "RPO",
      "RTO",
      "MTBF",
      "MTTR"
    ],
    correct: 1,
    explanation: "RTO defines maximum tolerable downtime."
  },
  {
    id: 25,
    domain: "5.0 Security Program Management and Oversight",
    question: "Secure disposal of drives is defined by:",
    options: [
      "Media sanitization policy",
      "AUP",
      "SLA",
      "MOU"
    ],
    correct: 0,
    explanation: "Media sanitization policies define disposal procedures."
  }

];
