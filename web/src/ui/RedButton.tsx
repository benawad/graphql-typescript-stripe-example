import styled from "styled-components";

export const RedButton = styled("button")`
  align-items: center;
  user-select: none;
  display: inline-flex;
  justify-content: center;
  padding: 6px 16px;
  flex-shrink: 0;
  border-radius: 3px;
  font-weight: 500;
  background: rgba(235, 87, 87, 0.03);
  color: rgb(235, 87, 87);
  border: 1px solid rgb(249, 200, 200);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
  width: 100%;
  margin-top: 6px;
  margin-bottom: 12px;
  cursor: pointer;
  &:hover {
    background-color: #f3edeb;
  }
`;
