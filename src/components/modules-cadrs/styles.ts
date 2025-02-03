import styled from "styled-components";
// CORES DO TEMA
// 'cc-primary': "#70CE88",
// 'cc-secondary': "#53A067",
// 'cc-tertiary': "#C6EBCF",
// 'cc-border': "#53A067",
// 'cc-card-bg': "#F3F3F4",
// 'cc-card-bg-2': "#FAFAFB",

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #c6ebcf;
  padding: 20px;
  border-radius: 15px;
  height: 20vh;
  width: 95%;
  cursor: pointer;
  .description {
    margin-top: auto;
    margin-bottom: 2vh;
    @media (max-width: 1023px) {
      width: 100%;
      margin-bottom: 1vh;
    }
  }
  .top {
    display: flex;
    align-items: center;
    flex-direction: row;
    column-gap: 1vw;
    margin-bottom: 5px;
    .icon-container {
      background-color: white;
      border-radius: 50%;
      padding: 5px;
      .circle {
        background-color: #70ce88;
        border-radius: 50%;
        padding: 10px;
        .icon {
          width: 25px;
          height: 25px;
        }
      }
    }
    .title {
      color: #53a067;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 10vw;
      @media (max-width: 1023px) {
        max-width: 80%;
      }
    }
  }
  @media (max-width: 1023px) {
    height: 22vh;
    width: 100%;
  }
`;
