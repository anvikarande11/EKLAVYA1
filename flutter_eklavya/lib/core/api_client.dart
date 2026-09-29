import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'api_config.dart';

class ApiException implements Exception {
  final String message;
  final int? statusCode;
  ApiException(this.message, [this.statusCode]);

  @override
  String toString() => 'ApiException: $message (Status: $statusCode)';
}

class ApiClient {
  final http.Client _client = http.Client();

  Future<Map<String, dynamic>> post(String url, Map<String, dynamic> body) async {
    try {
      final response = await _client.post(
        Uri.parse(url),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Client-Platform': 'Eklavya-Flutter-SIH2026',
        },
        body: jsonEncode(body),
      ).timeout(const Duration(seconds: 14));

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return jsonDecode(response.body) as Map<String, dynamic>;
      } else {
        throw ApiException('Server returned status ${response.statusCode}', response.statusCode);
      }
    } on SocketException catch (_) {
      throw ApiException('Cannot reach Eklavya backend server. Verify server is running on ${ApiConfig.baseUrl}.');
    } on http.ClientException catch (e) {
      throw ApiException('Network transport failed: ${e.message}');
    } catch (e) {
      throw ApiException('Unexpected network error: $e');
    }
  }

  Future<Map<String, dynamic>> get(String url) async {
    try {
      final response = await _client.get(
        Uri.parse(url),
        headers: {
          'Accept': 'application/json',
        },
      ).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        return jsonDecode(response.body) as Map<String, dynamic>;
      } else {
        throw ApiException('Failed to fetch data', response.statusCode);
      }
    } catch (e) {
      throw ApiException('Network error: $e');
    }
  }
}
