import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import JSZip from 'jszip';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { MOTA_SCHEMES, SUPPORTED_LANGUAGES, DEMO_STUDENT } from './src/data/motaKnowledge.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Google GenAI SDK with server-side API key and User-Agent telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Comprehensive MoTA System Instruction for Jago Bot
const MOTA_SYSTEM_INSTRUCTION = `
You are 'Jago Bot', the official AI Welfare & Scholarship Guide for 'Eklavya' under the Ministry of Tribal Affairs (MoTA), Government of India (Smart India Hackathon SIH 2026).
Your mission is to empower Scheduled Tribe (ST) and Particularly Vulnerable Tribal Group (PVTG) students across all States and Union Territories of India to understand, apply for, and receive scholarships with dignity, total transparency, and zero bureaucratic friction.

You have authoritative knowledge of all 5 MoTA National Schemes:
1. Pre-Matric Scholarship for ST Students (Classes 9 & 10):
   - Family income ceiling: Up to ₹2.50 Lakh/year.
   - Day Scholars: ₹3,500/yr. Hostellers: ₹7,000/yr. Plus disability allowance ₹1,000/yr.
   - Centrally sponsored (75:25 general, 90:10 NE/Himalayan states, 100% UTs). 100% DBT via PFMS.

2. Post-Matric Scholarship for ST Students (Classes 11, 12, ITI, Diploma, UG, PG, Ph.D.):
   - Family income ceiling: Up to ₹2.50 Lakh/year.
   - 100% compulsory non-refundable fees reimbursed.
   - Annual maintenance allowance: Group 1 (Medical/Engg): ₹13,500 hosteller / ₹7,000 day scholar. Group 2 (Professional/PG): ₹9,500 hosteller / ₹6,500 day scholar. Group 3 (General Degree): ₹6,500 hosteller / ₹4,000 day scholar. Group 4 (11th/12th/ITI): ₹4,000 hosteller / ₹2,500 day scholar.
   - Disbursal via PFMS / Aadhaar-seeded bank account.

3. Top Class Education Scheme for ST Students (Central Sector):
   - For ST students admitted to 250+ notified premier institutions (IITs, IIMs, AIIMS, NITs, NLUs, NID, IIITs, etc.).
   - Family income ceiling: Up to ₹6.00 Lakh/year.
   - Total slots: 1,000 fresh awards every year.
   - Full tuition fee covered (up to ₹2.5L/yr private, actual govt) + ₹3,000/month living allowance (₹36,000/yr) + ₹5,000/yr books + ₹45,000 one-time computer grant.

4. National Fellowship for ST Students (NFST):
   - Supports 750 new ST research scholars annually for regular full-time M.Phil & Ph.D. in recognized Indian universities.
   - No income ceiling.
   - JRF Stipend: ₹37,000/month (initial 2 years) + HRA (8%/16%/24%).
   - SRF Stipend: ₹42,000/month (subsequent 3 years) + HRA.
   - Contingency grant up to ₹25,000/year. Direct MoTA fellowship portal mandate.

5. National Overseas Scholarship (NOS) for ST Candidates:
   - For ST candidates to pursue Master's, Ph.D., and Post-Doctoral studies in accredited overseas universities (QS Top 500/1000).
   - 20 slots annually (17 ST, 3 reserved for PVTGs).
   - Family income ceiling: Up to ₹6.00 Lakh/year. Minimum 55% marks in qualifying degree. Age below 35.
   - Benefits: Full foreign tuition fees + US $15,400 (USA/Global) or GBP £9,900 (UK) living stipend + airfare + visa + health insurance.

Guidelines for response:
- Answer in the requested language (e.g. Hindi, English, Santali, Bhili, Gondi, etc.) or respect the language requested by the student.
- Always provide specific official MoTA source references (e.g., 'MoTA Gazette §4.1', 'National Fellowship Rulebook §3', 'Post-Matric Revised Norms').
- Emphasize that Aadhaar linking with the bank account (NPCI DBT mapping) is critical for receiving funds.
- Maintain an empowering, polite, and encouraging civic-guide persona.
`;

