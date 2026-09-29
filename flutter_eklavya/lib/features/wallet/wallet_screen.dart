import 'package:flutter/material.dart';
import '../../core/theme.dart';

class WalletScreen extends StatelessWidget {
  const WalletScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('DigiLocker Wallet & Vault'),
        actions: [
          IconButton(
            icon: const Icon(Icons.sync),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Synchronized with DigiLocker Repository')),
              );
            },
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFFE6F0EB),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: EklavyaTheme.sacredGrovesGreen.withOpacity(0.3)),
            ),
            child: const Row(
              children: [
                Icon(Icons.shield, color: EklavyaTheme.sacredGrovesGreen, size: 28),
                SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('1-Tap Application Enabled', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                      Text('All 4 core documents are verified with cryptographic seals.', style: TextStyle(fontSize: 11, color: Colors.black54)),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          const Text('Verified DigiLocker Credentials', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          const SizedBox(height: 12),
          _buildDocCard('ST Caste Certificate', 'JH-ST-2022-881920', 'SDO Dumka, Jharkhand', '100% Verified'),
          _buildDocCard('Family Income Certificate', 'REV-INC-2026-00412', 'Circle Officer (< ₹2.50L)', 'Valid for 2026-27'),
          _buildDocCard('Class XII Marksheet', 'JAC-12-SCI-2023-7721', 'Jharkhand Academic Council', '87.4% Distinction'),
          _buildDocCard('Bank Passbook (NPCI Mapped)', 'Bank of India ***4091', 'Dumka Main Branch', 'Aadhaar Seeded Active'),
        ],
      ),
    );
  }

  static Widget _buildDocCard(String title, String docNo, String authority, String badge) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        leading: const CircleAvatar(
          backgroundColor: Color(0xFFE6F0EB),
          child: Icon(Icons.verified, color: EklavyaTheme.sacredGrovesGreen),
        ),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
        subtitle: Text('Doc: $docNo\n$authority', style: const TextStyle(fontSize: 11)),
        isThreeLine: true,
        trailing: Chip(
          label: Text(badge, style: const TextStyle(fontSize: 9.5, color: EklavyaTheme.sacredGrovesGreen, fontWeight: FontWeight.bold)),
          backgroundColor: const Color(0xFFE6F0EB),
        ),
      ),
    );
  }
}
