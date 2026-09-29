import 'package:flutter/material.dart';
import '../../core/theme.dart';

class SchemesScreen extends StatelessWidget {
  const SchemesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('The 5 MoTA Schemes'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          _SchemeExpansionCard(
            title: '1. Pre-Matric Scholarship for ST Students',
            target: 'Class 9 & 10 Students in Recognized Schools',
            grant: '₹3,500/yr (Day Scholar) • ₹7,000/yr (Hosteller)',
            income: 'Up to ₹2.50 Lakhs per annum',
            source: 'Ministry of Tribal Affairs Gazette No. 11014/03/2021-Scholarship',
          ),
          _SchemeExpansionCard(
            title: '2. Post-Matric Scholarship for ST Students',
            target: 'Class 11, 12, ITI, Diploma, UG, PG, Ph.D.',
            grant: 'Full Tuition Fee + ₹2,500 to ₹13,500/yr Maintenance Allowance',
            income: 'Up to ₹2.50 Lakhs per annum',
            source: 'MoTA Notification No. 19012/01/2022-Scholarship §5.2',
          ),
          _SchemeExpansionCard(
            title: '3. Top Class Education Scheme for ST Students',
            target: '250+ Premier Notified Institutes (IIT, IIM, AIIMS, NIT, NLU)',
            grant: 'Full Tuition + ₹36,000 Living + ₹45,000 Laptop Grant',
            income: 'Up to ₹6.00 Lakhs per annum',
            source: 'Central Sector Scheme of Top Class Education for ST Students §6',
          ),
          _SchemeExpansionCard(
            title: '4. National Fellowship for ST Students (NFST)',
            target: '750 Research Scholars for M.Phil / Ph.D.',
            grant: 'JRF: ₹37,000/mo • SRF: ₹42,000/mo + HRA + Contingency',
            income: 'No Income Ceiling (Merit Based)',
            source: 'MoTA Fellowship Portal Rulebook §3',
          ),
          _SchemeExpansionCard(
            title: '5. National Overseas Scholarship (NOS)',
            target: 'Top 500 QS World Universities (Masters, Ph.D., Post-Doc)',
            grant: 'Full Foreign Tuition + US \$15,400 / GBP £9,900 + Airfare',
            income: 'Up to ₹6.00 Lakhs per annum (20 Slots: 17 ST, 3 PVTG)',
            source: 'MoTA NOS Operational Guidelines 2024-25 §7',
          ),
        ],
      ),
    );
  }
}

class _SchemeExpansionCard extends StatelessWidget {
  final String title;
  final String target;
  final String grant;
  final String income;
  final String source;

  const _SchemeExpansionCard({
    required this.title,
    required this.target,
    required this.grant,
    required this.income,
    required this.source,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ExpansionTile(
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
        subtitle: Text(grant, style: const TextStyle(fontSize: 12, color: EklavyaTheme.sacredGrovesGreen, fontWeight: FontWeight.w600)),
        childrenPadding: const EdgeInsets.all(16),
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Target: ', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
              Expanded(child: Text(target, style: const TextStyle(fontSize: 12))),
            ],
          ),
          const SizedBox(height: 6),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Income Cap: ', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
              Expanded(child: Text(income, style: const TextStyle(fontSize: 12))),
            ],
          ),
          const SizedBox(height: 10),
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: const Color(0xFFF3F4F6),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              'Official Gazette Reference: $source',
              style: const TextStyle(fontSize: 10.5, fontStyle: FontStyle.italic, color: Colors.black87),
            ),
          ),
        ],
      ),
    );
  }
}