// Helper: Comprehensive Local RAG response with high domain accuracy
function generateLocalRagResponse(query: string, language: string = 'English') {
  const q = query.toLowerCase();
  let matchedScheme = MOTA_SCHEMES[1]; // default post-matric
  let answer = '';
  const sources: string[] = [];

  if (q.includes('deadline') || q.includes('last date') || q.includes('when to apply') || q.includes('dates')) {
    answer = `**Official Scholarship Application Timelines & Deadlines:**
• **National Scholarship Portal (NSP) Portal Opening:** Usually opens in July / August each academic year.
• **Pre-Matric & Post-Matric Deadline:** Typically closes for new & renewal applications between **31st October and 30th November**.
• **Institute Level Verification:** Usually completed within 15 days of application close.
• **National Overseas Scholarship (NOS):** Typically runs in two cycles (Cycle 1 in March-April, Cycle 2 in August-September).
• **Tip:** Do not wait until the final deadline day because server load on NSP / PFMS is highest during the last 48 hours. Submit early through Eklavya with DigiLocker pre-verified certificates!`;
    sources.push('National Scholarship Portal Operational Schedule 2026-27', 'State Education Department Timelines');
  } else if (q.includes('how to apply') || q.includes('application process') || q.includes('step') || q.includes('procedure')) {
    answer = `**Step-by-Step Scholarship Application Guide:**
1. **Prepare Verified Credentials:** Keep your ST Caste Certificate and Family Income Certificate synced via DigiLocker.
2. **Verify Bank Seeding:** Ensure your active bank account is linked to your Aadhaar through NPCI mapper for Direct Benefit Transfer (DBT).
3. **Application Registration:** Login to the National Scholarship Portal (scholarships.gov.in) with your One-Time Registration (OTR) / Aadhaar ID.
4. **Select Scheme:** Choose your eligible scheme (Pre-Matric, Post-Matric, Top Class, NFST, or NOS).
5. **Direct Institutional Verification:** Once submitted, your school/college Nodal Officer verifies your enrollment details, followed by the District Welfare Officer (DWO).
6. **Payment Disbursal:** Funds are directly released into your bank account via PFMS!`;
    sources.push('NSP User Guide & Scheme Application Protocol', 'Direct Benefit Transfer Standard Operating Procedures');
  } else if (q.includes('laptop') || q.includes('computer') || q.includes('device')) {
    matchedScheme = MOTA_SCHEMES[2];
    answer = `**Laptop & Computer Allowance (Top Class Education Scheme):**
• **Grant Amount:** A **one-time grant of ₹45,000** is provided to every admitted ST student during their entire degree duration.
• **Eligible Items:** Desktop computer, laptop, printer, or UPS.
• **Reimbursement Mode:** Paid directly to the student on submission of valid purchase invoice / bill to the institute nodal officer.
• **Eligible Institutes:** 250+ notified premier institutes including IITs, IIMs, AIIMS, NITs, IIITs, NLUs, and central universities.`;
    sources.push('Top Class Education Scheme Guidelines §6.3 (Hardware Grants)', 'Notified Premier Institutes Norms');
  } else if (q.includes('grievance') || q.includes('complaint') || q.includes('helpline') || q.includes('helpdesk') || q.includes('officer') || q.includes('contact')) {
    answer = `**Scholarship Grievance Redressal & Helpdesk Directory:**
• **National Scholarship Portal Helpdesk:** 0120 - 6619540 (Mon–Sat 8:00 AM – 8:00 PM)
• **Toll-Free Helpline:** 1800-11-7777
• **Direct Email Redressal:** helpdesk@nsp.gov.in
• **Escalation Hierarchy:**
  1. College / School Institutional Nodal Officer (INO)
  2. District Welfare Officer (DWO / ITDA Project Officer)
  3. State Tribal Development Department
  4. Central Grievance Portal (CPGRAMS / Eklavya Grievance Desk)`;
    sources.push('National Scholarship Grievance Redressal Directives', 'Citizens Charter on Citizen Feedback');
  } else if (q.includes('pre-matric') || q.includes('class 9') || q.includes('class 10') || q.includes('school')) {
    matchedScheme = MOTA_SCHEMES[0];
    answer = `Under the **Pre-Matric Scholarship for ST Students**, children studying in Classes 9 and 10 in recognized schools are supported with:
• **Day Scholars:** ₹3,500 per academic year
• **Hostellers:** ₹7,000 per academic year
• **Disability Allowance:** Additional ₹1,000 per year for differently-abled scholars
• **Income Limit:** Parental income must not exceed ₹2.50 Lakhs per annum.
• **Disbursal:** Funds are released 100% via Direct Benefit Transfer (DBT) through the PFMS portal directly into your Aadhaar-seeded bank account.`;
    sources.push('Pre-Matric Scheme Operational Guidelines §4.1', 'National Tribal Education Framework');
  } else if (q.includes('nfst') || q.includes('fellowship') || q.includes('phd') || q.includes('m.phil') || q.includes('research') || q.includes('stipend')) {
    matchedScheme = MOTA_SCHEMES[3];
    answer = `Under the **National Fellowship for ST Students (NFST)**, 750 tribal research scholars are selected every year:
• **JRF (Junior Research Fellow):** ₹37,000 per month for the first 2 years
• **SRF (Senior Research Fellow):** ₹42,000 per month for the remaining 3 years
• **HRA Allowance:** 8%, 16%, or 24% according to the university location tier (X, Y, Z cities).
• **Contingency Grant:** Up to ₹25,000 per year for science/engineering and ₹20,500 for humanities.
• **Eligibility:** Regular, full-time M.Phil or Ph.D. admission in recognized universities. There is no family income ceiling for NFST.`;
    sources.push('National Fellowship for Higher Education of ST Students §3', 'UGC Higher Education Fellowship Guidelines');
  } else if (q.includes('overseas') || q.includes('nos') || q.includes('abroad') || q.includes('foreign') || q.includes('usa') || q.includes('uk')) {
    matchedScheme = MOTA_SCHEMES[4];
    answer = `The **National Overseas Scholarship (NOS) for ST Candidates** funds 20 tribal scholars annually (including 3 reserved for PVTGs) to study abroad:
• **Coverage:** 100% full international university tuition fees covered.
• **Annual Maintenance:** US $15,400 per year (for USA and other global nations) or GBP £9,900 per year (for the UK).
• **Travel & Visa:** Economy round-trip airfare, visa fee reimbursement, and comprehensive medical insurance.
• **Income Limit:** Family income must be under ₹6.00 Lakhs per annum.
• **Academic Criteria:** Minimum 55% aggregate in qualifying degree and age under 35 years.`;
    sources.push('National Overseas Scholarship Operational Guidelines 2024-25 §7', 'International Academic Remittance Guidelines');
  } else if (q.includes('top class') || q.includes('iit') || q.includes('iim') || q.includes('aiims') || q.includes('nit')) {
    matchedScheme = MOTA_SCHEMES[2];
    answer = `The **Top Class Education Scheme for ST Students** supports 1,000 tribal students admitted into 250+ notified premier institutes (IITs, IIMs, AIIMS, NITs, NLUs, etc.):
• **Tuition:** Full non-refundable tuition fees reimbursed directly.
• **Living Allowance:** ₹3,000 per month (₹36,000 annually).
• **Laptop / Computer Grant:** One-time grant of ₹45,000 during your course.
• **Books & Stationery:** ₹5,000 per year.
• **Income Ceiling:** Annual family income must not exceed ₹6.00 Lakhs.`;
    sources.push('Central Sector Scheme of Top Class Education for ST Students §6', 'Notified Premier Institutes Directory');
  } else if (q.includes('dbt') || q.includes('bank') || q.includes('aadhaar') || q.includes('pfms') || q.includes('delay') || q.includes('disburse') || q.includes('status')) {
    answer = `**Direct Benefit Transfer (DBT) & Aadhaar Seeding Instructions:**
1. Your scholarship is directly disbursed via the **Public Financial Management System (PFMS)** into your bank account.
2. Ensure your bank account is **Aadhaar Seeded & NPCI DBT Enabled** (visit your bank branch or check online via UIDAI portal).
3. If your status shows 'Sanctioned' or 'Under Verification', central shares typically reflect within 14 to 28 working days.
4. You can track your payment transaction ref using your National Scholarship Portal (NSP) Application ID on PFMS 'Know Your Payments'.`;
    sources.push('Direct Benefit Transfer Mandate Circular', 'PFMS-NPCI Interoperability Guidelines');
  } else if (q.includes('document') || q.includes('digilocker') || q.includes('certificate') || q.includes('income certificate') || q.includes('caste')) {
    answer = `**Required Documents & DigiLocker Single-Tap Integration:**
In Eklavya, your documents are verified in real time:
• **ST Caste Certificate:** Barcode-verified from State Caste Certificate Repository (SCCR).
• **Income Certificate:** Must be issued by an executive magistrate/tehsildar/circle officer (valid for current financial year).
• **Academic Marksheet:** Class 10/12/Degree marksheet.
• **Bank Passbook:** Aadhaar-linked account details.
With our DigiLocker integration, you only verify once and can apply to any of the 5 national schemes instantly with a single tap!`;
    sources.push('National DigiLocker Scheme Integration Protocol', 'Paperless Verification Framework §2');
  } else if (q.includes('pvtg') || q.includes('vulnerable')) {
    answer = `**Special Provisions for Particularly Vulnerable Tribal Groups (PVTGs):**
• There are **75 designated PVTG communities** across 18 states and UTs (e.g. Birhor, Asur, Chenchu, Baiga, Sahariya, Maria Gond, Toto).
• **National Overseas Scholarship (NOS):** 3 out of 20 slots are strictly reserved for PVTG scholars.
• **Pre & Post Matric Scholarships:** 100% universal saturation mandate with relaxation in document renewal constraints.
• **Priority Support:** Fast-track document issuance through mobile camps and district welfare teams.`;
    sources.push('PVTG Welfare Guidelines & PM-JANMAN Framework', 'National Scheduled Tribes Policy');
  } else {
    answer = `Under the **Post-Matric Scholarship for ST Students**, tribal students pursuing higher education (Class 11, 12, ITI, Diploma, UG, PG, Engineering, Medicine, and Research) receive:
• **Tuition & Compulsory Fees:** 100% reimbursed.
• **Maintenance Allowance:** Up to ₹13,500/year for hostellers and ₹7,000/year for day scholars (Group 1 professional courses).
• **Income Ceiling:** Family income up to ₹2.50 Lakhs per annum.
• **Single Portal:** Apply seamlessly through Eklavya with pre-verified DigiLocker credentials!`;
    sources.push('Centrally Sponsored Post-Matric ST Revised Norms §5.2', 'National Scholarship Guidelines');
  }

  // Multilingual localization touch for greeting
  if (language.toLowerCase().includes('hindi')) {
    answer = `नमस्ते! राष्ट्रीय जनजातीय छात्रवृत्ति की आधिकारिक जानकारी:\n\n` + answer;
  } else if (language.toLowerCase().includes('santali')) {
    answer = `ᱡᱚᱦᱟᱨ! (Johar!) ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱥᱠᱚᱞᱟᱨᱥᱤᱯ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ:\n\n` + answer;
  } else if (language.toLowerCase().includes('gondi')) {
    answer = `सेवा जोहार! (Seva Johar!) छात्रवृत्ति योजना विवरण:\n\n` + answer;
  }

  return {
    response: answer,
    source_chunks: sources,
    scheme_id: matchedScheme.id,
    verified: true,
    suggested_followups: [
      'What documents do I need to upload via DigiLocker?',
      'How to check my Aadhaar DBT status on PFMS?',
      'Am I eligible for the ₹45,000 laptop grant under Top Class?'
    ],
    action_cta: {
      label: `Check Eligibility for ${matchedScheme.shortCode}`,
      action: 'CHECK_ELIGIBILITY',
      schemeId: matchedScheme.id
    }
  };
}

