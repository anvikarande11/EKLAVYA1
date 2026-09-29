import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme.dart';

class DashboardHomeScreen extends StatelessWidget {
  const DashboardHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Row(
          children: [
            Text('🏹 ', style: TextStyle(fontSize: 18)),
            Text('EKLAVYA', style: TextStyle(fontWeight: FontWeight.w900, letterSpacing: 1.2)),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.support_agent),
            tooltip: 'Talk to Jago Bot',
            onPressed: () => context.go('/jago'),
          ),
          IconButton(
            icon: const Icon(Icons.account_circle_outlined),
            onPressed: () => context.go('/auth'),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Hero Welcome Card with Warli motif styling
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [EklavyaTheme.sacredGrovesGreen, EklavyaTheme.sacredGrovesDark],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(24),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.12),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Text(
                          'Welcome, Scholar! • जोहार',
                          style: TextStyle(color: Colors.amberAccent, fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                      ),
                      const Text(
                        'ST-JH-2026-98124',
                        style: TextStyle(color: Colors.white70, fontSize: 11, fontFamily: 'monospace'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Birsa Marandi',
                    style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.w800),
                  ),
                  const Text(
                    'Santhal Tribe • Dumka, Jharkhand • B.Tech (3rd Yr)',
                    style: TextStyle(color: Colors.white70, fontSize: 12.5),
                  ),
                  const SizedBox(height: 16),
                  const Divider(color: Colors.white24),
                  const SizedBox(height: 10),

                  // DBT Live Tickers
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _ticker('Total Disbursed', '₹61,000', 'Aadhaar PFMS'),
                      _ticker('Sanctioned Pending', '₹2,95,000', 'Top Class + Laptop'),
                      _ticker('NFST Stipend', '₹37,000/mo', 'MoTA Research'),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Quick Shortcut Actions
            Row(
              children: [
                Expanded(
                  child: _quickAction(
                    icon: Icons.chat_bubble_outline,
                    title: 'Jago Bot AI',
                    subtitle: '12 Dialects',
                    color: EklavyaTheme.terracottaAmber,
                    onTap: () => context.go('/jago'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _quickAction(
                    icon: Icons.lock_outline,
                    title: 'DigiLocker Vault',
                    subtitle: '1-Tap Apply',
                    color: EklavyaTheme.sacredGrovesGreen,
                    onTap: () => context.go('/wallet'),
                  ),
                ),
              ],
            ),

            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Unified 5-Scheme Pipeline',
                  style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: EklavyaTheme.richBarkBrown),
                ),
                TextButton(
                  onPressed: () => context.go('/tracker'),
                  child: const Text('View All Stages →', style: TextStyle(fontSize: 12, color: EklavyaTheme.sacredGrovesGreen)),
                ),
              ],
            ),

            const SizedBox(height: 8),
            _schemeTile(
              context,
              name: 'Post-Matric Scholarship for ST Students',
              grant: 'Full Tuition + ₹13,500/yr Hosteller Allowance',
              status: 'Disbursed',
              statusColor: EklavyaTheme.statusSuccess,
              trackingId: 'PMS-JH-883910',
            ),
            _schemeTile(
              context,
              name: 'National Fellowship for ST Students (NFST)',
              grant: '₹37,000 to ₹42,000/month + HRA',
              status: 'Under Verification',
              statusColor: EklavyaTheme.statusWarning,
              trackingId: 'NFST-2026-00449',
            ),
            _schemeTile(
              context,
              name: 'Top Class Education Scheme (Premier Institutes)',
              grant: 'Full Tuition + ₹36,000 Living + ₹45,000 Laptop',
              status: 'Sanctioned',
              statusColor: Colors.teal,
              trackingId: 'TCE-2026-9921',
            ),
          ],
        ),
      ),
    );
  }

  static Widget _ticker(String label, String amount, String sub) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(color: Colors.white60, fontSize: 10)),
        const SizedBox(height: 2),
        Text(amount, style: const TextStyle(color: Colors.amberAccent, fontSize: 14, fontWeight: FontWeight.bold)),
        Text(sub, style: const TextStyle(color: Colors.white38, fontSize: 9)),
      ],
    );
  }

  static Widget _quickAction({
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.grey.shade200),
          boxShadow: [
            BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 4, offset: const Offset(0, 2)),
          ],
        ),
        child: Row(
          children: [
            CircleAvatar(
              backgroundColor: color.withOpacity(0.12),
              child: Icon(icon, color: color, size: 20),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                  Text(subtitle, style: const TextStyle(fontSize: 10.5, color: Colors.grey)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  static Widget _schemeTile(
    BuildContext context, {
    required String name,
    required String grant,
    required String status,
    required Color statusColor,
    required String trackingId,
  }) {
    return Card(
      margin: const EdgeInsets.only(bottom: 10),
      child: ListTile(
        onTap: () => context.go('/tracker'),
        title: Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.5)),
        subtitle: Text('$grant\nRef: $trackingId', style: const TextStyle(fontSize: 11.5)),
        isThreeLine: true,
        trailing: Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            color: statusColor.withOpacity(0.1),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: statusColor),
          ),
          child: Text(status, style: TextStyle(color: statusColor, fontSize: 10.5, fontWeight: FontWeight.bold)),
        ),
      ),
    );
  }
}
