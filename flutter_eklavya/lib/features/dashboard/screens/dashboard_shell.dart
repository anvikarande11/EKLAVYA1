import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme.dart';

class DashboardShell extends StatelessWidget {
  final Widget child;
  const DashboardShell({super.key, required this.child});

  int _calculateSelectedIndex(BuildContext context) {
    final location = GoRouterState.of(context).uri.path;
    if (location.startsWith('/home')) return 0;
    if (location.startsWith('/jago')) return 1;
    if (location.startsWith('/wallet')) return 2;
    if (location.startsWith('/tracker')) return 3;
    return 0;
  }

  void _onItemTapped(int index, BuildContext context) {
    switch (index) {
      case 0:
        context.go('/home');
        break;
      case 1:
        context.go('/jago');
        break;
      case 2:
        context.go('/wallet');
        break;
      case 3:
        context.go('/tracker');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    final currentIndex = _calculateSelectedIndex(context);

    return Scaffold(
      body: child,
      bottomNavigationBar: NavigationBar(
        selectedIndex: currentIndex,
        onDestinationSelected: (idx) => _onItemTapped(idx, context),
        backgroundColor: Colors.white,
        elevation: 6,
        indicatorColor: const Color(0xFFE6F0EB),
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home, color: EklavyaTheme.sacredGrovesGreen),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(Icons.smart_toy_outlined),
            selectedIcon: Icon(Icons.smart_toy, color: EklavyaTheme.sacredGrovesGreen),
            label: 'Jago Bot',
          ),
          NavigationDestination(
            icon: Icon(Icons.account_balance_wallet_outlined),
            selectedIcon: Icon(Icons.account_balance_wallet, color: EklavyaTheme.sacredGrovesGreen),
            label: 'Wallet & Vault',
          ),
          NavigationDestination(
            icon: Icon(Icons.timeline_outlined),
            selectedIcon: Icon(Icons.timeline, color: EklavyaTheme.sacredGrovesGreen),
            label: '5-Scheme DBT',
          ),
        ],
      ),
    );
  }
}
