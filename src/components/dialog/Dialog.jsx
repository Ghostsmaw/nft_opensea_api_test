import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Typography } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import useBreakPoints from "../../hooks/useBreakPoints";

export default function NftDialog(props) {
  const { open, onClose, nftDialog } = props;
  const { xs, sm, md, lg, xl } = useBreakPoints();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
          backgroundColor: "#353935",
          borderRadius: "20px",
          width: "460px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "15px",
          paddingRight: "15px",
          paddingBottom: "15px",
          paddingTop: "0px",
        },
      }}
    >
      <DialogTitle>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {nftDialog.maker_asset_bundle?.assets[0]?.name != null ? (
            <Typography variant="h6" style={{ color: "white" }}>
              {nftDialog.maker_asset_bundle?.assets[0]?.name}
            </Typography>
          ) : (
            <Typography variant="h6" style={{ color: "white" }}>
              N/A
            </Typography>
          )}
          <CloseIcon
            onClick={onClose}
            style={{ color: "white", cursor: "pointer" }}
          />
        </div>
      </DialogTitle>
      <Box p={2} textAlign="center">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={nftDialog.maker_asset_bundle?.assets[0]?.image_url}
            width={sm ? 300 : 150}
            height={sm ? 300 : 150}
            alt="bag photos"
            style={{ borderRadius: "10px" }}
          />
        </Box>
        <Box className="item-content-creator">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="body1"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Creator Address
            </Typography>
            <img src={nftDialog?.maker?.profile_img_url} alt="creator" />
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography
              style={{ fontSize: sm ? "13px" : "11px" }}
              variant="body2"
            >
              {nftDialog?.maker?.address}
            </Typography>
          </Box>
        </Box>
        <Box className="item-content-detail">
          <Typography
            variant="body1"
            style={{ color: "white", fontWeight: "bold", marginBottom: "5px" }}
          >
            Description
          </Typography>
          {nftDialog.maker_asset_bundle?.assets[0]?.collection.description !=
          null ? (
            <Typography
              style={{ fontSize: sm ? "13px" : "11px" }}
              variant="body2"
            >
              {nftDialog.maker_asset_bundle?.assets[0]?.collection.description}
            </Typography>
          ) : (
            <Typography
              style={{ fontSize: sm ? "13px" : "11px" }}
              variant="body2"
            >
              Description Not Available
            </Typography>
          )}
        </Box>
        <Box className="item-content-buy">
          <a
            href={nftDialog.maker_asset_bundle?.assets[0]?.permalink}
            target="blank"
            className="primary-btn"
          >
            Buy For{" "}
            {
              nftDialog?.maker_asset_bundle?.assets[0]?.asset_contract
                ?.seller_fee_basis_points
            }{" "}
            ETH
          </a>
        </Box>
      </Box>
    </Dialog>
  );
}
