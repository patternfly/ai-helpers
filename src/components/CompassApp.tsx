// eslint-disable-next-line no-restricted-imports
import { useState } from "react";
import {
  ActionListItem,
  Button,
  Tabs,
  Tab,
  TabsComponent,
  TabTitleText,
  DropdownItem,
  Dropdown,
  MenuToggle,
  Avatar,
  DropdownList,
  MenuToggleElement,
  Flex,
  ActionListGroup,
} from "@patternfly/react-core";
import { MessageBar } from "@patternfly/chatbot";
import PlayIcon from "@patternfly/react-icons/dist/esm/icons/play-icon";
import OutlinedPlusSquare from "@patternfly/react-icons/dist/esm/icons/outlined-plus-square-icon";
import OutlinedQuestionCircleIcon from "@patternfly/react-icons/dist/esm/icons/outlined-question-circle-icon";
import OutlinedCopy from "@patternfly/react-icons/dist/esm/icons/outlined-copy-icon";
import imgAvatar from "../assets/avatar.jpg";

import { CompassIntegrations } from "./CompassIntegrations";
import { CompassAutomations } from "./CompassAutomations";
import { CompassDashboard } from "./CompassDashboard";
import { CompassContent } from "./CompassContent";
import { CompassTestPage } from "./CompassTestContent/CompassTestPage";
import { BrandLogo } from "./BrandLogo";

import { Compass } from "./lib/Compass";
import { CompassNavSection } from "./lib/CompassNavSection";
import { VerticalActionList } from "./lib/VerticalActionList";
import { aiExperienceIcon } from "./lib/assets/aiExperienceIcon";

export const CompassApp: React.FunctionComponent = () => {
  const [activeSection, setActiveSection] = useState(4);
  const [activeSubsection, setActiveSubsection] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const onDropdownSelect = () => {
    setIsDropdownOpen(false);
  };

  const onDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSendMessage = () => {
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
    }, 10000); // 10 seconds
  };

  const handleTabClick = (
    _event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveSection(tabIndex as number);
  };

  const handleSubsectionClick = (
    _event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveSubsection(tabIndex as number);
  };

  const userDropdownItems = (
    <>
      <DropdownItem key="group 2 profile">My profile</DropdownItem>
      <DropdownItem key="group 2 user">User management</DropdownItem>
      <DropdownItem key="group 2 logout">Logout</DropdownItem>
    </>
  );

  const userDropdown = (
    <Dropdown
      isOpen={isDropdownOpen}
      onSelect={() => onDropdownSelect}
      onOpenChange={(isOpen: boolean) => setIsDropdownOpen(isOpen)}
      popperProps={{ position: "right" }}
      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
        <MenuToggle
          ref={toggleRef}
          onClick={onDropdownToggle}
          isExpanded={isDropdownOpen}
          variant="plain"
        >
          <Flex
            alignItems={{ default: "alignItemsCenter" }}
            gap={{ default: "gapMd" }}
          >
            Aliyah Frazier
            <Avatar src={imgAvatar} alt="" size="md" />
          </Flex>
        </MenuToggle>
      )}
    >
      <DropdownList>{userDropdownItems}</DropdownList>
    </Dropdown>
  );

  const logoContent = <BrandLogo />;

  const navContent = (
    <Tabs
      activeKey={activeSection}
      onSelect={handleTabClick}
      component={TabsComponent.nav}
      aria-label="Tabs in the nav element example"
    >
      <Tab eventKey={0} title={<TabTitleText>Dashboard</TabTitleText>} />
      <Tab
        eventKey={1}
        title={<TabTitleText>Builder</TabTitleText>}
        isDisabled
      />
      <Tab eventKey={2} title={<TabTitleText>Automations</TabTitleText>} />
      <Tab
        eventKey={3}
        title={<TabTitleText>Approvals</TabTitleText>}
        isDisabled
      />
      <Tab eventKey={4} title={<TabTitleText>Configuration</TabTitleText>}>
        <Tabs
          activeKey={activeSubsection}
          isSubtab
          onSelect={handleSubsectionClick}
        >
          <Tab
            eventKey={0}
            title={<TabTitleText>Overview</TabTitleText>}
            isDisabled
          />
          <Tab eventKey={1} title={<TabTitleText>Integrations</TabTitleText>} />
          <Tab
            eventKey={2}
            title={<TabTitleText>Credentials</TabTitleText>}
            isDisabled
          />
          <Tab
            eventKey={3}
            title={<TabTitleText>Settings</TabTitleText>}
            isDisabled
          />
        </Tabs>
      </Tab>
      <Tab eventKey={5} title={<TabTitleText>Test Page</TabTitleText>} />
    </Tabs>
  );

  const northContent = (
    <CompassNavSection
      logo={logoContent}
      nav={navContent}
      user={userDropdown}
    />
  );

  const westContent = (
    <VerticalActionList>
      <ActionListGroup>
        <ActionListItem>
          <Button variant="plain" icon={<PlayIcon />} />
        </ActionListItem>
        <ActionListItem>
          <Button variant="plain" icon={<OutlinedPlusSquare />} />
        </ActionListItem>
      </ActionListGroup>
      <ActionListItem>
        <Button
          className="compass__sparkle ai-border"
          variant="plain"
          icon={aiExperienceIcon}
        ></Button>
      </ActionListItem>
      <ActionListGroup>
        <ActionListItem>
          <Button variant="plain" icon={<OutlinedQuestionCircleIcon />} />
        </ActionListItem>
        <ActionListItem>
          <Button variant="plain" icon={<OutlinedCopy />} />
        </ActionListItem>
      </ActionListGroup>
    </VerticalActionList>
  );

  const centerContent = (() => {
    switch (activeSection) {
      case 0:
        return <CompassDashboard />;
      case 2:
        return <CompassAutomations />;
      case 4:
        if (activeSubsection === 1) {
          return <CompassIntegrations />;
        } else {
          return <CompassContent />;
        }
      case 5:
        return <CompassTestPage />;
      default:
        return <CompassDashboard />;
    }
  })();

  const eastContent = (
    <VerticalActionList>
      <ActionListItem>
        <Button variant="plain" icon={<OutlinedQuestionCircleIcon />} />
      </ActionListItem>
      <ActionListItem>
        <Button variant="plain" icon={<OutlinedPlusSquare />} />
      </ActionListItem>
      <ActionListItem>
        <Button variant="plain" icon={<OutlinedQuestionCircleIcon />} />
      </ActionListItem>
    </VerticalActionList>
  );

  const southContent = (
    <MessageBar
      className={`ai-border ${isThinking ? "thinking" : ""}`}
      isCompact
      onSendMessage={handleSendMessage}
      alwayShowSendButton
      hasAttachButton={false}
    />
  );

  return (
    <Compass
      north={northContent}
      west={westContent}
      center={centerContent}
      east={eastContent}
      south={southContent}
    />
  );
};
