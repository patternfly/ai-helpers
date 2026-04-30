import * as React from "react";
import { Banner, Bullseye } from "@patternfly/react-core";

export interface ProtoProps {
  message?: string;
}
const ProtoBanner: React.FC<ProtoProps> = ({ message = "This application is a design prototype"}) => {
  return (
    <Banner isSticky>
      <Bullseye>
        <strong>{message}</strong>
      </Bullseye>
    </Banner>
  );
};

export { ProtoBanner };
