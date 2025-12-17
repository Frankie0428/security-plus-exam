// questions.js
// Global question bank used by the exam engine.
// MUST be a single valid array.

window.questionBank = [
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

  // ✅ Continue adding questions exactly like this:
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

  // ... keep your remaining questions (4–90) here, inside this same array ...

  {
    id: 90,
    domain: "5.0 Security Program Management and Oversight",
    question:
      "Which documentation MOST directly defines steps required to securely dispose of storage devices at end of life?",
    options: ["Media sanitization policy/standard", "Acceptable use policy", "SLA", "MOU"],
    correct: 0,
    explanation:
      "Media sanitization standards define approved disposal, wiping, and destruction procedures."
  }
];
