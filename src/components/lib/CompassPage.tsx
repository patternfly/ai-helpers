import React from "react";
import { Page, PageSection, PageProps } from "@patternfly/react-core";
import { CompassHero } from "./CompassHero";

interface CompassPageProps extends Omit<PageProps, "className" | "ref"> {
  hero?: React.ReactNode;
  toolbar?: React.ReactNode;
  body?: React.ReactNode;
  className?: string;
}

export const CompassPage: React.FunctionComponent<CompassPageProps> = ({
  hero,
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
      {hero && <CompassHero>{hero}</CompassHero>}
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
