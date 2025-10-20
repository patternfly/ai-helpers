import React from "react";
import { Page, PageSection, PageProps } from "@patternfly/react-core";

interface CompassPageProps extends Omit<PageProps, "className" | "ref"> {
  toolbar?: React.ReactNode;
  body?: React.ReactNode;
  className?: string;
}

export const CompassPage: React.FunctionComponent<CompassPageProps> = ({
  toolbar,
  body,
  className,
  ...pageProps
}) => {
  const combinedClassName = `pf-m-no-sidebar pf-m-plain ${className || ""}`;

  return (
    <Page
      {...pageProps}
      id="pf-compass-center"
      className={combinedClassName}
      isContentFilled
    >
      {toolbar && (
        <div className="compass__toolbar">
          <PageSection>{toolbar}</PageSection>
        </div>
      )}
      {body}
    </Page>
  );
};

CompassPage.displayName = "CompassPage";
