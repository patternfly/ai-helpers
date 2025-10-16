// eslint-disable-next-line no-restricted-imports
import { useState } from "react";
import {
  ActionList,
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
} from "@patternfly/react-core";
import { MessageBar } from "@patternfly/chatbot";
import PlayIcon from "@patternfly/react-icons/dist/esm/icons/play-icon";
import OutlinedPlusSquare from "@patternfly/react-icons/dist/esm/icons/outlined-plus-square-icon";
import OutlinedQuestionCircleIcon from "@patternfly/react-icons/dist/esm/icons/outlined-question-circle-icon";
import OutlinedCopy from "@patternfly/react-icons/dist/esm/icons/outlined-copy-icon";
import imgAvatar from "../assets/avatarImg.svg?url";

import { CompassIntegrations } from "./CompassIntegrations";
import { CompassAutomations } from "./CompassAutomations";
import { BrandLogo } from "./BrandLogo";

export const Compass: React.FunctionComponent = () => {
  const [activeSection, setActiveSection] = useState(4);
  const [activeSubsection, setActiveSubsection] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onDropdownSelect = () => {
    setIsDropdownOpen(false);
  };

  const onDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
          Ned Username
          <Avatar src={imgAvatar} alt="" size="md" />
        </MenuToggle>
      )}
    >
      <DropdownList>{userDropdownItems}</DropdownList>
    </Dropdown>
  );

  return (
    <div id="pf-compass" className="compass">
      <div id="pf-compass__north" className="compass__header">
        <div id="brand-logo">
          <BrandLogo />
        </div>
        <div id="navigation" className="compass__nav">
          <Tabs
            activeKey={activeSection}
            onSelect={handleTabClick}
            component={TabsComponent.nav}
            aria-label="Tabs in the nav element example"
          >
            <Tab
              eventKey={0}
              title={<TabTitleText>Dashboard</TabTitleText>}
              isDisabled
            />
            <Tab
              eventKey={1}
              title={<TabTitleText>Builder</TabTitleText>}
              isDisabled
            />
            <Tab
              eventKey={2}
              title={<TabTitleText>Automations</TabTitleText>}
            />
            <Tab
              eventKey={3}
              title={<TabTitleText>Approvals</TabTitleText>}
              isDisabled
            />
            <Tab
              eventKey={4}
              title={<TabTitleText>Configuration</TabTitleText>}
            >
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
                <Tab
                  eventKey={1}
                  title={<TabTitleText>Integrations</TabTitleText>}
                />
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
            <Tab
              eventKey={5}
              title={<TabTitleText>Support</TabTitleText>}
              isDisabled
            />
          </Tabs>
        </div>
        <div id="user-menu" className="compass__user">
          {userDropdown}
        </div>
      </div>
      <div id="pf-compass__west" className="compass__panel--start">
        <ActionList className="pf-m-vertical">
          <ActionListItem>
            <Button variant="plain" icon={<PlayIcon />} />
          </ActionListItem>
          <ActionListItem>
            <Button variant="plain" icon={<OutlinedPlusSquare />} />
          </ActionListItem>
          <ActionListItem>
            <Button variant="plain" icon={<OutlinedQuestionCircleIcon />} />
          </ActionListItem>
          <ActionListItem>
            <Button variant="plain" icon={<OutlinedCopy />} />
          </ActionListItem>
        </ActionList>
      </div>
      <div id="pf-compass__main" className="compass__main">
        {activeSection === 4 && activeSubsection === 1 ? (
          <CompassIntegrations />
        ) : (
          <CompassAutomations />
        )}
      </div>
      <div id="pf-compass__east" className="compass__panel--end">
        <ActionList className="pf-m-vertical">
          <ActionListItem>
            <Button variant="plain" icon={<OutlinedQuestionCircleIcon />} />
          </ActionListItem>
          <ActionListItem>
            <Button variant="plain" icon={<OutlinedPlusSquare />} />
          </ActionListItem>
          <ActionListItem>
            <Button variant="plain" icon={<OutlinedQuestionCircleIcon />} />
          </ActionListItem>
        </ActionList>
      </div>
      <div id="pf-compass__south" className="compass__footer">
        <MessageBar
          isCompact
          onSendMessage={() => {}}
          hasAttachButton={false}
        />
      </div>
    </div>
  );
};
