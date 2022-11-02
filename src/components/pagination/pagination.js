import React from "react";
import {
  PaginationConatainer,
  NextPrevButtons,
  PageNumberContainer,
  PageNumber,
} from "./paginationElements";
import { ChevronLeft, ChevronRight } from "react-feather";

export default function CustomPagination({ currentPage, goPageNumber, next }) {
  return (
    <PaginationConatainer>
      <NextPrevButtons
        onClick={() => {
          if (currentPage - 1 > 0) {
            goPageNumber("first");
          }
        }}
      >
        <ChevronLeft size={18} />
      </NextPrevButtons>
      <PageNumberContainer>
        {currentPage - 1 > 0 && (
          <PageNumber onClick={() => goPageNumber("previous")} isActive={false}>
            {currentPage - 1}
          </PageNumber>
        )}
        <PageNumber isActive={true}>{currentPage}</PageNumber>
        <PageNumber
          onClick={() => {
            if (next) {
              goPageNumber("next");
            }
          }}
          isActive={false}
        >
          {currentPage + 1}
        </PageNumber>
      </PageNumberContainer>
      <NextPrevButtons
        onClick={() => {
          if (next) {
            goPageNumber("last");
          }
        }}
      >
        <ChevronRight size={18} />
      </NextPrevButtons>
    </PaginationConatainer>
  );
}
