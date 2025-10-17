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

const aiExperienceIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
  >
    <g id="uuid-75f76c23-c1b6-4d16-98c6-ad548b061af4">
      <rect width="32" height="32" fill="none" />
    </g>
    <g id="uuid-08df3350-7f5a-4f9c-8ddc-ec9ca74ef47e">
      <path
        fill="var(--pf-t--global--icon--color--regular)"
        d="M26.03711,16.96191c-5.9043-.46826-10.53027-5.09424-10.99902-10.99121-.03711-.52344-.51367-.96973-1.03809-.96973-.52148,0-.99707.44189-1.03809.96191-.46875,5.90479-5.09473,10.53076-10.99121,10.99854-.52344.0376-.96973.51416-.96973,1.03857,0,.52148.44238.99707.96191,1.03809,5.9043.46875,10.53027,5.09473,10.99902,10.99121.03711.52344.51367.96973,1.03809.96973.52148,0,.99707-.44238,1.03809-.96191.46875-5.9043,5.09473-10.53027,10.99902-10.99902.51953-.04199.96191-.51562.96191-1.03809,0-.52148-.44238-.99707-.96191-1.03809Z"
      />
      <path
        fill="var(--pf-t--global--icon--color--regular)"
        d="M30.06836,6.14746c-1.59668-.35693-2.85938-1.61914-3.21582-3.21387-.08887-.40332-.43945-.68555-.85254-.68555s-.76367.28223-.85156.68311c-.35742,1.59717-1.62012,2.85938-3.21973,3.2168-.40039.09131-.68066.44141-.68066.85205s.28027.76074.68359.85254c1.59668.35693,2.85938,1.61914,3.21582,3.21387.08887.40332.43945.68555.85254.68555s.76367-.28223.85156-.68311c.35742-1.59717,1.62012-2.85938,3.2168-3.21631.00098,0,.00195-.00049.00293-.00049.40039-.09131.68066-.44141.68066-.85205s-.28027-.76074-.68359-.85254Z"
      />
    </g>
  </svg>
);

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
            <Tab eventKey={0} title={<TabTitleText>Dashboard</TabTitleText>} />
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
            <Tab eventKey={5} title={<TabTitleText>Test Page</TabTitleText>} />
          </Tabs>
        </div>
        <div id="user-menu" className="compass__user">
          {userDropdown}
        </div>
      </div>
      <div id="pf-compass__west" className="compass__panel--start">
        <ActionList className="pf-m-vertical">
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
        </ActionList>
      </div>
      <div id="pf-compass__main" className="compass__main">
        {(() => {
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
        })()}
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
          className="ai-border"
          isCompact
          onSendMessage={() => {}}
          hasAttachButton={false}
        />
      </div>
    </div>
  );
};
