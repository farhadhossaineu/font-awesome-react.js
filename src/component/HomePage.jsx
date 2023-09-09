import { Modal, Select } from "antd";
import { useState } from "react";
import { styled } from "styled-components";
import data from "../../iconinfo.json";

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Paragraph = styled.p`
  color: ${({ is_blue }) => is_blue};
`;

const MainContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  background-color: white;
  align-items: center;
  margin-top: 2rem;

  .leftNav {
    margin-top: 2.8rem;
    gap: 0.5rem;
  }
`;

const initialType = {
  isClassic: false,
  isSharp: false,
  isBrands: false,
  isFree: false,
  isGrid: false,
  isList: false,
  isALphabetical: false,
};

const IconWithTitle = styled(FlexContainer)`
  flex-flow: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 110px;
  height: 100px;
  cursor: pointer;
  border-bottom: ${({ is_border }) => (is_border ? "2px solid #146ebe" : "0")};
  .isClassic {
    color: ${({ whoIsActive }) =>
      whoIsActive?.isClassic ? "#146ebe" : "inherit"};
  }
  .isBrands {
    color: ${({ whoIsActive }) =>
      whoIsActive?.isBrands ? "#146ebe" : "inherit"};
  }
  .isFree {
    color: ${({ whoIsActive }) =>
      whoIsActive?.isFree ? "#146ebe" : "inherit"};
  }
  .isSharp {
    color: ${({ whoIsActive }) =>
      whoIsActive?.isSharp ? "#146ebe" : "inherit"};
  }
  .isList {
    color: ${({ whoIsActive }) =>
      whoIsActive?.isList ? "#146ebe" : "inherit"};
  }
  .gridView {
    color: ${({ whoIsActive }) =>
      whoIsActive?.isGrid ? "#146ebe" : "inherit"};
  }
  .listView {
    color: ${({ whoIsActive }) =>
      whoIsActive?.isList ? "#146ebe" : "inherit"};
  }
  &:hover {
    border-bottom: 2px solid #146ebe;
    .my_classic {
      color: #146ebe;
    }
    ${Paragraph} {
      color: #146ebe;
    }
  }
`;

const NavBar = styled(FlexContainer)`
  margin: 0;
  padding-bottom: 1rem;
  min-height: 13%;
  width: 70%;
  background-color: white;
  justify-content: space-between;
  align-items: center;
`;

const ContentWrapper = styled.div`
  padding: 1rem;
  gap: 2.5rem;
  display: flex;
  grid-row-gap: 1rem;
  width: 85%;
  overflow: scroll;
  flex-wrap: wrap;
  background: #e2e0e0;

  .big-icon {
    width: 400px !important;
    height: 400px !important;
    font-size: 400px !important;
  }
`;

const IconBoxContainer = styled(FlexContainer)`
  height: ${({ is_list }) => (is_list ? "50px" : "120px")};
  width: ${({ is_list }) => (is_list ? "215px" : "120px")};
  align-items: center;
  justify-content: ${({ is_list }) => (is_list ? "flex-start" : "center")};
  padding: 1rem;
  flex-flow: ${({ is_list }) => (is_list ? "row" : "column")};
  background-color: white;
  gap: 1rem;
  border-radius: 5px;
  position: relative;

  &:hover {
    background: #fafa96;
  }
`;
const AbsoluteContainer = styled(FlexContainer)`
  position: absolute;
  z-index: 10;
  width: 100%;
  left: -20px;
  top: -10px;
  justify-content: flex-end;
`;
const Pro = styled(FlexContainer)`
  background-color: #fafa96;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  width: 2rem;
  height: 0.5rem;
  border-radius: 10px;
  ${Paragraph} {
    font-size: 0.85rem;
  }
`;

const Box = styled.div`
  cursor: pointer;
`;
// eslint-disable-next-line react/prop-types
const IconBox = ({ icon, text, isList, isPro }) => {
  console.log(isPro);
  return (
    <IconBoxContainer is_list={isList}>
      {isPro ? (
        <AbsoluteContainer>
          <Pro>
            <Paragraph>Pro</Paragraph>
          </Pro>
        </AbsoluteContainer>
      ) : null}
      <FlexContainer>{icon}</FlexContainer>
      <FlexContainer>{text}</FlexContainer>
    </IconBoxContainer>
  );
};

const ModalContainer = styled(FlexContainer)`
  height: 25rem;
  margin-top: 2.5rem;
  flex-flow: column;
  gap: 3rem;
`;
const CopyContainer = styled(FlexContainer)`
  height: 50%;
  width: 100%;
  background-color: #0a265c;
  align-items: flex-start;
  flex-flow: column;
  padding: 0 1rem;
  .html {
    width: 100%;
    border-bottom: 1px solid white;
  }

  cursor: pointer;

  ${Paragraph} {
    font-family: "ubuntu mono";
    color: white;
  }