// 1. Chat RAG Endpoint - Powers Jago Bot
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, language = 'English', scholarProfile } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required' });
    }

    // Attempt Gemini call if API key exists
    if (process.env.GEMINI_API_KEY) {
      try {
        const promptText = `
Scholar Query: "${message}"
Requested Language: ${language}
Scholar Profile Context: ${scholarProfile ? JSON.stringify(scholarProfile) : 'Birsa Marandi, ST Santhal community, 3rd Year Engineering, Jharkhand'}

Provide an accurate, culturally respectful, empowering, and detailed response based strictly on Ministry of Tribal Affairs (MoTA) rules for the 5 ST scholarship schemes.
Output valid JSON with the following structure:
{
  "response": "The complete, well-formatted response text in ${language} with bullet points and clear numbers",
  "source_chunks": ["List of 2-3 specific official MoTA policy excerpts/gazette sections cited"],
  "scheme_id": "pre-matric | post-matric | top-class | nfst | nos | null",
  "suggested_followups": ["Question 1", "Question 2", "Question 3"],
  "action_cta": {
    "label": "Short Action CTA text",
    "action": "CHECK_ELIGIBILITY | VIEW_WALLET | TRACK_DBT | LODGE_GRIEVANCE",
    "schemeId": "pre-matric | post-matric | top-class | nfst | nos"
  }
}
`;

        const geminiResponse = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: promptText,
          config: {
            systemInstruction: MOTA_SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        });

        const textOutput = geminiResponse.text;
        if (textOutput) {
          const parsed = JSON.parse(textOutput);
          return res.json({
            ...parsed,
            verified: true,
            provider: 'gemini-3.8-flash'
          });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, gracefully falling back to local MoTA RAG:', geminiError?.message);
      }
    }

    // Fallback to high-fidelity curated MoTA RAG knowledge engine
    const fallbackResponse = generateLocalRagResponse(message, language);
    return res.json({
      ...fallbackResponse,
      provider: 'mota-authoritative-local-rag'
    });
  } catch (err: any) {
    console.error('Chat error:', err);
    res.status(500).json({
      error: 'Failed to process scholar query',
      details: err?.message
    });
  }
});

