/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Select from "react-select";

import Container from "components/Container";
import { createNotification } from "common/create-notification";

import style from "./wallet.module.scss";

const SelectGeoFigs = ({ walletId, NFTs }: any) => {
  const [formData, setFormData] = useState({
    longitude: "",
    latitude: "",
  });
  const [selectVal, setSelectVal] = useState({
    geoFigName: "",
    geoFigImage: "",
    geoFigId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [NFTsList, setNFtsList] = useState<any>([]);

  const history = useHistory();

  const restrictAlphabets = (e: any) => {
    const x = e.which || e.keyCode;
    if (x === 101 || x === 43) {
      e.preventDefault();
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (val: any) => {
    setSelectVal({
      geoFigName: val.label,
      geoFigImage: val.image,
      geoFigId: val.label,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("https://eikona-backend.vercel.app/api/users", {
        longitude: formData.longitude?.toString(),
        latitude: formData.latitude?.toString(),
        walletId: walletId,
        ...selectVal,
      })
      .then((res) => {
        setIsLoading(false);
        createNotification(
          "success",
          "Success",
          res.data?.msg || "Successfully submitted"
        );
        history.push("/");
      })
      .catch((err) => {
        setIsLoading(false);
        createNotification(
          "error",
          "Error",
          err?.response?.data?.msg || "Something went wrong"
        );
      });
  };

  const showPosition = (position: any) => {
    position = position?.coords;
    setFormData({
      ...formData,
      latitude: position?.latitude,
      longitude: position?.longitude,
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (NFTs.length > 0) {
      const tempArr: any = [];
      NFTs?.forEach((ele: any) => {
        tempArr.push({
          value: ele?.offChain?.name,
          label: ele?.offChain?.name,
          image: ele?.offChain?.image,
        });
      });
      setNFtsList([...tempArr]);
    }
  }, [NFTs]);

  return (
    <Container>
      <div className={style.main1}>
        <form className={style.geo} onSubmit={handleSubmit}>
          <h1>Select Your Geofig</h1>
          <p>
            If you need help finding your coordinates, try this
            website(ctrl+click to open a new tab){" "}
            <a href="https://www.maps.ie/coordinates.html">
              https://www.maps.ie/coordinates.html
            </a>
          </p>
          <div className={style.select}>
            <Select
              defaultValue={NFTsList[0]}
              onChange={handleSelectChange}
              options={NFTsList}
              className="selectList"
              formatOptionLabel={(country: any) => (
                <div className="country-option">
                  <img src={country.image} alt="country-image" />
                  <span>{country.label}</span>
                </div>
              )}
            />
          </div>
          <div className={style.inputs}>
            <input
              type="number"
              name="latitude"
              placeholder="lat"
              value={formData.latitude}
              onKeyPress={restrictAlphabets}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="longitude"
              placeholder="lng"
              value={formData.longitude}
              onKeyPress={restrictAlphabets}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <button style={{ pointerEvents: isLoading ? "none" : "auto" }}>
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default SelectGeoFigs;
