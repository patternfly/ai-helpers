import * as React from "react";
import { Banner, Bullseye, Flex, FlexItem, Switch } from "@patternfly/react-core";

export interface ProtoProps {
  message?: string;
}
const ProtoTypeBanner: React.FC<ProtoProps> = ({ message = "This application is a design prototype"}) => {
  const [isGrayscaleEnabled, setIsGrayscaleEnabled] = React.useState(true);

  React.useEffect(() => {
    // Apply grayscale class on mount
    document.documentElement.classList.add('prototype-grayscale');
  }, []);

  // Handles changes to grey scale.
  const handleToggle = (_event: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    setIsGrayscaleEnabled(checked);
    if (checked) {
      document.documentElement.classList.add('prototype-grayscale');
    } else {
      document.documentElement.classList.remove('prototype-grayscale');
    }
  };

  return (
    <Banner isSticky>
      <Bullseye>
        <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsMd' }}>
          <FlexItem>
            <strong>{message}</strong>
          </FlexItem>
          <FlexItem>
            <Switch
              id="grayscale-toggle"
              label="Grayscale Mode"
              isChecked={isGrayscaleEnabled}
              onChange={handleToggle}
              isReversed
            />
          </FlexItem>
        </Flex>
      </Bullseye>
    </Banner>
  );
};

export { ProtoTypeBanner };
