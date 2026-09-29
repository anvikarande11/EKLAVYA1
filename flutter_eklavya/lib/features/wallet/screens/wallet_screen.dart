import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme.dart';

class WalletScreen extends StatelessWidget {
  const WalletScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('DigiLocker Document Wallet'),
        actions: [
          IconButton(
            icon: const Icon(Icons.lock_clock),
            tooltip: 'Open Hardware Biometric Vault',
            onPressed: () => context.go('/wallet/vault'),
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // 1-Tap Info Banner
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [EklavyaTheme.sacredGrovesGreen, EklavyaTheme.sacredGrovesLight],
              ),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Row(
              children: [
                const Icon(Icons.bolt, color: Colors.amberAccent, size: 28),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        '1-Tap Scheme Apply Active',
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13.5),
                      ),
                      const SizedBox(height: 2),
                      const Text(
                        'Caste, income & marksheet verified with cryptographic barcode.',
                        style: TextStyle(color: Colors.white70, fontSize: 11),
                      ),
                    ],
                  ),
                ),
                TextButton(
                  style: TextButton.styleFrom(
                    backgroundColor: EklavyaTheme.terracottaAmber,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  ),
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('DigiLocker auto-attached all 4 documents to your application!')),
                    );
                  },
                  child: const Text('Apply Now', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Pre-Verified Credentials (4)',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: EklavyaTheme.richBarkBrown),
              ),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFFEF3C7),
                  foregroundColor: const Color(0xFF92400E),
                  elevation: 0,
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                ),
                icon: const Icon(Icons.fingerprint, size: 16),
                label: const Text('Tribal Key Vault', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                onPressed: () => context.go('/wallet/vault'),
              ),
            ],
          ),
          const SizedBox(height: 12),

          _buildDocTile('Scheduled Tribe Caste Certificate', 'JH-ST-2022-881920', 'SDO Dumka • Barcode SCCR Verified', '100% Verified'),
          _buildDocTile('Family Income Certificate (< ₹2.50L)', 'REV-INC-2026-00412', 'Circle Officer • Valid FY 2026-27', 'Verified'),
          _buildDocTile('Class XII Higher Secondary Marksheet', 'JAC-12-SCI-2023-7721', 'Jharkhand Academic Council (87.4%)', 'Distinction'),
          _buildDocTile('Aadhaar-Seeded Bank Passbook', 'BOI-AC-***4091', 'Bank of India Dumka • NPCI DBT Enabled', 'Active DBT'),
        ],
      ),
    );
  }

  static Widget _buildDocTile(String title, String docNo, String authority, String badge) {
    return Card(
      margin: const EdgeInsets.only(bottom: 10),
      child: ListTile(
        leading: const CircleAvatar(
          backgroundColor: Color(0xFFE6F0EB),
          child: Icon(Icons.verified_user, color: EklavyaTheme.sacredGrovesGreen, size: 20),
        ),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
        subtitle: Text('Doc ID: $docNo\n$authority', style: const TextStyle(fontSize: 11)),
        isThreeLine: true,
        trailing: Chip(
          label: Text(badge, style: const TextStyle(fontSize: 9.5, color: EklavyaTheme.sacredGrovesGreen, fontWeight: FontWeight.bold)),
          backgroundColor: const Color(0xFFE6F0EB),
        ),
      ),
    );
  }
}
