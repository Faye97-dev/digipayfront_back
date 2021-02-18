import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Card, CardBody } from "reactstrap";
import React from "react";

export default function SkeletonLoader() {
  return (
    <>
      <SkeletonTheme color="#f4f5fd" highlightColor="#fff">
        <h3 className="pb-1 pt-2">
          <Skeleton duration={2} />
        </h3>
        <h3 className="pb-1">
          <Skeleton duration={2} />
        </h3>
        <h3 className="pb-1">
          <Skeleton duration={2} />
        </h3>
        <h3>
          <Skeleton duration={2} />
        </h3>
      </SkeletonTheme>
    </>
  );
}

export function SkeletonCard() {
  return (
    <>
      <SkeletonTheme color="#f4f5fd" highlightColor="#fff">
        {[1, 2, 3, 4].map((item) => {
          return (
            <Card className="mb-4 py-2" key={item}>
              <CardBody className="px-4 py-2">
                <div style={{ width: "25%" }}>
                  <h2>
                    <Skeleton duration={2} />
                  </h2>
                </div>
                <div>
                  <Skeleton duration={2} count={2} />
                </div>
              </CardBody>
            </Card>
          );
        })}
      </SkeletonTheme>
    </>
  );
}

export function SkeletonUser() {
  return (
    <>
      <SkeletonTheme color="#f4f5fd" highlightColor="#fff">
        <span>
          <Skeleton circle={true} height={80} width={80} />
        </span>

        <p className="pt-2">
          <Skeleton duration={2} count={2} />
        </p>
      </SkeletonTheme>
    </>
  );
}