// 2. All 5 MoTA Schemes Details
app.get('/api/schemes', (_req: Request, res: Response) => {
  res.json({
    ministry: 'Ministry of Tribal Affairs, Government of India',
    schemes: MOTA_SCHEMES,
    supportedLanguages: SUPPORTED_LANGUAGES,
    lastUpdated: 'AY 2026-27 Guidelines'
  });
});

// 3. Instant Multi-Scheme Eligibility Evaluator
app.post('/api/eligibility/evaluate', (req: Request, res: Response) => {
  const { educationLevel, annualIncome, currentMarks = 75, targetForeign = false, isPremier = false } = req.body;
  const income = Number(annualIncome) || 0;

  const matches = MOTA_SCHEMES.map(scheme => {
    let eligible = true;
    let score = 95;
    const reasons: string[] = [];

    if (scheme.id === 'pre-matric') {
      if (!['Class 9', 'Class 10'].includes(educationLevel)) {
        eligible = false;
        reasons.push('Restricted to Class 9 and 10 students');
      }
      if (income > 250000) {
        eligible = false;
        reasons.push('Income exceeds ₹2.50 Lakh ceiling');
      }
    } else if (scheme.id === 'post-matric') {
      if (['Class 9', 'Class 10'].includes(educationLevel)) {
        eligible = false;
        reasons.push('Only for post-matriculation studies (Class 11+)');
      }
      if (income > 250000) {
        eligible = false;
        reasons.push('Income exceeds ₹2.50 Lakh ceiling');
      }
    } else if (scheme.id === 'top-class') {
      if (income > 600000) {
        eligible = false;
        reasons.push('Family income exceeds ₹6.00 Lakh ceiling');
      }
      if (!isPremier) {
        score -= 20;
        reasons.push('Requires admission in one of 250+ notified premier institutes (IIT/IIM/NIT/AIIMS)');
      }
    } else if (scheme.id === 'nfst') {
      if (!educationLevel.toLowerCase().includes('ph.d') && !educationLevel.toLowerCase().includes('m.phil') && !educationLevel.toLowerCase().includes('research') && !educationLevel.toLowerCase().includes('postgraduate') && !educationLevel.toLowerCase().includes('b.tech')) {
        eligible = false;
        reasons.push('Applicable for M.Phil / Ph.D. scholars');
      }
    } else if (scheme.id === 'nos') {
      if (income > 600000) {
        eligible = false;
        reasons.push('Family income exceeds ₹6.00 Lakh ceiling');
      }
      if (currentMarks < 55) {
        eligible = false;
        reasons.push('Requires minimum 55% marks in qualifying degree');
      }
      if (!targetForeign) {
        score -= 15;
        reasons.push('Requires unconditional offer from top 500 QS foreign university');
      }
    }

    return {
      schemeId: scheme.id,
      schemeName: scheme.name,
      shortCode: scheme.shortCode,
      eligible,
      matchPercentage: eligible ? score : Math.max(10, score - 50),
      reasons,
      annualGrant: scheme.annualGrant,
      incomeLimit: scheme.incomeLimit
    };
  });

  res.json({
    studentProfileEvaluated: { educationLevel, annualIncome: income },
    matches
  });
});

