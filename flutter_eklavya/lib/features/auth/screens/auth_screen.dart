import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final _phoneController = TextEditingController(text: '9812456780');
  final _otpController = TextEditingController(text: '123456');
  bool _otpSent = false;
  String _selectedRole = 'Student';

  void _handleSendOtp() {
    setState(() => _otpSent = true);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('OTP sent to Aadhaar-linked mobile: 123456')),
    );
  }

  void _handleVerifyAndLogin() {
    context.go('/home');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.go('/'),
        ),
        title: const Text('Scholar Authentication'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Sign In with DigiLocker',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: EklavyaTheme.sacredGrovesDark),
            ),
            const SizedBox(height: 6),
            const Text(
              'Paperless login via Aadhaar OTP or State ST Certificate Repository.',
              style: TextStyle(fontSize: 13, color: Colors.black54),
            ),
            const SizedBox(height: 20),

            // Role Selector
            Row(
              children: ['Student', 'Institute Nodal', 'District DWO'].map((role) {
                final isSelected = _selectedRole == role;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: ChoiceChip(
                    label: Text(role),
                    selected: isSelected,
                    selectedColor: const Color(0xFFE6F0EB),
                    labelStyle: TextStyle(
                      color: isSelected ? EklavyaTheme.sacredGrovesGreen : Colors.black87,
                      fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                      fontSize: 12,
                    ),
                    onSelected: (_) => setState(() => _selectedRole = role),
                  ),
                );
              }).toList(),
            ),

            const SizedBox(height: 24),
            // Phone Field
            const Text('Aadhaar-Linked Mobile Number', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
            const SizedBox(height: 6),
            TextField(
              controller: _phoneController,
              keyboardType: TextInputType.phone,
              decoration: InputDecoration(
                prefixText: '+91  ',
                prefixStyle: const TextStyle(fontWeight: FontWeight.bold, color: Colors.black87),
                hintText: 'Enter 10-digit mobile',
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide(color: Colors.grey.shade300),
                ),
              ),
            ),

            const SizedBox(height: 16),
            if (!_otpSent)
              SizedBox(
                width: double.infinity,
                height: 48,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: EklavyaTheme.sacredGrovesGreen,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  onPressed: _handleSendOtp,
                  child: const Text('Request Aadhaar OTP', style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              ),

            if (_otpSent) ...[
              const Text('Enter 6-Digit OTP', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
              const SizedBox(height: 6),
              TextField(
                controller: _otpController,
                keyboardType: TextInputType.number,
                maxLength: 6,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 18, letterSpacing: 8, fontWeight: FontWeight.bold),
                decoration: InputDecoration(
                  hintText: '••••••',
                  counterText: '',
                  filled: true,
                  fillColor: Colors.white,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide(color: Colors.grey.shade300),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                height: 48,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: EklavyaTheme.terracottaAmber,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  onPressed: _handleVerifyAndLogin,
                  child: const Text('Verify & Enter Eklavya', style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              ),
            ],

            const SizedBox(height: 30),
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: const Color(0xFFFEF3C7),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.amber.shade300),
              ),
              child: const Row(
                children: [
                  Icon(Icons.lock, color: Color(0xFFB45309), size: 20),
                  SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      'Your data is protected under National Digital Identity and Aadhaar Privacy Directives 2026.',
                      style: TextStyle(fontSize: 11, color: Color(0xFF78350F)),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
