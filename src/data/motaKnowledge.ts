export interface SchemeDetail {
  id: string;
  name: string;
  shortCode: string;
  category: 'School' | 'Higher Education' | 'Research' | 'Overseas' | 'Premier Institutes';
  description: string;
  annualGrant: string;
  incomeLimit: string;
  eligibleCourses: string[];
  selectionBasis: string;
  totalSlots: string;
  disbursalMode: string;
  keyBenefits: string[];
  requiredDocs: string[];
  officialSource: string;
  guidelineSection: string;
  applyUrl: string;
  dbtAverageTime: string;
}

export const MOTA_SCHEMES: SchemeDetail[] = [
  {
    id: 'pre-matric',
    name: 'Pre-Matric Scholarship for ST Students',
    shortCode: 'PRE-MATRIC',
    category: 'School',
    description: 'Centrally sponsored financial assistance for Scheduled Tribe students studying in Class IX and X to eliminate secondary school dropouts.',
    annualGrant: '₹3,500/yr (Day Scholar) | ₹7,000/yr (Hosteller)',
    incomeLimit: 'Up to ₹2.50 Lakhs per annum',
    eligibleCourses: ['Class 9', 'Class 10'],
    selectionBasis: 'All eligible ST students admitted to recognized government or aided schools',
    totalSlots: 'Universal for eligible ST scholars',
    disbursalMode: '100% Direct Benefit Transfer (DBT) through PFMS Aadhaar Bridge',
    keyBenefits: [
      'Day Scholars receive ₹3,500 per academic year',
      'Hostellers receive ₹7,000 per academic year',
      'Special disability allowance of ₹1,000/yr for differently-abled scholars',
      '100% zero school fee burden on parents'
    ],
    requiredDocs: [
      'ST Caste Certificate (DigiLocker verified)',
      'Family Income Certificate (< ₹2.5L)',
      'Previous Academic Marksheet (Class 8/9)',
      'Aadhaar-Seeded Bank Passbook',
      'School Bonafide Certificate'
    ],
    officialSource: 'Ministry of Tribal Affairs Gazette No. 11014/03/2021-Scholarship',
    guidelineSection: 'Pre-Matric Scheme Operational Guidelines §4.1',
    applyUrl: 'https://scholarships.gov.in',
    dbtAverageTime: '14-21 working days post-district verification'
  },
  {
    id: 'post-matric',
    name: 'Post-Matric Scholarship for ST Students',
    shortCode: 'POST-MATRIC',
    category: 'Higher Education',
    description: 'Flagship umbrella scholarship supporting ST students from Class 11 all the way through Post-Graduation, Polytechnic, Medical, and Engineering.',
    annualGrant: 'Full Tuition Fee + ₹2,500 to ₹13,500/yr Maintenance Allowance',
    incomeLimit: 'Up to ₹2.50 Lakhs per annum',
    eligibleCourses: ['Class 11 & 12', 'ITI / Diploma', 'Undergraduate (BA, BSc, BCom, BTech, MBBS)', 'Postgraduate (MA, MSc, MTech, MBA)'],
    selectionBasis: 'All eligible ST applicants in recognized degree & diploma institutions',
    totalSlots: 'Unlimited for all qualifying ST students',
    disbursalMode: 'Central & State PFMS Direct Benefit Transfer to bank account',
    keyBenefits: [
      '100% compulsory non-refundable institutional tuition fee reimbursed',
      'Group 1 (Engineering/MBBS/Medical): ₹13,500/yr Hosteller, ₹7,000/yr Day Scholar',
      'Group 2 (Professional/PG): ₹9,500/yr Hosteller, ₹6,500/yr Day Scholar',
      'Group 3 (General Degree): ₹6,500/yr Hosteller, ₹4,000/yr Day Scholar',
      'Group 4 (11th/12th/ITI): ₹4,000/yr Hosteller, ₹2,500/yr Day Scholar',
      'Study tour & thesis typing allowances included'
    ],
    requiredDocs: [
      'Valid ST Certificate with SCCR barcode',
      'Revenue Dept Income Certificate',
      '10th / 12th Board Marksheet',
      'College Admission Fee Receipt',
      'Aadhaar NPCI Bank Mapping'
    ],
    officialSource: 'MoTA Notification No. 19012/01/2022-Scholarship §5.2',
    guidelineSection: 'Post-Matric ST Revised Norms 2023-26',
    applyUrl: 'https://scholarships.gov.in',
    dbtAverageTime: '28-35 days from institute verification'
  },
  {
    id: 'top-class',
    name: 'Top Class Education Scheme for ST Students',
    shortCode: 'TOP-CLASS',
    category: 'Premier Institutes',
    description: 'Specialized central sector scheme funding ST students who secure admission to over 250 premier national institutes like IITs, IIMs, AIIMS, and NLUs.',
    annualGrant: 'Full Tuition + ₹36,000/yr Living + ₹45,000 Laptop Grant',
    incomeLimit: 'Up to ₹6.00 Lakhs per annum',
    eligibleCourses: ['B.Tech (IIT/NIT)', 'MBBS (AIIMS)', 'MBA (IIM)', 'B.A. LL.B (NLU)', 'Design (NID)', 'Architecture (SPA)'],
    selectionBasis: 'Merit list among ST students admitted into notified premier institutions',
    totalSlots: '1,000 fresh scholarships every year',
    disbursalMode: 'Direct Central Sector MoTA PFMS Disbursal',
    keyBenefits: [
      '100% tuition and institutional non-refundable charges covered (up to ₹2.5L in private notified colleges, full in govt)',
      'Living expenses allowance of ₹3,000 per month (₹36,000/year)',
      'Books & stationery grant of ₹5,000 per year',
      'One-time computer/laptop allowance of ₹45,000'
    ],
    requiredDocs: [
      'National Entrance Exam Scorecard (JEE Adv / NEET / CAT / CLAT)',
      'Premier Institute Allotment Letter & Fee Challan',
      'DigiLocker ST Caste Certificate',
      'Income Certificate (Under ₹6 LPA)',
      'Bank Mandate Form'
    ],
    officialSource: 'Central Sector Scheme of Top Class Education for ST Students Guidelines',
    guidelineSection: 'MoTA Top Class Regulation §6(a)-(d)',
    applyUrl: 'https://scholarships.gov.in',
    dbtAverageTime: '15-20 days post-nodal verification'
  },
  {
    id: 'nfst',
    name: 'National Fellowship for ST Students (NFST)',
    shortCode: 'NFST-FELLOWSHIP',
    category: 'Research',
    description: 'Premier national research fellowship empowering tribal scholars to pursue regular M.Phil and Ph.D. degrees in Sciences, Humanities, and Technology.',
    annualGrant: '₹37,000 to ₹42,000/month + HRA + up to ₹25,000/yr Contingency',
    incomeLimit: 'No strict income ceiling (Merit & Research proposal based)',
    eligibleCourses: ['Ph.D. (Full-time)', 'M.Phil + Ph.D. Integrated'],
    selectionBasis: 'UGC-NET / CSIR-NET qualification or MoTA national merit selection',
    totalSlots: '750 new fellowship slots annually',
    disbursalMode: 'Monthly DBT stipend credit directly into scholar bank account',
    keyBenefits: [
      'JRF Stipend: ₹37,000 per month for the first 2 years',
      'SRF Stipend: ₹42,000 per month for remaining 3 years upon assessment',
      'House Rent Allowance (HRA): 8%, 16%, or 24% based on university city tier',
      'Contingency Grant: ₹10,000 to ₹25,000 per annum for lab materials/books',
      'Escort/Reader assistance of ₹3,000/month for physically challenged scholars'
    ],
    requiredDocs: [
      'ST Certificate verified by District Magistrate',
      'Post-Graduate Degree Certificate & Consolidated Transcripts',
      'University Ph.D. Registration / Admission Letter',
      'Research Proposal Synopsis approved by Guide',
      'UGC / CSIR NET Scorecard (if applicable)'
    ],
    officialSource: 'MoTA Fellowship Portal (fellowship.tribal.gov.in) Rulebook 2024',
    guidelineSection: 'National Fellowship for Higher Education of ST Students §3',
    applyUrl: 'https://fellowship.tribal.gov.in',
    dbtAverageTime: 'Automated 1st of every month via PFMS direct mandate'
  },
  {
    id: 'nos',
    name: 'National Overseas Scholarship (NOS) for ST Candidates',
    shortCode: 'NOS-OVERSEAS',
    category: 'Overseas',
    description: 'Prestigious international scholarship financing ST & PVTG scholars for Masters, Ph.D., and Post-Doctoral studies at top-ranked universities abroad.',
    annualGrant: 'Full Foreign Tuition + US $15,400 / GBP £9,900 Living + Airfare + Visa',
    incomeLimit: 'Up to ₹6.00 Lakhs per annum',
    eligibleCourses: ["Master's Degree Abroad", 'Ph.D. Abroad', 'Post-Doctoral Research Abroad'],
    selectionBasis: 'Merit in qualifying degree (min 55%) + unconditional offer from QS top 500 foreign university',
    totalSlots: '20 slots per year (17 for STs, 3 reserved for PVTGs)',
    disbursalMode: 'Indian Embassy / High Commission foreign exchange remittance',
    keyBenefits: [
      '100% full international tuition fees paid directly to foreign university',
      'Annual maintenance allowance: US $15,400 (USA/Global) or GBP £9,900 (UK)',
      'Annual contingency allowance: US $1,500 / GBP £1,100 for books & research',
      'Economy round-trip air travel from India to overseas university',
      'Full health insurance, visa fee reimbursement, and incidental journey grants'
    ],
    requiredDocs: [
      'Unconditional Offer Letter from Top 500 QS World University',
      'ST Caste Certificate (with PVTG status endorsement if applicable)',
      'Family Income Certificate (< ₹6.00 Lakh)',
      'Valid Indian Passport',
      'Undergraduate / Masters Transcripts (Min 55% aggregate)',
      'GRE / IELTS / TOEFL Scorecard'
    ],
    officialSource: 'Ministry of Tribal Affairs NOS Operational Guidelines 2024-25',
    guidelineSection: 'NOS Guidelines Section 7: Emoluments & Travel Mandate',
    applyUrl: 'https://overseas.tribal.gov.in',
    dbtAverageTime: 'Disbursed quarterly via Ministry of External Affairs mission accounts'
  }
];

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  script: string;
  greeting: string;
  flagOrIcon: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin', greeting: 'Welcome, Scholar!', flagOrIcon: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari', greeting: 'स्वागत है, विद्वान!', flagOrIcon: '🪷' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki', greeting: 'ᱡᱚᱦᱟᱨ, ᱯᱟᱹᱴᱷᱩᱣᱟᱹ!', flagOrIcon: '🏹' },
  { code: 'bhi', name: 'Bhili', nativeName: 'भीली', script: 'Devanagari', greeting: 'राम-राम, भाई-बहेन!', flagOrIcon: '🌿' },
  { code: 'gon', name: 'Gondi', nativeName: 'गोण्डी', script: 'Gunjala Gondi / Devanagari', greeting: 'सेवा जोहार, शिकनार!', flagOrIcon: '🌲' },
  { code: 'hoc', name: 'Ho', nativeName: 'ᱦᱳ', script: 'Warang Chiti', greeting: 'ᱡᱚᱦᱟᱨ, ᱤᱛᱩᱱᱤᱭᱟᱹ!', flagOrIcon: '🌾' },
  { code: 'mun', name: 'Mundari', nativeName: 'मुंडारी', script: 'Bani Hurang', greeting: 'जोहार, पड़हवा!', flagOrIcon: '🌄' },
  { code: 'kha', name: 'Khasi', nativeName: 'Khasi', script: 'Latin', greeting: 'Khublei, Samla Pule!', flagOrIcon: '⛰️' },
  { code: 'mzo', name: 'Mizo', nativeName: 'Mizo ṭawng', script: 'Latin', greeting: 'Chibai, Zirlai!', flagOrIcon: '🎋' },
  { code: 'trp', name: 'Kokborok', nativeName: 'Kokborok', script: 'Bengali / Latin', greeting: 'Khulumkha, Porwirok!', flagOrIcon: '🌺' },
  { code: 'grt', name: 'Garo', nativeName: 'A·chik', script: 'Latin', greeting: 'Salam, Skigipa!', flagOrIcon: '🍃' },
  { code: 'asm', name: 'Assamese', nativeName: 'অসমীয়া', script: 'Bengali-Assamese', greeting: 'স্বাগতম, শিক্ষার্থীবৃন্দ!', flagOrIcon: '☀️' }
];

