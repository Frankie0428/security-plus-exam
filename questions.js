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
        explanation: "Least privilege means users should only have access to resources necessary for their job functions. Granting unnecessary access to financial records violates this fundamental security principle."
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
        explanation: "Bollards are preventive physical controls that physically prevent vehicle access to protected areas, stopping potential ram attacks or unauthorized vehicle entry."
    },
    {
        id: 4,
        domain: "1.0 General Security Concepts",
        question: "Which cryptographic solution would BEST protect data confidentiality for a database containing social security numbers while still allowing the database to perform searches?",
        options: [
            "Hashing with salt",
            "Tokenization",
            "Full-disk encryption",
            "Data masking"
        ],
        correct: 1,
        explanation: "Tokenization replaces sensitive data with non-sensitive tokens that can be mapped back to the original data through a secure lookup table. This allows searches while maintaining confidentiality."
    },
    {
        id: 5,
        domain: "1.0 General Security Concepts",
        question: "A company wants to ensure that if an employee's credentials are compromised, the attacker cannot access resources from an unusual geographic location. Which authentication factor addresses this?",
        options: [
            "Something you are",
            "Something you have",
            "Something you know",
            "Somewhere you are"
        ],
        correct: 3,
        explanation: "Somewhere you are (geolocation) is an authentication factor that validates the physical or network location of the user, helping detect impossible travel scenarios."
    },
    {
        id: 6,
        domain: "2.0 Threats, Vulnerabilities, and Mitigations",
        question: "An organization discovers that an attacker has been in their network for 6 months, slowly exfiltrating intellectual property. The attacker used legitimate credentials and moved carefully to avoid detection. This threat actor is MOST likely:",
        options: [
            "Unskilled attacker",
            "Hacktivist",
            "Nation-state",
            "Insider threat"
        ],
        correct: 2,
        explanation: "Nation-state actors conduct Advanced Persistent Threats (APTs) characterized by sophisticated techniques, long dwell times (often months), use of legitimate credentials, and focus on intellectual property."
    },
    {
        id: 7,
        domain: "2.0 Threats, Vulnerabilities, and Mitigations",
        question: "Users receive an email appearing to be from the CEO requesting urgent wire transfers. The email address is CEO@comp4ny.com instead of CEO@company.com. This is an example of:",
        options: [
            "Typosquatting",
            "Pharming",
            "Watering hole attack",
            "Business email compromise"
        ],
        correct: 0,
        explanation: "Typosquatting uses domains with slight variations (replacing 'a' with '4') to impersonate legitimate entities. This is a common tactic in business email compromise attacks."
    },
    {
        id: 8,
        domain: "2.0 Threats, Vulnerabilities, and Mitigations",
        question: "A web application is vulnerable to attacks where malicious scripts are permanently stored in the database and executed when other users view the affected pages. This describes:",
        options: [
            "Reflected XSS",
            "Stored XSS",
            "SQL injection",
            "CSRF"
        ],
        correct: 1,
        explanation: "Stored (persistent) XSS occurs when malicious scripts are permanently stored on the target server (database, forum, etc.) and served to users who view the affected content."
    },
    {
        id: 9,
        domain: "2.0 Threats, Vulnerabilities, and Mitigations",
        question: "Which mitigation technique would BEST prevent ransomware from encrypting critical business data?",
        options: [
            "Application allow list",
            "Network segmentation",
            "Air-gapped backups",
            "Endpoint detection and response (EDR)"
        ],
        correct: 2,
        explanation: "Air-gapped backups are physically or logically isolated from the network, making them inaccessible to ransomware. Even if primary systems are encrypted, air-gapped backups remain safe."
    },
    {
        id: 10,
        domain: "2.0 Threats, Vulnerabilities, and Mitigations",
        question: "A vulnerability scan shows that a server is running Apache 2.2.15, which has multiple known CVEs. However, the vendor has backported security fixes without changing the version number. What type of scan result is this?",
        options: [
            "False positive",
            "False negative",
            "True positive",
            "True negative"
        ],
        correct: 0,
        explanation: "This is a false positive. The scanner detected the vulnerable version number but doesn't account for backported patches. The system appears vulnerable but is actually patched."
    },
    {
        id: 11,
        domain: "3.0 Security Architecture",
        question: "A company wants to move their email services to the cloud but maintain physical control of their database servers. Which deployment model BEST fits this requirement?",
        options: [
            "Public cloud",
            "Private cloud",
            "Hybrid cloud",
            "Community cloud"
        ],
        correct: 2,
        explanation: "Hybrid cloud combines public cloud services (email) with on-premises infrastructure (database servers), allowing organizations to maintain control over sensitive data."
    },
    {
        id: 12,
        domain: "3.0 Security Architecture",
        question: "In a defense-in-depth strategy, a web application firewall (WAF) is placed in front of web servers. If the WAF fails in 'fail-open' mode, what is the security implication?",
        options: [
            "All traffic is blocked, causing an availability issue",
            "Traffic bypasses the WAF, reducing security",
            "The WAF continues filtering with cached rules",
            "Traffic is automatically redirected to a backup WAF"
        ],
        correct: 1,
        explanation: "Fail-open mode allows traffic to pass through when the device fails, prioritizing availability over security. This means malicious traffic could bypass the WAF's protection."
    },
    {
        id: 13,
        domain: "3.0 Security Architecture",
        question: "Which network appliance operates at Layer 7 and can inspect encrypted HTTPS traffic by performing SSL/TLS interception?",
        options: [
            "Next-generation firewall (NGFW)",
            "Intrusion detection system (IDS)",
            "Network access control (NAC)",
            "Load balancer"
        ],
        correct: 0,
        explanation: "Next-generation firewalls operate at Layer 7 (Application layer) and can perform deep packet inspection, including SSL/TLS decryption and inspection."
    },
    {
        id: 14,
        domain: "3.0 Security Architecture",
        question: "A company implements a jump server for administrators to access production systems. What security benefit does this provide?",
        options: [
            "Centralized logging of administrative access",
            "Load balancing for administrative connections",
            "High availability for production systems",
            "Encryption of administrative traffic"
        ],
        correct: 0,
        explanation: "Jump servers (bastion hosts) provide a single, hardened entry point for administrative access, enabling centralized logging, monitoring, and access control."
    },
    {
        id: 15,
        domain: "3.0 Security Architecture",
        question: "Which secure communication protocol should be used for a site-to-site VPN connecting two office locations?",
        options: [
            "TLS",
            "IPSec",
            "SSH",
            "SRTP"
        ],
        correct: 1,
        explanation: "IPSec is designed for site-to-site VPNs, operating at the network layer to secure all IP traffic between locations, providing confidentiality, integrity, and authentication."
    },
    {
        id: 16,
        domain: "4.0 Security Operations",
        question: "An administrator needs to ensure Windows workstations cannot run executables from USB drives. Which hardening technique accomplishes this?",
        options: [
            "Group Policy",
            "SELinux",
            "Host-based firewall",
            "Application sandboxing"
        ],
        correct: 0,
        explanation: "Group Policy in Windows allows administrators to configure AppLocker or Software Restriction Policies to prevent execution of programs from removable media."
    },
    {
        id: 17,
        domain: "4.0 Security Operations",
        question: "A company allows employees to use personal smartphones for work email. Which mobile deployment model is this?",
        options: [
            "BYOD (Bring Your Own Device)",
            "COPE (Corporate-Owned, Personally Enabled)",
            "CYOD (Choose Your Own Device)",
            "MDM (Mobile Device Management)"
        ],
        correct: 0,
        explanation: "BYOD allows employees to use their personal devices for work purposes. COPE and CYOD involve company-owned or selected devices."
    },
    {
        id: 18,
        domain: "4.0 Security Operations",
        question: "Which wireless security protocol provides the STRONGEST protection for enterprise networks?",
        options: [
            "WPA2-Personal with AES",
            "WPA3-Personal with SAE",
            "WPA2-Enterprise with 802.1X",
            "WPA3-Enterprise with 802.1X"
        ],
        correct: 3,
        explanation: "WPA3-Enterprise with 802.1X provides the strongest security: WPA3's improved encryption, 192-bit security suite option, plus enterprise authentication via 802.1X."
    },
    {
        id: 19,
        domain: "4.0 Security Operations",
        question: "During an incident response, analysts find that 47 workstations have been compromised by malware. What is the NEXT step after detection and analysis?",
        options: [
            "Eradication",
            "Containment",
            "Recovery",
            "Lessons learned"
        ],
        correct: 1,
        explanation: "The incident response process follows: Preparation → Detection/Analysis → Containment → Eradication → Recovery → Lessons Learned. Containment prevents further spread."
    },
    {
        id: 20,
        domain: "4.0 Security Operations",
        question: "A security team needs to analyze a potentially malicious file without risking the production network. What technique should they use?",
        options: [
            "Sandboxing",
            "Static code analysis",
            "Input validation",
            "Code signing"
        ],
        correct: 0,
        explanation: "Sandboxing isolates suspicious files in a controlled environment where they can be safely analyzed without risk to production systems."
    },
    {
        id: 21,
        domain: "4.0 Security Operations",
        question: "Which identity and access management (IAM) component verifies that a user has permission to access a specific resource?",
        options: [
            "Authentication",
            "Authorization",
            "Accounting",
            "Attestation"
        ],
        correct: 1,
        explanation: "Authorization determines what resources an authenticated user can access. Authentication verifies identity, while authorization verifies permissions."
    },
    {
        id: 22,
        domain: "5.0 Security Program Management and Oversight",
        question: "During a risk assessment, you calculate: Asset Value: $500,000, Exposure Factor: 40%, Annual Rate of Occurrence: 0.1. What is the Annualized Loss Expectancy (ALE)?",
        options: [
            "$20,000",
            "$50,000",
            "$200,000",
            "$2,000"
        ],
        correct: 0,
        explanation: "ALE = SLE × ARO. First calculate SLE = Asset Value × Exposure Factor = $500,000 × 0.4 = $200,000. Then ALE = $200,000 × 0.1 = $20,000."
    },
    {
        id: 23,
        domain: "5.0 Security Program Management and Oversight",
        question: "A company decides to purchase cyber insurance instead of implementing additional security controls. This is an example of:",
        options: [
            "Risk avoidance",
            "Risk transference",
            "Risk mitigation",
            "Risk acceptance"
        ],
        correct: 1,
        explanation: "Risk transference shifts the financial impact of a risk to a third party, typically through insurance. The organization transfers the financial burden."
    },
    {
        id: 24,
        domain: "5.0 Security Program Management and Oversight",
        question: "Which agreement defines the expected uptime and response times for a cloud service provider?",
        options: [
            "MOA (Memorandum of Agreement)",
            "MOU (Memorandum of Understanding)",
            "SLA (Service Level Agreement)",
            "NDA (Non-Disclosure Agreement)"
        ],
        correct: 2,
        explanation: "A Service Level Agreement (SLA) defines specific metrics like uptime percentages, response times, and performance standards with penalties if unmet."
    },
    {
        id: 25,
        domain: "5.0 Security Program Management and Oversight",
        question: "A company must comply with GDPR. Which requirement does this regulation impose?",
        options: [
            "Encryption of all data at rest",
            "Right to be forgotten",
            "Annual penetration testing",
            "Multi-factor authentication for all users"
        ],
        correct: 1,
        explanation: "GDPR grants individuals the 'right to be forgotten' (right to erasure), requiring organizations to delete personal data upon request under certain conditions."
    }

    // ⚠️ YOU NEED TO ADD 60 MORE QUESTIONS HERE (Questions 26-85)
    // Follow the same format with proper domain distribution:
    // Domain 1: 10 questions (12%)
    // Domain 2: 19 questions (22%)
    // Domain 3: 15 questions (18%)
    // Domain 4: 24 questions (28%)
    // Domain 5: 17 questions (20%)
];