`;

// eslint-disable-next-line react/prop-types
const HomePage = () => {
  const [type, setType] = useState(initialType);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState();

  const sortedData = () => {
    return data.slice().sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
    });
  };

  const filteredData = (myData) => {
    if (!type.isBrands && !type.isClassic && !type.isFree && !type.isSharp) {
      return myData;
    } else if (
      !type.isBrands &&
      !type.isClassic &&
      type.isFree &&
      !type.isSharp
    ) {
      return myData?.filter((data) => !data.isPaid);
    } else {
      return myData?.filter((data) =>
        type.isFree
          ? ((type.isBrands && data.iconType === "brands") ||
              (type.isClassic && data.iconType === "classic") ||
              (type.isSharp && data.iconType === "sharp")) &&
            !data.isPaid
          : (type.isBrands && data.iconType === "brands") ||
            (type.isClassic && data.iconType === "classic") ||
            (type.isSharp && data.iconType === "sharp")
      );
    }
  };

  return (
    <MainContainer>
      <NavBar>
        <FlexContainer className="leftNav">
          <FlexContainer>
            <IconWithTitle
              is_border={type.isClassic}
              whoIsActive={type}
              onClick={() => {
                setType((prev) => ({
                  ...prev,
                  isClassic: prev.isClassic ? false : true,
                }));
              }}
            >
              <i className="isClassic my_classic fa-solid fa-icons fa-2xl"></i>
              <Paragraph is_blue={type.isClassic ? "#146ebe" : "inherit"}>
                Classic
              </Paragraph>
            </IconWithTitle>
          </FlexContainer>
          <FlexContainer>
            <IconWithTitle
              is_border={type.isSharp}
              whoIsActive={type}
              onClick={() => {
                setType((prev) => ({
                  ...prev,
                  isSharp: prev.isSharp ? false : true,
                }));
              }}
            >
              <i className="isSharp my_classic fa-solid fa-icons fa-2xl"></i>
              <Paragraph is_blue={type.isSharp ? "#146ebe" : "inherit"}>
                Sharp
              </Paragraph>
            </IconWithTitle>
          </FlexContainer>
          <FlexContainer>
            <IconWithTitle
              is_border={type.isBrands}
              whoIsActive={type}
              onClick={() => {
                setType((prev) => ({
                  ...prev,
                  isBrands: prev.isBrands ? false : true,
                }));
              }}
            >
              <i className="isBrands my_classic fa-regular fa-flag fa-2xl"></i>
              <Paragraph is_blue={type.isBrands ? "#146ebe" : "inherit"}>
                Brands
              </Paragraph>
            </IconWithTitle>
          </FlexContainer>
          <FlexContainer is_border={type.isFree} whoIsActive={type}>
            <IconWithTitle
              is_border={type.isFree}
              whoIsActive={type}
              onClick={() => {
                setType((prev) => ({
                  ...prev,
                  isFree: prev.isFree ? false : true,
                }));
              }}
            >
              <i className="isFree my_classic fa-solid fa-bolt fa-2xl"></i>
              <Paragraph is_blue={type.isFree ? "#146ebe" : "inherit"}>
                Free
              </Paragraph>
            </IconWithTitle>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer style={{ gap: ".5rem" }}>
          <FlexContainer>
            <IconWithTitle
              whoIsActive={type}
              is_border={type.isGrid}
              onClick={() => {
                setType((prev) => ({
                  ...prev,
                  isGrid: true,
                  isList: false,
                }));
              }}
            >
              <i className="gridView my_classic fa-solid fa-border-all fa-2xl "></i>
            </IconWithTitle>
          </FlexContainer>
          <FlexContainer
            onClick={() => {
              setType((prev) => ({
                ...prev,
                isGrid: false,
                isList: true,
              }));
            }}
          >
            <IconWithTitle whoIsActive={type} is_border={type.isList}>
              <i className="listView my_classic fa-solid fa-table-list fa-2xl"></i>
            </IconWithTitle>
          </FlexContainer>
          <FlexContainer>
            <Select
              defaultValue="featured"
              size="large"
              style={{
                width: 150,
              }}
              onChange={(data) => {
                setType((prev) => ({
                  ...prev,
                  isALphabetical: data === "alphabetical" ? true : false,
                }));
              }}
              options={[
                {
                  label: "Featured",
                  value: "featured",
                },
                {
                  value: "alphabetical",
                  label: "Alphabetical",
                },
              ]}
            />
          </FlexContainer>
        </FlexContainer>
      </NavBar>
      <ContentWrapper>
        {type.isALphabetical === true
          ? filteredData(sortedData())?.map((data, idx) => (
              <Box
                key={idx}
                onClick={() => {
                  setModalData(idx);
                  setIsModalOpen(true);
                }}
              >
                <IconBox
                  isPro={data.isPaid}
                  key={idx}
                  isList={type.isList ? true : false}
                  icon={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${data.html}`,
                      }}
                    ></div>
                  }
                  text={`${data.name}`}
                />
              </Box>
            ))
          : filteredData(data)?.map((info, idx) => (
              <Box
                key={idx}
                onClick={() => {
                  setModalData(idx);
                  setIsModalOpen(true);
                }}
              >
                <IconBox
                  isPro={info.isPaid}
                  key={idx}
                  isList={type.isList ? true : false}
                  icon={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${info.html}`,
                      }}
                    ></div>
                  }
                  text={`${info.name}`}
                />
              </Box>
            ))}
      </ContentWrapper>
      <Modal
        footer={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <ModalContainer>
          <div
            style={{ height: "100px", width: "100px" }}
            dangerouslySetInnerHTML={{
              __html: `${data[modalData]?.html.replace("fa-xl", "fa-10x")}`,
            }}
          ></div>
          <CopyContainer>
            <div className="html">
              <Paragraph>html</Paragraph>
            </div>
            <div>
              <Paragraph>{data[modalData]?.html}</Paragraph>
            </div>
          </CopyContainer>
        </ModalContainer>
      </Modal>
    </MainContainer>
  );
};

export default HomePage;
