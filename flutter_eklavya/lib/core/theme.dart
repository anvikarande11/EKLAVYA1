import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// The Living Color Psychology & Tribal-Modern Design System
class EklavyaTheme {
  // 1. Primary Sacred Groves Green
  static const Color sacredGrovesGreen = Color(0xFF1B4D3E);
  static const Color sacredGrovesDark = Color(0xFF143B2F);
  static const Color sacredGrovesLight = Color(0xFF235848);

  // 2. Terracotta Amber
  static const Color terracottaAmber = Color(0xFFD97706);
  static const Color terracottaDeep = Color(0xFFC2410C);
  static const Color warmOchre = Color(0xFFF59E0B);

  // 3. Warm Rice/Sand Backgrounds
  static const Color warmRiceCanvas = Color(0xFFF9F8F6);
  static const Color warmSandSurface = Color(0xFFF3F1EC);

  // 4. Rich Bark Brown Typography
  static const Color richBarkBrown = Color(0xFF2D2D2D);
  static const Color mutedBark = Color(0xFF5A5A5A);

  // 5. Semantic Status Colors
  static const Color statusSuccess = Color(0xFF2E7D32);
  static const Color statusWarning = Color(0xFFED8936);
  static const Color statusAlert = Color(0xFFC2410C);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: const ColorScheme.light(
        primary: sacredGrovesGreen,
        onPrimary: Colors.white,
        secondary: terracottaAmber,
        onSecondary: Colors.white,
        surface: warmSandSurface,
        onSurface: richBarkBrown,
        error: statusAlert,
      ),
      scaffoldBackgroundColor: warmRiceCanvas,
      textTheme: GoogleFonts.plusJakartaSansTextTheme().copyWith(
        headlineLarge: GoogleFonts.plusJakartaSans(
          fontSize: 28,
          fontWeight: FontWeight.w800,
          color: sacredGrovesDark,
        ),
        headlineMedium: GoogleFonts.plusJakartaSans(
          fontSize: 22,
          fontWeight: FontWeight.w700,
          color: sacredGrovesDark,
        ),
        titleMedium: GoogleFonts.plusJakartaSans(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: richBarkBrown,
        ),
        bodyMedium: GoogleFonts.plusJakartaSans(
          fontSize: 14,
          color: richBarkBrown,
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: sacredGrovesGreen,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: false,
      ),
      cardTheme: CardTheme(
        elevation: 1,
        color: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: Color(0xFFE5E7EB), width: 1),
        ),
      ),
    );
  }

  static ThemeData get darkTheme => lightTheme;
}
