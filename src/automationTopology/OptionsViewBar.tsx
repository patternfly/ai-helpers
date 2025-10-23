import { FunctionComponent } from 'react';
import {
  Button,
  ButtonVariant,
  Content,
  ContentVariants,
  Flex,
  FlexItem,
} from '@patternfly/react-core';
import { observer } from '@patternfly/react-topology';
import {
  AddCircleOIcon,
  ClipboardCheckIcon,
  ClipboardIcon,
  SaveIcon
} from '@patternfly/react-icons';

const OptionsContextBar: FunctionComponent = observer(() => {
  return (
    <Flex
      direction={{ default: 'row' }}
      spacer={{ default: 'spacerMd'}}
      justifyContent={{ default: 'justifyContentSpaceBetween' }}
      alignItems={{ default: 'alignItemsCenter'}}
    >
      <FlexItem>
        <Content component={ContentVariants.h2}>Create VM Playbook Run</Content>
      </FlexItem>
      <FlexItem>
        <Flex direction={{ default: 'row' }} spacer={{ default: 'spacerMd' }}>
          <FlexItem>
            <Button variant={ButtonVariant.plain} iconPosition="start" icon={<AddCircleOIcon />}>Add note</Button>
          </FlexItem>
          <FlexItem>
            <Button variant={ButtonVariant.plain} iconPosition="start" icon={<ClipboardIcon />}>Add notation</Button>
          </FlexItem>
          <FlexItem>
            <Button variant={ButtonVariant.plain} iconPosition="start" icon={<ClipboardCheckIcon />}>Test</Button>
          </FlexItem>
          <FlexItem>
            <Button variant={ButtonVariant.primary} iconPosition="start" icon={<SaveIcon />}>Save</Button>
          </FlexItem>
        </Flex>
      </FlexItem>
    </Flex>
  );
});

export default OptionsContextBar;
