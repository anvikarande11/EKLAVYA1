/// API Configuration for Eklavya (Ministry of Tribal Affairs - SIH 2026)
class ApiConfig {
  // Use 10.0.2.2 for Android emulator pointing to localhost:3000
  // Or override via: flutter run --dart-define=API_BASE=http://your-server-ip:3000
  static const String defaultBaseUrl = 'http://10.0.2.2:3000';
  
  static String get baseUrl {
    const definedBase = String.fromEnvironment('API_BASE');
    if (definedBase.isNotEmpty) {
      return definedBase;
    }
    return defaultBaseUrl;
  }

  // Endpoints
  static String get chatEndpoint => '$baseUrl/api/chat';
  static String get schemesEndpoint => '$baseUrl/api/schemes';
  static String get eligibilityEndpoint => '$baseUrl/api/eligibility/evaluate';
  static String get grievanceEndpoint => '$baseUrl/api/grievance/submit';
  static String get healthEndpoint => '$baseUrl/api/health';
}
