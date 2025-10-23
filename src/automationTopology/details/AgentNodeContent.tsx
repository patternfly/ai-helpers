import { FunctionComponent, Ref, useState } from 'react';
import { AnsibleObjectType } from '../type.ts';
import {
  Button,
  ButtonVariant,
  Content,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Dropdown,
  DropdownItem,
  DropdownList,
  Flex,
  FlexItem,
  Label,
  MenuToggle,
  MenuToggleElement
} from '@patternfly/react-core';
import {
  AngleDownIcon,
  AngleUpIcon,
  BanIcon,
  CopyIcon,
  EllipsisVIcon,
  TrashIcon
} from '@patternfly/react-icons';
import AgentIcon from '../images/AgentIcon.ts';

type Props = {
  nodeData: AnsibleObjectType;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

const AgentNodeContent: FunctionComponent<Props> = ({ nodeData, expanded, setExpanded }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const renderExpansion = () => {
    if (!expanded) {
      return null;
    }

    return (
      <FlexItem>
        <DescriptionList isCompact style={{ marginTop: 8, marginBottom: 8 }}>
          <DescriptionListGroup>
            <DescriptionListTerm>Integrations</DescriptionListTerm>
            <DescriptionListDescription>
              <Flex spaceItems={{ default: 'spaceItemsXs' }}>
                {nodeData.integrations?.map((integration) => (
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
      </FlexItem>
    );
  };

  return (
    <Flex
      direction={{ default: 'column' }}
      spacer={{ default: 'spacerLg' }}
      style={{ padding: 'var(--pf-t--global--spacer--md)' }}
    >
      <FlexItem>
        <Flex
          direction={{ default: 'row' }}
          spacer={{ default: 'spacerSm' }}
          alignItems={{ default: 'alignItemsCenter' }}
          justifyContent={{ default: 'justifyContentSpaceBetween' }}
          flexWrap={{ default: 'nowrap' }}
        >
          <FlexItem flex={{ default: 'flex_1' }}>
              <Content component="h3" >
                <span
                  style={{
                    backgroundColor: 'var(--pf-t--global--color--nonstatus--purple--default)',
                    borderRadius: 3,
                    marginTop: 3,
                    marginRight: 'var(--pf-t--global--spacer--xs)',
                    padding: '0 var(--pf-t--global--spacer--xs)'
                  }}
                >
                  <AgentIcon style={{ fill: 'var(--pf-t--color--black)'}}/>
                </span>
                {nodeData.type}
              </Content>
          </FlexItem>
          <FlexItem>
            <span onClick={(e) => e.stopPropagation() }>
              <Dropdown
                isOpen={isOpen}
                onOpenChange={(value: boolean) => {
                  setIsOpen(value);
                }}
                onSelect={() => setIsOpen(false)}
                toggle={(toggleRef: Ref<MenuToggleElement>) => (
                  <MenuToggle
                    ref={toggleRef}
                    onClick={() => setIsOpen((prev) => !prev)}
                    isExpanded={isOpen}
                    variant="plain"
                    style={{ padding: 4, minWidth: 'unset' }}
                  >
                    <EllipsisVIcon />
                  </MenuToggle>
                )}
                shouldFocusToggleOnSelect
              >
                <DropdownList>
                  <DropdownItem>
                    <Flex direction={{ default: 'row' }} spacer={{ default: 'spacerLg' }}>
                      <FlexItem>
                        <CopyIcon />
                      </FlexItem>
                      <FlexItem>
                        Duplicate
                      </FlexItem>
                    </Flex>
                  </DropdownItem>
                  <DropdownItem>
                    <Flex direction={{ default: 'row' }} spacer={{ default: 'spacerLg' }}>
                      <FlexItem>
                        <BanIcon />
                      </FlexItem>
                      <FlexItem>
                        Disable
                      </FlexItem>
                    </Flex>
                  </DropdownItem>
                  <DropdownItem>
                    <Flex direction={{ default: 'row' }} spacer={{ default: 'spacerLg' }}>
                      <FlexItem>
                        <TrashIcon />
                      </FlexItem>
                      <FlexItem style={{ color: 'var(--pf-t--global--text--color--status--danger--default)' }}>
                        Delete
                      </FlexItem>
                    </Flex>
                  </DropdownItem>
                </DropdownList>
              </Dropdown>
            </span>
            <Button
              variant={ButtonVariant.plain}
              isInline
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              style={{ padding: 4, minWidth: 'unset' }}
            >
              {expanded ? <AngleUpIcon /> : <AngleDownIcon />}
            </Button>
          </FlexItem>
        </Flex>
      </FlexItem>
      <FlexItem flex={{ default: 'flex_1' }}>
        <Content style={{ color: 'var(--pf-t--global--text--color--subtle)' }}>{nodeData.subType}</Content>
        <Content style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>{nodeData.description}</Content>
      </FlexItem>
      {renderExpansion()}
    </Flex>
  );
};

export default AgentNodeContent;
