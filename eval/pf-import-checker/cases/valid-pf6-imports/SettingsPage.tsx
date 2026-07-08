import React from 'react';
import { Chart, ChartDonut } from '@patternfly/react-charts/victory';
import { Chatbot, ChatbotContent } from '@patternfly/chatbot/dist/dynamic/Chatbot';
import { MessageBox } from '@patternfly/chatbot/dist/dynamic/MessageBox';
import { InvalidObject } from '@patternfly/react-component-groups/dist/dynamic/InvalidObject';
import {
  Page,
  PageSection,
  Card,
  CardBody,
  CardTitle,
  Switch,
  Form,
  FormGroup,
} from '@patternfly/react-core';

interface SettingsPageProps {
  darkMode: boolean;
  onToggleDarkMode: (checked: boolean) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  darkMode,
  onToggleDarkMode,
}) => (
  <Page>
    <PageSection>
      <Card>
        <CardTitle>Settings</CardTitle>
        <CardBody>
          <Form>
            <FormGroup label="Dark Mode">
              <Switch
                id="dark-mode-toggle"
                isChecked={darkMode}
                onChange={(_event, checked) => onToggleDarkMode(checked)}
              />
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </PageSection>
  </Page>
);
