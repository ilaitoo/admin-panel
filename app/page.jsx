import Card from "@/components/dashboard/Card";
import Chart from "@/components/dashboard/Chart";
import Rightbar from "@/components/dashboard/Rightbar";
import Transactions from "@/components/dashboard/Transactions";
import Layout from "@/components/layout";

export default function Home() {
  return (
    <>
      <Layout>
        <div className="flex gap-5 mt-5">
          <div className="flex flex-[3] flex-col gap-5">
            <div className="flex gap-5 justify-between">
              <Card />
              <Card />
              <Card />
            </div>
            <Transactions />
            <Chart />
          </div>
          <div className="flex-[1]">
            <Rightbar />
          </div>
        </div>
      </Layout>
    </>
  );
}
