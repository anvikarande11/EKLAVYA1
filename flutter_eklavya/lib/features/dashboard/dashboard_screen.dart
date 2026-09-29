import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('EKLAVYA', style: TextStyle(fontWeight: FontWeight.w800, letterSpacing: 1.1)),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.translate),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Welcome Hero Card
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [EklavyaTheme.sacredGrovesGreen, EklavyaTheme.sacredGrovesDark],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(color: Colors.black.withOpacity(0.12), blurRadius: 10, offset: const Offset(0, 4)),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Welcome, Scholar!',
                    style: TextStyle(color: Colors.amberAccent, fontSize: 13, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    'Birsa Marandi',
                    style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.w800),
                  ),
                  const Text(
                    'Santhal Tribe • Dumka, Jharkhand',
                    style: TextStyle(color: Colors.white70, fontSize: 13),
                  ),
                  const SizedBox(height: 16),
                  const Divider(color: Colors.white24),
                  const SizedBox(height: 8),
                  // DBT Ticker
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _buildMetric('Total Disbursed', '₹61,000'),
                      _buildMetric('Sanctioned Pending', '₹2,95,000'),
                      _buildMetric('NFST Stipend', '₹37,000/mo'),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),
            const Text(
              'Unified 5-Scheme Pipeline',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: EklavyaTheme.richBarkBrown),
            ),
            const SizedBox(height: 12),

            // Scheme Cards
            _buildSchemeCard(
              context,
              title: 'Post-Matric Scholarship for ST Students',
              category: 'Higher Education',
              grant: 'Full Tuition + ₹13,500/yr Hosteller',
              status: 'Disbursed',
              stage: 'Stage 5 of 5 • DBT Credited',
              statusColor: EklavyaTheme.statusSuccess,
            ),
            _buildSchemeCard(
              context,
              title: 'National Fellowship for ST Students (NFST)',
              category: 'Research M.Phil/Ph.D.',
              grant: '₹37,000 to ₹42,000/mo + HRA',
              status: 'Under Verification',
              stage: 'Stage 3 of 5 • MoTA Scrutiny',
              statusColor: EklavyaTheme.statusWarning,
            ),
            _buildSchemeCard(
              context,
              title: 'Top Class Education Scheme',
              category: 'Premier Institutes (IIT/IIM/AIIMS)',
              grant: 'Full Fee + ₹36,000 Living + ₹45,000 Laptop',
              status: 'Sanctioned',
              stage: 'Stage 4 of 5 • Sanction Issued',
              statusColor: Colors.teal,
            ),
            _buildSchemeCard(
              context,
              title: 'Pre-Matric Scholarship for ST Students',
              category: 'School (Class 9 & 10)',
              grant: '₹7,000/yr Hosteller Allowance',
              status: 'Disbursed',
              stage: 'Historical Milestone Cleared',
              statusColor: EklavyaTheme.statusSuccess,
            ),
            _buildSchemeCard(
              context,
              title: 'National Overseas Scholarship (NOS)',
              category: 'Top 500 QS Universities Abroad',
              grant: 'Full Foreign Tuition + US \$15,400 + Airfare',
              status: 'Not Applied',
              stage: 'AY 2026-27 Intake Open',
              statusColor: Colors.grey,
            ),
          ],
        ),
      ),
    );
  }

  static Widget _buildMetric(String label, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(color: Colors.white60, fontSize: 10)),
        const SizedBox(height: 2),
        Text(value, style: const TextStyle(color: Colors.amberAccent, fontSize: 14, fontWeight: FontWeight.bold)),
      ],
    );
  }

  static Widget _buildSchemeCard(
    BuildContext context, {
    required String title,
    required String category,
    required String grant,
    required String status,
    required String stage,
    required Color statusColor,
  }) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: Colors.grey.shade100,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(category, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey)),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: statusColor.withOpacity(0.12),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: statusColor),
                  ),
                  child: Text(status, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: statusColor)),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
            const SizedBox(height: 4),
            Text(grant, style: const TextStyle(fontSize: 12.5, color: EklavyaTheme.sacredGrovesGreen, fontWeight: FontWeight.w600)),
            const SizedBox(height: 8),
            Text(stage, style: TextStyle(fontSize: 11, color: Colors.grey.shade600)),
          ],
        ),
      ),
    );
  }
}