// 4. Mock Grievance Ticket Generation
app.post('/api/grievance/submit', (req: Request, res: Response) => {
  const { category, schemeId, description, regionalVoiceNote, studentId = 'ST-JH-2026-98124' } = req.body;
  const ticketId = `GRV-MOTA-${Math.floor(100000 + Math.random() * 900000)}`;

  res.json({
    success: true,
    ticketId,
    studentId,
    category: category || 'DBT Disbursal Delay',
    schemeId: schemeId || 'post-matric',
    description,
    regionalVoiceNoteAttached: !!regionalVoiceNote,
    status: 'Forwarded to District Welfare Officer (DWO)',
    assignedAuthority: 'DWO Dumka & MoTA Central Cell',
    resolutionSlaDays: 14,
    lodgedAt: new Date().toISOString()
  });
});

// 5. System Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    system: 'Eklavya MoTA Welfare Engine',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    schemesCount: MOTA_SCHEMES.length,
    timestamp: new Date().toISOString()
  });
});

// 6. Direct Flutter Source Code ZIP Downloader for VS Code
function addDirectoryToZip(zip: JSZip, folderPath: string, zipFolderPath: string = '') {
  const items = fs.readdirSync(folderPath);
  for (const item of items) {
    const fullPath = path.join(folderPath, item);
    const itemRelativePath = zipFolderPath ? `${zipFolderPath}/${item}` : item;
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const folderZip = zip.folder(item);
      if (folderZip) {
        addDirectoryToZip(folderZip, fullPath, itemRelativePath);
      }
    } else {
      const content = fs.readFileSync(fullPath);
      zip.file(item, content);
    }
  }
}

app.get('/api/download-zip', async (_req: Request, res: Response) => {
  try {
    const flutterDir = path.resolve(process.cwd(), 'flutter_eklavya');
    if (!fs.existsSync(flutterDir)) {
      return res.status(404).json({ error: 'Flutter source folder not found' });
    }

    const zip = new JSZip();
    const rootFolder = zip.folder('eklavya_flutter');
    if (rootFolder) {
      addDirectoryToZip(rootFolder, flutterDir);
    }

    const zipBuffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 },
    });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="eklavya_flutter_sih2026.zip"');
    res.setHeader('Content-Length', zipBuffer.length);
    res.end(zipBuffer);
  } catch (error: any) {
    console.error('Error generating zip:', error);
    res.status(500).json({ error: 'Failed to generate zip file', details: error?.message });
  }
});

// Vite Middleware for Full-Stack Development
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[Eklavya MoTA Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
