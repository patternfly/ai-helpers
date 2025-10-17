import { Content, ContentVariants, Flex, FlexItem } from '@patternfly/react-core';
import { observer } from '@patternfly/react-topology';

const OptionsContextBar: React.FC = observer(() => {
  return (
    <Flex flexWrap={{ default: 'wrap' }} gap={{ default: 'gapMd' }} alignItems={{ default: 'alignItemsCenter' }}>
      <Flex>
        <FlexItem>
          <Content component={ContentVariants.h2}>Create VM Playbook Run</Content>
        </FlexItem>
      </Flex>
    </Flex>
  );
});

export default OptionsContextBar;
