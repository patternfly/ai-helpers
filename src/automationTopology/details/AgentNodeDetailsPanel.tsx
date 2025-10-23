import { FunctionComponent } from 'react';
import { AnsibleObjectType } from '../type.ts';
import {
  Content,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Flex,
  FlexItem,
  Label,
  Panel,
  PanelHeader,
  PanelFooter,
  PanelMain,
  PanelMainBody,
} from '@patternfly/react-core';
import AgentIcon from '../images/AgentIcon.ts';

type Props = {
  ansibleObject: AnsibleObjectType;
  onClose: () => void;
}

const PlatformNodeDetailsPanel: FunctionComponent<Props> = ({ ansibleObject }) => {

  return (
    <Panel style={{ marginTop: 'var(--pf-t--global--spacer--md)', marginRight: 'var(--pf-t--global--spacer--3xl)'}}>
      <PanelHeader>
          <Content component="h3" >
              <span
                style={{
                  backgroundColor: 'var(--pf-t--global--color--nonstatus--purple--default)',
                  borderRadius: 3,
                  marginTop: 3,
                  marginRight: 'var(--pf-t--global--spacer--sm)',
                  padding: '0 var(--pf-t--global--spacer--xs)'
                }}
              >
                <AgentIcon style={{ fill: 'var(--pf-t--color--black)'}}/>
              </span>
            <span>{ansibleObject.type}</span>
          </Content>
      </PanelHeader>
      <PanelMain>
        <PanelMainBody>
          <Content style={{ color: 'var(--pf-t--global--text--color--subtle)' }}>{ansibleObject.subType}</Content>
          <Content style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>{ansibleObject.description}</Content>
          <DescriptionList isCompact style={{ marginTop: 8, marginBottom: 8 }}>
            <DescriptionListGroup>
              <DescriptionListTerm>Integrations</DescriptionListTerm>
              <DescriptionListDescription>
                <Flex spaceItems={{ default: 'spaceItemsXs' }}>
                  {ansibleObject.integrations?.map((integration) => (
                    <FlexItem key={integration}>
                      <Label >{integration}</Label>
                    </FlexItem>
                  ))}
                </Flex>
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Model</DescriptionListTerm>
              <DescriptionListDescription>
                GPT-4
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Memory</DescriptionListTerm>
              <DescriptionListDescription>Last 10 interactions</DescriptionListDescription>
            </DescriptionListGroup>
          </DescriptionList>
        </PanelMainBody>
      </PanelMain>
      <PanelFooter>

      </PanelFooter>
    </Panel>
  );
};

export default PlatformNodeDetailsPanel;