export interface StudentMockProfile {
  id: string;
  name: string;
  tribalCommunity: string;
  state: string;
  district: string;
  pvtgStatus: boolean;
  educationLevel: string;
  annualFamilyIncome: number;
  aadhaarLinked: boolean;
  digiLockerLinked: boolean;
  applicationStatuses: {
    schemeId: string;
    status: 'Disbursed' | 'Under Verification' | 'Sanctioned' | 'Not Applied' | 'Action Required';
    disbursedAmount?: string;
    currentStage: number; // 1 to 5
    lastUpdated: string;
    trackingId: string;
    notes: string;
  }[];
}

export const DEMO_STUDENT: StudentMockProfile = {
  id: 'ST-JH-2026-98124',
  name: 'Birsa Marandi',
  tribalCommunity: 'Santhal',
  state: 'Jharkhand',
  district: 'Dumka',
  pvtgStatus: false,
  educationLevel: 'B.Tech Computer Science (3rd Year)',
  annualFamilyIncome: 185000,
  aadhaarLinked: true,
  digiLockerLinked: true,
  applicationStatuses: [
    {
      schemeId: 'post-matric',
      status: 'Disbursed',
      disbursedAmount: '₹54,000 (Tuition + ₹13,500 Hosteller Allowance)',
      currentStage: 5,
      lastUpdated: '24 Sep 2026',
      trackingId: 'PMS-JH-883910',
      notes: 'Fund successfully credited to Bank of India A/c ending 4091 via PFMS.'
    },
    {
      schemeId: 'nfst',
      status: 'Under Verification',
      disbursedAmount: 'Pending (₹37,000/mo JRF upon final approval)',
      currentStage: 3,
      lastUpdated: '28 Sep 2026',
      trackingId: 'NFST-2026-00449',
      notes: 'Document scrutiny cleared at University level. Sent to MoTA Fellowship Division.'
    },
    {
      schemeId: 'top-class',
      status: 'Sanctioned',
      disbursedAmount: '₹2,50,000 + ₹45,000 Laptop Grant Sanctioned',
      currentStage: 4,
      lastUpdated: '19 Sep 2026',
      trackingId: 'TCE-2026-9921',
      notes: 'Sanction order released by MoTA Joint Secretary. Direct bank disbursal in progress.'
    },
    {
      schemeId: 'pre-matric',
      status: 'Disbursed',
      disbursedAmount: '₹7,000/yr (Completed)',
      currentStage: 5,
      lastUpdated: 'Historical Record',
      trackingId: 'PREM-JH-19280',
      notes: 'Successfully availed during Class 9 & 10 at Dumka Model School.'
    },
    {
      schemeId: 'nos',
      status: 'Not Applied',
      currentStage: 0,
      lastUpdated: 'Portal Open for AY 2026-27',
      trackingId: 'NOS-ELIGIBLE-APPLY',
      notes: 'Eligible for Master/Ph.D. abroad. Next intake deadline: 30 Nov 2026.'
    }
  ]
};

