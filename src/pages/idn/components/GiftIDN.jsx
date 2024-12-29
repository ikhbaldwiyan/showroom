import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "reactstrap";

const GiftAnimations = ({ giftList, setActiveGift }) => {
  const [animationDataList, setAnimationDataList] = useState({});

  useEffect(() => {
    setActiveGift(animationDataList[0]);
  }, [animationDataList]);

  useEffect(() => {
    if (giftList?.length > 0) {
      const fetchAnimations = async () => {
        const newAnimationDataList = {};

        await Promise.all(
          giftList.map(async (item, idx) => {
            const animationUrl =
              item?.gift?.animation_large ?? item?.gift?.animation_small;

            if (animationUrl) {
              try {
                const res = await axios.get(animationUrl);
                newAnimationDataList[idx] = { animation: res.data, item };
              } catch (err) {
                console.error(
                  `Failed to fetch animation for gift ${item.gift?.name}:`,
                  err
                );
              }
            }
          })
        );

        setAnimationDataList(newAnimationDataList);
      };

      fetchAnimations();
    }
  }, [giftList]);

  return (
    giftList.length > 0 && (
      <Card
        className="p-3 scroll mb-5"
        style={{
          background: "linear-gradient(to bottom, #A0AEC0 0%, #4A5568 100%)",
          borderRadius: "8px",
          border: "none"
        }}
      >
        {giftList?.map((item, idx) => (
          <div
            key={idx}
            className="px-3 py-2"
            style={{
              backgroundColor: "#343a40",
              borderRadius: "8px",
              marginBottom: "6px"
            }}
          >
            <span
              style={{ fontWeight: "600", color: "#DC3545", fontSize: "18px" }}
              className="text-danger"
            >
              {item.user?.name}
            </span>
            <p className="mt-2">
              {item.gift?.name} - {item.gift?.gold} Gold
            </p>
          </div>
        ))}
      </Card>
    )
  );
};

export default GiftAnimations;
