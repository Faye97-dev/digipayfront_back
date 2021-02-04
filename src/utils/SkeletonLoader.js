import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

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