export const PIPELINE_STAGES = [
  { step: 1, name: 'Application Submitted', desc: 'Online form submitted with DigiLocker docs' },
  { step: 2, name: 'Institute Verified', desc: 'College/School Nodal Officer approved identity & course' },
  { step: 3, name: 'District Approved', desc: 'District Welfare Officer (DWO) certified ST certificate & income' },
  { step: 4, name: 'MoTA Sanctioned', desc: 'Ministry of Tribal Affairs issued central sanction order' },
  { step: 5, name: 'DBT Disbursed', desc: 'PFMS payment credited to student bank account' }
];

export const MOCK_WALLET_DOCUMENTS = [
  {
    id: 'doc-st-caste',
    title: 'Scheduled Tribe Caste Certificate',
    docNumber: 'JH-ST-2022-881920',
    authority: 'Sub-Divisional Officer (SDO), Dumka, Jharkhand',
    issuedDate: '14 July 2022',
    isDigiLockerVerified: true,
    fileType: 'PDF / Cryptographic Seal',
    badge: '100% Verified',
    hash: 'SHA256: 7f8a9b2c3d4e5f6a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a',
    size: '184 KB'
  },
  {
    id: 'doc-income',
    title: 'Annual Family Income Certificate',
    docNumber: 'REV-INC-2026-00412',
    authority: 'Circle Officer, Revenue Dept, Jharkhand',
    issuedDate: '10 April 2026 (Valid for FY 2026-27)',
    isDigiLockerVerified: true,
    fileType: 'PDF / DigiLocker Signed',
    badge: 'Valid (< ₹2.50L)',
    hash: 'SHA256: 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    size: '142 KB'
  },
  {
    id: 'doc-marksheet-12',
    title: 'Class XII Higher Secondary Marksheet',
    docNumber: 'JAC-12-SCI-2023-7721',
    authority: 'Jharkhand Academic Council (JAC)',
    issuedDate: '28 May 2023 (87.4% Aggregate)',
    isDigiLockerVerified: true,
    fileType: 'Verified Electronic Record',
    badge: '87.4% Distinction',
    hash: 'SHA256: 9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d',
    size: '220 KB'
  },
  {
    id: 'doc-bank-passbook',
    title: 'DBT-Seeded Bank Passbook / Mandate',
    docNumber: 'BOI-AC-***4091',
    authority: 'Bank of India, Dumka Main Branch (NPCI Aadhaar Mapped)',
    issuedDate: 'Active DBT Enabled',
    isDigiLockerVerified: true,
    fileType: 'NPCI Bridge Confirmed',
    badge: 'Aadhaar Seeded',
    hash: 'SHA256: 4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c',
    size: '95 KB'
  },
  {
    id: 'doc-bonafide',
    title: 'Institute Bonafide & Fee Structure',
    docNumber: 'BIT-ENR-2023-CS-084',
    authority: 'Dean of Academic Affairs, BIT Sindri',
    issuedDate: '12 August 2026',
    isDigiLockerVerified: true,
    fileType: 'Official Academic Bonafide',
    badge: 'Current 3rd Year',
    hash: 'SHA256: 3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
    size: '310 KB'
  }
];

export const MOCK_VAULT_ITEMS = [
  {
    id: 'vault-1',
    title: 'Ancestral Forest Land Right Certificate (FRA 2006)',
    desc: 'Patta title under Scheduled Tribes and Other Traditional Forest Dwellers Act',
    secureLevel: 'Hardware Encrypted',
    lastLocked: 'Today, 08:30 AM',
    fileType: 'Scanned Land Deed + QR'
  },
  {
    id: 'vault-2',
    title: 'Particularly Vulnerable Tribal Group (PVTG) Certificate',
    desc: 'Special domicile endorsement for Birhor / Mal Paharia community welfare benefits',
    secureLevel: 'Hardware Encrypted',
    lastLocked: 'Yesterday',
    fileType: 'Special SDO Endorsement'
  },
  {
    id: 'vault-3',
    title: 'Confidential Bank Mandate & Canceled Cheque',
    desc: 'Mandate signed for direct international stipend remittance (NOS)',
    secureLevel: 'Biometric Protected',
    lastLocked: '3 days ago',
    fileType: 'Bank Authorization'
  }
];
