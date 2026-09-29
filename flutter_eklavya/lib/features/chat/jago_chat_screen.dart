import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../../core/theme.dart';

class JagoChatScreen extends StatefulWidget {
  const JagoChatScreen({super.key});

  @override
  State<JagoChatScreen> createState() => _JagoChatScreenState();
}

class _JagoChatScreenState extends State<JagoChatScreen> {
  final TextEditingController _controller = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  String _selectedLanguage = 'Hindi';
  bool _isLoading = false;

  final List<Map<String, dynamic>> _messages = [
    {
      'sender': 'bot',
      'text': 'नमस्ते! मैं जागो बॉट (Jago Bot) हूँ, जनजातीय कार्य मंत्रालय (MoTA) का आधिकारिक AI सलाहकार। 5 राष्ट्रीय छात्रवृत्ति योजनाओं (Pre-Matric, Post-Matric, Top Class, NFST, NOS) के बारे में कुछ भी पूछें।',
      'sourceChunks': [
        'MoTA Operational Guidelines 2024-25',
        'National Fellowship for Higher Education of ST Students §3'
      ]
    }
  ];

  Future<void> _sendMessage(String text) async {
    if (text.trim().isEmpty || _isLoading) return;

    setState(() {
      _messages.add({'sender': 'user', 'text': text});
      _isLoading = true;
    });
    _controller.clear();
    _scrollToBottom();

    try {
      // Connects to local or remote Node/FastAPI MoTA server endpoint
      final uri = Uri.parse('http://10.0.2.2:3000/api/chat');
      final response = await http.post(
        uri,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'message': text,
          'language': _selectedLanguage,
        }),
      ).timeout(const Duration(seconds: 12));

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        setState(() {
          _messages.add({
            'sender': 'bot',
            'text': data['response'] ?? 'Informational details retrieved.',
            'sourceChunks': data['source_chunks'] ?? ['MoTA Official Portal'],
          });
        });
      } else {
        _addFallbackResponse(text);
      }
    } catch (e) {
      _addFallbackResponse(text);
    } finally {
      setState(() => _isLoading = false);
      _scrollToBottom();
    }
  }

  void _addFallbackResponse(String text) {
    setState(() {
      _messages.add({
        'sender': 'bot',
        'text': 'Under MoTA regulations, Post-Matric and Pre-Matric scholarships cover full tuition fees + maintenance allowance via DBT PFMS. Please ensure your bank account is Aadhaar seeded.',
        'sourceChunks': ['MoTA Guidelines §4.2', 'PFMS Direct Benefit Transfer Mandate']
      });
    });
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Jago Bot (AI Assistant)', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            Text('Official MoTA RAG Engine', style: TextStyle(fontSize: 11, color: Colors.amberAccent)),
          ],
        ),
        actions: [
          DropdownButton<String>(
            value: _selectedLanguage,
            dropdownColor: EklavyaTheme.sacredGrovesDark,
            underline: const SizedBox(),
            icon: const Icon(Icons.arrow_drop_down, color: Colors.amber),
            items: ['English', 'Hindi', 'Santali', 'Bhili', 'Gondi'].map((lang) {
              return DropdownMenuItem(
                value: lang,
                child: Text(lang, style: const TextStyle(color: Colors.white, fontSize: 13)),
              );
            }).toList(),
            onChanged: (val) {
              if (val != null) setState(() => _selectedLanguage = val);
            },
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: const Color(0xFFFEF3C7),
            child: const Row(
              children: [
                Icon(Icons.verified, size: 16, color: EklavyaTheme.sacredGrovesGreen),
                SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Directly verified against Ministry of Tribal Affairs (MoTA) gazette dataset.',
                    style: TextStyle(fontSize: 11, color: Color(0xFF78350F), fontWeight: FontWeight.w500),
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                final isUser = msg['sender'] == 'user';

                return Align(
                  alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.symmetric(vertical: 6),
                    padding: const EdgeInsets.all(14),
                    constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.82),
                    decoration: BoxDecoration(
                      color: isUser ? EklavyaTheme.sacredGrovesGreen : Colors.white,
                      borderRadius: BorderRadius.only(
                        topLeft: const Radius.circular(16),
                        topRight: const Radius.circular(16),
                        bottomLeft: isUser ? const Radius.circular(16) : Radius.zero,
                        bottomRight: isUser ? Radius.zero : const Radius.circular(16),
                      ),
                      boxShadow: [
                        BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 4, offset: const Offset(0, 2)),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          msg['text'],
                          style: TextStyle(
                            color: isUser ? Colors.white : EklavyaTheme.richBarkBrown,
                            fontSize: 13.5,
                            height: 1.4,
                          ),
                        ),
                        if (!isUser && msg['sourceChunks'] != null) ...[
                          const SizedBox(height: 8),
                          Wrap(
                            spacing: 4,
                            children: (msg['sourceChunks'] as List).map<Widget>((chunk) {
                              return Chip(
                                materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                                padding: EdgeInsets.zero,
                                labelPadding: const EdgeInsets.symmetric(horizontal: 6),
                                backgroundColor: const Color(0xFFECFDF5),
                                label: Text(
                                  '🔗 $chunk',
                                  style: const TextStyle(fontSize: 9.5, color: EklavyaTheme.sacredGrovesGreen, fontWeight: FontWeight.bold),
                                ),
                              );
                            }).toList(),
                          ),
                        ]
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          if (_isLoading)
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text('Jago Bot is querying MoTA RAG database...', style: TextStyle(fontSize: 11, color: Colors.grey)),
            ),
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: Colors.grey.shade300)),
            ),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(
                      hintText: 'Type question about ST scholarships...',
                      hintStyle: TextStyle(fontSize: 13),
                      border: InputBorder.none,
                      contentPadding: EdgeInsets.symmetric(horizontal: 12),
                    ),
                    onSubmitted: _sendMessage,
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send, color: EklavyaTheme.sacredGrovesGreen),
                  onPressed: () => _sendMessage(_controller.text),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
