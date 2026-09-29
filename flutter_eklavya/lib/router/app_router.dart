import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../features/auth/screens/welcome_screen.dart';
import '../features/auth/screens/auth_screen.dart';
import '../features/dashboard/screens/dashboard_shell.dart';
import '../features/dashboard/screens/dashboard_home_screen.dart';
import '../features/dashboard/screens/tracker_screen.dart';
import '../features/wallet/screens/wallet_screen.dart';
import '../features/wallet/screens/secure_vault_screen.dart';
import '../features/jago/screens/chat_screen.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();
final _shellNavigatorKey = GlobalKey<NavigatorState>();

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    navigatorKey: _rootNavigatorKey,
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const WelcomeScreen(),
      ),
      GoRoute(
        path: '/auth',
        builder: (context, state) => const AuthScreen(),
      ),
      // Persistent Shell Navigation
      ShellRoute(
        navigatorKey: _shellNavigatorKey,
        builder: (context, state, child) {
          return DashboardShell(child: child);
        },
        routes: [
          GoRoute(
            path: '/home',
            pageBuilder: (context, state) => const NoTransitionPage(
              child: DashboardHomeScreen(),
            ),
          ),
          GoRoute(
            path: '/jago',
            pageBuilder: (context, state) => const NoTransitionPage(
              child: ChatScreen(),
            ),
          ),
          GoRoute(
            path: '/wallet',
            pageBuilder: (context, state) => const NoTransitionPage(
              child: WalletScreen(),
            ),
          ),
          GoRoute(
            path: '/tracker',
            pageBuilder: (context, state) => const NoTransitionPage(
              child: TrackerScreen(),
            ),
          ),
        ],
      ),
      GoRoute(
        path: '/wallet/vault',
        builder: (context, state) => const SecureVaultScreen(),
      ),
    ],
  );
});
