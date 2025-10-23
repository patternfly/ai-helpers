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
import AnsibleLogo from '../images/AnsibleLogo.png';

type Props = {
  ansibleObject: AnsibleObjectType;
  onClose: () => void;
}

const PlatformNodeDetailsPanel: FunctionComponent<Props> = ({ ansibleObject }) => {

  return (
    <Panel style={{ marginTop: 'var(--pf-t--global--spacer--md)', marginRight: 'var(--pf-t--global--spacer--3xl)'}}>
      <PanelHeader>
        <Flex
          direction={{ default: 'row'}}
          spacer={{ default: 'spacerMd' }}
          alignItems={{ default: 'alignItemsCenter' }}
          flexWrap={{ default: 'nowrap' }}
        >
          <FlexItem>
            <Content component="h3" >
              <img loading="lazy" src={AnsibleLogo} alt="Ansible Platform" width="28px" height="28px" />
            </Content>
          </FlexItem>
          <FlexItem>
            <Content component="h3" >
              <span>{ansibleObject.type}</span>
            </Content>
          </FlexItem>
        </Flex>
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
                      <Label>{integration}</Label>
                    </FlexItem>
                  ))}
                </Flex>
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Trigger Type</DescriptionListTerm>
              <DescriptionListDescription>
                Webhook
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Event</DescriptionListTerm>
              <DescriptionListDescription>Job Complete</DescriptionListDescription>
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
