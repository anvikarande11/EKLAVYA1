import 'package:flutter/material.dart';
import '../../core/theme.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Scholar Profile'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Center(
            child: CircleAvatar(
              radius: 40,
              backgroundColor: EklavyaTheme.sacredGrovesGreen,
              child: Text('BM', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
            ),
          ),
          const SizedBox(height: 12),
          const Center(
            child: Text('Birsa Marandi', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          ),
          const Center(
            child: Text('ST ID: ST-JH-2026-98124', style: TextStyle(color: Colors.grey, fontSize: 12, fontFamily: 'monospace')),
          ),
          const SizedBox(height: 24),
          const Divider(),
          _buildProfileTile('Tribal Community', 'Santhal (Scheduled Tribe)'),
          _buildProfileTile('Domicile State', 'Jharkhand (District: Dumka)'),
          _buildProfileTile('Education Level', 'B.Tech Computer Science (3rd Year)'),
          _buildProfileTile('Annual Family Income', '₹1,85,000 / year'),
          _buildProfileTile('Aadhaar NPCI Status', 'Active DBT Enabled (Bank of India ***4091)'),
          _buildProfileTile('DigiLocker Integration', 'Active (4 Verified Documents Bound)'),
          const SizedBox(height: 16),
          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(
              backgroundColor: EklavyaTheme.sacredGrovesGreen,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(vertical: 12),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            icon: const Icon(Icons.support_agent),
            label: const Text('Lodge Redressal Grievance to MoTA'),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Forwarded to District Welfare Officer (DWO)')),
              );
            },
          ),
        ],
      ),
    );
  }

  static Widget _buildProfileTile(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(width: 150, child: Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.grey))),
          Expanded(child: Text(value, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13))),
        ],
      ),
    );
  }
}
