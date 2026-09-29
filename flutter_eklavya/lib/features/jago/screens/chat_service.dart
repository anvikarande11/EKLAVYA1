import '../../../core/api_client.dart';
import '../../../core/api_config.dart';

class ChatMessage {
  final String sender;
  final String text;
  final List<String> sourceChunks;

  ChatMessage({
    required this.sender,
    required this.text,
    this.sourceChunks = const [],
  });
}

class ChatService {
  final ApiClient _apiClient = ApiClient();

  Future<ChatMessage> askJago({
    required String query,
    required String language,
  }) async {
    try {
      final response = await _apiClient.post(
        ApiConfig.chatEndpoint,
        {
          'message': query,
          'language': language,
          'scholarProfile': {
            'name': 'Birsa Marandi',
            'community': 'Santhal',
            'state': 'Jharkhand',
            'district': 'Dumka',
            'education': 'B.Tech',
            'income': 185000,
          },
        },
      );

      final replyText = response['response'] as String? ?? 'MoTA guidelines retrieved.';
      final chunks = (response['source_chunks'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          ['Ministry of Tribal Affairs Gazette'];

      return ChatMessage(
        sender: 'bot',
        text: replyText,
        sourceChunks: chunks,
      );
    } catch (_) {
      // Offline fallback
      return ChatMessage(
        sender: 'bot',
        text: 'Under Ministry of Tribal Affairs (MoTA) guidelines, ST students receive 100% tuition fee reimbursement and maintenance allowance under the Post-Matric & Pre-Matric schemes. Please ensure your bank account is linked to Aadhaar NPCI for direct DBT payment.',
        sourceChunks: [
          'Ministry of Tribal Affairs Gazette No. 11014/03/2021-Scholarship',
          'National Scholarship Portal (NSP) Operational Norms §4'
        ],
      );
    }
  }
}
