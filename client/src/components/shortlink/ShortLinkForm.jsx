import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdOutlineContentCopy } from "react-icons/md";
import { REACT_ROUTE } from "../../../paths";
const ShortLinkForm = () => {
  const [origUrl, setOrigUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [shUrl, setShUrl] = useState("");
  const [expiresAtDate, setExpiresAtDate] = useState("");
  const [expiresAtTime, setExpiresAtTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const handleCopy = (url) => {
    if (url !== "") {
      copy(`${REACT_ROUTE}/api/${url}`);
      toast({
        title: "Copied.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const submitOriginalUrlHandler = async () => {
    setLoading(true);
    if (!origUrl || !validity || validity > 24) {
      toast({
        title: "Please enter the valid data with validity <= 24.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"));

      const url = REACT_ROUTE;
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${url}/api/`,
        { validity, origUrl },
        config
      );
      toast({
        title: "Link Generated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setShUrl(`${REACT_ROUTE}/api/${data.url.short_url}`);
      let expiresAt = data.url.expiresAt;
      expiresAt = expiresAt.split("T");
      setExpiresAtDate(expiresAt[0]);
      setExpiresAtTime(expiresAt[1].split(".")[0]);
      setIsUpdated(!isUpdated);
      setLoading(false);
    } catch (err) {
      if (err.response.data.message === "Token has expired.") {
        navigate("/");
      }
      toast({
        title: "Error Occured.",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <div className="shortlinkform">
      <Text className="htext">Generate Link</Text>
      <div className="vstack">
        <FormControl id="original-url" isRequired>
          <FormLabel>Enter your URL</FormLabel>
          <Input
            type="text"
            placeholder="Enter Your URL"
            value={origUrl}
            onChange={(e) => setOrigUrl(e.target.value)}
          />
        </FormControl>
        <FormControl id="url-validity" isRequired>
          <FormLabel>Validity (in hrs)</FormLabel>
          <Input
            type="number"
            placeholder="Enter URL Validity in hours"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Shorten URL</FormLabel>

          <InputGroup>
            <Input
              type="text"
              value={shUrl}
              placeholder={"Short url"}
              isDisabled
            />
            <InputRightElement>
              <div
                style={{ cursor: "pointer", fontSize: "1.2rem" }}
                border={"1px solid"}
                h="1.75rem"
                p="1rem 1.5rem"
                bg="white"
                mr="1rem"
                size="sm"
                onClick={() => handleCopy(shUrl)}
              >
                <MdOutlineContentCopy />
              </div>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Valid Till Date</FormLabel>
          <Input
            type="text"
            value={expiresAtDate}
            placeholder={"Valid till"}
            isDisabled
          />
        </FormControl>
        <FormControl>
          <FormLabel>Valid Till Time</FormLabel>
          <Input
            type="text"
            value={expiresAtTime}
            placeholder={"Valid till"}
            isDisabled
          />
        </FormControl>
        <Button
          className="shorturl"
          width="100%"
          mt="1.5rem"
          isLoading={loading}
          onClick={submitOriginalUrlHandler}
        >
          Short It..
        </Button>
      </div>
    </div>
  );
};

export default ShortLinkForm;
