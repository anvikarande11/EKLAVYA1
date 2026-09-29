# Eklavya (SIH 2026) — Unified MoTA Mobile Scholarship Ecosystem

Eklavya is a world-class, culturally attuned civic application developed for the **Ministry of Tribal Affairs (MoTA), Government of India** under the **Smart India Hackathon (SIH 2026)**.

It bridges the informational and digital divide for Scheduled Tribe (ST) and Particularly Vulnerable Tribal Group (PVTG) students across all States and Union Territories by providing a single, unified mobile application for all 5 national schemes:
1. **Pre-Matric Scholarship for ST Students** (Classes IX & X)
2. **Post-Matric Scholarship for ST Students** (Class XI to Ph.D.)
3. **Top Class Education Scheme for ST Students** (250+ Premier Institutes: IITs, IIMs, AIIMS, NITs)
4. **National Fellowship for ST Students (NFST)** (M.Phil / Ph.D. Research Grants)
5. **National Overseas Scholarship (NOS)** (Masters & Ph.D. in Top 500 QS World Universities)

---

## Architecture Overview

```
flutter_eklavya/
├── pubspec.yaml                 # Dependencies: go_router, flutter_riverpod, http, google_fonts
├── lib/
│   ├── main.dart                # Application entry point & ProviderScope
│   ├── core/
│   │   └── theme.dart           # Tribal-Modern theme (Sacred Groves Green, Terracotta Amber, Rice Canvas)
│   ├── router/
│   │   └── app_router.dart      # GoRouter setup with ShellRoute persistent bottom navigation
│   └── features/
│       ├── navigation/
│       │   └── dashboard_shell.dart  # Material 3 persistent bottom navigation shell
│       ├── dashboard/
│       │   └── dashboard_screen.dart # 5-Scheme tracker, DBT ticker, living status pipeline
│       ├── chat/
│       │   └── jago_chat_screen.dart # Jago Bot Multilingual RAG assistant with verified source badges
│       ├── wallet/
│       │   └── wallet_screen.dart    # DigiLocker verified credential repository
│       ├── schemes/
│       │   └── schemes_screen.dart   # Complete gazette guidelines for all 5 MoTA schemes
│       └── profile/
│           └── profile_screen.dart   # Student profile, tribal credentials, Aadhaar DBT status
```

---

## How to Run in VS Code

### 1. Prerequisites
- Flutter SDK (>= 3.3.0) installed and added to `PATH`
- Android Studio / Xcode for Emulators
- VS Code with Flutter & Dart extensions

### 2. Install Dependencies
```bash
cd flutter_eklavya
flutter pub get
```

### 3. Verify Static Analysis
```bash
flutter analyze
```

### 4. Start the Backend MoTA Jago Bot Server
In the root directory of this repository:
```bash
npm run dev
# Server will listen on http://localhost:3000
# For Android emulator, Jago Bot automatically targets http://10.0.2.2:3000/api/chat
```

### 5. Launch the Flutter Mobile App
```bash
flutter run
```

---

## SIH 2026 Key Highlights
- **"Tribal-Modern" Fusion:** Warli geometric motifs and indigenous color psychology (Sacred Groves Green `#1B4D3E`, Terracotta Amber `#D97706`).
- **Jago Bot Multilingual RAG:** Real-time localization support for 12 tribal and national languages (Hindi, Santali, Bhili, Gondi, English, etc.) with transparent citations (`🔗 Verified from X official MoTA source chunk(s)`).
- **DigiLocker 1-Tap Application:** Instant pre-verified document bundling without scanning or paper friction.
- **Direct Benefit Transfer (DBT):** Real-time monitoring of PFMS Aadhaar bridge credits and monthly stipends.
