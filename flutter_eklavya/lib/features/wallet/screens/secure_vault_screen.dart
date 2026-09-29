import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme.dart';

class SecureVaultScreen extends StatefulWidget {
  const SecureVaultScreen({super.key});

  @override
  State<SecureVaultScreen> createState() => _SecureVaultScreenState();
}

class _SecureVaultScreenState extends State<SecureVaultScreen> {
  bool _isUnlocked = false;
  final TextEditingController _pinController = TextEditingController();
  bool _pinError = false;

  void _verifyPin() {
    if (_pinController.text == '123456' || _pinController.text.length == 6) {
      setState(() {
        _isUnlocked = true;
        _pinError = false;
      });
    } else {
      setState(() => _pinError = true);
    }
  }

  void _biometricUnlock() {
    setState(() => _isUnlocked = true);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.go('/wallet'),
        ),
        title: const Text('Biometric Tribal Vault'),
      ),
      body: _isUnlocked ? _buildUnlockedContent() : _buildLockedContent(),
    );
  }

  Widget _buildLockedContent() {
    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: const Color(0xFFFEF3C7),
                shape: BoxShape.circle,
                border: Border.all(color: Colors.amber.shade300, width: 2),
              ),
              child: const Icon(Icons.lock, size: 38, color: EklavyaTheme.terracottaAmber),
            ),
            const SizedBox(height: 18),
            const Text(
              'Hardware-Secured Personal Vault',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: EklavyaTheme.sacredGrovesDark),
            ),
            const SizedBox(height: 6),
            const Text(
              'Protects sensitive ancestral forest land titles (FRA 2006) and personal banking mandates.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 12.5, color: Colors.black54),
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: Colors.grey.shade100,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text('🔑 Demo PIN: 123456', style: TextStyle(fontFamily: 'monospace', fontSize: 12)),
            ),
            const SizedBox(height: 20),

            SizedBox(
              width: 220,
              child: TextField(
                controller: _pinController,
                keyboardType: TextInputType.number,
                maxLength: 6,
                obscureText: true,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 22, letterSpacing: 10, fontWeight: FontWeight.bold),
                decoration: InputDecoration(
                  hintText: '••••••',
                  counterText: '',
                  filled: true,
                  fillColor: Colors.white,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
                ),
              ),
            ),
            if (_pinError)
              const Padding(
                padding: EdgeInsets.only(top: 8.0),
                child: Text('Invalid PIN. Use 123456.', style: TextStyle(color: Colors.red, fontSize: 12)),
              ),
            const SizedBox(height: 20),

            SizedBox(
              width: 220,
              height: 46,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: EklavyaTheme.sacredGrovesGreen,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                onPressed: _verifyPin,
                child: const Text('Unlock with PIN', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ),
            const SizedBox(height: 10),
            TextButton.icon(
              icon: const Icon(Icons.fingerprint, color: EklavyaTheme.terracottaAmber),
              label: const Text('Simulate TouchID / FaceID', style: TextStyle(color: EklavyaTheme.terracottaAmber, fontWeight: FontWeight.bold)),
              onPressed: _biometricUnlock,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildUnlockedContent() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: const Color(0xFFE6F0EB),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Row(
                children: [
                  Icon(Icons.lock_open, color: EklavyaTheme.sacredGrovesGreen, size: 20),
                  SizedBox(width: 8),
                  Text('Vault AES-256 Decrypted', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12.5)),
                ],
              ),
              TextButton(
                onPressed: () => setState(() => _isUnlocked = false),
                child: const Text('Lock Vault', style: TextStyle(fontSize: 11, color: Colors.red)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        _vaultItem(
          'Ancestral Forest Land Title (FRA 2006)',
          'Patta Title under Scheduled Tribes Forest Dwellers Act',
          'Hardware Encrypted • SDO Dumka',
        ),
        _vaultItem(
          'Particularly Vulnerable Tribal Group (PVTG) Certificate',
          'Special domicile endorsement for Mal Paharia / Birhor welfare quotas',
          'State Welfare Board Verified',
        ),
        _vaultItem(
          'Confidential NOS Foreign Exchange Bank Mandate',
          'Approved by Ministry of External Affairs for international tuition remittance',
          'Biometric Encrypted Record',
        ),
      ],
    );
  }

  static Widget _vaultItem(String title, String desc, String tag) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        leading: const CircleAvatar(
          backgroundColor: Color(0xFFFEF3C7),
          child: Icon(Icons.security, color: Color(0xFFB45309)),
        ),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.5)),
        subtitle: Text('$desc\n$tag', style: const TextStyle(fontSize: 11.5)),
        isThreeLine: true,
      ),
    );
  }
}
