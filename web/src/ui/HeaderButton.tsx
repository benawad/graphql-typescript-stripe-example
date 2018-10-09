import styled from "styled-components";

export const HeaderButton = styled("div")`
  align-items: center;
  user-select: none;
  width: auto;
  display: inherit;
  padding: 4px 10px;
  border-radius: 3px;
  flex-shrink: 0;
  margin-left: 4px;
  margin-right: 4px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: rgba(50, 50, 50, 0.08);
  }
`;
