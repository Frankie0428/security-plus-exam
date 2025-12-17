// questions.js
// Global question bank used by the exam engine
// IMPORTANT: Keep ALL questions inside the array below.

const questionBank = [
  {
    id: 1,
    domain: "1.0 General Security Concepts",
    question:
      "A security administrator needs to prevent lateral movement within the network after an initial compromise. Which Zero Trust principle BEST addresses this requirement?",
    options: [
      "Adaptive identity verification",
      "Policy-driven access control",
      "Threat scope reduction",
      "Continuous verification"
    ],
    correct: 2,
    explanation:
      "Threat scope reduction limits lateral movement through segmentation and micro-segmentation."
  },
  {
    id: 2,
    domain: "1.0 General Security Concepts",
    question:
      "Which security principle ensures users only have access necessary to perform their job functions?",
    options: ["Separation of duties", "Least privilege", "Defense in depth", "Need to know"],
    correct: 1,
    explanation: "Least privilege limits access to only what is required for a role."
  },
  {
    id: 3,
    domain: "1.0 General Security Concepts",
    question:
      "A company implements bollards around the perimeter of their data center. This is an example of which type of physical security control?",
    options: ["Deterrent", "Preventive", "Detective", "Compensating"],
    correct: 1,
    explanation:
      "Bollards are preventive physical controls that physically prevent vehicle access to protected areas."
  },
  {
    id: 4,
    domain: "1.0 General Security Concepts",
    question:
      "Which cryptographic solution would BEST protect data confidentiality for a database containing social security numbers while still allowing the database to perform searches?",
    options: ["Hashing with salt", "Tokenization", "Full-disk encryption", "Data masking"],
    correct: 1,
    explanation:
      "Tokenization replaces sensitive data with non-sensitive tokens while still allowing searches and matching through token values."
  },
  {
    id: 5,
    domain: "1.0 General Security Concepts",
    question:
      "A company wants to ensure that if an employee's credentials are compromised, the attacker cannot access resources from an unusual geographic location. Which authentication factor addresses this?",
    options: ["Something you are", "Something you have", "Something you know", "Somewhere you are"],
    correct: 3,
    explanation:
      "Somewhere you are (geolocation) validates the user’s location and helps detect unusual access attempts."
  },
  {
    id: 6,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "An organization discovers an attacker has been in their network for 6 months, slowly exfiltrating IP while avoiding detection. This threat actor is MOST likely:",
    options: ["Unskilled attacker", "Hacktivist", "Nation-state", "Insider threat"],
    correct: 2,
    explanation:
      "Nation-state actors often run APT campaigns with long dwell times and a focus on intellectual property."
  },
  {
    id: 7,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "Users receive an email appearing from the CEO requesting urgent wire transfers. The email uses CEO@comp4ny.com instead of CEO@company.com. This is an example of:",
    options: ["Typosquatting", "Pharming", "Watering hole attack", "Business email compromise"],
    correct: 0,
    explanation:
      "Typosquatting uses look-alike domain names (like comp4ny.com) to trick users."
  },
  {
    id: 8,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "A web app is vulnerable to attacks where malicious scripts are permanently stored in the DB and executed when others view pages. This describes:",
    options: ["Reflected XSS", "Stored XSS", "SQL injection", "CSRF"],
    correct: 1,
    explanation:
      "Stored XSS persists in the application’s storage and is served to other users."
  },
  {
    id: 9,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "Which mitigation technique would BEST prevent ransomware from encrypting critical business data?",
    options: ["Application allow list", "Network segmentation", "Air-gapped backups", "EDR"],
    correct: 2,
    explanation:
      "Air-gapped backups are isolated and cannot be encrypted by ransomware on the network."
  },
  {
    id: 10,
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "A scan flags Apache 2.2.15 as vulnerable, but the vendor backported fixes without changing the version number. What type of scan result is this?",
    options: ["False positive", "False negative", "True positive", "True negative"],
    correct: 0,
    explanation:
      "Version-based detection can flag patched systems as vulnerable—this is a false positive."
  },
  {
    id: 11,
    domain: "3.0 Security Architecture",
    question:
      "A company wants cloud email but physical control of database servers. Which deployment model BEST fits?",
    options: ["Public cloud", "Private cloud", "Hybrid cloud", "Community cloud"],
    correct: 2,
    explanation:
      "Hybrid cloud combines cloud services with on-prem systems."
  },
  {
    id: 12,
    domain: "3.0 Security Architecture",
    question:
      "A WAF is placed in front of web servers. If it fails in fail-open mode, what is the implication?",
    options: [
      "All traffic is blocked (availability issue)",
      "Traffic bypasses the WAF (reduced security)",
      "WAF continues filtering with cached rules",
      "Traffic automatically redirects to a backup WAF"
    ],
    correct: 1,
    explanation:
      "Fail-open prioritizes availability; traffic can bypass security controls."
  },
  {
    id: 13,
    domain: "3.0 Security Architecture",
    question:
      "Which network appliance operates at Layer 7 and can inspect encrypted HTTPS traffic via SSL/TLS interception?",
    options: ["Next-generation firewall (NGFW)", "IDS", "NAC", "Load balancer"],
    correct: 0,
    explanation:
      "NGFWs can decrypt and inspect traffic for application-level threats."
  },
  {
    id: 14,
    domain: "3.0 Security Architecture",
    question:
      "A company implements a jump server for admins to access production systems. What benefit does this provide?",
    options: [
      "Centralized logging of administrative access",
      "Load balancing for admin connections",
      "High availability for production systems",
      "Encryption of administrative traffic"
    ],
    correct: 0,
    explanation:
      "Jump servers centralize and control admin access, making monitoring and logging easier."
  },
  {
    id: 15,
    domain: "3.0 Security Architecture",
    question:
      "Which protocol should be used for a site-to-site VPN connecting two office locations?",
    options: ["TLS", "IPSec", "SSH", "SRTP"],
    correct: 1,
    explanation:
      "IPSec is commonly used for site-to-site VPNs at the network layer."
  },
  {
    id: 16,
    domain: "4.0 Security Operations",
    question:
      "An admin needs to ensure Windows workstations cannot run executables from USB drives. Which technique accomplishes this?",
    options: ["Group Policy", "SELinux", "Host-based firewall", "Application sandboxing"],
    correct: 0,
    explanation:
      "Group Policy can enforce Software Restriction Policies/AppLocker rules."
  },
  {
    id: 17,
    domain: "4.0 Security Operations",
    question:
      "A company allows employees to use personal smartphones for work email. Which model is this?",
    options: ["BYOD", "COPE", "CYOD", "MDM"],
    correct: 0,
    explanation:
      "BYOD is employee-owned devices used for work purposes."
  },
  {
    id: 18,
    domain: "4.0 Security Operations",
    question:
      "Which wireless security protocol provides the STRONGEST protection for enterprise networks?",
    options: ["WPA2-Personal", "WPA3-Personal", "WPA2-Enterprise", "WPA3-Enterprise"],
    correct: 3,
    explanation:
      "WPA3-Enterprise provides the strongest enterprise wireless security."
  },
  {
    id: 19,
    domain: "4.0 Security Operations",
    question:
      "During incident response, analysts find 47 workstations compromised. What is the NEXT step after detection and analysis?",
    options: ["Eradication", "Containment", "Recovery", "Lessons learned"],
    correct: 1,
    explanation:
      "Containment prevents further spread after detection/analysis."
  },
  {
    id: 20,
    domain: "4.0 Security Operations",
    question:
      "A security team needs to analyze a potentially malicious file without risking production systems. What should they use?",
    options: ["Sandboxing", "Static code analysis", "Input validation", "Code signing"],
    correct: 0,
    explanation:
      "Sandboxing safely executes/simulates the file in an isolated environment."
  },
  {
    id: 21,
    domain: "4.0 Security Operations",
    question:
      "Which IAM component verifies a user has permission to access a resource?",
    options: ["Authentication", "Authorization", "Accounting", "Attestation"],
    correct: 1,
    explanation:
      "Authorization determines what an authenticated user can access."
  },
  {
    id: 22,
    domain: "5.0 Security Program Management and Oversight",
    question:
      "Asset Value: $500,000, Exposure Factor: 40%, ARO: 0.1. What is the ALE?",
    options: ["$20,000", "$50,000", "$200,000", "$2,000"],
    correct: 0,
    explanation:
      "SLE = 500,000 × 0.4 = 200,000; ALE = 200,000 × 0.1 = 20,000."
  },
  {
    id: 23,
    domain: "5.0 Security Program Management and Oversight",
    question:
      "A company buys cyber insurance instead of adding controls. This is an example of:",
    options: ["Risk avoidance", "Risk transference", "Risk mitigation", "Risk acceptance"],
    correct: 1,
    explanation:
      "Insurance transfers financial risk to a third party."
  },
  {
    id: 24,
    domain: "5.0 Security Program Management and Oversight",
    question:
      "Which agreement defines expected uptime and response times for a cloud provider?",
    options: ["MOA", "MOU", "SLA", "NDA"],
    correct: 2,
    explanation:
      "An SLA defines service performance expectations and remedies."
  },
  {
    id: 25,
    domain: "5.0 Security Program Management and Oversight",
    question:
      "A company must comply with GDPR. Which requirement does this regulation impose?",
    options: ["Encryption of all data at rest", "Right to be forgotten", "Annual pen testing", "MFA for all users"],
    correct: 1,
    explanation:
      "GDPR includes the right to erasure (right to be forgotten) under certain conditions."
  },

  { id: 26, domain: "1.0 General Security Concepts", question: "Which control type is MOST likely to reduce risk by discouraging an attacker before an attempt is made?", options: ["Detective", "Deterrent", "Corrective", "Compensating"], correct: 1, explanation: "Deterrent controls discourage attacks before they occur." },
  { id: 27, domain: "1.0 General Security Concepts", question: "A company wants to ensure that a sent message cannot be denied later by the sender. Which security concept is being addressed?", options: ["Confidentiality", "Non-repudiation", "Availability", "Least privilege"], correct: 1, explanation: "Non-repudiation provides proof of origin so a sender cannot deny sending a message." },
  { id: 28, domain: "1.0 General Security Concepts", question: "Which of the following BEST describes the purpose of hashing in security?", options: ["Recover original data", "Provide reversible encryption", "Verify integrity", "Provide confidentiality for files at rest"], correct: 2, explanation: "Hashes are one-way functions commonly used to verify data integrity." },
  { id: 29, domain: "1.0 General Security Concepts", question: "An organization requires two administrators to approve firewall rule changes. This is an example of:", options: ["Least privilege", "Separation of duties", "Need to know", "Data minimization"], correct: 1, explanation: "Separation of duties reduces fraud/mistakes by splitting responsibilities." },
  { id: 30, domain: "1.0 General Security Concepts", question: "Which of the following would BEST help prevent password reuse across multiple services?", options: ["Password manager", "Password complexity rules only", "Security questions", "Disabling account lockout"], correct: 0, explanation: "A password manager helps generate and store unique passwords for each service." },
  { id: 31, domain: "1.0 General Security Concepts", question: "Which Zero Trust concept MOST directly supports limiting access based on real-time risk signals (device health, location, behavior)?", options: ["Continuous verification", "Implicit trust", "Shared responsibility", "Single sign-on"], correct: 0, explanation: "Continuous verification evaluates requests continuously using changing risk context." },

  { id: 32, domain: "2.0 Threats, Vulnerabilities, and Mitigations", question: "A user reports that a website address redirects to a fake login page even when the user types the correct URL. Which attack is MOST likely?", options: ["DNS poisoning", "Typosquatting", "Shoulder surfing", "Bluejacking"], correct: 0, explanation: "DNS poisoning can redirect users to malicious sites even when they enter a correct URL." },
  { id: 33, domain: "2.0 Threats, Vulnerabilities, and Mitigations", question: "Which vulnerability is MOST associated with failing to validate and sanitize user input in a web application?", options: ["SQL injection", "ARP poisoning", "Evil twin", "VLAN hopping"], correct: 0, explanation: "SQL injection commonly results from improper input validation and unsafe query construction." },
  { id: 34, domain: "2.0 Threats, Vulnerabilities, and Mitigations", question: "A user receives a text message claiming their bank account is locked and asking them to click a link. This is an example of:", options: ["Smishing", "Vishing", "Whaling", "Tailgating"], correct: 0, explanation: "Smishing is phishing delivered via SMS/text messages." },
  { id: 35, domain: "2.0 Threats, Vulnerabilities, and Mitigations", question: "Which attack attempts to exploit trust by inserting a rogue device between a user and a legitimate network service?", options: ["Man-in-the-middle", "Credential stuffing", "Password spraying", "Logic bomb"], correct: 0, explanation: "MITM attacks intercept/alter traffic between communicating parties." },
  { id: 36, domain: "2.0 Threats, Vulnerabilities, and Mitigations", question: "An attacker uses previously leaked username/password pairs to attempt logins across many websites. This is known as:", options: ["Password spraying", "Credential stuffing", "Rainbow table attack", "Brute force"], correct: 1, explanation: "Credential stuffing uses known leaked credential pairs across multiple services." },
  { id: 37, domain: "2.0 Threats, Vulnerabilities, and Mitigations", question: "Which control would MOST directly reduce the effectiveness of credential stuffing attacks?", options: ["MFA", "Disk encryption", "Port security", "NAT"], correct: 0, explanation: "MFA significantly reduces risk when passwords are compromised." },
  { id: 38, domain: "2.0 Threats, Vulnerabilities, and Mitigations", question: "A system is affected by a vulnerability that exists in a vendor's code library used by multiple applications. This is an example of:", options: ["Supply chain risk", "Insider threat", "Shadow IT", "Tokenization failure"], correct: 0, explanation: "Third-party components introduce supply chain risk." },
  { id: 39, domain: "2.0 Threats, Vulnerabilities, and Mitigations", question: "Which type of malware is designed to remain hidden while providing long-term unauthorized access to a system?", options: ["Worm", "Trojan", "Rootkit", "Adware"], correct: 2, explanation: "Rootkits are designed to hide their presence and maintain privileged access." },
  { id: 40, domain: "2.0 Threats, Vulnerabilities, and Mitigations", question: "A vulnerability scanner reports no issues, but the system is actually vulnerable due to a missing patch. This result is a:", options: ["True negative", "False negative", "True positive", "False positive"], correct: 1, explanation: "A false negative occurs when a vulnerability exists but the tool fails to detect it." },
  { id: 41, domain: "2.0 Threats, Vulnerabilities, and Mitigations", question: "Which social engineering tactic involves an attacker offering something desirable (free software, prize) in exchange for a user’s action?", options: ["Baiting", "Pretexting", "Tailgating", "Quid pro quo"], correct: 0, explanation: "Baiting lures victims with something enticing." },
  { id: 42, domain: "2.0 Threats, Vulnerabilities, and Mitigations", question: "Which mitigation BEST reduces the risk of an evil twin wireless access point capturing credentials?", options: ["Disable SSID broadcasting", "Use WPA3-Enterprise with 802.1X", "Use WEP", "Increase antenna power"], correct: 1, explanation: "802.1X enterprise auth helps prevent credential theft via rogue AP impersonation." },
  { id: 43, domain: "2.0 Threats, Vulnerabilities, and Mitigations", question: "A developer hardcodes API keys into a public Git repository. What is the MOST immediate security impact?", options: ["Loss of availability", "Credential exposure", "Improved auditability", "Reduced attack surface"], correct: 1, explanation: "Hardcoded secrets in public repos can be harvested and abused." },
  { id: 44, domain: "2.0 Threats, Vulnerabilities, and Mitigations", question: "A user is tricked into installing a browser extension that captures their keystrokes. This is MOST likely:", options: ["Keylogger", "Worm", "Boot sector virus", "Ransomware"], correct: 0, explanation: "Keyloggers record keystrokes to capture credentials and sensitive data." },
  { id: 45, domain: "2.0 Threats, Vulnerabilities, and Mitigations", question: "Which technique is MOST effective at preventing buffer overflow exploitation at runtime?", options: ["DEP/ASLR", "RAID", "WPA3", "HIDS signatures only"], correct: 0, explanation: "DEP/ASLR make exploitation harder by preventing execution and randomizing memory layout." },
  { id: 46, domain: "2.0 Threats, Vulnerabilities, and Mitigations", question: "An attacker sends a targeted email to a specific employee in accounting containing a malicious invoice. This is BEST described as:", options: ["Spear phishing", "Whaling", "Smishing", "Vishing"], correct: 0, explanation: "Spear phishing targets a specific person or role with tailored content." },

  { id: 47, domain: "3.0 Security Architecture", question: "Which network design MOST reduces lateral movement by placing each workload in its own isolated segment with strict controls?", options: ["Flat network", "Micro-segmentation", "Port mirroring", "NAT"], correct: 1, explanation: "Micro-segmentation isolates workloads and restricts east-west traffic." },
  { id: 48, domain: "3.0 Security Architecture", question: "Which control is MOST appropriate to prevent unauthorized devices from connecting to switch ports in an office?", options: ["Port security", "DHCP snooping", "WAF", "TLS inspection"], correct: 0, explanation: "Port security restricts which MAC addresses can connect to a switch port." },
  { id: 49, domain: "3.0 Security Architecture", question: "A company needs to store encryption keys separately from encrypted data and tightly control access. Which solution BEST fits?", options: ["HSM", "Load balancer", "SIEM", "Proxy server"], correct: 0, explanation: "HSMs securely generate/store keys and protect cryptographic operations." },
  { id: 50, domain: "3.0 Security Architecture", question: "Which architecture places a publicly accessible server in a separate network zone to reduce exposure of internal networks?", options: ["DMZ", "VLAN trunking", "Mesh topology", "Peer-to-peer"], correct: 0, explanation: "A DMZ isolates public-facing services from internal networks." },
  { id: 51, domain: "3.0 Security Architecture", question: "Which approach BEST ensures that only known, approved software can run on company endpoints?", options: ["Allow listing", "Patch management", "Load balancing", "Tokenization"], correct: 0, explanation: "Allow listing restricts execution to approved software." },
  { id: 52, domain: "3.0 Security Architecture", question: "A company wants to securely expose internal web apps to remote users without providing full network access. Which solution is BEST?", options: ["ZTNA", "Site-to-site IPSec VPN", "Hub-and-spoke routing", "Open Wi-Fi"], correct: 0, explanation: "ZTNA provides application-level access without full network-level VPN access." },
  { id: 53, domain: "3.0 Security Architecture", question: "Which of the following is MOST commonly used to securely automate authentication between microservices without user interaction?", options: ["Mutual TLS (mTLS)", "WEP", "RDP", "POP3"], correct: 0, explanation: "mTLS authenticates both client and server services." },
  { id: 54, domain: "3.0 Security Architecture", question: "An organization wants to ensure integrity and non-repudiation for software updates. Which control BEST supports this?", options: ["Code signing", "Full-disk encryption", "Data masking", "NAT"], correct: 0, explanation: "Code signing validates publisher identity and ensures code integrity." },
  { id: 55, domain: "3.0 Security Architecture", question: "Which storage security technique changes sensitive values into consistent substitute values to preserve format and usability?", options: ["Tokenization", "Steganography", "WEP", "Port scanning"], correct: 0, explanation: "Tokenization replaces sensitive data with tokens while retaining usability." },
  { id: 56, domain: "3.0 Security Architecture", question: "A security team needs a solution to aggregate logs and correlate events from many systems. Which tool BEST fits?", options: ["SIEM", "NAC", "Proxy", "Load balancer"], correct: 0, explanation: "SIEM solutions centralize logs and correlate events for detection and response." },
  { id: 57, domain: "3.0 Security Architecture", question: "Which concept requires that cryptographic keys be rotated regularly to reduce impact if a key is exposed?", options: ["Key management lifecycle", "Token bucket", "RAID parity", "Screened subnet"], correct: 0, explanation: "Key management includes rotation, storage, access control, and destruction." },

  { id: 58, domain: "4.0 Security Operations", question: "Which log source would be MOST useful to identify repeated failed login attempts across many accounts?", options: ["Authentication logs", "Printer logs", "UPS logs", "Physical badge inventory"], correct: 0, explanation: "Authentication logs track login successes/failures and are key for brute force detection." },
  { id: 59, domain: "4.0 Security Operations", question: "A SOC analyst needs to determine whether a suspicious file is malicious without executing it. Which technique is BEST?", options: ["Static analysis", "Sandbox detonation", "Packet capture", "Port scanning"], correct: 0, explanation: "Static analysis examines file contents/metadata without executing it." },
  { id: 60, domain: "4.0 Security Operations", question: "Which control BEST supports rapid detection of endpoint threats and automated containment actions?", options: ["EDR", "WAF", "NAT", "RAID"], correct: 0, explanation: "EDR provides endpoint telemetry and response actions like isolation." },
  { id: 61, domain: "4.0 Security Operations", question: "A company requires critical vulnerabilities to be patched within 7 days. This is an example of:", options: ["Patch SLA", "Data classification", "Network segmentation", "Tokenization"], correct: 0, explanation: "A patch SLA defines timelines for remediation based on severity." },
  { id: 62, domain: "4.0 Security Operations", question: "Which step in the vulnerability management lifecycle MOST directly follows vulnerability identification?", options: ["Prioritization", "Disaster recovery", "Data masking", "Tokenization"], correct: 0, explanation: "After identification, vulnerabilities are prioritized by risk." },
  { id: 63, domain: "4.0 Security Operations", question: "A system is isolated from the network after malware is detected to prevent spread. This is an example of:", options: ["Containment", "Eradication", "Recovery", "Lessons learned"], correct: 0, explanation: "Containment limits damage and spread during incident response." },
  { id: 64, domain: "4.0 Security Operations", question: "Which of the following BEST describes the purpose of a runbook?", options: ["Step-by-step operational procedure", "Legal contract for vendors", "Encryption standard", "Data classification label"], correct: 0, explanation: "Runbooks provide repeatable procedures for operations and incident handling." },
  { id: 65, domain: "4.0 Security Operations", question: "An organization wants to detect unauthorized changes to critical system files. Which control is BEST?", options: ["File integrity monitoring (FIM)", "DHCP snooping", "Load balancing", "Tokenization"], correct: 0, explanation: "FIM detects changes to important files and can alert on tampering." },
  { id: 66, domain: "4.0 Security Operations", question: "Which backup approach BEST supports fast recovery of a single corrupted database without restoring the entire server?", options: ["Database-level backups", "Full-disk image only", "No backups; rely on RAID", "Screenshots of configs"], correct: 0, explanation: "Database backups enable restoring database state without full server restores." },
  { id: 67, domain: "4.0 Security Operations", question: "A security analyst correlates multiple low-severity events into one high-confidence incident. Which capability enables this MOST directly?", options: ["SIEM correlation rules", "NAT", "Port security", "VLAN trunking"], correct: 0, explanation: "SIEM correlation rules combine signals across sources." },
  { id: 68, domain: "4.0 Security Operations", question: "Which is the BEST reason to implement centralized time synchronization (NTP) in a security environment?", options: ["Accurate log correlation", "Faster internet speed", "Better Wi-Fi coverage", "Higher CPU performance"], correct: 0, explanation: "Consistent timestamps are essential for investigations across systems." },
  { id: 69, domain: "4.0 Security Operations", question: "A company wants to prevent data exfiltration via personal email and cloud storage. Which technology is BEST?", options: ["DLP", "NAT", "WEP", "ARP"], correct: 0, explanation: "DLP helps detect and block sensitive data leaving approved channels." },
  { id: 70, domain: "4.0 Security Operations", question: "Which authentication method BEST reduces the risk of password theft through phishing?", options: ["FIDO2/WebAuthn security keys", "SMS-based OTP only", "Security questions", "PIN reuse across services"], correct: 0, explanation: "FIDO2/WebAuthn is phishing-resistant and tied to the origin." },
  { id: 71, domain: "4.0 Security Operations", question: "A system must maintain a record of who accessed sensitive data and when. Which control BEST addresses this?", options: ["Audit logging", "Data masking", "Load balancing", "NAT"], correct: 0, explanation: "Audit logs provide accountability for access to sensitive resources." },
  { id: 72, domain: "4.0 Security Operations", question: "A company disables legacy authentication protocols and enforces modern authentication. This primarily improves:", options: ["Authentication security", "Physical security", "Printer performance", "WAN bandwidth"], correct: 0, explanation: "Modern authentication reduces risk from weak legacy protocols." },
  { id: 73, domain: "4.0 Security Operations", question: "Which practice BEST supports reducing exposure from unused services on servers?", options: ["Service hardening", "Password spraying", "Tokenization", "Data masking"], correct: 0, explanation: "Hardening includes disabling unused services to reduce attack surface." },
  { id: 74, domain: "4.0 Security Operations", question: "A security team wants endpoints blocked from reaching command-and-control servers on known bad IPs. Which control BEST fits?", options: ["Egress filtering", "Port mirroring", "WEP", "RAID"], correct: 0, explanation: "Egress filtering restricts outbound traffic to reduce successful C2 communication." },
  { id: 75, domain: "4.0 Security Operations", question: "Which action is MOST appropriate to validate the security of a new application before production release?", options: ["Penetration test", "Disable logging", "Increase CPU", "Remove TLS"], correct: 0, explanation: "Pen testing helps identify exploitable weaknesses before production deployment." },
  { id: 76, domain: "4.0 Security Operations", question: "During incident response, the team removes malicious files and disables persistence mechanisms. This is:", options: ["Eradication", "Containment", "Detection", "Preparation"], correct: 0, explanation: "Eradication removes the threat and artifacts from affected systems." },

  { id: 77, domain: "5.0 Security Program Management and Oversight", question: "Which document BEST defines how an organization will continue essential operations during a major outage?", options: ["BCP", "AUP", "MOU", "NDA"], correct: 0, explanation: "BCP focuses on keeping critical functions running during disruptions." },
  { id: 78, domain: "5.0 Security Program Management and Oversight", question: "Which plan focuses MOST on restoring IT systems and services after a disaster?", options: ["DRP", "AUP", "IRP", "SLA"], correct: 0, explanation: "DRP focuses on restoring systems/services after disruptive events." },
  { id: 79, domain: "5.0 Security Program Management and Oversight", question: "A company classifies data as Public, Internal, Confidential, and Restricted. This is an example of:", options: ["Data classification scheme", "Change management", "Patch management", "Threat modeling"], correct: 0, explanation: "A data classification scheme defines sensitivity levels and handling requirements." },
  { id: 80, domain: "5.0 Security Program Management and Oversight", question: "Which concept ensures a third-party vendor meets security requirements before being granted access to sensitive systems?", options: ["Vendor risk management", "Load balancing", "Tokenization", "Port security"], correct: 0, explanation: "Vendor risk management evaluates and enforces security requirements for third parties." },
  { id: 81, domain: "5.0 Security Program Management and Oversight", question: "A policy states that employees must use company-managed password managers and enable MFA. This is BEST described as:", options: ["Security policy", "Runbook", "Playbook", "Incident ticket"], correct: 0, explanation: "A security policy defines required behaviors and controls." },
  { id: 82, domain: "5.0 Security Program Management and Oversight", question: "Which metric BEST represents the maximum tolerable period of disruption for a business process?", options: ["RTO", "RPO", "MTTR", "MTBF"], correct: 0, explanation: "RTO is the maximum acceptable downtime before service must be restored." },
  { id: 83, domain: "5.0 Security Program Management and Oversight", question: "Which metric BEST represents the maximum acceptable amount of data loss measured in time?", options: ["RPO", "RTO", "SLE", "ARO"], correct: 0, explanation: "RPO defines how far back data can be restored (acceptable data loss)." },
  { id: 84, domain: "5.0 Security Program Management and Oversight", question: "A company performs a quarterly exercise to test incident response procedures with realistic scenarios. This is BEST described as:", options: ["Tabletop exercise", "Tokenization", "Load testing", "Vulnerability scanning"], correct: 0, explanation: "Tabletop exercises simulate incidents to validate processes and readiness." },
  { id: 85, domain: "5.0 Security Program Management and Oversight", question: "Which type of control is implemented to meet compliance when the primary control cannot be used?", options: ["Compensating control", "Preventive control", "Detective control", "Corrective control"], correct: 0, explanation: "Compensating controls provide alternate methods to meet requirements." },
  { id: 86, domain: "5.0 Security Program Management and Oversight", question: "A manager documents risk decisions with justification and executive approval, even though a control is not implemented. This is:", options: ["Risk acceptance", "Risk avoidance", "Risk transference", "Risk mitigation"], correct: 0, explanation: "Risk acceptance occurs when leadership formally accepts risk." },
  { id: 87, domain: "5.0 Security Program Management and Oversight", question: "Which activity MOST directly supports identifying potential threats and documenting mitigations during system design?", options: ["Threat modeling", "Data masking", "Patch management", "Cable management"], correct: 0, explanation: "Threat modeling identifies threats early and documents mitigations during design." },
  { id: 88, domain: "5.0 Security Program Management and Oversight", question: "An organization requires all systems storing PII to encrypt data at rest and in transit. This requirement would MOST likely be found in:", options: ["Security standard", "Incident ticket", "Runbook", "Daily status report"], correct: 0, explanation: "Security standards define mandatory technical requirements." },
  { id: 89, domain: "5.0 Security Program Management and Oversight", question: "A company maps its security controls to a recognized framework to demonstrate due diligence. Which framework is MOST commonly used in many U.S. organizations?", options: ["NIST CSF", "WEP", "ARP", "SMTP"], correct: 0, explanation: "NIST CSF is widely used to organize and communicate cybersecurity risk management." },
  { id: 90, domain: "5.0 Security Program Management and Oversight", question: "Which documentation MOST directly defines steps required to securely dispose of storage devices at end of life?", options: ["Media sanitization policy/standard", "Acceptable use policy", "SLA", "MOU"], correct: 0, explanation: "Media sanitization standards define approved disposal, wiping, and destruction procedures." }
];

// Optional: quick sanity check in DevTools
console.log(`✅ questionBank loaded: ${questionBank.length} questions`);
