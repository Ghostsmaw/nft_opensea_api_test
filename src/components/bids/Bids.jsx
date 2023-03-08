import { React, useState, useEffect } from "react";
import "./bids.css";
import { AiFillHeart } from "react-icons/ai";
import NftDialog from "../dialog/Dialog";
import NullImage from "../../assets/null_image.jpeg";
import Skeleton from "@mui/material/Skeleton";

const Bids = ({ title }) => {
  const [nfts, setNfts] = useState([]);
  const [open, setOpen] = useState(false);
  const [nftDialog, setNftDialog] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = (nft) => {
    // setOpen(true);
    setNftDialog(nft);
    console.log(nft);
    setOpen(true);
  };

  const handleClose = () => {
    setNftDialog({});
    setOpen(false);
  };

  const FetchNfts = () => {
    setIsLoading(true);
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://testnets-api.opensea.io/v2/orders/goerli/seaport/listings?limit=20`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.orders) && data.orders.length !== 0) {
          setNfts(data.orders);
          setIsLoading(false);
        } else {
          setNfts([]);
        }
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    FetchNfts();
    setIsLoading(false);
  }, []);

  return (
    <div className="bids section__padding">
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>Listings</h1>
        </div>
        <NftDialog open={open} onClose={handleClose} nftDialog={nftDialog} />
        <div className="bids-container-card">
          {isLoading && (
            <div className="card-column">
              {nfts.map((nft, i) => (
                <div
                  className="bids-card"
                  key={i}
                  onClick={() => handleClickOpen(nft)}
                >
                  <div className="bids-card-top">
                    <Skeleton />
                    <Skeleton width="60%" />
                  </div>
                  <div className="bids-card-bottom">
                    <Skeleton />
                    <Skeleton width="60%" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && (
            <div className="card-column">
              {nfts.map((nft, i) => (
                <div
                  className="bids-card"
                  key={i}
                  onClick={() => handleClickOpen(nft)}
                >
                  <div className="bids-card-top">
                    {nft?.maker_asset_bundle?.assets[0]?.image_url != null ? (
                      <img
                        src={nft?.maker_asset_bundle?.assets[0]?.image_url}
                        alt=""
                        width={700}
                        height={700}
                      />
                    ) : (
                      <img
                        src={NullImage}
                        alt={nft.name}
                        width={700}
                        height={700}
                      />
                    )}
                    {/* <Link to={`/post/123`}>
                      <p className="bids-title">Abstact Smoke Red</p>
                    </Link> */}
                    <p className="bids-title">Abstact Smoke Red</p>
                  </div>
                  <div className="bids-card-bottom">
                    <p>
                      1.25 <span>ETH</span>
                    </p>
                    <p>
                      {" "}
                      <AiFillHeart /> 92
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="load-more">
        <button>Load More</button>
      </div>
    </div>
  );
};

export default Bids;
