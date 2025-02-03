import styled from "styled-components";

export const PlansContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #c6ebcf;
  padding: 20px;
  border-radius: 15px;
  width: 30vw;
  @media (max-width: 1023px) {
    width: 100%;
    margin-bottom: 1vh;
  }
`;

export const TopPlan = styled.div`
  position: sticky;
  top: 0;
  /* z-index: 10; */
  background-color: inherit;
  .plan-name {
    margin-top: 1vh;
    color: #53a067;
  }
  .price-container {
    display: flex;
    flex-direction: row;
    place-content: center;
    column-gap: 1px;
    place-items: baseline;
    margin-top: 1vh;
    .price {
      color: black;
    }
    .label {
      color: black;
    }
  }
  .qtd-detail {
    align-self: center;
    margin-top: 1vh;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 2vh;
    width: 100%;
  }
  @media (max-width: 1023px) {
    position: relative;
  }
`;

export const ModulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  .decription {
    margin-top: 1.5vh;
    margin-bottom: 1.5vh;
  }
`;

// CORES DO TEMA
// 'cc-primary': "#70CE88",
// 'cc-secondary': "#53A067",
// 'cc-tertiary': "#C6EBCF",
// 'cc-border': "#53A067",
// 'cc-card-bg': "#F3F3F4",
// 'cc-card-bg-2': "#FAFAFB",
