import { fetcher } from "@/lib/coingecko.actions";
import DataTable, { DataTableColumn } from "@/components/DataTable";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

const TrendingCoins = async () => {
  const trendingCoins = await fetcher<TrendingCoin[]>(
    "/search/trending",
    undefined,
    300
  );
  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: " Name",
      cellClassName: "name-cell",
      cell: (coin: TrendingCoin) => {
        const item = coin.item;
        return (
          <Link href={`/coin/${item.id}`}>
            <Image
              src={item.large}
              alt={item.name}
              width={36}
              height={36}
            ></Image>
            <p>{item.name}</p>
          </Link>
        );
      },
    },
    {
      header: "24h Change",
      cellClassName: "name-cell",
      cell: (coin: TrendingCoin) => {
        const item = coin.item;
        const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;
        return (
          <div
            className={cn(
              "price-change",
              isTrendingUp ? "text-green-500" : "text-red-500"
            )}
          >
            <p>
              {isTrendingUp ? (
                <TrendingUp width={16} height={16} />
              ) : (
                <TrendingUp width={16} height={16} />
              )}
              {Math.abs(item.data.price_change_percentage_24h.usd).toFixed(2)}%
            </p>
          </div>
        );
      },
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin: TrendingCoin) => {
        return coin.item.data.price;
      },
    },
  ];
  return (
    <>
    <div id="trending-coinsr">
      <h1>Trending Coins</h1>
      <div id="trending-coins">
        <DataTable
          data={trendingCoins.coins.slice(0, 10) || []}
          columns={columns}
          rowKey={(coin) => coin.item.id}
          tableClassName="trending-coins-table"
          headerClassName="py-3!"
          bodyRowClassName="py-2!"
        />
      </div>
      </div>
    </>
  );
};

export default TrendingCoins;
