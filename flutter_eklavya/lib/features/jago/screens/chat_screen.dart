import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme.dart';
import 'chat_service.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _controller = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  final ChatService _chatService = ChatService();
  String _selectedLanguage = 'Hindi';
  bool _isLoading = false;

  final List<ChatMessage> _messages = [
    ChatMessage(
      sender: 'bot',
      text: 'नमस्ते! मैं जागो बॉट (Jago Bot) हूँ, जनजातीय कार्य मंत्रालय (MoTA) का आधिकारिक AI सलाहकार। 5 राष्ट्रीय छात्रवृत्ति योजनाओं (Pre-Matric, Post-Matric, Top Class, NFST, NOS) से संबंधित प्रश्न पूछें।',
      sourceChunks: [
        'Ministry of Tribal Affairs Gazette No. 11014/03/2021-Scholarship',
        'National Fellowship for Higher Education of ST Students §3'
      ],
    )
  ];

  Future<void> _handleSend(String query) async {
    if (query.trim().isEmpty || _isLoading) return;

    setState(() {
      _messages.add(ChatMessage(sender: 'user', text: query.trim()));
      _isLoading = true;
    });
    _controller.clear();
    _scrollToBottom();

    final botReply = await _chatService.askJago(
      query: query,
      language: _selectedLanguage,
    );

    setState(() {
      _messages.add(botReply);
      _isLoading = false;
    });
    _scrollToBottom();
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
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.go('/home'),
        ),
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Jago Bot (AI Guide)', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            Text('MoTA Knowledge RAG Engine', style: TextStyle(fontSize: 11, color: Colors.amberAccent)),
          ],
        ),
        actions: [
          DropdownButton<String>(
            value: _selectedLanguage,
            dropdownColor: EklavyaTheme.sacredGrovesDark,
            underline: const SizedBox(),
            icon: const Icon(Icons.arrow_drop_down, color: Colors.amber),
            items: ['Hindi', 'English', 'Santali', 'Bhili', 'Gondi'].map((lang) {
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
          // Trust Banner
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: const Color(0xFFFEF3C7),
            child: const Row(
              children: [
                Icon(Icons.verified, size: 16, color: EklavyaTheme.sacredGrovesGreen),
                SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'All answers cross-referenced with Ministry of Tribal Affairs (MoTA) official datasets.',
                    style: TextStyle(fontSize: 11, color: Color(0xFF78350F), fontWeight: FontWeight.w600),
                  ),
                ),
              ],
            ),
          ),

          // Chat Messages
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                final isUser = msg.sender === 'user';

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
                          msg.text,
                          style: TextStyle(
                            color: isUser ? Colors.white : EklavyaTheme.richBarkBrown,
                            fontSize: 13.5,
                            height: 1.4,
                          ),
                        ),
                        if (!isUser && msg.sourceChunks.isNotEmpty) ...[
                          const SizedBox(height: 8),
                          Wrap(
                            spacing: 4,
                            children: msg.sourceChunks.map((chunk) {
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
                        ],
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
              child: Text('Jago Bot is scanning MoTA regulations...', style: TextStyle(fontSize: 11, color: Colors.grey)),
            ),

          // Floating High-Visibility Input Bar
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: Colors.grey.shade300, width: 1.2)),
              boxShadow: [
                BoxShadow(color: Colors.black.withOpacity(0.06), blurRadius: 8, offset: const Offset(0, -3)),
              ],
            ),
            child: SafeArea(
              child: Row(
                children: [
                  Expanded(
                    child: Container(
                      decoration: BoxDecoration(
                        color: Colors.grey.shade100,
                        borderRadius: BorderRadius.circular(24),
                        border: Border.all(color: Colors.grey.shade300),
                      ),
                      child: TextField(
                        controller: _controller,
                        decoration: const InputDecoration(
                          hintText: 'Ask Jago Bot about ST scholarships...',
                          hintStyle: TextStyle(fontSize: 13, color: Colors.black45),
                          border: InputBorder.none,
                          contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        ),
                        onSubmitted: _handleSend,
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    decoration: const BoxDecoration(
                      color: EklavyaTheme.sacredGrovesGreen,
                      shape: BoxShape.circle,
                    ),
                    child: IconButton(
                      icon: const Icon(Icons.send, color: Colors.white, size: 20),
                      onPressed: () => _handleSend(_controller.text),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
