import Image from "next/image";
import React from "react";

function Transactions() {
  return (
    <div className="bg-[--bgSoft] p-5 rounded-[10px]">
      <h2 className="mb-5 font-extralight text-[--textSoft]">
        Latest Transactions
      </h2>
      <table className="w-full">
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="user">
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className="user_img"
                />
                John Doe
              </div>
            </td>
            <td>
              <span className="status pending">Pending</span>
            </td>
            <td>14.02.2024</td>
            <td>$3.200</td>
          </tr>
          <tr>
            <td>
              <div className="user">
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className="user_img"
                />
                John Doe
              </div>
            </td>
            <td>
              <span className=" status done">Done</span>
            </td>
            <td>14.02.2024</td>
            <td>$3.200</td>
          </tr>
          <tr>
            <td>
              <div className="user">
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className="user_img"
                />
                John Doe
              </div>
            </td>
            <td>
              <span className="status cancelled">Cancelled</span>
            </td>
            <td>14.02.2024</td>
            <td>$3.200</td>
          </tr>
          <tr>
            <td>
              <div className="user ">
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className="user_img"
                />
                John Doe
              </div>
            </td>
            <td>
              <span className="status pending">Pending</span>
            </td>
            <td>14.02.2024</td>
            <td>$3.200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
