import React from "react";
import DataTable, { DataTableColumn } from "@/components/DataTable";

// Skeleton data type for trending coins fallback
type SkeletonTrendingCoin = {
  id: string;
};

const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header">
        <div className="header-image skeleton"></div>
        <div className="info">
          <div className="header-line-sm skeleton"></div>
          <div className="header-line-lg skeleton"></div>
        </div>
      </div>
    </div>
  );
};

const TrendingCoinsFallback = () => {
  // Create skeleton data for 10 rows
  const skeletonData: SkeletonTrendingCoin[] = Array.from(
    { length: 10 },
    (_, i) => ({ id: `skeleton-${i}` })
  );

  const columns: DataTableColumn<SkeletonTrendingCoin>[] = [
    {
      header: " Name",
      cellClassName: "name-cell",
      cell: () => {
        return (
          <div className="name-link">
            <div className="name-image skeleton"></div>
            <div className="name-line skeleton"></div>
          </div>
        );
      },
    },
    {
      header: "24h Change",
      cellClassName: "change-cell",
      cell: () => {
        return (
          <div className="price-change">
            <div className="change-icon skeleton"></div>
            <div className="change-line skeleton"></div>
          </div>
        );
      },
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: () => {
        return <div className="price-line skeleton"></div>;
      },
    },
  ];

  return (
    <>
      <p>Trending Coins</p>
      <div id="trending-coins-fallback">
        <DataTable
          data={skeletonData}
          columns={columns}
          rowKey={(item) => item.id}
          tableClassName="trending-coins-table"
          headerClassName="py-3!"
          bodyRowClassName="py-2!"
        />
      </div>
    </>
  );
};

export { CoinOverviewFallback, TrendingCoinsFallback };
