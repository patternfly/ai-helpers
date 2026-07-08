import React from 'react';
import { Chatbot, ChatbotContent, ChatbotFooter, MessageBox } from '@patternfly/chatbot';
import { Page, PageSection } from '@patternfly/react-core';

interface AssistantPanelProps {
  messages: { role: string; content: string }[];
  onSend: (message: string) => void;
}

export const AssistantPanel: React.FC<AssistantPanelProps> = ({ messages, onSend }) => (
  <Page>
    <PageSection>
      <Chatbot>
        <ChatbotContent>
          <MessageBox>
            {messages.map((msg, i) => (
              <div key={i} className={`message message--${msg.role}`}>
                {msg.content}
              </div>
            ))}
          </MessageBox>
        </ChatbotContent>
        <ChatbotFooter />
      </Chatbot>
    </PageSection>
  </Page>
);
