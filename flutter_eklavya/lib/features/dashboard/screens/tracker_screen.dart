import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme.dart';

class TrackerScreen extends StatelessWidget {
  const TrackerScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.go('/home'),
        ),
        title: const Text('Living 5-Scheme Pipeline'),
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
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Multi-Stage Audit Pipeline',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: EklavyaTheme.sacredGrovesDark),
                ),
                SizedBox(height: 4),
                Text(
                  'Tracks application movement through: Submitted ➔ Institute Verified ➔ District Approved ➔ MoTA Sanctioned ➔ DBT Disbursed.',
                  style: TextStyle(fontSize: 11.5, color: Colors.black87),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          _buildActiveTrackingCard(
            scheme: 'Post-Matric Scholarship for ST Students',
            currentStep: 5,
            disbursedAmount: '₹54,000 Credited',
            bankRef: 'Bank of India ***4091 (PFMS Trans: C09281920)',
          ),
          const SizedBox(height: 14),
          _buildActiveTrackingCard(
            scheme: 'National Fellowship for ST Students (NFST)',
            currentStep: 3,
            disbursedAmount: 'Stipend: ₹37,000/mo (Pending Clearance)',
            bankRef: 'Under Scrutiny at MoTA Fellowship Desk',
          ),
          const SizedBox(height: 14),
          _buildActiveTrackingCard(
            scheme: 'Top Class Education Scheme (Premier Institutes)',
            currentStep: 4,
            disbursedAmount: 'Sanction Order: ₹2,95,000 Released',
            bankRef: 'Awaiting Final Treasury Credit Mandate',
          ),
        ],
      ),
    );
  }

  static Widget _buildActiveTrackingCard({
    required String scheme,
    required int currentStep,
    required String disbursedAmount,
    required String bankRef,
  }) {
    final stages = [
      'Submitted',
      'Institute Verified',
      'District Approved',
      'MoTA Sanctioned',
      'DBT Disbursed'
    ];

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(scheme, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
            const SizedBox(height: 4),
            Text(disbursedAmount, style: const TextStyle(color: EklavyaTheme.sacredGrovesGreen, fontWeight: FontWeight.bold, fontSize: 12.5)),
            Text(bankRef, style: const TextStyle(color: Colors.grey, fontSize: 11)),
            const SizedBox(height: 16),

            // Horizontal step pipeline indicator
            Row(
              children: List.generate(stages.length, (idx) {
                final stepNum = idx + 1;
                final isDone = stepNum <= currentStep;
                final isCurrent = stepNum == currentStep;

                return Expanded(
                  child: Row(
                    children: [
                      Container(
                        width: 22,
                        height: 22,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: isDone
                              ? EklavyaTheme.sacredGrovesGreen
                              : Colors.grey.shade300,
                          border: isCurrent
                              ? Border.all(color: EklavyaTheme.terracottaAmber, width: 2)
                              : null,
                        ),
                        child: Center(
                          child: Text(
                            isDone ? '✓' : '$stepNum',
                            style: TextStyle(
                              color: isDone ? Colors.white : Colors.black54,
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                      if (idx < stages.length - 1)
                        Expanded(
                          child: Container(
                            height: 2.5,
                            color: stepNum < currentStep
                                ? EklavyaTheme.sacredGrovesGreen
                                : Colors.grey.shade300,
                          ),
                        ),
                    ],
                  ),
                );
              }),
            ),
            const SizedBox(height: 8),
            Text(
              'Current Status: ${stages[currentStep - 1]} (Stage $currentStep of 5)',
              style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: EklavyaTheme.sacredGrovesDark),
            ),
          ],
        ),
      ),
    );
  }
}
