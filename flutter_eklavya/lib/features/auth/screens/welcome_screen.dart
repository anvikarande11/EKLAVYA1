import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: EklavyaTheme.sacredGrovesGreen,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              // Top Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: Colors.amber.withOpacity(0.3)),
                    ),
                    child: const Text(
                      'MoTA • SIH 2026',
                      style: TextStyle(color: Colors.amberAccent, fontSize: 11, fontWeight: FontWeight.bold),
                    ),
                  ),
                  const Text(
                    'GOVERNMENT OF INDIA',
                    style: TextStyle(color: Colors.white70, fontSize: 11, letterSpacing: 1.1),
                  ),
                ],
              ),

              // Hero Illustration & Branding
              Column(
                children: [
                  Container(
                    width: 90,
                    height: 90,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: const LinearGradient(
                        colors: [Colors.amber, EklavyaTheme.terracottaAmber],
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.3),
                          blurRadius: 16,
                          offset: const Offset(0, 8),
                        ),
                      ],
                    ),
                    child: const Center(
                      child: Text('🏹', style: TextStyle(fontSize: 42)),
                    ),
                  ),
                  const SizedBox(height: 20),
                  const Text(
                    'EKLAVYA',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 34,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 2,
                    ),
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    'Unified Scheduled Tribe (ST) Welfare & Scholarship Ecosystem',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Colors.white70,
                      fontSize: 13,
                      height: 1.4,
                    ),
                  ),
                  const SizedBox(height: 20),
                  // Key Scheme badges
                  Wrap(
                    alignment: WrapAlignment.center,
                    spacing: 6,
                    runSpacing: 6,
                    children: [
                      _badge('Pre-Matric'),
                      _badge('Post-Matric'),
                      _badge('Top Class'),
                      _badge('NFST Fellowship'),
                      _badge('Overseas (NOS)'),
                    ],
                  ),
                ],
              ),

              // Bottom CTA Buttons
              Column(
                children: [
                  SizedBox(
                    width: double.infinity,
                    height: 52,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: EklavyaTheme.terracottaAmber,
                        foregroundColor: Colors.white,
                        elevation: 4,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                      ),
                      onPressed: () => context.go('/auth'),
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text('Enter Scholar Portal', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                          SizedBox(width: 8),
                          Icon(Icons.arrow_forward, size: 18),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextButton(
                    onPressed: () => context.go('/home'),
                    child: const Text(
                      'Explore Direct Demo Access (Guest)',
                      style: TextStyle(color: Colors.white60, fontSize: 13, decoration: TextDecoration.underline),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  static Widget _badge(String title) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        title,
        style: const TextStyle(color: Colors.white, fontSize: 10.5, fontWeight: FontWeight.w600),
      ),
    );
  }
}
